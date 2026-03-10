/**
 * pdf-export.js — Client-side PDF export for Building Regulations Compliance Tracker
 *
 * Generates the final compliance report PDF entirely in the browser using jsPDF.
 * No server, no fetch, no backend — pure client-side rendering.
 *
 * Architecture mirrors the AHS RAMS PDF generator (client-reportpdfv2.js).
 *
 * Dependencies:
 *   - jsPDF 2.5.2 (loaded via CDN in index.html)
 *   - script.js must define: buildFinalReportData(), showError(), showSuccess()
 */
(function () {
    'use strict';

    // ── Constants ────────────────────────────────────────────
    var PAGE_W = 210;
    var PAGE_H = 297;
    var MARGIN = 15;
    var CONTENT_W = PAGE_W - MARGIN * 2;
    var BOTTOM_LIMIT = 270;

    // ── Colours (RGB arrays) ────────────────────────────────
    var BRAND_DARK = [45, 55, 72];       // #2d3748
    var BRAND_ACCENT = [14, 165, 233];   // #0ea5e9
    var TEXT_DARK = [30, 30, 30];
    var TEXT_MID = [74, 85, 104];
    var TEXT_LIGHT = [100, 116, 139];
    var HEADER_BG = [20, 30, 60];
    var ROW_ALT = [248, 249, 252];
    var BORDER_LIGHT = [200, 210, 220];

    window.AppPDF = { export: exportToPDF };

    // ── Helpers ──────────────────────────────────────────────

    function cleanStr(s) {
        if (!s) return '';
        return String(s).replace(/\s+/g, ' ').trim();
    }

    function buildFilename(rd) {
        var ref = rd.cover.projectRef || rd.cover.projectName || 'Report';
        var safe = ref.replace(/[^a-zA-Z0-9_\- ]/g, '').replace(/\s+/g, '_');
        return safe + '_BR_Compliance_Report_' + new Date().toISOString().slice(0, 10) + '.pdf';
    }

    function drawSectionHeader(doc, title) {
        doc.setFillColor(HEADER_BG[0], HEADER_BG[1], HEADER_BG[2]);
        doc.rect(0, 0, PAGE_W, 18, 'F');
        doc.setFontSize(14);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(255, 255, 255);
        var lines = doc.splitTextToSize(title, 180);
        doc.text(lines[0], PAGE_W / 2, 12, { align: 'center' });
        doc.setDrawColor(BRAND_ACCENT[0], BRAND_ACCENT[1], BRAND_ACCENT[2]);
        doc.setLineWidth(0.6);
        doc.line(MARGIN, 22, MARGIN + CONTENT_W, 22);
    }

    function addFooter(doc) {
        doc.setDrawColor(BRAND_ACCENT[0], BRAND_ACCENT[1], BRAND_ACCENT[2]);
        doc.setLineWidth(0.5);
        doc.line(MARGIN, 280, PAGE_W - MARGIN, 280);
        doc.setFontSize(7);
        doc.setFont(undefined, 'bold');
        doc.setTextColor(80, 90, 110);
        doc.text('AHS Compliance Consulting', MARGIN, 286);
        doc.setFont(undefined, 'italic');
        doc.setFontSize(6);
        doc.setTextColor(120, 130, 150);
        doc.text('Uncontrolled if printed', PAGE_W / 2, 286, { align: 'center' });
        doc.setFont(undefined, 'normal');
        doc.setFontSize(7);
        doc.setTextColor(80, 90, 110);
        doc.text(new Date().toLocaleDateString('en-GB'), PAGE_W - MARGIN, 286, { align: 'right' });
    }

    /** Return y after ensuring enough space, or add a new page */
    function ensureSpace(doc, y, needed, sectionTitle) {
        if (y + needed > BOTTOM_LIMIT) {
            addFooter(doc);
            doc.addPage();
            drawSectionHeader(doc, sectionTitle);
            return 28;
        }
        return y;
    }

    /** Draw label: value pair */
    function drawField(doc, label, value, x, y, labelW, valueW) {
        doc.setFont(undefined, 'bold');
        doc.setFontSize(10);
        doc.setTextColor(TEXT_MID[0], TEXT_MID[1], TEXT_MID[2]);
        doc.text(label + ':', x, y);
        doc.setFont(undefined, 'normal');
        doc.setTextColor(TEXT_DARK[0], TEXT_DARK[1], TEXT_DARK[2]);
        var lines = doc.splitTextToSize(cleanStr(value), valueW);
        doc.text(lines, x + labelW, y);
        return y + Math.max(lines.length * 5, 6);
    }

    /** Draw a simple table from headers[] and rows[][] */
    function drawTable(doc, headers, rows, y, sectionTitle, colWidths) {
        var numCols = headers.length;
        if (!colWidths) {
            var w = CONTENT_W / numCols;
            colWidths = [];
            for (var ci = 0; ci < numCols; ci++) colWidths.push(w);
        }
        doc.setFontSize(8);

        // Header row
        y = ensureSpace(doc, y, 10, sectionTitle);
        var xPos = MARGIN;
        for (var hi = 0; hi < headers.length; hi++) {
            doc.setFillColor(HEADER_BG[0], HEADER_BG[1], HEADER_BG[2]);
            doc.rect(xPos, y, colWidths[hi], 8, 'F');
            doc.setTextColor(255, 255, 255);
            doc.setFont(undefined, 'bold');
            doc.text(cleanStr(headers[hi]), xPos + 2, y + 5.5);
            xPos += colWidths[hi];
        }
        y += 8;

        // Data rows
        for (var ri = 0; ri < rows.length; ri++) {
            var row = rows[ri];
            // Measure row height
            var cellTexts = [];
            var maxLines = 1;
            for (var ci2 = 0; ci2 < numCols; ci2++) {
                var txt = cleanStr(row[ci2] || '');
                var wrapped = doc.splitTextToSize(txt, colWidths[ci2] - 4);
                cellTexts.push(wrapped);
                if (wrapped.length > maxLines) maxLines = wrapped.length;
            }
            var rowH = Math.max(7, maxLines * 3.5 + 3);

            y = ensureSpace(doc, y, rowH, sectionTitle);

            xPos = MARGIN;
            for (var ci3 = 0; ci3 < numCols; ci3++) {
                var bgColor = ri % 2 === 0 ? ROW_ALT : [255, 255, 255];
                doc.setFillColor(bgColor[0], bgColor[1], bgColor[2]);
                doc.rect(xPos, y, colWidths[ci3], rowH, 'F');
                doc.setDrawColor(BORDER_LIGHT[0], BORDER_LIGHT[1], BORDER_LIGHT[2]);
                doc.setLineWidth(0.3);
                doc.rect(xPos, y, colWidths[ci3], rowH);
                doc.setTextColor(TEXT_DARK[0], TEXT_DARK[1], TEXT_DARK[2]);
                doc.setFont(undefined, 'normal');
                doc.setFontSize(8);
                doc.text(cellTexts[ci3], xPos + 2, y + 4);
                xPos += colWidths[ci3];
            }
            y += rowH;
        }
        return y;
    }

    /** Draw a strategy/checklist group (design compliance, construction, handover) */
    function drawStrategyList(doc, items, y, sectionTitle) {
        for (var i = 0; i < items.length; i++) {
            var it = items[i];
            var statusLabel = (it.status || 'not-started').replace(/-/g, ' ');
            var titleText = cleanStr(it.title);
            var descText = cleanStr(it.description);
            var notesText = cleanStr(it.notes);

            doc.setFontSize(9);
            var descLines = doc.splitTextToSize(descText, CONTENT_W - 10);
            var noteLines = notesText ? doc.splitTextToSize('Notes: ' + notesText, CONTENT_W - 10) : [];
            var blockH = 8 + descLines.length * 4 + (noteLines.length ? noteLines.length * 4 + 2 : 0) + 4;

            y = ensureSpace(doc, y, blockH, sectionTitle);

            // Status colour stripe
            var stripeColor = [203, 213, 225]; // default grey
            var bgColor2 = [248, 250, 252];
            if (it.status === 'complete') { stripeColor = [16, 185, 129]; bgColor2 = [236, 253, 245]; }
            else if (it.status === 'in-progress') { stripeColor = [245, 158, 11]; bgColor2 = [255, 251, 235]; }
            else if (it.status === 'not-applicable') { stripeColor = [148, 163, 184]; bgColor2 = [241, 245, 249]; }

            doc.setFillColor(bgColor2[0], bgColor2[1], bgColor2[2]);
            doc.rect(MARGIN, y, CONTENT_W, blockH, 'F');
            doc.setFillColor(stripeColor[0], stripeColor[1], stripeColor[2]);
            doc.rect(MARGIN, y, 3, blockH, 'F');

            // Title + status
            doc.setFont(undefined, 'bold');
            doc.setFontSize(10);
            doc.setTextColor(BRAND_DARK[0], BRAND_DARK[1], BRAND_DARK[2]);
            doc.text(titleText, MARGIN + 6, y + 5);
            doc.setFontSize(8);
            doc.setTextColor(TEXT_MID[0], TEXT_MID[1], TEXT_MID[2]);
            doc.text(statusLabel.toUpperCase(), MARGIN + CONTENT_W - 5, y + 5, { align: 'right' });

            // Description
            doc.setFont(undefined, 'normal');
            doc.setFontSize(9);
            doc.setTextColor(TEXT_DARK[0], TEXT_DARK[1], TEXT_DARK[2]);
            doc.text(descLines, MARGIN + 6, y + 11);
            var descEndY = y + 11 + descLines.length * 4;

            // Notes
            if (noteLines.length) {
                doc.setFont(undefined, 'italic');
                doc.setFontSize(8);
                doc.setTextColor(TEXT_MID[0], TEXT_MID[1], TEXT_MID[2]);
                doc.text(noteLines, MARGIN + 6, descEndY + 2);
            }

            y += blockH + 2;
        }
        return y;
    }

    /** Map review status to a short label */
    function reviewStatusLabel(status) {
        if (status === 'Accepted for Report') return 'ACCEPTED';
        if (status === 'Reviewed') return 'REVIEWED';
        if (status === 'Query Raised') return 'QUERY';
        return 'NOT REVIEWED';
    }

    // ── Main Export Function ─────────────────────────────────

    async function exportToPDF() {
        console.log('[PDF] Export started');

        var btn = document.getElementById('pdfBtn');
        var statusEl = document.getElementById('pdfStatus');
        if (btn) btn.disabled = true;
        if (statusEl) { statusEl.textContent = 'Generating PDF\u2026'; statusEl.style.color = ''; }

        try {
            var jsPDFClass = window.jspdf && window.jspdf.jsPDF;
            if (!jsPDFClass) {
                throw new Error('jsPDF library not loaded. Check your internet connection and reload.');
            }

            var doc = new jsPDFClass('p', 'mm', 'a4');
            var rd = buildFinalReportData();
            var filename = buildFilename(rd);
            var y;

            console.log('[PDF] Building report:', filename);

            // ════════════════════════════════════════════════
            // PAGE 1: COVER PAGE
            // ════════════════════════════════════════════════
            // Dark gradient background
            doc.setFillColor(BRAND_DARK[0], BRAND_DARK[1], BRAND_DARK[2]);
            doc.rect(0, 0, PAGE_W, PAGE_H, 'F');

            // Title band
            doc.setFillColor(HEADER_BG[0], HEADER_BG[1], HEADER_BG[2]);
            doc.rect(0, 40, PAGE_W, 35, 'F');
            doc.setFontSize(28);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(255, 255, 255);
            doc.text(cleanStr(rd.cover.reportTitle) || 'Building Regulations Compliance Report', PAGE_W / 2, 56, { align: 'center' });
            doc.setFontSize(13);
            doc.setFont(undefined, 'normal');
            doc.text(cleanStr(rd.cover.subtitle) || 'Principal Designer (Building Regulations)', PAGE_W / 2, 68, { align: 'center' });

            // Accent line
            doc.setDrawColor(BRAND_ACCENT[0], BRAND_ACCENT[1], BRAND_ACCENT[2]);
            doc.setLineWidth(1.5);
            doc.line(50, 80, PAGE_W - 50, 80);

            // Project name box
            doc.setFillColor(255, 255, 255, 25);
            doc.setDrawColor(255, 255, 255);
            doc.setLineWidth(0.5);
            doc.roundedRect(30, 90, CONTENT_W + 10, 22, 4, 4, 'D');
            doc.setFontSize(18);
            doc.setFont(undefined, 'bold');
            doc.setTextColor(255, 255, 255);
            doc.text(cleanStr(rd.cover.projectName) || 'Project', PAGE_W / 2, 104, { align: 'center' });

            // Cover details
            var coverFields = [
                ['Project Reference', rd.cover.projectRef],
                ['Project Address', rd.cover.projectAddress],
                ['Project Type', rd.cover.projectType],
                ['HRB Status', rd.cover.isHRB ? 'Higher-Risk Building' : 'Standard Building'],
                ['Client', rd.cover.client],
                ['Principal Designer', rd.cover.principalDesigner],
                ['Principal Contractor', rd.cover.principalContractor],
                ['Issue Number', rd.cover.issueNumber],
                ['Date', rd.cover.reportDate],
                ['Prepared By', rd.cover.preparedBy]
            ];

            y = 125;
            doc.setFontSize(10);
            for (var cfi = 0; cfi < coverFields.length; cfi++) {
                doc.setFont(undefined, 'bold');
                doc.setTextColor(180, 190, 210);
                doc.text(coverFields[cfi][0] + ':', MARGIN + 10, y);
                doc.setFont(undefined, 'normal');
                doc.setTextColor(255, 255, 255);
                doc.text(cleanStr(coverFields[cfi][1]), 90, y);
                y += 7;
            }

            // Brand footer on cover
            doc.setFontSize(9);
            doc.setTextColor(120, 130, 150);
            doc.text('AHS Compliance Consulting', PAGE_W / 2, 270, { align: 'center' });
            doc.setFontSize(7);
            doc.text('Uncontrolled if printed', PAGE_W / 2, 276, { align: 'center' });

            // ════════════════════════════════════════════════
            // PAGE 2: DOCUMENT CONTROL
            // ════════════════════════════════════════════════
            doc.addPage();
            drawSectionHeader(doc, 'Document Control');
            y = 28;

            var dcHeaders = ['Issue', 'Date', 'Description', 'Prepared By', 'Approved By'];
            var dcRows = [];
            for (var dci = 0; dci < rd.documentControl.rows.length; dci++) {
                var dcr = rd.documentControl.rows[dci];
                dcRows.push([dcr.issue, dcr.date, dcr.description, dcr.preparedBy, dcr.approvedBy]);
            }
            y = drawTable(doc, dcHeaders, dcRows, y, 'Document Control');
            addFooter(doc);

            // ════════════════════════════════════════════════
            // PAGE 3: REGULATORY SCOPE
            // ════════════════════════════════════════════════
            doc.addPage();
            drawSectionHeader(doc, 'Regulatory Scope');
            y = 28;

            doc.setFontSize(10);
            doc.setFont(undefined, 'normal');
            doc.setTextColor(TEXT_DARK[0], TEXT_DARK[1], TEXT_DARK[2]);
            var scopeParas = (rd.regulatoryScope.text || '').split('\n');
            for (var si = 0; si < scopeParas.length; si++) {
                var para = scopeParas[si].trim();
                if (!para) { y += 3; continue; }
                var scopeLines = doc.splitTextToSize(para, CONTENT_W);
                y = ensureSpace(doc, y, scopeLines.length * 5 + 2, 'Regulatory Scope');
                doc.text(scopeLines, MARGIN, y);
                y += scopeLines.length * 5 + 4;
            }
            addFooter(doc);

            // ════════════════════════════════════════════════
            // PAGE 4: PROJECT PARTICULARS
            // ════════════════════════════════════════════════
            doc.addPage();
            drawSectionHeader(doc, 'Project Particulars');
            y = 28;

            var ppFields = [
                ['Project Name', rd.projectParticulars.projectName],
                ['Project Reference', rd.projectParticulars.projectRef],
                ['Address', rd.projectParticulars.projectAddress],
                ['Project Type', rd.projectParticulars.projectType],
                ['HRB', rd.projectParticulars.isHRB ? 'Yes' : 'No'],
                ['Building Use', rd.projectParticulars.buildingUse],
                ['Description', rd.projectParticulars.projectDescription],
                ['Height / Storeys', rd.projectParticulars.heightStoreys],
                ['Number of Units', rd.projectParticulars.numberOfUnits]
            ];
            for (var pi = 0; pi < ppFields.length; pi++) {
                y = ensureSpace(doc, y, 8, 'Project Particulars');
                y = drawField(doc, ppFields[pi][0], ppFields[pi][1], MARGIN, y, 45, CONTENT_W - 45);
            }
            addFooter(doc);

            // ════════════════════════════════════════════════
            // PAGE 5: BUILDING CONTROL INFORMATION
            // ════════════════════════════════════════════════
            doc.addPage();
            drawSectionHeader(doc, 'Building Control Information');
            y = 28;

            var bcFields = [
                ['Authority', rd.buildingControlInfo.authority],
                ['Route', rd.buildingControlInfo.route],
                ['Reference', rd.buildingControlInfo.reference],
                ['Approval Type', rd.buildingControlInfo.approvalType],
                ['Approval Date', rd.buildingControlInfo.approvalDate]
            ];
            for (var bi = 0; bi < bcFields.length; bi++) {
                y = ensureSpace(doc, y, 8, 'Building Control Information');
                y = drawField(doc, bcFields[bi][0], bcFields[bi][1], MARGIN, y, 45, CONTENT_W - 45);
            }
            addFooter(doc);

            // ════════════════════════════════════════════════
            // PAGE 6: DUTYHOLDER REGISTER
            // ════════════════════════════════════════════════
            doc.addPage();
            drawSectionHeader(doc, 'Dutyholder Register');
            y = 28;

            var dhHeaders = ['Role', 'Organisation', 'Name', 'Appointment Date'];
            var dhRows = [];
            for (var di = 0; di < rd.dutyholders.length; di++) {
                var dh = rd.dutyholders[di];
                dhRows.push([dh.role, dh.organisation, dh.name, dh.appointmentDate]);
            }
            y = drawTable(doc, dhHeaders, dhRows, y, 'Dutyholder Register', [40, 45, 50, 45]);
            addFooter(doc);

            // ════════════════════════════════════════════════
            // HRB-ONLY SECTIONS (conditional)
            // ════════════════════════════════════════════════
            if (rd.hrbDetermination) {
                doc.addPage();
                drawSectionHeader(doc, 'HRB Determination');
                y = 28;
                var hrbDetFields = [
                    ['Confirmed', rd.hrbDetermination.confirmed ? 'Yes' : 'No'],
                    ['Height', rd.hrbDetermination.height],
                    ['Storeys', rd.hrbDetermination.storeys],
                    ['Residential Units', rd.hrbDetermination.residentialUnits],
                    ['Building Use', rd.hrbDetermination.buildingUse],
                    ['Notes', rd.hrbDetermination.notes]
                ];
                for (var hdi = 0; hdi < hrbDetFields.length; hdi++) {
                    y = ensureSpace(doc, y, 8, 'HRB Determination');
                    y = drawField(doc, hrbDetFields[hdi][0], hrbDetFields[hdi][1], MARGIN, y, 45, CONTENT_W - 45);
                }
                addFooter(doc);
            }

            if (rd.hrbGateway) {
                doc.addPage();
                drawSectionHeader(doc, 'HRB Approval & Gateway Information');
                y = 28;
                var gwFields = [
                    ['BSR Approval Reference', rd.hrbGateway.bsrApprovalReference],
                    ['Gateway 2 Reference', rd.hrbGateway.gateway2Reference],
                    ['Gateway 2 Approval Date', rd.hrbGateway.gateway2ApprovalDate],
                    ['Gateway 3 Reference', rd.hrbGateway.gateway3Reference],
                    ['Gateway 3 Completion Ref', rd.hrbGateway.gateway3CompletionReference],
                    ['Notes', rd.hrbGateway.notes]
                ];
                for (var gwi = 0; gwi < gwFields.length; gwi++) {
                    y = ensureSpace(doc, y, 8, 'HRB Approval & Gateway Information');
                    y = drawField(doc, gwFields[gwi][0], gwFields[gwi][1], MARGIN, y, 55, CONTENT_W - 55);
                }
                addFooter(doc);
            }

            if (rd.goldenThread) {
                doc.addPage();
                drawSectionHeader(doc, 'Golden Thread & Mandatory Occurrence Reporting');
                y = 28;
                var gtFields = [
                    ['Location', rd.goldenThread.location],
                    ['Reference', rd.goldenThread.reference],
                    ['MOR Established', rd.goldenThread.morEstablished ? 'Yes' : 'No'],
                    ['MOR Notes', rd.goldenThread.morNotes],
                    ['Information Management Notes', rd.goldenThread.informationManagementNotes]
                ];
                for (var gti = 0; gti < gtFields.length; gti++) {
                    y = ensureSpace(doc, y, 8, 'Golden Thread & MOR');
                    y = drawField(doc, gtFields[gti][0], gtFields[gti][1], MARGIN, y, 60, CONTENT_W - 60);
                }
                addFooter(doc);
            }

            // ════════════════════════════════════════════════
            // DESIGN COMPLIANCE STRATEGY
            // ════════════════════════════════════════════════
            doc.addPage();
            drawSectionHeader(doc, 'Design Compliance Strategy');
            y = 28;
            y = drawStrategyList(doc, rd.designComplianceStrategy, y, 'Design Compliance Strategy');
            addFooter(doc);

            // ════════════════════════════════════════════════
            // COMPLIANCE SCHEDULE (the big section)
            // ════════════════════════════════════════════════
            for (var csi = 0; csi < rd.complianceSchedule.length; csi++) {
                var docGroup = rd.complianceSchedule[csi];
                var schedTitle = 'Compliance Schedule — ' + cleanStr(docGroup.title);

                doc.addPage();
                drawSectionHeader(doc, schedTitle);
                y = 28;

                // Document header bar
                doc.setFillColor(BRAND_DARK[0], BRAND_DARK[1], BRAND_DARK[2]);
                doc.rect(MARGIN, y, CONTENT_W, 14, 'F');
                doc.setDrawColor(BRAND_ACCENT[0], BRAND_ACCENT[1], BRAND_ACCENT[2]);
                doc.setLineWidth(1);
                doc.line(MARGIN, y + 14, MARGIN + CONTENT_W, y + 14);
                doc.setFontSize(11);
                doc.setFont(undefined, 'bold');
                doc.setTextColor(255, 255, 255);
                doc.text(cleanStr(docGroup.title), MARGIN + 4, y + 7);
                if (docGroup.regulationRef) {
                    doc.setFontSize(8);
                    doc.setFont(undefined, 'normal');
                    doc.text(cleanStr(docGroup.regulationRef), MARGIN + CONTENT_W - 4, y + 7, { align: 'right' });
                }
                if (docGroup.guidanceRef) {
                    doc.setFontSize(7);
                    doc.setFont(undefined, 'italic');
                    doc.text(cleanStr(docGroup.guidanceRef), MARGIN + 4, y + 12);
                }
                y += 18;

                // Each requirement
                for (var rqi = 0; rqi < docGroup.items.length; rqi++) {
                    var req = docGroup.items[rqi];
                    var reqTitle = cleanStr(req.requirement);

                    // Estimate block height
                    doc.setFontSize(9);
                    var reqTitleLines = doc.splitTextToSize(reqTitle, CONTENT_W - 16);
                    var estH = 14 + reqTitleLines.length * 4;
                    // Add space for status + standards + pathway + evidence
                    if (req.localStatus) estH += 6;
                    if (req.localStandards) estH += 6;
                    if (req.localPathway) estH += 6;
                    if (req.localEvidence) estH += 6;
                    // Add space for designer responses
                    estH += req.designerResponses.length * 30;
                    // Add space for review
                    estH += 12;

                    y = ensureSpace(doc, y, Math.min(estH, 80), schedTitle);

                    // Requirement title bar
                    doc.setFillColor(254, 243, 199);
                    doc.rect(MARGIN, y, CONTENT_W, reqTitleLines.length * 4 + 6, 'F');
                    doc.setFillColor(245, 158, 11);
                    doc.rect(MARGIN, y, 3, reqTitleLines.length * 4 + 6, 'F');
                    doc.setFontSize(9);
                    doc.setFont(undefined, 'bold');
                    doc.setTextColor(BRAND_DARK[0], BRAND_DARK[1], BRAND_DARK[2]);
                    doc.text(reqTitleLines, MARGIN + 6, y + 5);
                    y += reqTitleLines.length * 4 + 8;

                    // Local fields (status, standards, pathway, evidence)
                    var localFields = [
                        ['Status', req.localStatus],
                        ['Standards', req.localStandards],
                        ['Pathway', req.localPathway],
                        ['Evidence', req.localEvidence]
                    ];
                    for (var lfi = 0; lfi < localFields.length; lfi++) {
                        if (!localFields[lfi][1]) continue;
                        y = ensureSpace(doc, y, 6, schedTitle);
                        doc.setFontSize(8);
                        doc.setFont(undefined, 'bold');
                        doc.setTextColor(TEXT_MID[0], TEXT_MID[1], TEXT_MID[2]);
                        doc.text(localFields[lfi][0] + ':', MARGIN + 4, y);
                        doc.setFont(undefined, 'normal');
                        doc.setTextColor(TEXT_DARK[0], TEXT_DARK[1], TEXT_DARK[2]);
                        var lfLines = doc.splitTextToSize(cleanStr(localFields[lfi][1]), CONTENT_W - 40);
                        doc.text(lfLines, MARGIN + 30, y);
                        y += Math.max(lfLines.length * 3.5, 5);
                    }

                    // Designer responses
                    for (var dri = 0; dri < req.designerResponses.length; dri++) {
                        var resp = req.designerResponses[dri];
                        y = ensureSpace(doc, y, 25, schedTitle);

                        // Response card
                        doc.setFillColor(248, 250, 252);
                        doc.setDrawColor(BRAND_ACCENT[0], BRAND_ACCENT[1], BRAND_ACCENT[2]);
                        doc.setLineWidth(0.5);

                        var respFields = [
                            ['Designer', resp.designerName || ''],
                            ['Specialism', resp.designerSpecialism || ''],
                            ['Compliance', resp.complianceStatement || ''],
                            ['Standards', resp.standardsReferenced || ''],
                            ['Evidence', resp.evidenceReference || '']
                        ];

                        // Measure card height
                        var cardH = 4;
                        doc.setFontSize(8);
                        for (var rfi = 0; rfi < respFields.length; rfi++) {
                            if (!respFields[rfi][1]) continue;
                            var rfLines = doc.splitTextToSize(cleanStr(respFields[rfi][1]), CONTENT_W - 35);
                            cardH += Math.max(rfLines.length * 3.5, 5);
                        }
                        cardH = Math.max(cardH, 10);

                        y = ensureSpace(doc, y, cardH + 2, schedTitle);

                        doc.rect(MARGIN + 2, y, CONTENT_W - 4, cardH, 'F');
                        doc.setFillColor(BRAND_ACCENT[0], BRAND_ACCENT[1], BRAND_ACCENT[2]);
                        doc.rect(MARGIN + 2, y, 3, cardH, 'F');

                        var ry = y + 4;
                        for (var rfi2 = 0; rfi2 < respFields.length; rfi2++) {
                            if (!respFields[rfi2][1]) continue;
                            doc.setFontSize(7);
                            doc.setFont(undefined, 'bold');
                            doc.setTextColor(TEXT_MID[0], TEXT_MID[1], TEXT_MID[2]);
                            doc.text(respFields[rfi2][0] + ':', MARGIN + 7, ry);
                            doc.setFont(undefined, 'normal');
                            doc.setTextColor(TEXT_DARK[0], TEXT_DARK[1], TEXT_DARK[2]);
                            doc.setFontSize(8);
                            var rfLines2 = doc.splitTextToSize(cleanStr(respFields[rfi2][1]), CONTENT_W - 35);
                            doc.text(rfLines2, MARGIN + 28, ry);
                            ry += Math.max(rfLines2.length * 3.5, 5);
                        }
                        y += cardH + 3;
                    }

                    // PD Review box
                    y = ensureSpace(doc, y, 14, schedTitle);
                    doc.setFillColor(238, 242, 255);
                    doc.setDrawColor(99, 102, 241);
                    doc.setLineWidth(0.5);
                    var reviewText = cleanStr(req.reviewComment);
                    doc.setFontSize(8);
                    var reviewLines = reviewText ? doc.splitTextToSize(reviewText, CONTENT_W - 14) : [];
                    var reviewBoxH = 10 + (reviewLines.length ? reviewLines.length * 3.5 + 2 : 0);
                    doc.rect(MARGIN, y, CONTENT_W, reviewBoxH, 'FD');

                    doc.setFontSize(8);
                    doc.setFont(undefined, 'bold');
                    doc.setTextColor(67, 56, 202);
                    doc.text('PD REVIEW', MARGIN + 4, y + 5);
                    doc.setFont(undefined, 'normal');
                    doc.setFontSize(8);
                    var rsLabel = reviewStatusLabel(req.reviewStatus);
                    doc.text(rsLabel, MARGIN + CONTENT_W - 4, y + 5, { align: 'right' });

                    if (reviewLines.length) {
                        doc.setTextColor(TEXT_DARK[0], TEXT_DARK[1], TEXT_DARK[2]);
                        doc.text(reviewLines, MARGIN + 4, y + 10);
                    }
                    y += reviewBoxH + 4;
                }
            }
            addFooter(doc);

            // ════════════════════════════════════════════════
            // CONSTRUCTION & COMPLIANCE MANAGEMENT
            // ════════════════════════════════════════════════
            doc.addPage();
            drawSectionHeader(doc, 'Construction & Compliance Management');
            y = 28;
            y = drawStrategyList(doc, rd.constructionCompliance, y, 'Construction & Compliance Management');
            addFooter(doc);

            // ════════════════════════════════════════════════
            // INFORMATION MANAGEMENT & HANDOVER
            // ════════════════════════════════════════════════
            doc.addPage();
            drawSectionHeader(doc, 'Information Management & Handover');
            y = 28;
            y = drawStrategyList(doc, rd.informationHandover, y, 'Information Management & Handover');
            addFooter(doc);

            // ════════════════════════════════════════════════
            // PD REVIEW SUMMARY
            // ════════════════════════════════════════════════
            doc.addPage();
            drawSectionHeader(doc, 'PD Review Summary');
            y = 28;

            // Summary stats box
            doc.setFillColor(209, 250, 229);
            doc.setDrawColor(16, 185, 129);
            doc.setLineWidth(1);
            doc.roundedRect(MARGIN, y, CONTENT_W, 30, 3, 3, 'FD');

            var statLabels = ['Total', 'Accepted', 'Reviewed', 'Query Raised', 'Not Reviewed'];
            var statValues = [rd.reviewSummary.total, rd.reviewSummary.accepted, rd.reviewSummary.reviewed, rd.reviewSummary.queryRaised, rd.reviewSummary.notReviewed];
            var statColW = CONTENT_W / statLabels.length;
            for (var sti = 0; sti < statLabels.length; sti++) {
                var sx = MARGIN + sti * statColW + statColW / 2;
                doc.setFontSize(18);
                doc.setFont(undefined, 'bold');
                doc.setTextColor(BRAND_DARK[0], BRAND_DARK[1], BRAND_DARK[2]);
                doc.text(String(statValues[sti]), sx, y + 14, { align: 'center' });
                doc.setFontSize(7);
                doc.setFont(undefined, 'normal');
                doc.setTextColor(TEXT_LIGHT[0], TEXT_LIGHT[1], TEXT_LIGHT[2]);
                doc.text(statLabels[sti].toUpperCase(), sx, y + 22, { align: 'center' });
            }
            y += 36;

            // Review notes table
            if (rd.reviewSummary.notes.length) {
                y = ensureSpace(doc, y, 12, 'PD Review Summary');
                doc.setFontSize(11);
                doc.setFont(undefined, 'bold');
                doc.setTextColor(BRAND_DARK[0], BRAND_DARK[1], BRAND_DARK[2]);
                doc.text('Review Notes', MARGIN, y);
                y += 6;

                var rnHeaders = ['Requirement', 'Status', 'Comment'];
                var rnRows = [];
                for (var rni = 0; rni < rd.reviewSummary.notes.length; rni++) {
                    var rn = rd.reviewSummary.notes[rni];
                    rnRows.push([rn.reqId, rn.status, rn.comment]);
                }
                y = drawTable(doc, rnHeaders, rnRows, y, 'PD Review Summary', [35, 35, CONTENT_W - 70]);
            }
            addFooter(doc);

            // ════════════════════════════════════════════════
            // DECLARATION
            // ════════════════════════════════════════════════
            doc.addPage();
            drawSectionHeader(doc, 'Declaration');
            y = 28;

            // Declaration box
            var declText = cleanStr(rd.declaration.text);
            doc.setFontSize(10);
            var declLines = doc.splitTextToSize(declText, CONTENT_W - 20);
            var declBoxH = declLines.length * 5 + 65;

            doc.setDrawColor(BRAND_DARK[0], BRAND_DARK[1], BRAND_DARK[2]);
            doc.setLineWidth(1);
            doc.roundedRect(MARGIN, y, CONTENT_W, declBoxH, 4, 4);

            // Declaration text
            doc.setFillColor(248, 250, 252);
            doc.rect(MARGIN + 4, y + 6, CONTENT_W - 8, declLines.length * 5 + 8, 'F');
            doc.setFillColor(BRAND_ACCENT[0], BRAND_ACCENT[1], BRAND_ACCENT[2]);
            doc.rect(MARGIN + 4, y + 6, 3, declLines.length * 5 + 8, 'F');
            doc.setFont(undefined, 'italic');
            doc.setFontSize(10);
            doc.setTextColor(TEXT_DARK[0], TEXT_DARK[1], TEXT_DARK[2]);
            doc.text(declLines, MARGIN + 12, y + 14);

            var signY = y + declLines.length * 5 + 22;

            // Signature fields
            var signFields = [
                ['Name', rd.declaration.name],
                ['Organisation', rd.declaration.organisation],
                ['Signature', rd.declaration.signature],
                ['Date', rd.declaration.date]
            ];
            for (var sfi = 0; sfi < signFields.length; sfi++) {
                var sfX = sfi % 2 === 0 ? MARGIN + 8 : MARGIN + CONTENT_W / 2 + 4;
                doc.setFontSize(7);
                doc.setFont(undefined, 'normal');
                doc.setTextColor(TEXT_MID[0], TEXT_MID[1], TEXT_MID[2]);
                doc.text(signFields[sfi][0].toUpperCase(), sfX, signY);
                doc.setFontSize(10);
                doc.setFont(undefined, 'normal');
                doc.setTextColor(TEXT_DARK[0], TEXT_DARK[1], TEXT_DARK[2]);
                doc.text(cleanStr(signFields[sfi][1]), sfX, signY + 6);
                doc.setDrawColor(BRAND_DARK[0], BRAND_DARK[1], BRAND_DARK[2]);
                doc.setLineWidth(0.5);
                doc.line(sfX, signY + 8, sfX + CONTENT_W / 2 - 16, signY + 8);
                if (sfi % 2 === 1) signY += 16;
            }
            addFooter(doc);

            // ════════════════════════════════════════════════
            // PAGE NUMBERING (final pass)
            // ════════════════════════════════════════════════
            var totalPages = doc.internal.getNumberOfPages();
            for (var pn = 1; pn <= totalPages; pn++) {
                doc.setPage(pn);
                doc.setFontSize(7);
                doc.setTextColor(120, 120, 120);
                doc.setFont(undefined, 'normal');
                var pw = doc.internal.pageSize.getWidth();
                var ph = doc.internal.pageSize.getHeight();
                doc.setFillColor(255, 255, 255);
                doc.rect(pw - 35, ph - 8, 30, 8, 'F');
                doc.text('Page ' + pn + ' of ' + totalPages, pw - 5, ph - 3, { align: 'right' });
            }

            // ════════════════════════════════════════════════
            // SAVE
            // ════════════════════════════════════════════════
            doc.save(filename);

            console.log('[PDF] Generated successfully:', filename, '| Pages:', totalPages);
            if (typeof showSuccess === 'function') showSuccess('PDF downloaded: ' + filename);

        } catch (err) {
            console.error('[PDF] Generation failed:', err);
            if (typeof showError === 'function') showError('PDF generation failed: ' + err.message);
        } finally {
            if (btn) btn.disabled = false;
            if (statusEl) { statusEl.textContent = 'Ready'; statusEl.style.color = ''; }
        }
    }
})();
