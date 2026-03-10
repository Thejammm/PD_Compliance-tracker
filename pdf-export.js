/**
 * pdf-export.js – Client-side PDF export for Building Regulations Compliance Tracker
 *
 * Uses html2pdf.js (jsPDF + html2canvas) to generate a real PDF download
 * directly in the browser.  No print dialog, no backend, no Worker.
 *
 * Dependencies:
 *   – html2pdf.bundle.min.js loaded locally before this script
 *   – script.js must define: buildFinalReportData(), renderFinalReportHTML()
 *
 * HOW IT WORKS:
 *   1. AppPDF.export() is called when the user clicks "Generate Final PDF Report"
 *   2. It calls buildFinalReportData() (in script.js) to collect all data from localStorage
 *   3. It calls renderFinalReportHTML() (in script.js) to build a full HTML document string
 *   4. The HTML is injected into a hidden <div> on the page
 *   5. html2pdf.js converts that rendered HTML into a PDF via canvas capture
 *   6. The PDF is downloaded automatically
 *   7. The hidden <div> is removed from the page
 */
(function () {
    'use strict'; // Enforces strict JavaScript parsing to catch common errors

    // Set to true to visually inspect the rendered report HTML in the browser before PDF conversion.
    // When true, the hidden report <div> will remain visible with a red border after export.
    var DEBUG_PDF = false;

    // Expose the export function globally as AppPDF.export() so buttons can call it
    window.AppPDF = { export: exportToPDF };

    /* ================================================================
       HELPER FUNCTIONS
       These are small utility functions used by the main export process
       ================================================================ */

    /**
     * waitForRender() — Waits for two animation frames to ensure the browser
     * has fully painted the injected HTML before we try to capture it.
     * Without this, html2pdf may capture a blank or partially-rendered element.
     * Returns a Promise that resolves when rendering is complete.
     */
    function waitForRender() {
        return new Promise(function (r) {
            requestAnimationFrame(function () { requestAnimationFrame(r); });
        });
    }

    /**
     * waitForImages(el) — Finds all <img> tags inside the given element
     * and returns a Promise that resolves when every image has finished loading.
     * This prevents html2pdf from capturing broken/missing images.
     * @param {HTMLElement} el — The container element to scan for images
     */
    function waitForImages(el) {
        var imgs = Array.from(el.querySelectorAll('img')); // Find all images in the report
        return Promise.all(imgs.map(function (img) {
            if (img.complete) return Promise.resolve(); // Already loaded, skip
            return new Promise(function (r) { img.onload = r; img.onerror = r; }); // Wait for load or error
        }));
    }

    /**
     * waitForFonts() — Returns a Promise that resolves when all web fonts
     * have finished loading. Uses the Font Loading API if available.
     * This ensures text measurements are accurate when html2canvas measures the layout.
     */
    function waitForFonts() {
        return (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
    }

    /**
     * buildPdfFilename(rd) — Creates a safe filename for the downloaded PDF.
     * Uses the project reference or name, strips special characters, and appends the date.
     * Example output: "ProjectRef_Building_Regulations_Compliance_Report_2026-03-10.pdf"
     * @param {Object} rd — The report data object from buildFinalReportData()
     * @returns {string} The sanitised filename
     */
    function buildPdfFilename(rd) {
        var ref = rd.cover.projectRef || rd.cover.projectName || 'Report'; // Use ref first, fall back to name
        var safe = ref.replace(/[^a-zA-Z0-9_\- ]/g, '').replace(/\s+/g, '_'); // Remove special chars, replace spaces with underscores
        return safe + '_Building_Regulations_Compliance_Report_' + new Date().toISOString().slice(0, 10) + '.pdf'; // Append date
    }

    /**
     * scopeReportCSS(css) — Modifies the report's CSS so it doesn't conflict with the main page styles.
     * The report HTML is injected into the live page, so we need to:
     *   - Change "body {" rules to target "#pdf-report-root {" instead
     *   - Remove @page rules (not supported in html2canvas)
     *   - Remove print-specific properties that cause rendering issues
     *   - Remove page-break properties (html2pdf handles page breaks differently)
     * @param {string} css — The raw CSS string from the report HTML
     * @returns {string} The cleaned CSS string
     */
    function scopeReportCSS(css) {
        css = css.replace(/\bbody\s*\{/g, '#pdf-report-root{');                          // Rewrite body{} to target the report container
        css = css.replace(/@page\s*[^{]*\{[^}]*\}/g, '');                                // Strip @page rules (not supported)
        css = css.replace(/\bpage\s*:\s*[^;}"]+;?/g, '');                                // Strip "page:" property
        css = css.replace(/-webkit-print-color-adjust\s*:\s*[^;}"]+;?/g, '');            // Strip webkit print-color-adjust
        css = css.replace(/\bprint-color-adjust\s*:\s*[^;}"]+;?/g, '');                  // Strip standard print-color-adjust
        css = css.replace(/page-break-(after|before|inside)\s*:\s*[^;}"]+;?/g, '');      // Strip legacy page-break properties
        css = css.replace(/break-(after|before|inside)\s*:\s*[^;}"]+;?/g, '');           // Strip modern break properties
        return css;
    }

    /* ================================================================
       DOM CONTAINER MANAGEMENT
       Creates and removes the hidden <div> where the report is rendered
       ================================================================ */

    /**
     * createPdfRoot() — Creates a hidden <div id="pdf-report-root"> in the page body.
     * This is where the report HTML gets injected for html2canvas to capture.
     * The element is styled to be A4 width (210mm) with white background.
     * If DEBUG_PDF is true, it's shown with a red border for visual inspection.
     * @returns {HTMLElement} The created container element
     */
    function createPdfRoot() {
        var old = document.getElementById('pdf-report-root'); // Remove any existing report container from a previous export
        if (old) old.parentNode.removeChild(old);

        var root = document.createElement('div'); // Create new container
        root.id = 'pdf-report-root';              // Set ID for CSS scoping

        // Style the container to match A4 page width with white background
        // pointer-events:none prevents accidental clicks on the hidden report
        root.style.cssText = [
            'width:210mm',                                                    // A4 page width
            'max-width:210mm',                                                // Prevent overflow
            'overflow:hidden',                                                // Clip any overflow
            'box-sizing:border-box',                                          // Include padding in width
            'background:#ffffff',                                             // White background for PDF
            'color:#000000',                                                  // Black text
            'font-family:"Segoe UI",Tahoma,Geneva,Verdana,sans-serif',       // Default font stack
            'line-height:1.6',                                                // Comfortable line spacing
            'pointer-events:none'                                             // Prevent interaction with hidden element
        ].join(';');

        // In debug mode, show the report visually in the browser for inspection
        if (DEBUG_PDF) {
            root.style.border = '2px solid red';  // Red border to highlight the report element
            root.style.margin = '40px auto';       // Centre it on screen
        }

        document.body.appendChild(root); // Add to page so html2canvas can render it
        return root;
    }

    /**
     * cleanupPdfRoot() — Removes the hidden report container from the page after PDF generation.
     * Skipped in DEBUG_PDF mode so you can inspect the rendered HTML.
     */
    function cleanupPdfRoot() {
        if (DEBUG_PDF) return; // Keep the element visible in debug mode
        var el = document.getElementById('pdf-report-root');
        if (el && el.parentNode) el.parentNode.removeChild(el); // Remove from DOM
    }

    /* ================================================================
       MAIN EXPORT FUNCTION
       This is the entry point — called when the user clicks the button
       ================================================================ */

    /**
     * exportToPDF() — Main function that orchestrates the entire PDF export process.
     * Called via AppPDF.export() from the "Generate Final PDF Report" button.
     *
     * Steps:
     *   1. Disable the button and show "Generating PDF…"
     *   2. Check that html2pdf library is loaded
     *   3. Call buildFinalReportData() to collect all app data
     *   4. Call renderFinalReportHTML() to generate the report HTML string
     *   5. Extract the <body> and <style> content from the HTML string
     *   6. Create a hidden container and inject the report HTML
     *   7. Add page-break CSS rules for clean page splitting
     *   8. Wait for fonts, images, and rendering to complete
     *   9. Call html2pdf to convert the container to PDF and trigger download
     *  10. Clean up the container and reset the button
     */
    function exportToPDF() {
        console.log('[PDF] export started'); // Log to console for debugging

        // Get references to the button and its status label so we can update them
        var btn      = document.getElementById('pdfBtn');       // The "Generate Final PDF Report" button
        var statusEl = document.getElementById('pdfStatus');    // The <span> inside the button showing "Ready"/"Generating…"/"Error"
        if (btn) btn.disabled = true;                           // Disable button to prevent double-clicks during generation
        if (statusEl) { statusEl.textContent = 'Generating PDF\u2026'; statusEl.style.color = ''; } // Show "Generating PDF…" text

        try {
            // ---- Step 1: Verify html2pdf library is available ----
            if (!window.html2pdf) {
                throw new Error(
                    'PDF export library failed to load.\n' +
                    'Check that html2pdf.bundle.min.js exists and is loaded before pdf-export.js.'
                );
            }

            // ---- Step 2: Collect all report data from the app ----
            // buildFinalReportData() is defined in script.js
            // It reads all data from localStorage (project info, compliance items, reviews, etc.)
            // and returns a structured object with sections for each part of the report
            var reportData = buildFinalReportData();

            // ---- Step 3: Generate the full HTML document for the report ----
            // renderFinalReportHTML() is defined in script.js
            // It takes the data object and builds a complete HTML string with inline CSS
            var reportHTML = renderFinalReportHTML(reportData);

            // ---- Step 4: Extract the <body> and <style> content from the HTML string ----
            // We need these separately because we're injecting into an existing page
            var bodyMatch  = reportHTML.match(/<body[^>]*>([\s\S]*)<\/body>/i);   // Extract everything between <body> tags
            var styleMatch = reportHTML.match(/<style[^>]*>([\s\S]*)<\/style>/i); // Extract everything between <style> tags
            var reportBody = bodyMatch  ? bodyMatch[1]  : reportHTML;             // Use the body content, or the whole HTML as fallback
            var reportCSS  = styleMatch ? styleMatch[1] : '';                     // Use the style content, or empty string
            reportCSS = scopeReportCSS(reportCSS);                               // Clean up CSS to avoid conflicts with main page

            // ---- Step 5: Create the hidden container and inject the report HTML ----
            var reportRoot = createPdfRoot(); // Create <div id="pdf-report-root">
            reportRoot.innerHTML = '<style>' + reportCSS + '</style>' + reportBody; // Inject scoped CSS + report body HTML

            // ---- Step 6: Add page-break rules for cleaner PDF page splitting ----
            // These tell html2pdf where it should try to avoid breaking content across pages
            var pageBreakStyle = document.createElement('style');
            pageBreakStyle.textContent =
                '.req-card { page-break-inside: avoid; }' +           // Don't split requirement cards across pages
                '.review-box { page-break-inside: avoid; page-break-before: avoid; }' + // Keep review boxes on same page as their card
                '.doc-hdr { page-break-after: avoid; }' +             // Keep document headers with their first card
                '.strategy-item { page-break-inside: avoid; }' +      // Don't split strategy items
                '.declaration-box { page-break-inside: avoid; }' +    // Don't split the declaration section
                '.summary-box { page-break-inside: avoid; }' +        // Don't split summary statistics
                '.narrative { page-break-inside: avoid; }' +          // Don't split narrative text blocks
                'h1.section-title { page-break-after: avoid; }' +     // Keep section headings with their content
                'tr { page-break-inside: avoid; }';                   // Don't split table rows across pages
            reportRoot.appendChild(pageBreakStyle); // Add the page-break styles to the report container

            // ---- Step 7: Build the PDF filename from the project data ----
            var filename = buildPdfFilename(reportData); // e.g. "ProjectRef_Building_Regulations_Compliance_Report_2026-03-10.pdf"

            // ---- Step 8: Wait for browser rendering, fonts, and images, then generate PDF ----
            waitForRender()                                     // Wait for the browser to paint the injected HTML
                .then(function () { return waitForFonts(); })    // Wait for all web fonts to load
                .then(function () { return waitForImages(reportRoot); }) // Wait for all images to load
                .then(function () {

                    // Measure the rendered content height to calculate a safe canvas scale
                    var sh = reportRoot.scrollHeight;
                    console.log('[PDF] scrollWidth:', reportRoot.scrollWidth,   // Log dimensions for debugging
                                'scrollHeight:', sh,
                                'clientWidth:', reportRoot.clientWidth);

                    // Safety check: if the report has no height, something went wrong
                    if (sh < 10) throw new Error('Report container has no height.');

                    // Calculate scale factor for html2canvas
                    // html2canvas has a maximum canvas size (~32000px). If the report is very long,
                    // we reduce the scale to stay within limits. Higher scale = sharper PDF but larger canvas.
                    var safeScale = Math.min(2, Math.floor(32000 / sh)); // Scale 2 is ideal, but cap at canvas limit
                    if (safeScale < 1) safeScale = 1;                    // Minimum scale of 1
                    console.log('[PDF] scale:', safeScale);

                    // ---- Debug logging: inspect the element before html2pdf processes it ----
                    // These logs help diagnose issues if the PDF comes out blank or wrong
                    var cs = window.getComputedStyle(reportRoot);
                    console.log('[PDF DEBUG] element:', reportRoot);
                    console.log('[PDF DEBUG] element id:', reportRoot.id);
                    console.log('[PDF DEBUG] element offsetWidth:', reportRoot.offsetWidth);     // Actual rendered width in pixels
                    console.log('[PDF DEBUG] element offsetHeight:', reportRoot.offsetHeight);   // Actual rendered height in pixels
                    console.log('[PDF DEBUG] element scrollHeight:', reportRoot.scrollHeight);   // Full content height
                    console.log('[PDF DEBUG] element innerHTML length:', reportRoot.innerHTML.length); // Size of injected HTML
                    console.log('[PDF DEBUG] element childElementCount:', reportRoot.childElementCount); // Number of child elements
                    console.log('[PDF DEBUG] element visibility:', cs.visibility);               // Should be "visible"
                    console.log('[PDF DEBUG] element display:', cs.display);                     // Should be "block"
                    console.log('[PDF DEBUG] element opacity:', cs.opacity);                     // Should be "1"
                    console.log('[PDF DEBUG] element color:', cs.color);                         // Text colour
                    console.log('[PDF DEBUG] element backgroundColor:', cs.backgroundColor);     // Background colour
                    console.log('[PDF DEBUG] element overflow:', cs.overflow);                   // Should be "hidden"
                    console.log('[PDF DEBUG] element position:', cs.position);                   // Element positioning
                    console.log('[PDF DEBUG] first 500 chars of innerHTML:', reportRoot.innerHTML.substring(0, 500)); // Preview of HTML content

                    // ---- Step 9: Call html2pdf to convert the rendered HTML to PDF and trigger download ----
                    // html2pdf().set({options}).from(element).save() is the core conversion call.
                    // It uses html2canvas to take a screenshot of the element, then jsPDF to create the PDF.
                    // The .save() method triggers the browser download dialog.
                    return html2pdf().set({ filename: filename }).from(reportRoot).save();
                })
                .then(function () {
                    // ---- Step 10: Success — clean up and reset the button ----
                    cleanupPdfRoot();                                           // Remove the hidden report container
                    if (btn) btn.disabled = false;                              // Re-enable the button
                    if (statusEl) { statusEl.textContent = 'Ready'; statusEl.style.color = ''; } // Reset status text
                    if (typeof showSuccess === 'function') showSuccess('PDF downloaded.'); // Show success message to user
                })
                .catch(function (err) {
                    // ---- Error during async PDF generation ----
                    console.error('[PDF] failed:', err);                         // Log the error for debugging
                    cleanupPdfRoot();                                           // Clean up the hidden container
                    if (btn) btn.disabled = false;                              // Re-enable the button
                    if (statusEl) { statusEl.textContent = 'Error'; statusEl.style.color = '#e53e3e'; } // Show "Error" in red
                    if (typeof showError === 'function') showError('PDF failed: ' + err.message); // Show error message to user
                });

        } catch (err) {
            // ---- Error during synchronous setup (before async steps) ----
            console.error('[PDF] error:', err);                                 // Log the error
            if (typeof showError === 'function') showError('Error: ' + err.message); // Show error message to user
            if (btn) btn.disabled = false;                                      // Re-enable the button
            if (statusEl) { statusEl.textContent = 'Error'; statusEl.style.color = '#e53e3e'; } // Show "Error" in red
        }
    }
})(); // Immediately-invoked function expression (IIFE) — runs once when the script loads, keeps variables private