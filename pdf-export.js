/**
 * pdf-export.js – Client-side PDF export for Building Regulations Compliance Tracker
 *
 * Uses html2pdf.js (jsPDF + html2canvas) to generate a real PDF download
 * directly in the browser.  No print dialog, no backend, no Worker.
 *
 * Dependencies:
 *   – html2pdf.bundle.min.js loaded locally before this script
 *   – script.js must define: buildFinalReportData(), renderFinalReportHTML()
 */
(function () {
    'use strict';

    var DEBUG_PDF = false;

    window.AppPDF = { export: exportToPDF };

    /* ---- helpers ------------------------------------------------ */

    function waitForRender() {
        return new Promise(function (r) {
            requestAnimationFrame(function () { requestAnimationFrame(r); });
        });
    }

    function waitForImages(el) {
        var imgs = Array.from(el.querySelectorAll('img'));
        return Promise.all(imgs.map(function (img) {
            if (img.complete) return Promise.resolve();
            return new Promise(function (r) { img.onload = r; img.onerror = r; });
        }));
    }

    function waitForFonts() {
        return (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
    }

    function buildPdfFilename(rd) {
        var ref = rd.cover.projectRef || rd.cover.projectName || 'Report';
        var safe = ref.replace(/[^a-zA-Z0-9_\- ]/g, '').replace(/\s+/g, '_');
        return safe + '_Building_Regulations_Compliance_Report_' + new Date().toISOString().slice(0, 10) + '.pdf';
    }

    function scopeReportCSS(css) {
        // Rewrite body{} rules to target the report root
        css = css.replace(/\bbody\s*\{/g, '#pdf-report-root{');
        // Strip @page rules
        css = css.replace(/@page\s*[^{]*\{[^}]*\}/g, '');
        // Strip page: property
        css = css.replace(/\bpage\s*:\s*[^;}"]+;?/g, '');
        // Strip print-color-adjust
        css = css.replace(/-webkit-print-color-adjust\s*:\s*[^;}"]+;?/g, '');
        css = css.replace(/\bprint-color-adjust\s*:\s*[^;}"]+;?/g, '');
        // Strip page-break-* and break-*
        css = css.replace(/page-break-(after|before|inside)\s*:\s*[^;}"]+;?/g, '');
        css = css.replace(/break-(after|before|inside)\s*:\s*[^;}"]+;?/g, '');
        return css;
    }

    /* ---- DOM container ------------------------------------------ */

    function createPdfRoot() {
        var old = document.getElementById('pdf-report-root');
        if (old) old.parentNode.removeChild(old);

        var root = document.createElement('div');
        root.id = 'pdf-report-root';

        root.style.cssText = [
            'width:210mm',
            'max-width:210mm',
            'overflow:hidden',
            'box-sizing:border-box',
            'background:#ffffff',
            'color:#000000',
            'font-family:"Segoe UI",Tahoma,Geneva,Verdana,sans-serif',
            'line-height:1.6',
            'pointer-events:none'
        ].join(';');

        if (DEBUG_PDF) {
            root.style.border = '2px solid red';
            root.style.margin = '40px auto';
        }

        document.body.appendChild(root);
        return root;
    }

    function cleanupPdfRoot() {
        if (DEBUG_PDF) return;
        var el = document.getElementById('pdf-report-root');
        if (el && el.parentNode) el.parentNode.removeChild(el);
    }

    /* ---- main export -------------------------------------------- */

    function exportToPDF() {
        console.log('[PDF] export started');

        var btn      = document.getElementById('pdfBtn');
        var statusEl = document.getElementById('pdfStatus');
        if (btn) btn.disabled = true;
        if (statusEl) { statusEl.textContent = 'Generating PDF\u2026'; statusEl.style.color = ''; }

        try {
            if (!window.html2pdf) {
                throw new Error(
                    'PDF export library failed to load.\n' +
                    'Check that html2pdf.bundle.min.js exists and is loaded before pdf-export.js.'
                );
            }

            var reportData = buildFinalReportData();
            var reportHTML = renderFinalReportHTML(reportData);

            var bodyMatch  = reportHTML.match(/<body[^>]*>([\s\S]*)<\/body>/i);
            var styleMatch = reportHTML.match(/<style[^>]*>([\s\S]*)<\/style>/i);
            var reportBody = bodyMatch  ? bodyMatch[1]  : reportHTML;
            var reportCSS  = styleMatch ? styleMatch[1] : '';
            reportCSS = scopeReportCSS(reportCSS);

var reportRoot = createPdfRoot();
            reportRoot.innerHTML = '<style>' + reportCSS + '</style>' + reportBody;

            var pageBreakStyle = document.createElement('style');
            pageBreakStyle.textContent =
                '.req-card { page-break-inside: avoid; }' +
                '.review-box { page-break-inside: avoid; page-break-before: avoid; }' +
                '.doc-hdr { page-break-after: avoid; }' +
                '.strategy-item { page-break-inside: avoid; }' +
                '.declaration-box { page-break-inside: avoid; }' +
                '.summary-box { page-break-inside: avoid; }' +
                '.narrative { page-break-inside: avoid; }' +
                'h1.section-title { page-break-after: avoid; }' +
                'tr { page-break-inside: avoid; }';
            reportRoot.appendChild(pageBreakStyle);

            var filename = buildPdfFilename(reportData);

            waitForRender()
                .then(function () { return waitForFonts(); })
                .then(function () { return waitForImages(reportRoot); })
                .then(function () {

                    var sh = reportRoot.scrollHeight;
                    console.log('[PDF] scrollWidth:', reportRoot.scrollWidth,
                                'scrollHeight:', sh,
                                'clientWidth:', reportRoot.clientWidth);

                    if (sh < 10) throw new Error('Report container has no height.');

                    var safeScale = Math.min(2, Math.floor(32000 / sh));
                    if (safeScale < 1) safeScale = 1;
                    console.log('[PDF] scale:', safeScale);

                    /* ---- DEBUG: inspect element before html2pdf ---- */
                    var cs = window.getComputedStyle(reportRoot);
                    console.log('[PDF DEBUG] element:', reportRoot);
                    console.log('[PDF DEBUG] element id:', reportRoot.id);
                    console.log('[PDF DEBUG] element offsetWidth:', reportRoot.offsetWidth);
                    console.log('[PDF DEBUG] element offsetHeight:', reportRoot.offsetHeight);
                    console.log('[PDF DEBUG] element scrollHeight:', reportRoot.scrollHeight);
                    console.log('[PDF DEBUG] element innerHTML length:', reportRoot.innerHTML.length);
                    console.log('[PDF DEBUG] element childElementCount:', reportRoot.childElementCount);
                    console.log('[PDF DEBUG] element visibility:', cs.visibility);
                    console.log('[PDF DEBUG] element display:', cs.display);
                    console.log('[PDF DEBUG] element opacity:', cs.opacity);
                    console.log('[PDF DEBUG] element color:', cs.color);
                    console.log('[PDF DEBUG] element backgroundColor:', cs.backgroundColor);
                    console.log('[PDF DEBUG] element overflow:', cs.overflow);
                    console.log('[PDF DEBUG] element position:', cs.position);
                    console.log('[PDF DEBUG] first 500 chars of innerHTML:', reportRoot.innerHTML.substring(0, 500));

                    /* ---- BARE MINIMUM html2pdf call ---- */
                    return html2pdf().set({ filename: filename }).from(reportRoot).save();
                })
                .then(function () {
                    cleanupPdfRoot();
                    if (btn) btn.disabled = false;
                    if (statusEl) { statusEl.textContent = 'Ready'; statusEl.style.color = ''; }
                    if (typeof showSuccess === 'function') showSuccess('PDF downloaded.');
                })
                .catch(function (err) {
                    console.error('[PDF] failed:', err);
                    cleanupPdfRoot();
                    if (btn) btn.disabled = false;
                    if (statusEl) { statusEl.textContent = 'Error'; statusEl.style.color = '#e53e3e'; }
                    if (typeof showError === 'function') showError('PDF failed: ' + err.message);
                });

        } catch (err) {
            console.error('[PDF] error:', err);
            if (typeof showError === 'function') showError('Error: ' + err.message);
            if (btn) btn.disabled = false;
            if (statusEl) { statusEl.textContent = 'Error'; statusEl.style.color = '#e53e3e'; }
        }
    }
})();