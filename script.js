// Building Regulations Compliance Tracker
// Main JavaScript File

console.log('Building Regulations Tracker - Starting initialization...');

// ==========================================
// GLOBAL VARIABLES AND DATA
// ==========================================

const approvedDocuments = {
    // ===== SECTION 1: DESIGNER COMPLIANCE =====
    "A": {
        title: "Structure",
        regulationRef: "Schedule 1 Part A",
        guidanceRef: "Approved Document A",
        section: "designer",
        requirements: [
            "A1 Loading: The building shall be constructed so that the combined dead, imposed and wind loads are sustained and transmitted by it to the ground safely",
            "A2 Ground Movement: The building shall be constructed so that ground movement caused by swelling, shrinkage or freezing of the subsoil will not impair the stability of any part of the building",
            "A3 Disproportionate Collapse: The building shall be constructed so that in the event of an accident the building will not suffer collapse to an extent disproportionate to the cause"
        ]
    },
    "B": {
        title: "Fire Safety",
        regulationRef: "Schedule 1 Part B",
        guidanceRef: "Approved Document B",
        section: "designer",
        requirements: [
            "B1 Means of Warning and Escape: The building shall be designed and constructed so that there are appropriate provisions for the early warning of fire and appropriate means of escape in case of fire",
            "B2 Internal Fire Spread (Linings): To inhibit the spread of fire within the building, the internal linings shall adequately resist the spread of flame over their surfaces",
            "B3 Internal Fire Spread (Structure): The building shall be designed and constructed so that, in the event of fire, its stability will be maintained for a reasonable period",
            "B4 External Fire Spread: The external walls of the building shall adequately resist the spread of fire over the walls and from one building to another",
            "B5 Access and Facilities for the Fire Service: The building shall be designed and constructed so as to provide reasonable facilities to assist firefighters in the protection of life"
        ]
    },
    "C": {
        title: "Site Preparation and Resistance to Contaminants and Moisture",
        regulationRef: "Schedule 1 Part C",
        guidanceRef: "Approved Document C",
        section: "designer",
        requirements: [
            "C1 Resistance to Contaminants: The ground to be covered by the building shall be reasonably free from any material that might damage the building or affect its stability",
            "C2 Resistance to Moisture: The walls, floors and roof of the building shall adequately protect the building and people who use the building from harmful effects caused by ground moisture, precipitation and condensation",
            "C3 Subsoil Drainage: Adequate subsoil drainage shall be provided if it is needed to avoid passage of ground moisture to the interior of the building or to avoid damage to the fabric of the building"
        ]
    },
    "D": {
        title: "Toxic Substances",
        regulationRef: "Schedule 1 Part D",
        guidanceRef: "Approved Document D",
        section: "designer",
        requirements: [
            "D1 Cavity Insulation: If insulating material is inserted into a cavity in a cavity wall, reasonable precautions shall be taken to prevent the subsequent permeation of any toxic fumes from that material into any occupied part of the building"
        ]
    },
    "E": {
        title: "Resistance to the Passage of Sound",
        regulationRef: "Schedule 1 Part E",
        guidanceRef: "Approved Document E",
        section: "designer",
        requirements: [
            "E1 Protection Against Sound from Other Parts of the Building: Dwelling-houses, flats and rooms for residential purposes shall be designed and constructed to provide reasonable resistance to sound from other parts of the same building and from adjoining buildings",
            "E2 Protection Against Sound Within a Dwelling-House: Dwelling-houses, flats and rooms for residential purposes shall be designed and constructed so that internal walls and floors provide reasonable resistance to sound",
            "E3 Reverberation in Common Internal Parts of Buildings: The common internal parts of buildings which contain flats or rooms for residential purposes shall be designed and constructed to prevent more reverberation around the common parts than is reasonable",
            "E4 Acoustic Conditions in Schools: Each room or other space in a school building shall be designed and constructed to have the acoustic conditions and the insulation against disturbance by noise appropriate to its intended use"
        ]
    },
    "F": {
        title: "Ventilation",
        regulationRef: "Schedule 1 Part F",
        guidanceRef: "Approved Document F",
        section: "designer",
        requirements: [
            "F1 Means of Ventilation: There shall be adequate means of ventilation provided for people in the building",
            "F2 Condensation in Roofs: Adequate provision shall be made to prevent excessive condensation in a roof or in a roof void above an insulated ceiling"
        ]
    },
    "G": {
        title: "Sanitation, Hot Water Safety and Water Efficiency",
        regulationRef: "Schedule 1 Part G",
        guidanceRef: "Approved Document G",
        section: "designer",
        requirements: [
            "G1 Cold Water Supply: There shall be a suitable installation for the provision of water of appropriate quality to sanitary conveniences fitted with flushing apparatus",
            "G2 Water Efficiency: Reasonable provision shall be made by the installation of fittings and fixed appliances that use water efficiently for the prevention of undue consumption of water",
            "G3 Hot Water Supply and Systems: There shall be a suitable installation for the provision of heated wholesome water or heated softened wholesome water to washbasins, sinks, baths, showers, bidets and fixed appliances",
            "G4 Sanitary Conveniences and Washing Facilities: Adequate sanitary conveniences shall be provided in rooms provided for that purpose, or in bathrooms, and adequate washing facilities shall be provided in or adjacent to rooms containing water closets",
            "G5 Bathrooms: A bathroom shall be provided containing either a fixed bath or shower, and there shall be a suitable installation for the provision of hot and cold water to the bath or shower",
            "G6 Food Preparation Areas: A suitable sink shall be provided in any area where food is prepared"
        ]
    },
    "H": {
        title: "Drainage and Waste Disposal",
        regulationRef: "Schedule 1 Part H",
        guidanceRef: "Approved Document H",
        section: "designer",
        requirements: [
            "H1 Foul Water Drainage: An adequate system of drainage shall be provided to carry foul water from appliances within the building to one of the following — a public sewer, a private sewer communicating with a public sewer, or a septic tank or other treatment system",
            "H2 Wastewater Treatment Systems and Cesspools: Any septic tank, holding tank which is part of a wastewater treatment system or cesspool, and any drain or sewer, shall be designed and constructed in such a way as not to be prejudicial to health or a nuisance",
            "H3 Rainwater Drainage: Adequate provision shall be made for rainwater to be carried from the roof of the building",
            "H4 Building Over Sewers: The erection or extension of a building or work involving the underpinning of a building shall be carried out in a manner which is not detrimental to the building or building extension or to the continued maintenance of the drain, sewer or disposal main",
            "H5 Separate Systems of Drainage: Any system for carrying rainwater from the roof of the building to a sewer shall be separate from that provided for the conveyance of foul water from the building",
            "H6 Solid Waste Storage: Adequate provision shall be made for storage of solid waste and adequate means of access shall be provided for people in the building to the place of storage and from the place of storage to a collection point"
        ]
    },
    "J": {
        title: "Combustion Appliances and Fuel Storage Systems",
        regulationRef: "Schedule 1 Part J",
        guidanceRef: "Approved Document J",
        section: "designer",
        requirements: [
            "J1 Air Supply: Combustion appliances shall be so installed that there is an adequate supply of air to them for proper combustion",
            "J2 Discharge of Combustion Products: Combustion appliances shall have adequate provision for the discharge of products of combustion to the outside air",
            "J3 Protection of Building: Combustion appliances and flue pipes shall be so installed, and fireplaces and chimneys shall be so constructed and installed, as to reduce to a reasonable level the risk of people suffering burns or the building catching fire",
            "J4 Provision of Information: Where a hearth, fireplace, flue or chimney is provided or extended, a durable notice containing information on the performance capabilities of that hearth, fireplace, flue or chimney shall be affixed in a suitable place in the building",
            "J5 Protection of Liquid Fuel Storage Systems: Liquid fuel storage systems and the pipes connecting them to combustion appliances shall be so constructed and separated from buildings and the boundary of the premises as to reduce to a reasonable level the risk of the fuel igniting in the event of fire",
            "J6 Protection of Solid Fuel Storage Systems: Solid fuel storage systems shall be so constructed and separated from buildings and the boundary of the premises as to reduce to a reasonable level the risk of fire and combustion product emissions",
            "J7 Protection of Gas Fuel Storage Systems: Gas fuel storage systems and the pipes connecting them to combustion appliances shall be so constructed and protected as to reduce to a reasonable level the risk of fire, explosion or gas escape"
        ]
    },
    "K": {
        title: "Protection from Falling, Collision and Impact",
        regulationRef: "Schedule 1 Part K",
        guidanceRef: "Approved Document K",
        section: "designer",
        requirements: [
            "K1 Stairs, Ladders and Ramps: Stairs, ladders and ramps shall be so designed, constructed and installed as to be safe for people moving between different levels in or about the building",
            "K2 Protection from Falling: Any stairs, ramps, floors and balconies and any roof to which people have access, and any light well, basement area or similar sunken area connected to a building, shall be provided with barriers where necessary to protect people in or about the building from falling",
            "K3 Vehicle Barriers and Loading Bays: Vehicle ramps and any levels in a building to which vehicles have access shall be provided with barriers where it is necessary to protect people in or about the building",
            "K4 Protection Against Impact with Glazing: Glazing with which people are likely to come into contact whilst moving in or about the building shall, if broken on impact, break in a way which is unlikely to cause injury, or resist impact without breaking, or be shielded or protected from impact",
            "K5 Protection from Collision with Open Windows: Provision shall be made to prevent people moving in or about the building from colliding with open windows, skylights or ventilators",
            "K6 Protection Against Impact and Trapping by Doors: Provision shall be made to prevent people moving in or about the building from being struck or trapped by doors, gates and other barriers that slide or open upwards"
        ]
    },
    "L": {
        title: "Conservation of Fuel and Power",
        regulationRef: "Schedule 1 Part L",
        guidanceRef: "Approved Document L",
        section: "designer",
        requirements: [
            "L1 Conservation of Fuel and Power in Dwellings: Reasonable provision shall be made for the conservation of fuel and power in dwellings by limiting heat gains and losses through thermal elements and by providing energy efficient fixed building services",
            "L2 Conservation of Fuel and Power in Buildings Other Than Dwellings: Reasonable provision shall be made for the conservation of fuel and power in buildings other than dwellings by limiting heat gains and losses through thermal elements and by providing energy efficient fixed building services"
        ]
    },
    "M": {
        title: "Access to and Use of Buildings",
        regulationRef: "Schedule 1 Part M",
        guidanceRef: "Approved Document M",
        section: "designer",
        requirements: [
            "M1 Access to and Use of Buildings: Reasonable provision shall be made for people to gain access to and use the building and its facilities",
            "M2 Access to Extensions: Suitable independent access shall be provided to the extension where reasonably practicable",
            "M3 Sanitary Conveniences: If sanitary conveniences are provided in any building that is to be extended, reasonable provision shall be made within the extension for sanitary conveniences",
            "M4 Accessible and Adaptable Dwellings: Reasonable provision shall be made for dwellings to be accessible and adaptable in accordance with the requirements for Category 1, 2 or 3 dwellings as applicable"
        ]
    },
    "O": {
        title: "Overheating",
        regulationRef: "Schedule 1 Part O",
        guidanceRef: "Approved Document O",
        section: "designer",
        requirements: [
            "O1 Overheating Mitigation: Reasonable provision shall be made in respect of a dwelling, institution or any other building containing one or more rooms for residential purposes to limit unwanted solar gains in summer and provide an adequate means to remove heat from the indoor environment"
        ]
    },
    "P": {
        title: "Electrical Safety",
        regulationRef: "Schedule 1 Part P",
        guidanceRef: "Approved Document P",
        section: "designer",
        requirements: [
            "P1 Electrical Safety: Reasonable provision shall be made in the design and installation of electrical installations in order to protect persons operating, maintaining or altering the installations from fire or injury"
        ]
    },
    "Q": {
        title: "Security",
        regulationRef: "Schedule 1 Part Q",
        guidanceRef: "Approved Document Q",
        section: "designer",
        requirements: [
            "Q1 Security of Dwellings: Reasonable provision shall be made to resist unauthorised access to any dwelling and any part of a building from which access can be gained to a flat within the building"
        ]
    },
    "R": {
        title: "Infrastructure for Electronic Communications",
        regulationRef: "Schedule 1 Part R",
        guidanceRef: "Approved Document R",
        section: "designer",
        requirements: [
            "R1 Gigabit-ready Physical Infrastructure: Building work shall be carried out so as to ensure that the building is equipped with a high-speed-ready in-building physical infrastructure, up to a network termination point for high-speed electronic communications networks",
            "R2 Connection to Gigabit-capable Network: Building work shall be carried out so as to ensure that the building is connected to a gigabit-capable public electronic communications network where available"
        ]
    },
    "S": {
        title: "Infrastructure for the Charging of Electric Vehicles",
        regulationRef: "Schedule 1 Part S",
        guidanceRef: "Approved Document S",
        section: "designer",
        requirements: [
            "S1 Electric Vehicle Charge Points: Where a building is erected, there shall be provision for one or more electric vehicle charge points in accordance with the requirements",
            "S2 Electric Vehicle Cable Routes: Where a building has associated parking, cable routes for electric vehicle charge points shall be installed from the electrical distribution board to the parking spaces",
            "S3 Electric Vehicle Infrastructure in Existing Buildings: Where a building undergoes a major renovation, appropriate infrastructure for the charging of electric vehicles shall be installed in accordance with the requirements"
        ]
    },
    "T": {
        title: "Toilet Accommodation",
        regulationRef: "Schedule 1 Part T",
        guidanceRef: "Approved Document T",
        section: "designer",
        requirements: [
            "T1 Toilet Accommodation: Adequate and suitable toilet accommodation shall be provided in a building that is not a dwelling, for persons who occupy or are likely to be present in or near the building"
        ]
    },
    "7": {
        title: "Materials and Workmanship",
        regulationRef: "Regulation 7",
        guidanceRef: "Approved Document 7",
        section: "designer",
        requirements: [
            "7.1 Materials: Building work shall be carried out with adequate and proper materials which are appropriate for the circumstances in which they are used, are adequately mixed or prepared, and are applied, used or fixed so as adequately to perform the functions for which they are designed",
            "7.2 Workmanship: Building work shall be carried out in a workmanlike manner"
        ]
    },
    "38": {
        title: "Fire Safety Information",
        regulationRef: "Regulation 38",
        guidanceRef: null,
        section: "designer",
        requirements: [
            "38.1 Fire Safety Information: Where building work involves the erection or extension of a building, the person carrying out the work shall give fire safety information to the responsible person not later than the date of completion of the work, or the date of occupation of the building or extension, whichever is the earlier",
            "38.2 Content of Fire Safety Information: The fire safety information shall be information about the design and construction of the building or extension, and the services, fittings and equipment provided in or in connection with the building or extension, which will assist the responsible person to operate and maintain the building or extension with reasonable safety"
        ]
    },
    "16": {
        title: "Fire Safety Information (Design Coordination)",
        regulationRef: "Regulation 16",
        guidanceRef: null,
        section: "brpd",
        requirements: [
            "16.1 Fire Safety Design Coordination: The principal designer shall coordinate fire safety design information and ensure that all relevant fire safety matters are addressed and documented throughout the design process",
            "16.2 Building Control Submission Information: Adequate information shall be prepared and provided for building control submissions to demonstrate that the design complies with the fire safety requirements of the Building Regulations"
        ]
    },
    // ===== SECTION 2: BR-PD COMPLIANCE =====
    "11": {
        title: "Dutyholders and Competence",
        regulationRef: "Regulation 11",
        guidanceRef: null,
        section: "brpd",
        requirements: [
            "11.1 Client Identified: The client for the building work has been identified and their duties under the Building Regulations have been confirmed",
            "11.2 BR Principal Designer Appointed: A Building Regulations Principal Designer has been appointed in writing for the project",
            "11.3 BR Principal Contractor Appointed: A Building Regulations Principal Contractor has been appointed in writing for the project",
            "11.4 Dutyholder Roles Recorded: All dutyholder roles and responsibilities under the Building Regulations have been recorded and communicated",
            "11.5 Written Appointments Obtained: Written appointments have been obtained for all dutyholders confirming their acceptance of duties",
            "11.6 Competence of Designers Considered: The competence of all designers involved in the project has been assessed and confirmed as appropriate for the work",
            "11.7 Competence of Contractors Considered: The competence of all contractors involved in the project has been assessed and confirmed as appropriate for the building work"
        ]
    },
    "12": {
        title: "Building Control Approval",
        regulationRef: "Regulation 12",
        guidanceRef: null,
        section: "brpd",
        requirements: [
            "12.1 Building Control Route Identified: The appropriate building control route (Local Authority or Approved Inspector) has been identified and confirmed",
            "12.2 Building Control Application Prepared: The building control application and all required supporting documents have been prepared",
            "12.3 Application Submitted: The building control application has been submitted to the relevant building control body",
            "12.4 Approval Received: Building control approval or initial notice acceptance has been received and conditions noted"
        ]
    },
    "14": {
        title: "Commencement of Work",
        regulationRef: "Regulation 14",
        guidanceRef: null,
        section: "brpd",
        requirements: [
            "14.1 Commencement Notice Requirements Identified: The requirements for commencement notice under the Building Regulations have been identified and documented",
            "14.2 Commencement Notification Submitted: The commencement notice has been submitted to the relevant building control body within the required timescale"
        ]
    },
    "PCP": {
        title: "Project Compliance Planning",
        regulationRef: "Project Compliance Planning",
        guidanceRef: null,
        section: "brpd",
        requirements: [
            "PCP.1 Applicable Building Regulations Identified: All applicable Building Regulations for the project have been identified and documented",
            "PCP.2 Applicable Schedule 1 Parts Identified: All applicable Schedule 1 functional requirements for the project have been identified",
            "PCP.3 Design Compliance Strategy Established: A design compliance strategy has been established to address all applicable Building Regulation requirements",
            "PCP.4 Design Coordination Process Established: A design coordination process has been established to manage designer inputs and ensure coordinated compliance"
        ]
    },
    "IMH": {
        title: "Information Management and Handover",
        regulationRef: "Information Management",
        guidanceRef: null,
        section: "brpd",
        requirements: [
            "IMH.1 Fire Safety Information Coordinated: Fire safety information from all designers has been coordinated and consolidated into a single fire safety strategy",
            "IMH.2 Regulation 38 Information Prepared: Regulation 38 fire safety information has been prepared for handover to the responsible person",
            "IMH.3 Compliance Evidence Collated: All compliance evidence and documentation has been collated and organised for the project record",
            "IMH.4 Final Compliance Documentation Prepared: Final compliance documentation has been prepared for handover and archiving"
        ]
    },
    "CFC": {
        title: "Completion and Final Compliance",
        regulationRef: "Completion Compliance",
        guidanceRef: null,
        section: "brpd",
        requirements: [
            "CFC.1 Final Compliance Review Undertaken: A final compliance review has been undertaken to confirm all Building Regulation requirements have been addressed",
            "CFC.2 PD Declaration Prepared: The Principal Designer declaration of compliance has been prepared and is ready for submission",
            "CFC.3 Completion Information Issued: All required completion information has been issued to the building control body and the client",
            "CFC.4 Project Record Archived: The project compliance record has been archived in accordance with the required retention period"
        ]
    },
    "HRB": {
        title: "HRB Additional Requirements",
        regulationRef: "Building Safety Act 2022",
        guidanceRef: null,
        section: "brpd",
        hrbOnly: true,
        requirements: [
            "HRB.1 Gateway Approval Strategy: A gateway approval strategy has been developed and documented for the higher-risk building project, including preparation for Gateway 2 and Gateway 3 submissions",
            "HRB.2 Design Compliance Strategy: A design compliance strategy specific to higher-risk building requirements has been established, addressing all additional fire safety and structural safety requirements",
            "HRB.3 Construction Control Plan: A construction control plan has been developed to ensure that the as-built construction meets the approved design and complies with all applicable regulations",
            "HRB.4 Mandatory Occurrence Reporting: Mandatory occurrence reporting procedures have been established to report safety occurrences during design and construction to the Building Safety Regulator",
            "HRB.5 Golden Thread Information: The golden thread of building information has been established and maintained throughout the project, ensuring all prescribed information is recorded and stored digitally"
        ]
    }
};

const approvedDocsOrder = [
    // Section 1: Designer Compliance
    "A", "B", "C", "D", "E", "F", "G", "H", "J", "K", "L", "M", "O", "P", "Q", "R", "S", "T", "7", "38",
    // Section 2: BR-PD Compliance
    "11", "12", "14", "16", "PCP", "IMH", "CFC", "HRB"
];

let complianceData = {};
let mergedResponses = {};
let pdReviews = {};
let reviewInitialised = false;
let pdbrInitialised = false;
let pdbrState = {}; // { id: { status, notes } }

// ==========================================
// UTILITY FUNCTIONS
// ==========================================

function getIsHRB() {
    try {
        var pd = JSON.parse(localStorage.getItem('pdbrProjectData') || '{}');
        return pd.isHRB || false;
    } catch(e) { return false; }
}

function showError(message) {
    console.error('Error:', message);
    const errorDiv = document.getElementById('errorMessage');
    if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }
}

function showSuccess(message) {
    console.log('Success:', message);
    const successDiv = document.getElementById('successMessage');
    if (successDiv) {
        successDiv.textContent = message;
        successDiv.style.display = 'block';
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 3000);
    }
}

function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    return input.replace(/[<>]/g, '').trim();
}

// Auto-resize textarea function
function autoResizeTextarea(textarea) {
    if (!textarea) return;
    
    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto';
    
    // Set height based on scroll height, with minimum height
    const minHeight = 60; // Minimum height in pixels
    const newHeight = Math.max(minHeight, textarea.scrollHeight);
    
    textarea.style.height = newHeight + 'px';
}

// Setup auto-resize for a textarea
function setupTextareaAutoResize(textarea) {
    if (!textarea) return;
    
    // Auto-resize on input
    textarea.addEventListener('input', function() {
        autoResizeTextarea(this);
    });
    
    // Auto-resize on paste
    textarea.addEventListener('paste', function() {
        // Use setTimeout to allow paste content to be processed
        setTimeout(() => {
            autoResizeTextarea(this);
        }, 10);
    });
    
    // Auto-resize on focus (in case content was set programmatically)
    textarea.addEventListener('focus', function() {
        autoResizeTextarea(this);
    });
    
    // Initial resize
    autoResizeTextarea(textarea);
}

// Setup auto-resize for all comment textareas
function setupAllTextareasAutoResize() {
    const textareas = document.querySelectorAll('textarea[id^="comments"]');
    textareas.forEach(textarea => {
        setupTextareaAutoResize(textarea);
    });
}

// ==========================================
// MAIN APPLICATION FUNCTIONS
// ==========================================

function init() {
    try {
        console.log('Initializing application...');
        generateApprovedDocsHTML();
        loadData();
        updateSummary();
        console.log('Application initialized successfully');
    } catch (error) {
        showError('Failed to initialize application: ' + error.message);
        console.error('Initialization error:', error);
    }
}



function generateApprovedDocsHTML() {
    try {
        console.log('Generating HTML for approved documents...');
        let html = '';
        let currentSection = '';

        // Check HRB status from PDBR project data
        var pdbrProjStr = localStorage.getItem('pdbrProjectData');
        var isHRB = false;
        if (pdbrProjStr) {
            try { isHRB = JSON.parse(pdbrProjStr).isHRB || false; } catch(e) {}
        }

        for (var idx = 0; idx < approvedDocsOrder.length; idx++) {
            var docKey = approvedDocsOrder[idx];
            var doc = approvedDocuments[docKey];
            if (!doc) continue;

            // Skip HRB-only documents when not HRB
            if (doc.hrbOnly && !isHRB) continue;

            // Section headers
            if (doc.section !== currentSection) {
                currentSection = doc.section;
                if (currentSection === 'designer') {
                    html += `<div class="compliance-section-header designer-section-header">`;
                    html += `<h2>Designer Compliance Section</h2>`;
                    html += `<p>Technical design compliance with Building Regulations \u2014 completed by designers</p>`;
                    html += `</div>`;
                } else if (currentSection === 'brpd') {
                    html += `<div class="compliance-section-header brpd-section-header">`;
                    html += `<h2>BR-PD Compliance Section</h2>`;
                    html += `<p>Procedural compliance \u2014 completed by the Building Regulations Principal Designer</p>`;
                    html += `</div>`;
                }
            }

            html += `<div class="approved-doc">`;
            html += `<div class="doc-header" onclick="toggleDoc('${docKey}')">`;
            html += `<span class="doc-header-primary">${doc.regulationRef} \u2013 ${doc.title}</span>`;
            if (doc.guidanceRef) html += `<span class="doc-header-guidance">Guidance: ${doc.guidanceRef}</span>`;
            html += `</div>`;
            html += `<div class="doc-content" id="doc-${docKey}">`;
            
            doc.requirements.forEach((requirement, i) => {
                const reqId = `${docKey}-${i}`;
                html += generateRequirementHTML(reqId, requirement);
            });
            
            html += `</div></div>`;
        }
        
        document.getElementById('approvedDocs').innerHTML = html;
        
        // Setup auto-resize for all textareas after DOM is updated
        setupAllTextareasAutoResize();
        
        console.log('HTML generation completed');
    } catch (error) {
        showError('Failed to generate HTML: ' + error.message);
        console.error('HTML generation error:', error);
    }
}

function generateRequirementHTML(reqId, requirement) {
    return `
        <div class="requirement" id="req-${reqId}">
            <div class="requirement-text">${requirement}</div>
            <div class="compliance-area">
                <select class="compliance-select" id="status-${reqId}" onchange="updateCompliance('${reqId}')">
                    <option value="">Select Status</option>
                    <option value="compliant">Compliant</option>
                    <option value="not-compliant">Not Compliant</option>
                    <option value="not-applicable">Not Applicable</option>
                </select>
                
                <div class="comment-section">
                    <div class="comment-title">Standards Used:</div>
                    <textarea class="compliance-text auto-resize" id="comments-${reqId}" 
                            placeholder="List the relevant standards, codes, and regulations used to address this requirement..." 
                            onchange="updateCompliance('${reqId}')" maxlength="2000"></textarea>
                </div>
                
                <div class="comment-section">
                    <div class="comment-title">Compliance Pathway:</div>
                    <textarea class="compliance-text auto-resize" id="comments2-${reqId}" 
                            placeholder="Describe the method or approach taken to achieve compliance with this requirement..." 
                            onchange="updateCompliance('${reqId}')" maxlength="2000"></textarea>
                </div>
                
                <div class="comment-section">
                    <div class="comment-title">Compliance Evidence:</div>
                    <textarea class="compliance-text auto-resize" id="comments3-${reqId}" 
                            placeholder="Reference drawings, calculations, specifications, test results, or other evidence demonstrating compliance..." 
                            onchange="updateCompliance('${reqId}')" maxlength="2000"></textarea>
                </div>
            </div>
        </div>`;
}

function toggleDoc(docKey) {
    try {
        const content = document.getElementById(`doc-${docKey}`);
        if (content) {
            content.classList.toggle('open');
        }
    } catch (error) {
        console.error('Error toggling document:', error);
    }
}

function updateCompliance(reqId) {
    try {
        const statusElement = document.getElementById(`status-${reqId}`);
        const commentsElement = document.getElementById(`comments-${reqId}`);
        const comments2Element = document.getElementById(`comments2-${reqId}`);
        const comments3Element = document.getElementById(`comments3-${reqId}`);
        const requirementElement = document.getElementById(`req-${reqId}`);
        
        if (!statusElement || !commentsElement || !requirementElement) {
            console.error(`Required elements not found for ${reqId}`);
            return;
        }
        
        const status = statusElement.value;
        const comments = sanitizeInput(commentsElement.value);
        const comments2 = sanitizeInput(comments2Element ? comments2Element.value : '');
        const comments3 = sanitizeInput(comments3Element ? comments3Element.value : '');
        
        // Update visual styling
        requirementElement.className = 'requirement';
        if (status) {
            requirementElement.classList.add(status);
        }
        
        // Save data
        complianceData[reqId] = {
            status: status,
            comments: comments,
            comments2: comments2,
            comments3: comments3
        };
        
        saveData();
        updateSummary();
    } catch (error) {
        console.error('Error updating compliance:', error);
    }
}

function updateSummary() {
    try {
        let total = 0;
        let compliant = 0;
        let notCompliant = 0;
        let notApplicable = 0;
        var isHRB = getIsHRB();
        
        for (var idx = 0; idx < approvedDocsOrder.length; idx++) {
            var docKey = approvedDocsOrder[idx];
            var doc = approvedDocuments[docKey];
            if (!doc) continue;
            if (doc.hrbOnly && !isHRB) continue;
            doc.requirements.forEach((_, i) => {
                const reqId = `${docKey}-${i}`;
                total++;
                
                if (complianceData[reqId] && complianceData[reqId].status) {
                    const status = complianceData[reqId].status;
                    if (status === 'compliant') compliant++;
                    else if (status === 'not-compliant') notCompliant++;
                    else if (status === 'not-applicable') notApplicable++;
                }
            });
        }
        
        const completed = compliant + notCompliant + notApplicable;
        const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        const summaryElement = document.getElementById('summaryText');
        if (summaryElement) {
            summaryElement.innerHTML = 
                `Progress: ${completed}/${total} (${percentage}%) | ` +
                `Compliant: ${compliant} | Not Compliant: ${notCompliant} | Not Applicable: ${notApplicable}`;
        }
    } catch (error) {
        console.error('Error updating summary:', error);
    }
}

// ==========================================
// PROJECT MANAGEMENT FUNCTIONS
// ==========================================

function saveProject() {
    try {
        const projectName = sanitizeInput(document.getElementById('projectName').value);
        const projectRef = sanitizeInput(document.getElementById('projectRef').value);
        const designerName = sanitizeInput(document.getElementById('designerName').value);
        const specSel = document.getElementById('designerSpecialism');
        const specOther = document.getElementById('designerSpecialismOther');
        const designerSpecialism = specSel.value === 'Other' ? sanitizeInput(specOther.value) : specSel.value;
        
        const projectData = {
            name: projectName,
            ref: projectRef,
            designer: designerName,
            designerSpecialism: designerSpecialism,
            lastSaved: new Date().toISOString()
        };
        
        localStorage.setItem('projectData', JSON.stringify(projectData));
        showSuccess('Project details saved successfully!');
    } catch (error) {
        showError('Error saving project: ' + error.message);
    }
}

function saveData() {
    try {
        localStorage.setItem('complianceData', JSON.stringify(complianceData));
    } catch (error) {
        console.error('Error saving data:', error);
        if (error.name === 'QuotaExceededError') {
            showError('Storage quota exceeded. Please export your data.');
        }
    }
}

function loadData() {
    try {
        // Load project data
        const projectDataStr = localStorage.getItem('projectData');
        if (projectDataStr) {
            const projectData = JSON.parse(projectDataStr);
            const projectNameEl = document.getElementById('projectName');
            const projectRefEl = document.getElementById('projectRef');
            const designerNameEl = document.getElementById('designerName');
            
            if (projectNameEl) projectNameEl.value = projectData.name || '';
            if (projectRefEl) projectRefEl.value = projectData.ref || '';
            if (designerNameEl) designerNameEl.value = projectData.designer || '';
            if (projectData.designerSpecialism) {
                var specSel = document.getElementById('designerSpecialism');
                var specOther = document.getElementById('designerSpecialismOther');
                var stdSpecs = ['Architect','Structural Engineer','Civil Engineer','Fire Engineer','Building Services Engineer','MEP Engineer','Facade Designer','Acoustic Consultant','Sustainability Consultant','Specialist Designer'];
                if (stdSpecs.indexOf(projectData.designerSpecialism) !== -1) {
                    specSel.value = projectData.designerSpecialism;
                    specOther.style.display = 'none';
                } else if (projectData.designerSpecialism) {
                    specSel.value = 'Other';
                    specOther.value = projectData.designerSpecialism;
                    specOther.style.display = 'inline-block';
                }
            }
        }

        try {
            var savedMerged = localStorage.getItem('mergedResponses');
            if (savedMerged) mergedResponses = JSON.parse(savedMerged);
            var savedReviews = localStorage.getItem('pdReviews');
            if (savedReviews) pdReviews = JSON.parse(savedReviews);
        } catch(e) { console.error('Error loading merged/review data:', e); }

        // Load compliance data
        const savedDataStr = localStorage.getItem('complianceData');
        if (savedDataStr) {
            complianceData = JSON.parse(savedDataStr);
            
            // Restore form states
            for (const [reqId, data] of Object.entries(complianceData)) {
                const statusSelect = document.getElementById(`status-${reqId}`);
                const commentsTextarea = document.getElementById(`comments-${reqId}`);
                const comments2Textarea = document.getElementById(`comments2-${reqId}`);
                const comments3Textarea = document.getElementById(`comments3-${reqId}`);
                const requirement = document.getElementById(`req-${reqId}`);
                
                if (statusSelect) statusSelect.value = data.status || '';
                if (commentsTextarea) {
                    commentsTextarea.value = data.comments || '';
                    // Auto-resize after setting content
                    autoResizeTextarea(commentsTextarea);
                }
                if (comments2Textarea) {
                    comments2Textarea.value = data.comments2 || '';
                    // Auto-resize after setting content
                    autoResizeTextarea(comments2Textarea);
                }
                if (comments3Textarea) {
                    comments3Textarea.value = data.comments3 || '';
                    // Auto-resize after setting content
                    autoResizeTextarea(comments3Textarea);
                }
                if (requirement && data.status) {
                    requirement.className = 'requirement ' + data.status;
                }
            }
        }
    } catch (error) {
        showError('Error loading data: ' + error.message);
        console.error('Load data error:', error);
    }
}

function clearAllData() {
    if (confirm('Are you sure you want to clear all project data and compliance information? This action cannot be undone.')) {
        try {
            localStorage.removeItem('projectData');
            localStorage.removeItem('complianceData');
            localStorage.removeItem('mergedResponses');
            localStorage.removeItem('pdReviews');
            localStorage.removeItem('pdbrState');
            localStorage.removeItem('pdbrProjectData');
            localStorage.removeItem('pdDeclarationData');
            
            complianceData = {};
            mergedResponses = {};
            pdReviews = {};
            pdbrState = {};
            reviewInitialised = false;
            pdbrInitialised = false;
            
            document.getElementById('projectName').value = '';
            document.getElementById('projectRef').value = '';
            document.getElementById('designerName').value = '';
            document.getElementById('designerSpecialism').value = '';
            document.getElementById('designerSpecialismOther').value = '';
            document.getElementById('designerSpecialismOther').style.display = 'none';
            
            loadData();
            updateSummary();
            
            showSuccess('All data cleared successfully!');
        } catch (error) {
            showError('Error clearing data: ' + error.message);
        }
    }
}

// ==========================================
// EVENT LISTENERS AND INITIALIZATION
// ==========================================

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing...');
    init();
});

// Global error handlers
window.addEventListener('error', function(event) {
    console.error('JavaScript error:', event.error);
    console.error('Error details:', {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno
    });
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
});

// ==========================================
// TAB NAVIGATION
// ==========================================

function switchTab(tabId) {
    // Deactivate all tabs and panels
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(panel => panel.classList.remove('active'));
    // Activate selected
    document.getElementById('tab-' + tabId).classList.add('active');
    document.getElementById('panel-' + tabId).classList.add('active');
    // If switching to PD BR Compliance Tracker tab, render once
    if (tabId === 'pdbrtracker' && !pdbrInitialised) {
        initPDBRTracker();
    }
    // If switching to designer submissions tab, always refresh
    if (tabId === 'submissions') {
        renderSubmissionsTab();
    }
    // If switching to review tab, always refresh
    if (tabId === 'review') {
        initReviewTab();
    }
}

// ==========================================
// PD BR COMPLIANCE TRACKER — DATA & LOGIC
// ==========================================

const pdbrGroups = [
    { id: 1, name: "Dutyholders, Appointments and Competence" },
    { id: 2, name: "Project Planning and Design Management" },
    { id: 3, name: "Building Control and Statutory Procedures" },
    { id: 4, name: "Regulation 7 and General Compliance Controls" },
    { id: 5, name: "Information, Handover and Final Compliance Actions" },
    { id: 6, name: "HRB Additional Requirements" }
];

const pdbrData = [
    // ===== GROUP 1: DUTYHOLDERS, APPOINTMENTS AND COMPETENCE =====
    {id:"PDBR-001",title:"Principal Designer written appointment confirmed",description:"Ensure the client has formally appointed a competent Building Regulations Principal Designer in writing before design work begins.",group:1,hrbOnly:false,regulationRef:"Building Regulations 2010 Reg 11A/11D",guidanceRef:""},
    {id:"PDBR-002",title:"Principal Contractor written appointment confirmed",description:"Verify the client has appointed a competent Principal Contractor in writing before the construction phase begins.",group:1,hrbOnly:false,regulationRef:"Building Regulations 2010 Reg 11B",guidanceRef:""},
    {id:"PDBR-003",title:"Client duties acknowledged and briefed",description:"Ensure the client is aware of and acknowledges their duties under the Building Regulations dutyholder regime including cooperation and information provision.",group:1,hrbOnly:false,regulationRef:"Building Regulations 2010 Reg 11",guidanceRef:""},
    {id:"PDBR-004",title:"PD competence verified for project type",description:"Confirm the Principal Designer has the skills, knowledge, experience, and behaviours appropriate for the project type and complexity.",group:1,hrbOnly:false,regulationRef:"Building Regulations 2010 Reg 11A(3)",guidanceRef:""},
    {id:"PDBR-005",title:"PC competence verified for construction work",description:"Verify the appointed Principal Contractor's competence for the proposed construction work.",group:1,hrbOnly:false,regulationRef:"Building Regulations 2010 Reg 11B(3)",guidanceRef:""},
    {id:"PDBR-006",title:"All designer competence assessed and recorded",description:"Assess and record competence of every designer involved in the project including skills, knowledge, experience, and organisational capability.",group:1,hrbOnly:false,regulationRef:"Building Regulations 2010 Reg 11F",guidanceRef:""},
    {id:"PDBR-007",title:"All contractor competence assessed and recorded",description:"Ensure all contractors and sub-contractors are competent for the building work they will undertake.",group:1,hrbOnly:false,regulationRef:"Building Regulations 2010 Reg 11G",guidanceRef:""},
    {id:"PDBR-008",title:"Dutyholder register established and maintained",description:"Create and maintain a register of all dutyholders, their roles, responsibilities, and contact details on the project.",group:1,hrbOnly:false,regulationRef:"Building Regulations 2010 Part 2A",guidanceRef:""},
    {id:"PDBR-009",title:"Building control notified of dutyholder appointments",description:"Submit dutyholder notification to the relevant building control body before work begins.",group:1,hrbOnly:false,regulationRef:"Building Regulations 2010 Reg 12",guidanceRef:""},
    {id:"PDBR-010",title:"PD scope of services agreed with client",description:"Define and agree the scope of PD services, responsibilities, authority, and limitations with the client.",group:1,hrbOnly:false,regulationRef:"Building Regulations 2010 Part 2A",guidanceRef:""},
    {id:"PDBR-011",title:"Dutyholder changes notified to building control",description:"Any changes to dutyholder appointments have been notified to the relevant building control body.",group:1,hrbOnly:false,regulationRef:"Building Regulations 2010 Part 2A",guidanceRef:""},
    {id:"PDBR-012",title:"PD compliance declaration signed at completion",description:"Prepare and sign the PD declaration confirming design compliance with all applicable building regulations.",group:1,hrbOnly:false,regulationRef:"Building Regulations 2010 Reg 11F",guidanceRef:""},
    {id:"PDBR-013",title:"PC compliance declaration obtained at completion",description:"Verify the PC has produced and signed their compliance declaration confirming construction compliance.",group:1,hrbOnly:false,regulationRef:"Building Regulations 2010 Reg 11G",guidanceRef:""},
    {id:"PDBR-014",title:"Client compliance declaration obtained at completion",description:"Verify the client has produced their declaration confirming fulfilment of client duties.",group:1,hrbOnly:false,regulationRef:"Building Regulations 2010 Reg 11",guidanceRef:""},

    // ===== GROUP 2: PROJECT PLANNING AND DESIGN MANAGEMENT =====
    {id:"PDBR-015",title:"Project scope and regulatory framework confirmed",description:"Define the project scope and determine which building regulations, Approved Documents, and regulatory requirements apply to the project.",group:2,hrbOnly:false,regulationRef:"Building Regulations 2010",guidanceRef:""},
    {id:"PDBR-016",title:"All applicable Approved Documents identified",description:"Identify all Approved Documents (A\u2013T) relevant to the project and communicate to the design team.",group:2,hrbOnly:false,regulationRef:"Building Regulations 2010",guidanceRef:""},
    {id:"PDBR-017",title:"HRB classification assessment completed",description:"Assess whether the project meets the Higher-Risk Building criteria (18m+, 7+ storeys, 2+ residential units) and apply appropriate regulatory regime.",group:2,hrbOnly:false,regulationRef:"Building Safety Act 2022 s.65",guidanceRef:""},
    {id:"PDBR-018",title:"Design compliance strategy established",description:"Develop and document the overarching strategy for ensuring design compliance with building regulations throughout the project.",group:2,hrbOnly:false,regulationRef:"Building Regulations 2010 Reg 11F",guidanceRef:""},
    {id:"PDBR-019",title:"Regulations applicability schedule produced",description:"Produce a detailed schedule of all applicable regulations and requirements mapped to the project scope.",group:2,hrbOnly:false,regulationRef:"Building Regulations 2010",guidanceRef:""},
    {id:"PDBR-020",title:"Design responsibilities coordinated and allocated",description:"Define and allocate design responsibilities across all design team members with clear accountability.",group:2,hrbOnly:false,regulationRef:"Building Regulations 2010 Reg 11F",guidanceRef:""},
    {id:"PDBR-021",title:"All designers briefed on compliance duties",description:"Brief all designers on their individual duties under the Building Regulations and their compliance responsibilities.",group:2,hrbOnly:false,regulationRef:"Building Regulations 2010 Reg 11E",guidanceRef:""},
    {id:"PDBR-022",title:"Design risk management process established",description:"Set up system for identifying, assessing, and managing building regulation compliance risks during design.",group:2,hrbOnly:false,regulationRef:"Building Regulations 2010 Part 2A",guidanceRef:""},
    {id:"PDBR-023",title:"Design review process defined",description:"Define the process for reviewing design outputs against building regulation requirements at key stages.",group:2,hrbOnly:false,regulationRef:"Building Regulations 2010 Reg 11F",guidanceRef:""},
    {id:"PDBR-024",title:"Multidisciplinary information exchange protocols set",description:"Establish information exchange protocols between all design disciplines to ensure integrated compliance.",group:2,hrbOnly:false,regulationRef:"Building Regulations 2010 Reg 11F",guidanceRef:""},
    {id:"PDBR-025",title:"Design change control process established",description:"Define the process for managing, assessing, and recording design changes and their compliance impact.",group:2,hrbOnly:false,regulationRef:"Building Regulations 2010 Part 2A",guidanceRef:""},
    {id:"PDBR-026",title:"Architectural design compliance reviewed",description:"Review architectural design against all applicable Approved Documents and building regulations.",group:2,hrbOnly:false,regulationRef:"Building Regulations 2010",guidanceRef:""},
    {id:"PDBR-027",title:"Structural design compliance reviewed (Part A)",description:"Review structural design for compliance with Part A including disproportionate collapse requirements.",group:2,hrbOnly:false,regulationRef:"Schedule 1 Part A",guidanceRef:"Approved Document A"},
    {id:"PDBR-028",title:"Fire safety design reviewed (Part B)",description:"Review fire safety design covering means of escape, fire spread, structural fire resistance, and fire service access.",group:2,hrbOnly:false,regulationRef:"Schedule 1 Part B",guidanceRef:"Approved Document B"},
    {id:"PDBR-029",title:"Site preparation and contamination reviewed (Part C)",description:"Review ground conditions, site preparation, and contamination strategy against Part C.",group:2,hrbOnly:false,regulationRef:"Schedule 1 Part C",guidanceRef:"Approved Document C"},
    {id:"PDBR-030",title:"Ventilation compliance reviewed (Part F)",description:"Review ventilation design for compliance with Part F including system selection and performance.",group:2,hrbOnly:false,regulationRef:"Schedule 1 Part F",guidanceRef:"Approved Document F"},
    {id:"PDBR-031",title:"Energy performance reviewed (Part L)",description:"Review design for compliance with conservation of fuel and power requirements under Part L.",group:2,hrbOnly:false,regulationRef:"Schedule 1 Part L",guidanceRef:"Approved Document L"},
    {id:"PDBR-032",title:"Sound insulation compliance reviewed (Part E)",description:"Review design for compliance with resistance to sound requirements under Part E.",group:2,hrbOnly:false,regulationRef:"Schedule 1 Part E",guidanceRef:"Approved Document E"},
    {id:"PDBR-033",title:"Drainage design reviewed (Part H)",description:"Review drainage design for compliance with Part H including foul and surface water.",group:2,hrbOnly:false,regulationRef:"Schedule 1 Part H",guidanceRef:"Approved Document H"},
    {id:"PDBR-034",title:"Protection from falling and impact reviewed (Part K)",description:"Verify staircase, guarding, ramp, and glazing safety design compliance with Part K.",group:2,hrbOnly:false,regulationRef:"Schedule 1 Part K",guidanceRef:"Approved Document K"},
    {id:"PDBR-035",title:"Electrical safety design reviewed (Part P)",description:"Review electrical design for compliance with Part P requirements.",group:2,hrbOnly:false,regulationRef:"Schedule 1 Part P",guidanceRef:"Approved Document P"},
    {id:"PDBR-036",title:"Accessibility provisions reviewed (Part M)",description:"Review design for compliance with access and use requirements under Part M including M4 categories.",group:2,hrbOnly:false,regulationRef:"Schedule 1 Part M",guidanceRef:"Approved Document M"},
    {id:"PDBR-037",title:"Combustion appliances and fuel storage reviewed (Part J)",description:"Review design of combustion appliances and fuel storage against Part J where applicable.",group:2,hrbOnly:false,regulationRef:"Schedule 1 Part J",guidanceRef:"Approved Document J"},
    {id:"PDBR-038",title:"Sanitation and water efficiency reviewed (Part G)",description:"Review design for sanitation, hot water safety, and water efficiency against Part G.",group:2,hrbOnly:false,regulationRef:"Schedule 1 Part G",guidanceRef:"Approved Document G"},
    {id:"PDBR-039",title:"Security in dwellings reviewed (Part Q)",description:"Review dwelling security provisions against Part Q for new dwellings.",group:2,hrbOnly:false,regulationRef:"Schedule 1 Part Q",guidanceRef:"Approved Document Q"},
    {id:"PDBR-040",title:"Overheating mitigation reviewed (Part O)",description:"Review overheating mitigation design for dwellings and residential buildings under Part O.",group:2,hrbOnly:false,regulationRef:"Schedule 1 Part O",guidanceRef:"Approved Document O"},
    {id:"PDBR-041",title:"EV charging infrastructure reviewed (Part S)",description:"Review electric vehicle charging infrastructure design against Part S requirements.",group:2,hrbOnly:false,regulationRef:"Schedule 1 Part S",guidanceRef:"Approved Document S"},
    {id:"PDBR-042",title:"Electronic communications infrastructure reviewed (Part R)",description:"Review provision of in-building physical infrastructure for electronic communications under Part R.",group:2,hrbOnly:false,regulationRef:"Schedule 1 Part R",guidanceRef:"Approved Document R"},
    {id:"PDBR-043",title:"Design integration between disciplines verified",description:"Verify that all design disciplines are coordinated and there are no compliance gaps at interfaces.",group:2,hrbOnly:false,regulationRef:"Building Regulations 2010 Reg 11F",guidanceRef:""},
    {id:"PDBR-044",title:"Design risks affecting compliance identified and recorded",description:"Record and assess all identified design risks that could affect building regulation compliance.",group:2,hrbOnly:false,regulationRef:"Building Regulations 2010 Part 2A",guidanceRef:""},
    {id:"PDBR-045",title:"Design compliance gateway review completed",description:"Formal review at the end of design stage to confirm all compliance requirements have been addressed before construction.",group:2,hrbOnly:false,regulationRef:"Building Regulations 2010 Part 2A",guidanceRef:""},

    // ===== GROUP 3: BUILDING CONTROL AND STATUTORY PROCEDURES =====
    {id:"PDBR-046",title:"Building control body selected (LA / AI / BSR)",description:"Confirm selection of building control body \u2014 local authority, approved inspector, or BSR for HRBs.",group:3,hrbOnly:false,regulationRef:"Building Regulations 2010",guidanceRef:""},
    {id:"PDBR-047",title:"Building control engagement plan established",description:"Plan the approach for engaging with building control throughout the design and construction process.",group:3,hrbOnly:false,regulationRef:"Building Regulations 2010",guidanceRef:""},
    {id:"PDBR-048",title:"Full plans application / building notice submitted",description:"Submit the required building control application (full plans, building notice, or initial notice) before work commences.",group:3,hrbOnly:false,regulationRef:"Building Regulations 2010 Reg 12",guidanceRef:""},
    {id:"PDBR-049",title:"Commencement notice submitted",description:"Submit commencement notice to building control before work starts on site.",group:3,hrbOnly:false,regulationRef:"Building Regulations 2010 Reg 16",guidanceRef:""},
    {id:"PDBR-050",title:"Fire safety consultation completed (where required)",description:"Building control consultation with fire authority completed for relevant building types.",group:3,hrbOnly:false,regulationRef:"Building Regulations 2010 Reg 13 / Building Act 1984 s.15",guidanceRef:""},
    {id:"PDBR-051",title:"Drainage consultation completed (where required)",description:"Building control consultation with sewerage undertaker or Environment Agency completed where required.",group:3,hrbOnly:false,regulationRef:"Building Regulations 2010",guidanceRef:""},
    {id:"PDBR-052",title:"Inspection notifications submitted at required stages",description:"Check that all required inspection stage notifications are being submitted to building control by the builder.",group:3,hrbOnly:false,regulationRef:"Building Regulations 2010 Reg 16",guidanceRef:""},
    {id:"PDBR-053",title:"Design changes notified to building control",description:"Submit notifications to building control at prescribed stages and for significant design changes.",group:3,hrbOnly:false,regulationRef:"Building Regulations 2010 Reg 16",guidanceRef:""},
    {id:"PDBR-054",title:"All building control submissions confirmed complete",description:"Verify all required submissions and notifications to building control have been made prior to completion.",group:3,hrbOnly:false,regulationRef:"Building Regulations 2010 Reg 17",guidanceRef:""},
    {id:"PDBR-055",title:"Completion certificate application submitted",description:"Verify all information required for a completion certificate application has been assembled and submitted.",group:3,hrbOnly:false,regulationRef:"Building Regulations 2010 Reg 17",guidanceRef:""},
    {id:"PDBR-056",title:"Completion certificate obtained",description:"Confirm the completion certificate has been issued by the building control body.",group:3,hrbOnly:false,regulationRef:"Building Regulations 2010 Reg 17",guidanceRef:""},

    // ===== GROUP 4: REGULATION 7 AND GENERAL COMPLIANCE CONTROLS =====
    {id:"PDBR-057",title:"Materials and workmanship specifications verified (Reg 7)",description:"Verify materials and workmanship meet Regulation 7 standards including combustible materials ban for relevant buildings.",group:4,hrbOnly:false,regulationRef:"Building Regulations 2010 Reg 7",guidanceRef:"Approved Document 7"},
    {id:"PDBR-058",title:"Material test certificates and product certifications obtained",description:"Obtain and file all material test certificates, product certifications, and declarations of performance.",group:4,hrbOnly:false,regulationRef:"Building Regulations 2010 Reg 7",guidanceRef:"Approved Document 7"},
    {id:"PDBR-059",title:"Product substitutions assessed for compliance impact",description:"Evaluate any proposed product or material substitutions to ensure continued regulatory compliance.",group:4,hrbOnly:false,regulationRef:"Building Regulations 2010 Reg 7",guidanceRef:""},
    {id:"PDBR-060",title:"Fire stopping and compartmentation verified",description:"Verify fire stopping installations and compartmentation comply with the approved fire strategy and Part B.",group:4,hrbOnly:false,regulationRef:"Schedule 1 Part B",guidanceRef:"Approved Document B"},
    {id:"PDBR-061",title:"External wall system compliance verified",description:"Monitor that external wall construction including insulation, cladding, and cavity barriers meets approved design and Reg 7(2) ban.",group:4,hrbOnly:false,regulationRef:"Schedule 1 Part B / Reg 7(2)",guidanceRef:"Approved Document B"},
    {id:"PDBR-062",title:"Construction monitored for design implementation",description:"Monitor that the construction work is carried out in accordance with the approved design and regulations.",group:4,hrbOnly:false,regulationRef:"Building Regulations 2010 Reg 11F",guidanceRef:""},
    {id:"PDBR-063",title:"Contractor design proposals reviewed for compliance",description:"Review and assess any contractor-designed portions (CDPs) for compliance with building regulations.",group:4,hrbOnly:false,regulationRef:"Building Regulations 2010 Reg 11F",guidanceRef:""},
    {id:"PDBR-064",title:"Design changes during construction tracked and assessed",description:"Record all design changes arising during construction and assess each for compliance impact.",group:4,hrbOnly:false,regulationRef:"Building Regulations 2010 Part 2A",guidanceRef:""},
    {id:"PDBR-065",title:"PC coordination on compliance matters ongoing",description:"Ongoing coordination with the PC to ensure design intent is maintained and compliance issues are resolved.",group:4,hrbOnly:false,regulationRef:"Building Regulations 2010 Reg 11F",guidanceRef:""},
    {id:"PDBR-066",title:"Compliance strategy updated during construction",description:"Update the design compliance strategy to reflect any changes or issues arising during the construction phase.",group:4,hrbOnly:false,regulationRef:"Building Regulations 2010 Part 2A",guidanceRef:""},

    // ===== GROUP 5: INFORMATION, HANDOVER AND FINAL COMPLIANCE ACTIONS =====
    {id:"PDBR-067",title:"Regulatory evidence trail maintained",description:"Maintain organised evidence of all compliance actions, reviews, and decisions throughout the project.",group:5,hrbOnly:false,regulationRef:"Building Regulations 2010 Part 2A",guidanceRef:""},
    {id:"PDBR-068",title:"Design records maintained comprehensively",description:"Keep comprehensive design records showing how compliance with each regulation was achieved.",group:5,hrbOnly:false,regulationRef:"Building Regulations 2010 Part 2A",guidanceRef:""},
    {id:"PDBR-069",title:"Compliance documentation recorded and filed",description:"Record and file all compliance-related documentation including certificates, test results, and declarations.",group:5,hrbOnly:false,regulationRef:"Building Regulations 2010 Part 2A",guidanceRef:""},
    {id:"PDBR-070",title:"Information available for building control inspection",description:"Maintain information in a form that can be provided to building control upon request or at inspection.",group:5,hrbOnly:false,regulationRef:"Building Regulations 2010",guidanceRef:""},
    {id:"PDBR-071",title:"Testing and commissioning schedule compiled",description:"Compile and track a schedule of all compliance-critical tests and commissioning activities.",group:5,hrbOnly:false,regulationRef:"Building Regulations 2010 Part 2A",guidanceRef:""},
    {id:"PDBR-072",title:"Non-compliance issue register maintained",description:"Maintain a register of non-compliance issues discovered, corrective actions taken, and resolution status.",group:5,hrbOnly:false,regulationRef:"Building Regulations 2010 Part 2A",guidanceRef:""},
    {id:"PDBR-073",title:"Change register maintained and available for audit",description:"Keep a comprehensive change register of all design changes available for building control inspection and audit.",group:5,hrbOnly:false,regulationRef:"Building Regulations 2010 Part 2A",guidanceRef:""},
    {id:"PDBR-074",title:"Regulatory documentation updated after all changes",description:"Ensure all compliance documentation, drawings, and specifications are updated after approved changes.",group:5,hrbOnly:false,regulationRef:"Building Regulations 2010 Part 2A",guidanceRef:""},
    {id:"PDBR-075",title:"As-built documentation package prepared",description:"Coordinate compilation of as-built drawings, specifications, and records reflecting the building as actually constructed.",group:5,hrbOnly:false,regulationRef:"Building Regulations 2010 Part 2A",guidanceRef:""},
    {id:"PDBR-076",title:"Final design compliance review completed",description:"Carry out a final review to confirm all design work complies with building regulations as built.",group:5,hrbOnly:false,regulationRef:"Building Regulations 2010 Reg 11F",guidanceRef:""},
    {id:"PDBR-077",title:"Construction compliance evidence reviewed",description:"Review all construction compliance evidence including test results, certificates, and inspection records.",group:5,hrbOnly:false,regulationRef:"Building Regulations 2010 Part 2A",guidanceRef:""},
    {id:"PDBR-078",title:"Completion documentation coordinated",description:"Coordinate assembly of all completion documentation from designers, contractors, and specialists.",group:5,hrbOnly:false,regulationRef:"Building Regulations 2010 Part 2A",guidanceRef:""},
    {id:"PDBR-079",title:"Fire safety information compiled for handover (Reg 38)",description:"Compile fire safety information for handover to the responsible person for ongoing fire safety management.",group:5,hrbOnly:false,regulationRef:"Regulation 38 / RR(FS)O 2005 Art. 38",guidanceRef:""},
    {id:"PDBR-080",title:"O&M manuals compiled for handover",description:"Ensure operating and maintenance manuals for all building systems are compiled for client handover.",group:5,hrbOnly:false,regulationRef:"Building Regulations 2010 Part 2A",guidanceRef:""},
    {id:"PDBR-081",title:"EPC produced and lodged",description:"Confirm an Energy Performance Certificate has been produced and lodged before occupation.",group:5,hrbOnly:false,regulationRef:"Energy Performance of Buildings Regs 2012",guidanceRef:""},
    {id:"PDBR-082",title:"Electrical installation certificate produced",description:"Confirm electrical installation certificate (BS 7671) has been produced and provided to building control.",group:5,hrbOnly:false,regulationRef:"Schedule 1 Part P",guidanceRef:"Approved Document P"},

    // ===== GROUP 6: HRB ADDITIONAL REQUIREMENTS =====
    {id:"PDBR-083",title:"Gateway 2 building control application prepared",description:"Prepare and submit the application to the Building Safety Regulator for building control approval (Gateway 2).",group:6,hrbOnly:true,regulationRef:"Building Safety Act 2022 s.38",guidanceRef:""},
    {id:"PDBR-084",title:"Design compliance strategy submitted (Gateway 2)",description:"Submit the design compliance strategy as part of the Gateway 2 prescribed documents.",group:6,hrbOnly:true,regulationRef:"Building Safety Act 2022 s.38",guidanceRef:""},
    {id:"PDBR-085",title:"Construction control plan submitted",description:"Prepare and submit the construction control plan describing how building work will be controlled.",group:6,hrbOnly:true,regulationRef:"Building Safety Act 2022 s.38",guidanceRef:""},
    {id:"PDBR-086",title:"Change control strategy submitted",description:"Prepare and submit the change control strategy for major and minor design changes during construction.",group:6,hrbOnly:true,regulationRef:"Building Safety Act 2022 s.38",guidanceRef:""},
    {id:"PDBR-087",title:"Mandatory occurrence reporting plan submitted",description:"Prepare and submit the mandatory occurrence reporting plan for structural and fire safety occurrences.",group:6,hrbOnly:true,regulationRef:"Building Safety Act 2022 s.43",guidanceRef:""},
    {id:"PDBR-088",title:"Golden thread information plan submitted",description:"Prepare and submit the golden thread information management strategy in prescribed digital format.",group:6,hrbOnly:true,regulationRef:"Building Safety Act 2022 s.38 / HRB Regs 2023",guidanceRef:""},
    {id:"PDBR-089",title:"Fire and structural safety information submitted (Gateway 2)",description:"Submit detailed fire safety and structural safety information as part of prescribed Gateway 2 documents.",group:6,hrbOnly:true,regulationRef:"Building Safety Act 2022 s.38",guidanceRef:""},
    {id:"PDBR-090",title:"Competence declarations submitted (Gateway 2)",description:"Submit competence declarations for all dutyholders as part of the Gateway 2 application.",group:6,hrbOnly:true,regulationRef:"Building Safety Act 2022 s.38",guidanceRef:""},
    {id:"PDBR-091",title:"Compliance statement submitted (Gateway 2)",description:"Submit statement confirming design compliance with all applicable building regulations.",group:6,hrbOnly:true,regulationRef:"Building Safety Act 2022 s.38",guidanceRef:""},
    {id:"PDBR-092",title:"All prescribed documents compiled for Gateway 2",description:"Compile and submit the complete prescribed document package to BSR for Gateway 2 determination.",group:6,hrbOnly:true,regulationRef:"HRB (Descriptions and Supplementary Provisions) Regs 2023",guidanceRef:""},
    {id:"PDBR-093",title:"Mandatory occurrence reports submitted during construction",description:"Report structural or fire safety occurrences to the BSR as required during HRB construction.",group:6,hrbOnly:true,regulationRef:"Building Safety Act 2022 s.43",guidanceRef:""},
    {id:"PDBR-094",title:"Major change application submitted to BSR",description:"Submit application to BSR for any major design change during HRB construction \u2014 requires approval before implementation.",group:6,hrbOnly:true,regulationRef:"Building Safety Act 2022 s.39",guidanceRef:""},
    {id:"PDBR-095",title:"Minor (notifiable) changes recorded and notified to BSR",description:"Record and notify BSR of minor notifiable changes to the approved design for HRBs.",group:6,hrbOnly:true,regulationRef:"Building Safety Act 2022 s.39",guidanceRef:""},
    {id:"PDBR-096",title:"Golden thread information maintained throughout construction",description:"Maintain and update the golden thread of building information in the prescribed digital format for HRBs.",group:6,hrbOnly:true,regulationRef:"Building Safety Act 2022 s.38 / HRB Regs 2023",guidanceRef:""},
    {id:"PDBR-097",title:"Gateway 3 completion certificate application submitted",description:"Submit application to BSR for a completion certificate for the higher-risk building.",group:6,hrbOnly:true,regulationRef:"Building Safety Act 2022 s.46",guidanceRef:""},
    {id:"PDBR-098",title:"PD compliance declaration submitted (Gateway 3)",description:"Submit the final PD compliance declaration specifically for the Gateway 3 application.",group:6,hrbOnly:true,regulationRef:"Building Safety Act 2022 s.46",guidanceRef:""},
    {id:"PDBR-099",title:"PC compliance declaration submitted (Gateway 3)",description:"Verify the PC has submitted their compliance declaration for Gateway 3.",group:6,hrbOnly:true,regulationRef:"Building Safety Act 2022 s.46",guidanceRef:""},
    {id:"PDBR-100",title:"As-built information submitted to BSR",description:"Submit complete as-built drawings, specifications, and compliance evidence to the BSR.",group:6,hrbOnly:true,regulationRef:"Building Safety Act 2022 s.46",guidanceRef:""},
    {id:"PDBR-101",title:"Fire and structural safety evidence submitted (Gateway 3)",description:"Provide fire safety and structural safety evidence as part of the Gateway 3 prescribed documents.",group:6,hrbOnly:true,regulationRef:"Building Safety Act 2022 s.46",guidanceRef:""},
    {id:"PDBR-102",title:"Golden thread information confirmed complete",description:"Confirm golden thread information is complete, accurate, and ready for handover to the Accountable Person.",group:6,hrbOnly:true,regulationRef:"Building Safety Act 2022 s.38 / HRB Regs 2023",guidanceRef:""},
    {id:"PDBR-103",title:"Key building information handed over to Accountable Person",description:"Hand over key building information as defined in the Higher-Risk Buildings regulations to the Accountable Person.",group:6,hrbOnly:true,regulationRef:"HRB (Key Building Information) Regs 2023",guidanceRef:""},
    {id:"PDBR-104",title:"HRB registration with BSR initiated",description:"Verify that the Accountable Person has initiated registration of the HRB with the BSR before occupation.",group:6,hrbOnly:true,regulationRef:"Building Safety Act 2022 s.72",guidanceRef:""}
];

// ==========================================
// PD BR TRACKER — FUNCTIONS
// ==========================================

function initPDBRTracker() {
    try {
        loadPDBRState();
        loadPDBRProject();
        renderPDBRAccordions();
        pdbrInitialised = true;
        console.log('PD BR Compliance Tracker initialised with ' + pdbrData.length + ' items.');
    } catch (error) {
        console.error('Error initialising PD BR Tracker:', error);
    }
}

function getVisibleItems() {
    var isHRB = document.getElementById('pdbrIsHRB') && document.getElementById('pdbrIsHRB').checked;
    return pdbrData.filter(function(item) {
        if (item.hrbOnly && !isHRB) return false;
        return true;
    });
}

function renderPDBRAccordions() {
    var container = document.getElementById('pdbrAccordions');
    if (!container) return;
    var isHRB = document.getElementById('pdbrIsHRB') && document.getElementById('pdbrIsHRB').checked;
    var searchRaw = (document.getElementById('pdbrSearchInput') ? document.getElementById('pdbrSearchInput').value : '').toLowerCase().trim();
    var html = '';

    pdbrGroups.forEach(function(group) {
        // Hide Group 6 entirely when non-HRB
        if (group.id === 6 && !isHRB) return;

        var groupItems = pdbrData.filter(function(item) {
            if (item.group !== group.id) return false;
            if (item.hrbOnly && !isHRB) return false;
            if (searchRaw) {
                var haystack = (item.title + ' ' + item.description + ' ' + item.regulationRef + ' ' + (item.guidanceRef || '')).toLowerCase();
                if (haystack.indexOf(searchRaw) === -1) return false;
            }
            return true;
        });
        if (groupItems.length === 0) return;

        // Group progress
        var groupTotal = groupItems.length;
        var groupDone = groupItems.filter(function(it) {
            var s = pdbrState[it.id];
            return s && (s.status === 'complete' || s.status === 'not-applicable');
        }).length;
        var groupPct = groupTotal > 0 ? Math.round((groupDone / groupTotal) * 100) : 0;

        html += '<div class="pdbr-group" id="pdbr-group-' + group.id + '">';
        html += '<div class="pdbr-group-header" onclick="togglePDBRGroup(' + group.id + ')">';
        html += '<span class="pdbr-group-title">' + group.name + '</span>';
        html += '<span class="pdbr-group-progress">' + groupDone + '/' + groupTotal + ' (' + groupPct + '%)</span>';
        html += '</div>';
        html += '<div class="pdbr-group-body" id="pdbr-group-body-' + group.id + '">';

        groupItems.forEach(function(item) {
            var state = pdbrState[item.id] || { status: 'not-started', notes: '' };
            var statusClass = 'pdbr-status-' + state.status;

            html += '<div class="pdbr-item ' + statusClass + '" id="pdbr-item-' + item.id + '">';
            html += '<div class="pdbr-item-header" onclick="togglePDBRItem(\'' + item.id + '\')">';
            html += '<span class="pdbr-item-title">' + item.title + '</span>';
            html += '<span class="pdbr-item-status-badge pdbr-badge-' + state.status + '">' + formatStatus(state.status) + '</span>';
            html += '</div>';
            html += '<div class="pdbr-item-body" id="pdbr-item-body-' + item.id + '">';
            html += '<div class="pdbr-item-desc">' + item.description + '</div>';
            html += '<div class="pdbr-item-refs">';
            html += '<span class="pdbr-ref"><strong>Regulation:</strong> ' + item.regulationRef + '</span>';
            if (item.guidanceRef) html += '<span class="pdbr-ref"><strong>Guidance:</strong> ' + item.guidanceRef + '</span>';
            html += '</div>';
            html += '<div class="pdbr-item-controls">';
            html += '<label class="pdbr-control-label">Status:</label>';
            html += '<select class="pdbr-status-select" id="pdbr-status-' + item.id + '" onchange="updatePDBRItem(\'' + item.id + '\')">';
            html += '<option value="not-started"' + (state.status === 'not-started' ? ' selected' : '') + '>Not Started</option>';
            html += '<option value="in-progress"' + (state.status === 'in-progress' ? ' selected' : '') + '>In Progress</option>';
            html += '<option value="complete"' + (state.status === 'complete' ? ' selected' : '') + '>Complete</option>';
            html += '<option value="not-applicable"' + (state.status === 'not-applicable' ? ' selected' : '') + '>Not Applicable</option>';
            html += '</select>';
            html += '<label class="pdbr-control-label">Notes:</label>';
            html += '<textarea class="pdbr-notes" id="pdbr-notes-' + item.id + '" placeholder="Add notes..." maxlength="2000" onchange="updatePDBRItem(\'' + item.id + '\')">' + escapeHtml(state.notes || '') + '</textarea>';
            html += '</div></div></div>';
        });

        html += '</div></div>';
    });

    container.innerHTML = html;
    updatePDBRProgress();
}

function formatStatus(status) {
    switch(status) {
        case 'not-started': return 'Not Started';
        case 'in-progress': return 'In Progress';
        case 'complete': return 'Complete';
        case 'not-applicable': return 'Not Applicable';
        default: return 'Not Started';
    }
}

function togglePDBRGroup(groupId) {
    var body = document.getElementById('pdbr-group-body-' + groupId);
    if (body) body.classList.toggle('open');
}

function togglePDBRItem(itemId) {
    var body = document.getElementById('pdbr-item-body-' + itemId);
    if (body) body.classList.toggle('open');
}

function updatePDBRItem(itemId) {
    var statusEl = document.getElementById('pdbr-status-' + itemId);
    var notesEl = document.getElementById('pdbr-notes-' + itemId);
    if (!statusEl) return;
    var status = statusEl.value;
    var notes = sanitizeInput(notesEl ? notesEl.value : '');
    pdbrState[itemId] = { status: status, notes: notes };

    // Update item styling
    var itemEl = document.getElementById('pdbr-item-' + itemId);
    if (itemEl) {
        itemEl.className = 'pdbr-item pdbr-status-' + status;
    }
    // Update badge
    var badge = itemEl ? itemEl.querySelector('.pdbr-item-status-badge') : null;
    if (badge) {
        badge.className = 'pdbr-item-status-badge pdbr-badge-' + status;
        badge.textContent = formatStatus(status);
    }

    savePDBRState();
    updatePDBRProgress();
}

function updatePDBRProgress() {
    var visibleItems = getVisibleItems();
    var total = visibleItems.length;
    var done = visibleItems.filter(function(it) {
        var s = pdbrState[it.id];
        return s && (s.status === 'complete' || s.status === 'not-applicable');
    }).length;
    var pct = total > 0 ? Math.round((done / total) * 100) : 0;
    var txt = document.getElementById('pdbrProgressText');
    var bar = document.getElementById('pdbrProgressBar');
    if (txt) txt.textContent = done + ' / ' + total + ' completed (' + pct + '%)';
    if (bar) bar.style.width = pct + '%';
}

function onPDBRHRBChange() {
    savePDBRProject();
    var isHRB = document.getElementById('pdbrIsHRB').checked;
    toggleHRBSections(isHRB);
    renderPDBRAccordions();
    // Re-render compliance tracker to show/hide HRB sections
    generateApprovedDocsHTML();
    loadData();
    updateSummary();
}

function toggleHRBSections(isHRB) {
    var hrbSections = document.querySelectorAll('.hrb-only-section');
    for (var i = 0; i < hrbSections.length; i++) {
        hrbSections[i].style.display = isHRB ? '' : 'none';
    }
}

function savePDDeclaration() {
    try {
        var obj = JSON.parse(localStorage.getItem('pdDeclarationData') || '{}');
        obj.name = (document.getElementById('pdDeclarationName').value || '');
        obj.organisation = (document.getElementById('pdDeclarationOrganisation').value || '');
        obj.date = (document.getElementById('pdDeclarationDate').value || '');
        obj.signature = (document.getElementById('pdDeclarationSignature').value || '');
        localStorage.setItem('pdDeclarationData', JSON.stringify(obj));
    } catch(e) { console.error('Error saving PD declaration:', e); }
}

function loadPDDeclaration() {
    try {
        var s = localStorage.getItem('pdDeclarationData');
        if (s) {
            var d = JSON.parse(s);
            if (d.name) document.getElementById('pdDeclarationName').value = d.name;
            if (d.organisation) document.getElementById('pdDeclarationOrganisation').value = d.organisation;
            if (d.date) document.getElementById('pdDeclarationDate').value = d.date;
            if (d.signature) document.getElementById('pdDeclarationSignature').value = d.signature;
        } else {
            // Auto-prefill from PD name if available
            var pdbrProj = JSON.parse(localStorage.getItem('pdbrProjectData') || '{}');
            if (pdbrProj.pdName) {
                document.getElementById('pdDeclarationName').value = pdbrProj.pdName;
            }
        }
    } catch(e) { console.error('Error loading PD declaration:', e); }
}

function pdbrSearch() {
    renderPDBRAccordions();
}

// Persistence
function savePDBRState() {
    try { localStorage.setItem('pdbrState', JSON.stringify(pdbrState)); }
    catch(e) { console.error('Error saving PDBR state:', e); }
}

function loadPDBRState() {
    try {
        var s = localStorage.getItem('pdbrState');
        if (s) pdbrState = JSON.parse(s);
    } catch(e) { pdbrState = {}; }
}

function savePDBRProject() {
    try {
        var obj = {
            projectName: (document.getElementById('pdbrProjectName').value || ''),
            projectAddress: (document.getElementById('pdbrProjectAddress').value || ''),
            projectType: (document.getElementById('pdbrProjectType').value || ''),
            isHRB: document.getElementById('pdbrIsHRB').checked,
            pdName: (document.getElementById('pdbrPDName').value || ''),
            pcName: (document.getElementById('pdbrPCName').value || ''),
            clientName: (document.getElementById('pdbrClientName').value || ''),
            date: (document.getElementById('pdbrDate').value || ''),
            signName: (document.getElementById('pdbrSignName').value || ''),
            signDate: (document.getElementById('pdbrSignDate').value || ''),
            signature: (document.getElementById('pdbrSignature').value || ''),
            // Building Control Information
            buildingControlAuthority: (document.getElementById('bcAuthority').value || ''),
            buildingControlRoute: (document.getElementById('bcRoute').value || ''),
            buildingControlReference: (document.getElementById('bcReference').value || ''),
            approvalType: (document.getElementById('bcApprovalType').value || ''),
            approvalDate: (document.getElementById('bcApprovalDate').value || ''),
            // HRB Determination
            hrbDeterminationConfirmed: document.getElementById('hrbDeterminationConfirmed').checked,
            hrbHeight: (document.getElementById('hrbHeight').value || ''),
            hrbStoreys: (document.getElementById('hrbStoreys').value || ''),
            hrbResidentialUnits: (document.getElementById('hrbResidentialUnits').value || ''),
            hrbBuildingUse: (document.getElementById('hrbBuildingUse').value || ''),
            hrbDeterminationNotes: (document.getElementById('hrbDeterminationNotes').value || ''),
            // Gateway / BSR
            bsrApprovalReference: (document.getElementById('bsrApprovalReference').value || ''),
            gateway2Reference: (document.getElementById('gateway2Reference').value || ''),
            gateway2ApprovalDate: (document.getElementById('gateway2ApprovalDate').value || ''),
            gateway3Reference: (document.getElementById('gateway3Reference').value || ''),
            gateway3CompletionReference: (document.getElementById('gateway3CompletionReference').value || ''),
            gatewayNotes: (document.getElementById('gatewayNotes').value || ''),
            // Golden Thread / MOR
            goldenThreadLocation: (document.getElementById('goldenThreadLocation').value || ''),
            goldenThreadReference: (document.getElementById('goldenThreadReference').value || ''),
            morEstablished: document.getElementById('morEstablished').checked,
            morNotes: (document.getElementById('morNotes').value || ''),
            informationManagementNotes: (document.getElementById('informationManagementNotes').value || '')
        };
        localStorage.setItem('pdbrProjectData', JSON.stringify(obj));
    } catch(e) { console.error('Error saving PDBR project:', e); }
}

function loadPDBRProject() {
    try {
        var s = localStorage.getItem('pdbrProjectData');
        if (!s) return;
        var d = JSON.parse(s);
        if (d.projectName) document.getElementById('pdbrProjectName').value = d.projectName;
        if (d.projectAddress) document.getElementById('pdbrProjectAddress').value = d.projectAddress;
        if (d.projectType) document.getElementById('pdbrProjectType').value = d.projectType;
        if (d.isHRB) document.getElementById('pdbrIsHRB').checked = d.isHRB;
        if (d.pdName) document.getElementById('pdbrPDName').value = d.pdName;
        if (d.pcName) document.getElementById('pdbrPCName').value = d.pcName;
        if (d.clientName) document.getElementById('pdbrClientName').value = d.clientName;
        if (d.date) document.getElementById('pdbrDate').value = d.date;
        if (d.signName) document.getElementById('pdbrSignName').value = d.signName;
        if (d.signDate) document.getElementById('pdbrSignDate').value = d.signDate;
        if (d.signature) document.getElementById('pdbrSignature').value = d.signature;
        // Building Control Information
        if (d.buildingControlAuthority) document.getElementById('bcAuthority').value = d.buildingControlAuthority;
        if (d.buildingControlRoute) document.getElementById('bcRoute').value = d.buildingControlRoute;
        if (d.buildingControlReference) document.getElementById('bcReference').value = d.buildingControlReference;
        if (d.approvalType) document.getElementById('bcApprovalType').value = d.approvalType;
        if (d.approvalDate) document.getElementById('bcApprovalDate').value = d.approvalDate;
        // HRB Determination
        if (d.hrbDeterminationConfirmed) document.getElementById('hrbDeterminationConfirmed').checked = d.hrbDeterminationConfirmed;
        if (d.hrbHeight) document.getElementById('hrbHeight').value = d.hrbHeight;
        if (d.hrbStoreys) document.getElementById('hrbStoreys').value = d.hrbStoreys;
        if (d.hrbResidentialUnits) document.getElementById('hrbResidentialUnits').value = d.hrbResidentialUnits;
        if (d.hrbBuildingUse) document.getElementById('hrbBuildingUse').value = d.hrbBuildingUse;
        if (d.hrbDeterminationNotes) document.getElementById('hrbDeterminationNotes').value = d.hrbDeterminationNotes;
        // Gateway / BSR
        if (d.bsrApprovalReference) document.getElementById('bsrApprovalReference').value = d.bsrApprovalReference;
        if (d.gateway2Reference) document.getElementById('gateway2Reference').value = d.gateway2Reference;
        if (d.gateway2ApprovalDate) document.getElementById('gateway2ApprovalDate').value = d.gateway2ApprovalDate;
        if (d.gateway3Reference) document.getElementById('gateway3Reference').value = d.gateway3Reference;
        if (d.gateway3CompletionReference) document.getElementById('gateway3CompletionReference').value = d.gateway3CompletionReference;
        if (d.gatewayNotes) document.getElementById('gatewayNotes').value = d.gatewayNotes;
        // Golden Thread / MOR
        if (d.goldenThreadLocation) document.getElementById('goldenThreadLocation').value = d.goldenThreadLocation;
        if (d.goldenThreadReference) document.getElementById('goldenThreadReference').value = d.goldenThreadReference;
        if (d.morEstablished) document.getElementById('morEstablished').checked = d.morEstablished;
        if (d.morNotes) document.getElementById('morNotes').value = d.morNotes;
        if (d.informationManagementNotes) document.getElementById('informationManagementNotes').value = d.informationManagementNotes;
        // Toggle HRB sections visibility
        toggleHRBSections(d.isHRB || false);
    } catch(e) { console.error('Error loading PDBR project:', e); }
}

// Export
function exportPDBRData() {
    try {
        var obj = {
            pdbrState: pdbrState,
            pdbrProjectData: JSON.parse(localStorage.getItem('pdbrProjectData') || '{}'),
            exportDate: new Date().toISOString(),
            version: '2.0'
        };
        var blob = new Blob([JSON.stringify(obj, null, 2)], {type:'application/json'});
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        var name = (obj.pdbrProjectData.projectName || 'PDBR').replace(/[^a-z0-9]/gi,'_');
        a.download = name + '_PDBR_' + new Date().toISOString().split('T')[0] + '.json';
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        setTimeout(function(){ URL.revokeObjectURL(a.href); }, 100);
        showSuccess('PD BR Compliance data exported.');
    } catch(e) { showError('Export error: ' + e.message); }
}

// Import
function importPDBRData() {
    try {
        var inp = document.createElement('input');
        inp.type = 'file'; inp.accept = '.json';
        inp.onchange = function(ev) {
            var file = ev.target.files[0]; if (!file) return;
            var reader = new FileReader();
            reader.onload = function(e) {
                try {
                    var data = JSON.parse(e.target.result);
                    if (data.pdbrState) { pdbrState = data.pdbrState; savePDBRState(); }
                    if (data.pdbrProjectData) { localStorage.setItem('pdbrProjectData', JSON.stringify(data.pdbrProjectData)); loadPDBRProject(); }
                    renderPDBRAccordions();
                    showSuccess('PD BR Compliance data imported.');
                } catch(err) { showError('Import error: ' + err.message); }
            };
            reader.readAsText(file);
        };
        inp.click();
    } catch(e) { showError('Import error: ' + e.message); }
}

// Clear
function clearPDBRData() {
    if (!confirm('Clear all PD BR Compliance data and project info? This cannot be undone.')) return;
    pdbrState = {};
    localStorage.removeItem('pdbrState');
    localStorage.removeItem('pdbrProjectData');
    var fields = ['pdbrProjectName','pdbrProjectAddress','pdbrProjectType','pdbrPDName','pdbrPCName','pdbrClientName','pdbrDate','pdbrSignName','pdbrSignDate','pdbrSignature'];
    fields.forEach(function(f) { var el = document.getElementById(f); if (el) el.value = ''; });
    var hrb = document.getElementById('pdbrIsHRB');
    if (hrb) hrb.checked = false;
    renderPDBRAccordions();
    showSuccess('PD BR Compliance data cleared.');
}

// ==========================================
// DESIGNER WORKFLOW — SPECIALISM, EXPORT, IMPORT, MERGE
// ==========================================

function onSpecialismChange() {
    var sel = document.getElementById('designerSpecialism');
    var other = document.getElementById('designerSpecialismOther');
    if (sel.value === 'Other') {
        other.style.display = 'inline-block';
        other.focus();
    } else {
        other.style.display = 'none';
        other.value = '';
    }
}

function escapeHtml(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function exportDesignerSubmission() {
    try {
        // Read directly from input fields so user doesn't have to click Save Project first
        var designerName = sanitizeInput(document.getElementById('designerName').value);
        var specSel = document.getElementById('designerSpecialism');
        var specOther = document.getElementById('designerSpecialismOther');
        var designerSpecialism = specSel.value === 'Other' ? sanitizeInput(specOther.value) : specSel.value;
        var projectName = sanitizeInput(document.getElementById('projectName').value);
        var projectRef = sanitizeInput(document.getElementById('projectRef').value);

        if (!designerName) { showError('Please enter a Designer Name before exporting.'); return; }
        if (!designerSpecialism) { showError('Please select a Designer Specialism before exporting.'); return; }

        var submissionData = {
            project: { projectName: projectName, projectReference: projectRef },
            designer: { designerName: designerName, designerSpecialism: designerSpecialism },
            complianceItems: {},
            submissionDate: new Date().toISOString(),
            version: '1.0'
        };

        for (var reqId in complianceData) {
            if (!complianceData.hasOwnProperty(reqId)) continue;
            var d = complianceData[reqId];
            if (d.status || d.comments || d.comments2 || d.comments3) {
                submissionData.complianceItems[reqId] = {
                    status: d.status || '',
                    standardsUsed: d.comments || '',
                    compliancePathway: d.comments2 || '',
                    complianceEvidence: d.comments3 || ''
                };
            }
        }

        if (Object.keys(submissionData.complianceItems).length === 0) {
            showError('No compliance data to export. Please complete at least one requirement before exporting.');
            return;
        }

        var safeName = designerName.replace(/[^a-z0-9]/gi, '-');
        var safeRef = (projectRef || projectName || '').replace(/[^a-z0-9]/gi, '-');
        var fileName = safeRef ? (safeRef + '_' + safeName + '.html') : (safeName + '.html');

        var projObj = { name: projectName, ref: projectRef };
        var html = buildDesignerSubmissionHTML(projObj, submissionData);
        var blob = new Blob([html], { type: 'text/html;charset=utf-8' });
        var a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        setTimeout(function() { URL.revokeObjectURL(a.href); }, 100);
        showSuccess('Designer submission exported as ' + fileName);
    } catch(e) {
        showError('Export error: ' + e.message);
        console.error('Export error:', e);
    }
}

function buildDesignerSubmissionHTML(projectData, submissionData) {
    var items = submissionData.complianceItems;
    var h = '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1.0">\n';
    h += '<title>Designer Submission — ' + escapeHtml(projectData.name || 'Project') + ' — ' + escapeHtml(submissionData.designer.designerName) + '</title>\n<style>\n';
    h += 'body{font-family:Segoe UI,Tahoma,Geneva,Verdana,sans-serif;margin:20px;background:#f8f9fa;line-height:1.5;color:#2d3748}\n';
    h += '.container{max-width:1000px;margin:0 auto;background:white;padding:30px;border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,0.1)}\n';
    h += '.header{background:linear-gradient(135deg,#2d3748,#4a5568);color:white;padding:24px;margin:-30px -30px 24px -30px;border-radius:12px 12px 0 0;text-align:center}\n';
    h += '.header h1{font-size:1.6em;font-weight:300;letter-spacing:1px;margin-bottom:6px}\n';
    h += '.header p{opacity:0.9;font-size:0.95em}\n';
    h += '.info-section{background:linear-gradient(145deg,#fff,#f7fafc);padding:18px;margin-bottom:16px;border-radius:10px;border:2px solid #e2e8f0}\n';
    h += '.info-section strong{display:block;color:#2d3748;font-size:14px;margin-bottom:10px;text-transform:uppercase;letter-spacing:0.5px;border-bottom:2px solid #0ea5e9;padding-bottom:6px}\n';
    h += '.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px 20px}\n';
    h += '.info-grid p{margin:3px 0;font-size:13px}.info-grid .label{font-weight:600;color:#4a5568}\n';
    h += '.doc-section{margin:18px 0}\n';
    h += '.doc-title{background:linear-gradient(135deg,#2d3748,#4a5568);color:white;padding:12px 16px;border-radius:8px 8px 0 0;font-weight:600;font-size:14px;border-bottom:3px solid #0ea5e9}\n';
    h += '.req-item{border:1px solid #e2e8f0;padding:14px;border-top:none}\n';
    h += '.req-item:last-child{border-radius:0 0 8px 8px}\n';
    h += '.req-title{font-weight:600;color:#2d3748;margin-bottom:8px;font-size:13px}\n';
    h += '.req-field{margin:4px 0}.req-field-label{font-weight:600;color:#4a5568;font-size:11px;text-transform:uppercase;letter-spacing:0.3px}\n';
    h += '.req-field-value{padding:6px 10px;background:#f8fafc;border-radius:4px;font-size:13px;white-space:pre-wrap;margin-top:2px}\n';
    h += '.status-badge{display:inline-block;padding:2px 10px;border-radius:10px;font-size:12px;font-weight:600}\n';
    h += '.s-compliant{color:#065f46;background:#d1fae5}.s-not-compliant{color:#991b1b;background:#fee2e2}.s-not-applicable{color:#4a5568;background:#e2e8f0}\n';
    h += '.footer{margin-top:24px;padding:14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;font-size:12px;color:#64748b}\n';
    h += '.no-data{color:#94a3b8;font-style:italic;font-size:13px;padding:8px}\n';
    h += '@media print{body{margin:0;background:white}.container{box-shadow:none;border-radius:0}.header{border-radius:0}}\n';
    h += '</style>\n</head>\n<body>\n<div class="container">\n';

    h += '<div class="header"><h1>Designer Compliance Submission</h1><p>AHS Compliance Consulting — Building Regulations Compliance Tracker</p></div>\n';

    h += '<div class="info-section"><strong>Project Details</strong><div class="info-grid">\n';
    h += '<p><span class="label">Project Name:</span> ' + escapeHtml(projectData.name || 'N/A') + '</p>\n';
    h += '<p><span class="label">Project Reference:</span> ' + escapeHtml(projectData.ref || 'N/A') + '</p>\n';
    h += '</div></div>\n';

    h += '<div class="info-section"><strong>Designer Details</strong><div class="info-grid">\n';
    h += '<p><span class="label">Designer Name:</span> ' + escapeHtml(submissionData.designer.designerName) + '</p>\n';
    h += '<p><span class="label">Specialism:</span> ' + escapeHtml(submissionData.designer.designerSpecialism) + '</p>\n';
    h += '<p><span class="label">Submission Date:</span> ' + new Date(submissionData.submissionDate).toLocaleDateString() + '</p>\n';
    h += '</div></div>\n';

    var hasAnyData = false;
    for (var oi = 0; oi < approvedDocsOrder.length; oi++) {
        var docKey = approvedDocsOrder[oi];
        var doc = approvedDocuments[docKey];
        if (!doc) continue;
        var docItems = [];
        doc.requirements.forEach(function(req, i) {
            var reqId = docKey + '-' + i;
            if (items[reqId]) docItems.push({ reqId: reqId, requirement: req, data: items[reqId] });
        });
        if (docItems.length === 0) continue;
        hasAnyData = true;
        h += '<div class="doc-section"><div class="doc-title">' + escapeHtml(doc.regulationRef) + ' - ' + escapeHtml(doc.title) + (doc.guidanceRef ? '<br><span style="font-size:11px;font-weight:400;opacity:0.85;font-style:italic">Guidance: ' + escapeHtml(doc.guidanceRef) + '</span>' : '') + '</div>\n';
        docItems.forEach(function(item) {
            var sc = item.data.status === 'compliant' ? 's-compliant' : item.data.status === 'not-compliant' ? 's-not-compliant' : item.data.status === 'not-applicable' ? 's-not-applicable' : '';
            var sl = item.data.status ? item.data.status.replace(/-/g, ' ').replace(/\b\w/g, function(c){ return c.toUpperCase(); }) : 'Not Assessed';
            h += '<div class="req-item"><div class="req-title">' + escapeHtml(item.requirement) + '</div>\n';
            h += '<div class="req-field"><span class="req-field-label">Status:</span> <span class="status-badge ' + sc + '">' + sl + '</span></div>\n';
            if (item.data.standardsUsed) h += '<div class="req-field"><div class="req-field-label">Standards Used</div><div class="req-field-value">' + escapeHtml(item.data.standardsUsed) + '</div></div>\n';
            if (item.data.compliancePathway) h += '<div class="req-field"><div class="req-field-label">Compliance Pathway</div><div class="req-field-value">' + escapeHtml(item.data.compliancePathway) + '</div></div>\n';
            if (item.data.complianceEvidence) h += '<div class="req-field"><div class="req-field-label">Compliance Evidence</div><div class="req-field-value">' + escapeHtml(item.data.complianceEvidence) + '</div></div>\n';
            h += '</div>\n';
        });
        h += '</div>\n';
    }
    if (!hasAnyData) h += '<div class="info-section"><p class="no-data">No compliance entries have been completed yet.</p></div>\n';

    h += '<div class="footer"><strong>Submission generated:</strong> ' + new Date().toLocaleString() + '<br><strong>Application:</strong> AHS Compliance Consulting — Building Regulations Compliance Tracker v1.1</div>\n';
    h += '</div>\n';

    h += '<script id="designer-submission-data" type="application/json">\n';
    h += JSON.stringify(submissionData, null, 2).replace(/<\//g, '<\\/');
    h += '\n<\/script>\n</body>\n</html>';
    return h;
}

function importDesignerSubmission() {
    try {
        var inp = document.createElement('input');
        inp.type = 'file';
        inp.accept = '.html,.htm';
        inp.multiple = true;
        inp.onchange = function(ev) {
            var files = Array.from(ev.target.files);
            if (files.length === 0) return;

            var processed = 0;
            var successCount = 0;
            var failedFiles = [];

            files.forEach(function(file) {
                var reader = new FileReader();
                reader.onload = function(e) {
                    try {
                        var submission = extractSubmissionFromHTML(e.target.result);
                        if (!submission) {
                            failedFiles.push(file.name + ': no valid submission data found');
                        } else {
                            var currentProject = JSON.parse(localStorage.getItem('projectData') || '{}');
                            var currentRef = currentProject.ref || currentProject.name || '';
                            var submissionRef = (submission.project && (submission.project.projectReference || submission.project.projectName)) || '';
                            if (currentRef && submissionRef && currentRef !== submissionRef && currentRef !== (submission.project.projectName || '')) {
                                if (!confirm('Project reference mismatch for ' + file.name + '.\n\nMaster: ' + currentRef + '\nSubmission: ' + submissionRef + '\n\nMerge anyway?')) {
                                    failedFiles.push(file.name + ': skipped (project mismatch)');
                                    finishFile();
                                    return;
                                }
                            }
                            mergeDesignerData(submission, true);
                            successCount++;
                        }
                    } catch(err) {
                        failedFiles.push(file.name + ': ' + err.message);
                    }
                    finishFile();
                };
                reader.onerror = function() {
                    failedFiles.push(file.name + ': file read error');
                    finishFile();
                };
                reader.readAsText(file);
            });

            function finishFile() {
                processed++;
                if (processed < files.length) return;
                // All files processed — show summary
                var msg = successCount + ' of ' + files.length + ' submission(s) imported successfully.';
                if (failedFiles.length > 0) {
                    msg += '\n\nFailed:\n' + failedFiles.join('\n');
                    showError(msg);
                } else {
                    showSuccess(msg);
                }
                // Refresh submissions tab if visible
                renderSubmissionsTab();
            }
        };
        inp.click();
    } catch(e) {
        showError('Import error: ' + e.message);
    }
}

function extractSubmissionFromHTML(htmlContent) {
    var match = htmlContent.match(/<script\s+id=["']designer-submission-data["']\s+type=["']application\/json["']\s*>([\s\S]*?)<\/script>/i);
    if (!match || !match[1]) {
        match = htmlContent.match(/<script\s+id=["']submission-data["']\s+type=["']application\/json["']\s*>([\s\S]*?)<\/script>/i);
    }
    if (!match || !match[1]) return null;

    var submission;
    try {
        submission = JSON.parse(match[1].trim());
    } catch(e) {
        return null;
    }
    if (!submission.designer || !submission.complianceItems) return null;
    return submission;
}

function mergeDesignerData(submission, silent) {
    var designer = submission.designer || {};
    var dName = designer.designerName || 'Unknown';
    var dSpec = designer.designerSpecialism || 'Unknown';
    var dDate = submission.submissionDate || new Date().toISOString();
    var items = submission.complianceItems || {};
    var mergeCount = 0;

    for (var reqId in items) {
        if (!items.hasOwnProperty(reqId)) continue;
        var entry = items[reqId];
        if (!mergedResponses[reqId]) mergedResponses[reqId] = [];

        var existingIdx = -1;
        for (var i = 0; i < mergedResponses[reqId].length; i++) {
            if (mergedResponses[reqId][i].designerName === dName && mergedResponses[reqId][i].designerSpecialism === dSpec) {
                existingIdx = i;
                break;
            }
        }

        var response = {
            designerName: dName,
            designerSpecialism: dSpec,
            submissionDate: dDate,
            status: entry.status || '',
            standardsUsed: entry.standardsUsed || '',
            compliancePathway: entry.compliancePathway || '',
            complianceEvidence: entry.complianceEvidence || ''
        };

        if (existingIdx >= 0) {
            mergedResponses[reqId][existingIdx] = response;
        } else {
            mergedResponses[reqId].push(response);
        }
        mergeCount++;
    }

    localStorage.setItem('mergedResponses', JSON.stringify(mergedResponses));
    if (reviewInitialised) {
        renderReviewTab();
        updateReviewSummary();
    }
    if (!silent) {
        showSuccess('Merged ' + mergeCount + ' compliance items from ' + dName + ' (' + dSpec + ').');
    }
}

function clearMergedSubmissions() {
    if (!confirm('Clear all imported designer submissions? This cannot be undone.')) return;
    mergedResponses = {};
    localStorage.removeItem('mergedResponses');
    renderSubmissionsTab();
    if (reviewInitialised) {
        renderReviewTab();
        updateReviewSummary();
    }
    showSuccess('All designer submissions cleared.');
}

// ==========================================
// DESIGNER SUBMISSIONS TAB
// ==========================================

function renderSubmissionsTab() {
    var container = document.getElementById('submissionsContent');
    if (!container) return;

    // Build a map: designerKey -> { name, specialism, date, items: { reqId: response } }
    var designers = {};
    var totalItems = 0, compliant = 0, nonCompliant = 0, na = 0;

    for (var reqId in mergedResponses) {
        if (!mergedResponses.hasOwnProperty(reqId)) continue;
        var responses = mergedResponses[reqId];
        for (var ri = 0; ri < responses.length; ri++) {
            var resp = responses[ri];
            var dKey = resp.designerName + '|||' + resp.designerSpecialism;
            if (!designers[dKey]) {
                designers[dKey] = {
                    name: resp.designerName,
                    specialism: resp.designerSpecialism,
                    date: resp.submissionDate,
                    items: {}
                };
            }
            designers[dKey].items[reqId] = resp;
            totalItems++;
            if (resp.status === 'compliant') compliant++;
            else if (resp.status === 'not-compliant') nonCompliant++;
            else if (resp.status === 'not-applicable') na++;
            // Track latest submission date
            if (resp.submissionDate > designers[dKey].date) designers[dKey].date = resp.submissionDate;
        }
    }

    var designerKeys = Object.keys(designers);

    // Update summary counts
    var el;
    el = document.getElementById('subDesignerCount'); if (el) el.textContent = designerKeys.length;
    el = document.getElementById('subTotalItems'); if (el) el.textContent = totalItems;
    el = document.getElementById('subCompliant'); if (el) el.textContent = compliant;
    el = document.getElementById('subNonCompliant'); if (el) el.textContent = nonCompliant;
    el = document.getElementById('subNA'); if (el) el.textContent = na;

    if (designerKeys.length === 0) {
        container.innerHTML = '<div style="padding:40px;text-align:center;color:#94a3b8;font-style:italic">No designer submissions imported yet. Use the button above to import HTML submission files.</div>';
        return;
    }

    var html = '';

    designerKeys.forEach(function(dKey) {
        var d = designers[dKey];
        var itemCount = Object.keys(d.items).length;

        html += '<div class="sub-designer-block">';
        html += '<div class="sub-designer-header" onclick="toggleDesignerBlock(this)">';
        html += '<div><span class="sub-designer-name">' + escapeHtml(d.name) + '</span>';
        html += '<span class="sub-designer-spec">' + escapeHtml(d.specialism) + '</span></div>';
        html += '<div><span class="sub-designer-count">' + itemCount + ' items</span>';
        html += '<span class="sub-designer-date">' + new Date(d.date).toLocaleDateString() + '</span></div>';
        html += '</div>';
        html += '<div class="sub-designer-body">';

        // Group items by approved document
        for (var oi = 0; oi < approvedDocsOrder.length; oi++) {
            var docKey = approvedDocsOrder[oi];
            var doc = approvedDocuments[docKey];
            if (!doc) continue;

            var docItems = [];
            doc.requirements.forEach(function(req, i) {
                var reqId = docKey + '-' + i;
                if (d.items[reqId]) {
                    docItems.push({ reqId: reqId, requirement: req, data: d.items[reqId] });
                }
            });

            if (docItems.length === 0) continue;

            html += '<div class="sub-doc-section">';
            html += '<div class="sub-doc-title">' + escapeHtml(doc.regulationRef) + ' — ' + escapeHtml(doc.title) + '</div>';

            docItems.forEach(function(item) {
                var statusLabel = item.data.status ? item.data.status.replace(/-/g, ' ').replace(/\b\w/g, function(c){ return c.toUpperCase(); }) : 'Not Assessed';
                var sc = item.data.status === 'compliant' ? 's-compliant' : item.data.status === 'not-compliant' ? 's-not-compliant' : item.data.status === 'not-applicable' ? 's-not-applicable' : '';

                html += '<div class="sub-req-item">';
                html += '<div class="sub-req-title">' + escapeHtml(item.requirement) + '</div>';
                html += '<div class="sub-req-field"><span class="sub-req-label">Status:</span> <span class="status-badge ' + sc + '">' + statusLabel + '</span></div>';
                if (item.data.standardsUsed) html += '<div class="sub-req-field"><span class="sub-req-label">Standards Used:</span><div class="sub-req-value">' + escapeHtml(item.data.standardsUsed) + '</div></div>';
                if (item.data.compliancePathway) html += '<div class="sub-req-field"><span class="sub-req-label">Compliance Pathway:</span><div class="sub-req-value">' + escapeHtml(item.data.compliancePathway) + '</div></div>';
                if (item.data.complianceEvidence) html += '<div class="sub-req-field"><span class="sub-req-label">Compliance Evidence:</span><div class="sub-req-value">' + escapeHtml(item.data.complianceEvidence) + '</div></div>';
                html += '</div>';
            });

            html += '</div>';
        }

        html += '</div></div>';
    });

    container.innerHTML = html;
}

function toggleDesignerBlock(header) {
    var body = header.nextElementSibling;
    if (body) body.classList.toggle('open');
    header.classList.toggle('open');
}

// ==========================================
// PD REVIEW TAB
// ==========================================

function initReviewTab() {
    try {
        renderReviewTab();
        updateReviewSummary();
        loadPDDeclaration();
        reviewInitialised = true;
    } catch(e) {
        console.error('Error initialising Review tab:', e);
    }
}

function renderReviewTab() {
    var container = document.getElementById('reviewItems');
    if (!container) return;
    var html = '';
    var isHRB = getIsHRB();

    for (var oi = 0; oi < approvedDocsOrder.length; oi++) {
        var docKey = approvedDocsOrder[oi];
        var doc = approvedDocuments[docKey];
        if (!doc) continue;
        if (doc.hrbOnly && !isHRB) continue;

        doc.requirements.forEach(function(requirement, i) {
            var reqId = docKey + '-' + i;
            var responses = mergedResponses[reqId] || [];
            var review = pdReviews[reqId] || { status: 'Not Reviewed', comment: '' };
            var hasResponses = responses.length > 0;

            var badgeClass = 'review-badge-not-reviewed';
            if (review.status === 'Reviewed') badgeClass = 'review-badge-reviewed';
            else if (review.status === 'Query Raised') badgeClass = 'review-badge-query';
            else if (review.status === 'Accepted for Report') badgeClass = 'review-badge-accepted';

            html += '<div class="review-item" id="review-item-' + reqId + '" data-has-submissions="' + hasResponses + '" data-review-status="' + review.status + '">';
            html += '<div class="review-item-header" onclick="toggleReviewItem(\'' + reqId + '\')">';
            html += '<span>' + escapeHtml(doc.regulationRef) + ' - ' + escapeHtml(requirement.length > 80 ? requirement.substring(0, 80) + '...' : requirement) + '</span>';
            html += '<span class="review-status-badge ' + badgeClass + '">' + review.status + (hasResponses ? ' (' + responses.length + ')' : '') + '</span>';
            html += '</div>';

            html += '<div class="review-item-body" id="review-body-' + reqId + '">';
            html += '<div style="background:#fef3c7;padding:10px;border-radius:6px;border-left:4px solid #f59e0b;margin-bottom:12px;font-size:13px;font-weight:500">' + escapeHtml(requirement) + '</div>';

            html += '<h4 style="color:#2d3748;font-size:13px;margin-bottom:8px">Designer Responses (' + responses.length + ')</h4>';
            if (responses.length === 0) {
                html += '<div class="no-submissions">No designer submissions received for this item.</div>';
            } else {
                responses.forEach(function(resp) {
                    html += '<div class="designer-response">';
                    html += '<div class="designer-response-header">';
                    html += '<div><span class="designer-response-name">' + escapeHtml(resp.designerName) + '</span> <span class="designer-response-specialism">' + escapeHtml(resp.designerSpecialism) + '</span></div>';
                    html += '<span class="designer-response-date">' + new Date(resp.submissionDate).toLocaleDateString() + '</span>';
                    html += '</div>';
                    if (resp.status) {
                        var sl = resp.status.replace(/-/g, ' ').replace(/\b\w/g, function(c){ return c.toUpperCase(); });
                        var sc = resp.status === 'compliant' ? '#065f46;background:#d1fae5' : resp.status === 'not-compliant' ? '#991b1b;background:#fee2e2' : '#4a5568;background:#e2e8f0';
                        html += '<div class="designer-response-field"><div class="designer-response-field-label">Status</div><div><span style="display:inline-block;padding:2px 10px;border-radius:10px;font-size:12px;font-weight:600;color:' + sc + '">' + sl + '</span></div></div>';
                    }
                    if (resp.standardsUsed) html += '<div class="designer-response-field"><div class="designer-response-field-label">Standards Used</div><div class="designer-response-field-value">' + escapeHtml(resp.standardsUsed) + '</div></div>';
                    if (resp.compliancePathway) html += '<div class="designer-response-field"><div class="designer-response-field-label">Compliance Pathway / Design Statement</div><div class="designer-response-field-value">' + escapeHtml(resp.compliancePathway) + '</div></div>';
                    if (resp.complianceEvidence) html += '<div class="designer-response-field"><div class="designer-response-field-label">Compliance Evidence / Notes</div><div class="designer-response-field-value">' + escapeHtml(resp.complianceEvidence) + '</div></div>';
                    html += '</div>';
                });
            }

            html += '<div class="pd-review-section">';
            html += '<h4>PD Review</h4>';
            html += '<div class="pd-review-controls">';
            html += '<select class="pd-review-status-select" id="review-status-' + reqId + '" onchange="updatePDReview(\'' + reqId + '\')">';
            html += '<option value="Not Reviewed"' + (review.status === 'Not Reviewed' ? ' selected' : '') + '>Not Reviewed</option>';
            html += '<option value="Reviewed"' + (review.status === 'Reviewed' ? ' selected' : '') + '>Reviewed</option>';
            html += '<option value="Query Raised"' + (review.status === 'Query Raised' ? ' selected' : '') + '>Query Raised</option>';
            html += '<option value="Accepted for Report"' + (review.status === 'Accepted for Report' ? ' selected' : '') + '>Accepted for Report</option>';
            html += '</select>';
            html += '<textarea class="pd-review-comment" id="review-comment-' + reqId + '" placeholder="PD review comment..." onchange="updatePDReview(\'' + reqId + '\')" maxlength="2000">' + escapeHtml(review.comment || '') + '</textarea>';
            html += '</div></div>';

            html += '</div></div>';
        });
    }

    container.innerHTML = html;
}

function toggleReviewItem(reqId) {
    var body = document.getElementById('review-body-' + reqId);
    if (body) body.classList.toggle('open');
}

function updatePDReview(reqId) {
    var statusEl = document.getElementById('review-status-' + reqId);
    var commentEl = document.getElementById('review-comment-' + reqId);
    if (!statusEl) return;

    pdReviews[reqId] = {
        status: statusEl.value,
        comment: sanitizeInput(commentEl ? commentEl.value : '')
    };

    var item = document.getElementById('review-item-' + reqId);
    if (item) {
        item.setAttribute('data-review-status', statusEl.value);
        var badge = item.querySelector('.review-status-badge');
        if (badge) {
            badge.className = 'review-status-badge';
            if (statusEl.value === 'Reviewed') badge.classList.add('review-badge-reviewed');
            else if (statusEl.value === 'Query Raised') badge.classList.add('review-badge-query');
            else if (statusEl.value === 'Accepted for Report') badge.classList.add('review-badge-accepted');
            else badge.classList.add('review-badge-not-reviewed');
            var responses = mergedResponses[reqId] || [];
            badge.textContent = statusEl.value + (responses.length > 0 ? ' (' + responses.length + ')' : '');
        }
    }

    saveAllReviews();
    updateReviewSummary();
}

function saveAllReviews() {
    try {
        localStorage.setItem('pdReviews', JSON.stringify(pdReviews));
    } catch(e) {
        showError('Error saving reviews: ' + e.message);
    }
}

function updateReviewSummary() {
    var totalItems = 0, withSubs = 0, reviewed = 0, notReviewed = 0, queries = 0, accepted = 0;
    var isHRB = getIsHRB();
    for (var oi = 0; oi < approvedDocsOrder.length; oi++) {
        var docKey = approvedDocsOrder[oi];
        if (!approvedDocuments[docKey]) continue;
        if (approvedDocuments[docKey].hrbOnly && !isHRB) continue;
        approvedDocuments[docKey].requirements.forEach(function(req, i) {
            var reqId = docKey + '-' + i;
            totalItems++;
            if (mergedResponses[reqId] && mergedResponses[reqId].length > 0) withSubs++;
            var review = pdReviews[reqId] || { status: 'Not Reviewed' };
            if (review.status === 'Not Reviewed') notReviewed++;
            else if (review.status === 'Reviewed') reviewed++;
            else if (review.status === 'Query Raised') queries++;
            else if (review.status === 'Accepted for Report') accepted++;
        });
    }
    var el;
    el = document.getElementById('revTotalItems'); if (el) el.textContent = totalItems;
    el = document.getElementById('revWithSubs'); if (el) el.textContent = withSubs;
    el = document.getElementById('revReviewed'); if (el) el.textContent = reviewed;
    el = document.getElementById('revNotReviewed'); if (el) el.textContent = notReviewed;
    el = document.getElementById('revQueries'); if (el) el.textContent = queries;
    el = document.getElementById('revAccepted'); if (el) el.textContent = accepted;
}

function applyReviewFilter() {
    var filter = document.getElementById('reviewFilter').value;
    var search = (document.getElementById('reviewSearchInput').value || '').toLowerCase().trim();
    var isHRB = getIsHRB();
    for (var oi = 0; oi < approvedDocsOrder.length; oi++) {
        var docKey = approvedDocsOrder[oi];
        if (!approvedDocuments[docKey]) continue;
        if (approvedDocuments[docKey].hrbOnly && !isHRB) continue;
        approvedDocuments[docKey].requirements.forEach(function(req, i) {
            var reqId = docKey + '-' + i;
            var el = document.getElementById('review-item-' + reqId);
            if (!el) return;
            var visible = true;
            var hasSubs = el.getAttribute('data-has-submissions') === 'true';
            var reviewStatus = el.getAttribute('data-review-status') || 'Not Reviewed';
            if (filter === 'has-submissions' && !hasSubs) visible = false;
            if (filter === 'not-reviewed' && reviewStatus !== 'Not Reviewed') visible = false;
            if (filter === 'reviewed' && reviewStatus !== 'Reviewed') visible = false;
            if (filter === 'query' && reviewStatus !== 'Query Raised') visible = false;
            if (filter === 'accepted' && reviewStatus !== 'Accepted for Report') visible = false;
            if (search && req.toLowerCase().indexOf(search) === -1) visible = false;
            el.classList.toggle('review-item-hidden', !visible);
        });
    }
}

// ==========================================
// FINAL PDF REPORT
// ==========================================

function buildFinalReportData() {
    var projectData = JSON.parse(localStorage.getItem('projectData') || '{}');
    var pdbrProj = JSON.parse(localStorage.getItem('pdbrProjectData') || '{}');
    var savedPdbr = JSON.parse(localStorage.getItem('pdbrState') || '{}');
    var savedMerged = JSON.parse(localStorage.getItem('mergedResponses') || '{}');
    var savedReviews = JSON.parse(localStorage.getItem('pdReviews') || '{}');
    var isHRB = pdbrProj.isHRB || false;
    var reportDate = new Date().toLocaleDateString();

    // --- Cover ---
    var cover = {
        reportTitle: 'Building Regulations Compliance Report',
        subtitle: 'Principal Designer (Building Regulations)',
        projectName: projectData.name || pdbrProj.projectName || '',
        projectRef: projectData.ref || '',
        projectAddress: pdbrProj.projectAddress || '',
        projectType: pdbrProj.projectType || '',
        isHRB: isHRB,
        client: pdbrProj.clientName || '',
        principalDesigner: pdbrProj.pdName || '',
        principalContractor: pdbrProj.pcName || '',
        issueNumber: '1',
        reportDate: reportDate,
        preparedBy: pdbrProj.pdName || projectData.designer || ''
    };

    // --- Document Control ---
    var documentControl = {
        rows: [
            {
                issue: cover.issueNumber,
                date: reportDate,
                description: 'Initial Issue',
                preparedBy: cover.preparedBy,
                approvedBy: ''
            }
        ]
    };

    // --- Regulatory Scope (conditional on HRB status) ---
    var regulatoryScope = {
        text: isHRB
            ? 'This report demonstrates how the design and compliance information for the project has been planned, managed and monitored to support compliance with the Building Regulations 2010 and the Building Safety Act 2022.\n\nAs a Higher-Risk Building, the project falls under the regulatory oversight of the Building Safety Regulator (BSR). The Principal Designer has fulfilled the enhanced dutyholder obligations introduced by the Building Regulations etc. (Amendment) (England) Regulations 2023 and the Building Safety Act 2022, including the preparation and maintenance of prescribed documents for BSR Gateway applications.\n\nCompliance with the functional requirements of Schedule 1, together with Regulation 7, Regulation 16 and Regulation 38, has been coordinated through the design process and reviewed by the Principal Designer.'
            : 'This report demonstrates how the design and compliance information for the project has been planned, managed and monitored to support compliance with the Building Regulations 2010.\n\nThe report records the activities undertaken by the Principal Designer under the dutyholder regime introduced by the Building Regulations etc. (Amendment) (England) Regulations 2023.\n\nCompliance with the functional requirements of Schedule 1, together with Regulation 7, Regulation 16 and Regulation 38, has been coordinated through the design process and reviewed by the Principal Designer.'
    };

    // --- Project Particulars ---
    var projectParticulars = {
        projectName: cover.projectName,
        projectRef: cover.projectRef,
        projectAddress: cover.projectAddress,
        projectType: cover.projectType,
        isHRB: isHRB,
        buildingUse: cover.projectType || '',
        projectDescription: '',
        heightStoreys: '',
        numberOfUnits: ''
    };

    // --- Dutyholder Register ---
    var dutyholders = [
        { role: 'Client', organisation: '', name: cover.client, appointmentDate: '' },
        { role: 'Principal Designer', organisation: '', name: cover.principalDesigner, appointmentDate: '' },
        { role: 'Principal Contractor', organisation: '', name: cover.principalContractor, appointmentDate: '' },
        { role: 'Lead Designer', organisation: '', name: projectData.designer || '', appointmentDate: '' },
        { role: 'Fire Engineer', organisation: '', name: '', appointmentDate: '' },
        { role: 'Structural Engineer', organisation: '', name: '', appointmentDate: '' },
        { role: 'MEP Engineer', organisation: '', name: '', appointmentDate: '' },
        { role: 'Building Control Body', organisation: '', name: '', appointmentDate: '' }
    ];
    // Try to fill from merged designer names
    var seenSpecs = {};
    for (var rid in savedMerged) {
        if (!savedMerged.hasOwnProperty(rid)) continue;
        savedMerged[rid].forEach(function(resp) {
            if (seenSpecs[resp.designerSpecialism]) return;
            seenSpecs[resp.designerSpecialism] = resp.designerName;
        });
    }
    dutyholders.forEach(function(dh) {
        if (dh.name) return;
        if (dh.role === 'Fire Engineer' && seenSpecs['Fire Engineer']) dh.name = seenSpecs['Fire Engineer'];
        if (dh.role === 'Structural Engineer' && seenSpecs['Structural Engineer']) dh.name = seenSpecs['Structural Engineer'];
        if (dh.role === 'MEP Engineer' && (seenSpecs['MEP Engineer'] || seenSpecs['Building Services Engineer'])) dh.name = seenSpecs['MEP Engineer'] || seenSpecs['Building Services Engineer'];
        if (dh.role === 'Lead Designer' && seenSpecs['Architect']) dh.name = seenSpecs['Architect'];
    });

    // --- Design Compliance Strategy (Group 2 items) ---
    var designStrategyItems = pdbrData.filter(function(it) { return it.group === 2 && (!it.hrbOnly || isHRB); });
    var designComplianceStrategy = designStrategyItems.map(function(it) {
        var s = savedPdbr[it.id] || { status: 'not-started', notes: '' };
        return { id: it.id, title: it.title, description: it.description, status: s.status, notes: s.notes || '', regulationRef: it.regulationRef };
    });

    // --- Compliance Schedule (all approved docs) ---
    var complianceSchedule = [];
    for (var oi = 0; oi < approvedDocsOrder.length; oi++) {
        var docKey = approvedDocsOrder[oi];
        var doc = approvedDocuments[docKey];
        if (!doc) continue;
        if (doc.hrbOnly && !isHRB) continue;
        var items = [];
        doc.requirements.forEach(function(req, i) {
            var reqId = docKey + '-' + i;
            var localData = complianceData[reqId] || {};
            var responses = savedMerged[reqId] || [];
            var review = savedReviews[reqId] || { status: 'Not Reviewed', comment: '' };
            items.push({
                reqId: reqId,
                requirement: req,
                localStatus: localData.status || '',
                localStandards: localData.comments || '',
                localPathway: localData.comments2 || '',
                localEvidence: localData.comments3 || '',
                designerResponses: responses,
                reviewStatus: review.status,
                reviewComment: review.comment || ''
            });
        });
        complianceSchedule.push({
            key: docKey,
            regulationRef: doc.regulationRef,
            title: doc.title,
            guidanceRef: doc.guidanceRef || '',
            section: doc.section,
            items: items
        });
    }

    // --- Construction and Compliance Management (Group 4) ---
    var constructionItems = pdbrData.filter(function(it) { return it.group === 4 && (!it.hrbOnly || isHRB); });
    var constructionCompliance = constructionItems.map(function(it) {
        var s = savedPdbr[it.id] || { status: 'not-started', notes: '' };
        return { id: it.id, title: it.title, description: it.description, status: s.status, notes: s.notes || '', regulationRef: it.regulationRef };
    });

    // --- Information Management and Handover (Group 5) ---
    var handoverItems = pdbrData.filter(function(it) { return it.group === 5 && (!it.hrbOnly || isHRB); });
    var informationHandover = handoverItems.map(function(it) {
        var s = savedPdbr[it.id] || { status: 'not-started', notes: '' };
        return { id: it.id, title: it.title, description: it.description, status: s.status, notes: s.notes || '', regulationRef: it.regulationRef };
    });

    // --- PD Review Summary ---
    var reviewTotal = 0, reviewAccepted = 0, reviewReviewed = 0, reviewQuery = 0, reviewNotReviewed = 0;
    var reviewNotes = [];
    for (var oi2 = 0; oi2 < approvedDocsOrder.length; oi2++) {
        var dk2 = approvedDocsOrder[oi2];
        if (!approvedDocuments[dk2]) continue;
        if (approvedDocuments[dk2].hrbOnly && !isHRB) continue;
        approvedDocuments[dk2].requirements.forEach(function(req, i) {
            reviewTotal++;
            var reqId2 = dk2 + '-' + i;
            var rv = savedReviews[reqId2] || { status: 'Not Reviewed', comment: '' };
            if (rv.status === 'Not Reviewed') reviewNotReviewed++;
            else if (rv.status === 'Reviewed') reviewReviewed++;
            else if (rv.status === 'Query Raised') reviewQuery++;
            else if (rv.status === 'Accepted for Report') reviewAccepted++;
            if (rv.comment) {
                reviewNotes.push({ reqId: reqId2, status: rv.status, comment: rv.comment });
            }
        });
    }
    var reviewSummary = {
        total: reviewTotal,
        accepted: reviewAccepted,
        reviewed: reviewReviewed,
        queryRaised: reviewQuery,
        notReviewed: reviewNotReviewed,
        notes: reviewNotes
    };

    // --- Building Control Information ---
    var buildingControlInfo = {
        authority: pdbrProj.buildingControlAuthority || '',
        route: pdbrProj.buildingControlRoute || '',
        reference: pdbrProj.buildingControlReference || '',
        approvalType: pdbrProj.approvalType || '',
        approvalDate: pdbrProj.approvalDate || ''
    };

    // --- HRB Determination (HRB only) ---
    var hrbDetermination = null;
    if (isHRB) {
        hrbDetermination = {
            confirmed: pdbrProj.hrbDeterminationConfirmed || false,
            height: pdbrProj.hrbHeight || '',
            storeys: pdbrProj.hrbStoreys || '',
            residentialUnits: pdbrProj.hrbResidentialUnits || '',
            buildingUse: pdbrProj.hrbBuildingUse || '',
            notes: pdbrProj.hrbDeterminationNotes || ''
        };
    }

    // --- HRB Approval and Gateway Information (HRB only) ---
    var hrbGateway = null;
    if (isHRB) {
        hrbGateway = {
            bsrApprovalReference: pdbrProj.bsrApprovalReference || '',
            gateway2Reference: pdbrProj.gateway2Reference || '',
            gateway2ApprovalDate: pdbrProj.gateway2ApprovalDate || '',
            gateway3Reference: pdbrProj.gateway3Reference || '',
            gateway3CompletionReference: pdbrProj.gateway3CompletionReference || '',
            notes: pdbrProj.gatewayNotes || ''
        };
    }

    // --- Golden Thread and MOR (HRB only) ---
    var goldenThread = null;
    if (isHRB) {
        goldenThread = {
            location: pdbrProj.goldenThreadLocation || '',
            reference: pdbrProj.goldenThreadReference || '',
            morEstablished: pdbrProj.morEstablished || false,
            morNotes: pdbrProj.morNotes || '',
            informationManagementNotes: pdbrProj.informationManagementNotes || ''
        };
    }

    // --- Declaration ---
    var pdDecl = JSON.parse(localStorage.getItem('pdDeclarationData') || '{}');
    var declaration = {
        text: 'I confirm that I have undertaken my duties as Principal Designer under the Building Regulations and have planned, managed and monitored the design work to ensure that, if built as designed, the building will comply with the Building Regulations.',
        name: pdDecl.name || pdbrProj.signName || pdbrProj.pdName || '',
        organisation: pdDecl.organisation || '',
        signature: pdDecl.signature || pdbrProj.signature || '',
        date: pdDecl.date || pdbrProj.signDate || reportDate
    };

    return {
        cover: cover,
        documentControl: documentControl,
        regulatoryScope: regulatoryScope,
        projectParticulars: projectParticulars,
        buildingControlInfo: buildingControlInfo,
        dutyholders: dutyholders,
        hrbDetermination: hrbDetermination,
        hrbGateway: hrbGateway,
        goldenThread: goldenThread,
        designComplianceStrategy: designComplianceStrategy,
        complianceSchedule: complianceSchedule,
        constructionCompliance: constructionCompliance,
        informationHandover: informationHandover,
        reviewSummary: reviewSummary,
        declaration: declaration
    };
}

function renderFinalReportHTML(rd) {
    var h = '';
    h += '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Building Regulations Compliance Report \u2014 ' + escapeHtml(rd.cover.projectName || 'Project') + '</title>';
    h += '<style>';

    /* ===== @page — A4 with zero margins (content manages its own padding) ===== */
    h += '@page{size:A4 portrait;margin:0}';
    h += '@page cover{margin:0}';

    /* ===== Global reset & typography ===== */
    h += '*,*::before,*::after{box-sizing:border-box}';
    h += 'body{font-family:"Segoe UI",Tahoma,Geneva,Verdana,sans-serif;margin:0;padding:0;line-height:1.6;color:#2d3748;background:#fff;-webkit-print-color-adjust:exact;print-color-adjust:exact}';

    /* ===== Page container — each page section ===== */
    h += '.page{width:100%;margin:0 auto;padding:18mm 20mm 15mm 20mm;page-break-after:always}';

    /* ===== Section headings ===== */
    h += 'h1.section-title{color:#2d3748;font-size:22px;border-bottom:3px solid #0ea5e9;padding-bottom:8px;margin:0 0 16px 0;letter-spacing:0.5px}';
    h += 'h2{color:#2d3748;font-size:16px;margin:20px 0 8px 0;border-bottom:2px solid #e2e8f0;padding-bottom:5px}';
    h += 'h3{color:#2d3748;font-size:13px;margin:14px 0 6px 0}';
    h += 'p{margin:4px 0;font-size:13px}';

    /* ===== Cover page — full A4, dark gradient ===== */
    h += '.cover-page{page:cover;width:100%;height:297mm;display:flex;flex-direction:column;justify-content:center;align-items:center;background:linear-gradient(135deg,#2d3748 0%,#4a5568 100%);color:#fff;text-align:center;padding:50px 40px;page-break-after:always}';
    h += '.cover-page .cover-title{font-size:34px;font-weight:300;letter-spacing:2px;border-bottom:3px solid #0ea5e9;padding-bottom:12px;margin-bottom:8px}';
    h += '.cover-page .cover-subtitle{font-size:15px;opacity:0.9;margin-bottom:32px;font-weight:400}';
    h += '.cover-page .cover-project{font-size:22px;font-weight:600;background:rgba(255,255,255,0.1);padding:18px 48px;border-radius:10px;margin:10px 0;border:1px solid rgba(255,255,255,0.2)}';
    h += '.cover-page .cover-meta{margin-top:36px;font-size:12px;opacity:0.8}';
    h += '.cover-meta p{margin:3px 0}';
    h += '.cover-page .cover-brand{margin-top:50px;font-size:11px;opacity:0.5;letter-spacing:1px;text-transform:uppercase}';

    /* ===== Info boxes & grids ===== */
    h += '.info-box{background:#f7fafc;padding:16px 18px;border:2px solid #e2e8f0;border-radius:8px;margin:10px 0}';
    h += '.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:5px 24px}';
    h += '.info-grid p{margin:2px 0;font-size:13px}';
    h += '.label{font-weight:600;color:#4a5568}';

    /* ===== Tables ===== */
    h += 'table{width:100%;border-collapse:collapse;font-size:11px;margin:8px 0}';
    h += 'th{background:#2d3748;color:#fff;padding:7px 8px;text-align:left;font-size:10px;text-transform:uppercase;letter-spacing:0.3px}';
    h += 'td{padding:6px 8px;border-bottom:1px solid #e2e8f0;vertical-align:top}';
    h += 'tr.row-complete{background:#ecfdf5}tr.row-na{background:#f3f4f6}tr.row-ip{background:#fffbeb}';

    /* ===== Compliance schedule ===== */
    h += '.doc-hdr{background:linear-gradient(135deg,#2d3748,#4a5568);color:#fff;padding:10px 14px;border-radius:6px 6px 0 0;font-weight:600;font-size:13px;border-bottom:3px solid #0ea5e9;margin-top:18px}';
    h += '.doc-guidance{font-size:10px;font-weight:400;opacity:0.85;font-style:italic}';
    h += '.req-card{border:1px solid #e2e8f0;padding:14px;border-top:none;page-break-inside:avoid}';
    h += '.req-card:last-child{border-radius:0 0 6px 6px}';
    h += '.req-title{font-weight:600;color:#2d3748;font-size:12px;margin-bottom:8px;padding:8px;background:#fef3c7;border-left:4px solid #f59e0b;border-radius:0 6px 6px 0}';
    h += '.resp-card{background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #0ea5e9;border-radius:0 6px 6px 0;padding:10px;margin:6px 0}';
    h += '.resp-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;font-size:12px}';
    h += '.resp-name{font-weight:700;color:#2d3748}';
    h += '.resp-spec{background:#0ea5e9;color:#fff;padding:1px 8px;border-radius:10px;font-size:10px;font-weight:600;margin-left:6px}';
    h += '.resp-field{margin:4px 0;font-size:11px}';
    h += '.resp-field-label{font-weight:600;color:#4a5568;font-size:10px;text-transform:uppercase}';
    h += '.resp-field-value{padding:4px 8px;background:#fff;border:1px solid #f1f5f9;border-radius:3px;font-size:11px;white-space:pre-wrap;margin-top:2px}';

    /* ===== Status badges ===== */
    h += '.status-badge{display:inline-block;padding:2px 10px;border-radius:10px;font-size:11px;font-weight:600}';
    h += '.sb-compliant{color:#065f46;background:#d1fae5}.sb-not-compliant{color:#991b1b;background:#fee2e2}.sb-not-applicable{color:#4a5568;background:#e2e8f0}.sb-not-assessed{color:#92400e;background:#fef3c7}';

    /* ===== Review box ===== */
    h += '.review-box{background:#eef2ff;border:2px solid #6366f1;border-radius:6px;padding:10px;margin-top:8px}';
    h += '.review-box h4{font-size:11px;color:#4338ca;margin:0 0 4px 0;text-transform:uppercase}';
    h += '.review-status{display:inline-block;padding:2px 8px;border-radius:10px;font-size:10px;font-weight:600}';
    h += '.rs-reviewed{background:#dbeafe;color:#1e40af}.rs-accepted{background:#d1fae5;color:#065f46}.rs-query{background:#fee2e2;color:#991b1b}.rs-not-reviewed{background:#fef3c7;color:#92400e}';
    h += '.review-comment{margin-top:4px;font-size:11px;color:#2d3748;white-space:pre-wrap}';

    /* ===== Summary stat grid ===== */
    h += '.summary-box{background:#d1fae5;padding:16px;border:2px solid #10b981;border-radius:8px;margin:12px 0}';
    h += '.summary-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:10px}';
    h += '.summary-stat{background:#fff;padding:12px 8px;border-radius:6px;text-align:center}';
    h += '.summary-stat .num{font-size:24px;font-weight:700;color:#2d3748;display:block}';
    h += '.summary-stat .lbl{font-size:10px;color:#64748b;text-transform:uppercase;letter-spacing:0.3px}';

    /* ===== Narrative ===== */
    h += '.narrative{padding:14px 18px;background:#f8fafc;border-left:4px solid #0ea5e9;border-radius:0 8px 8px 0;margin:12px 0;font-size:13px;line-height:1.7;white-space:pre-wrap}';

    /* ===== Strategy list ===== */
    h += '.strategy-item{padding:8px 12px;margin:4px 0;border-radius:4px;font-size:12px;border-left:3px solid #e2e8f0;page-break-inside:avoid}';
    h += '.strategy-item.si-complete{border-left-color:#10b981;background:#ecfdf5}';
    h += '.strategy-item.si-in-progress{border-left-color:#f59e0b;background:#fffbeb}';
    h += '.strategy-item.si-not-started{border-left-color:#cbd5e1;background:#f8fafc}';
    h += '.strategy-item.si-not-applicable{border-left-color:#94a3b8;background:#f1f5f9}';
    h += '.strategy-item .si-title{font-weight:600;color:#2d3748}.si-status{font-size:10px;font-weight:600;text-transform:uppercase;float:right}';
    h += '.si-notes{margin-top:3px;font-size:11px;color:#4a5568;white-space:pre-wrap}';

    /* ===== Declaration ===== */
    h += '.declaration-box{border:2px solid #2d3748;padding:24px;border-radius:10px;margin:20px 0;page-break-inside:avoid}';
    h += '.declaration-text{font-style:italic;padding:14px 18px;background:#f8fafc;border-left:4px solid #0ea5e9;border-radius:0 8px 8px 0;margin:14px 0;line-height:1.7;font-size:13px}';
    h += '.sign-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:20px}';
    h += '.sign-field{border-bottom:2px solid #2d3748;padding:8px 0 4px 0;min-height:24px;font-size:13px;color:#2d3748}';
    h += '.sign-label{font-size:10px;color:#4a5568;text-transform:uppercase;letter-spacing:0.4px;margin-top:4px}';

    /* ===== Footer ===== */
    h += '.report-footer{margin-top:30px;padding:14px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;font-size:11px;color:#64748b}';

    /* ===== Page-break helpers ===== */
    h += '.page-break-before{page-break-before:always}';
    h += '.no-break{page-break-inside:avoid}';
    h += 'tr{page-break-inside:avoid}';
    h += '.doc-hdr{page-break-after:avoid}';
    h += '.req-card{page-break-inside:avoid}';
    h += '.review-box{page-break-inside:avoid}';
    h += '.resp-card{page-break-inside:avoid}';
    h += '.summary-box{page-break-inside:avoid}';
    h += '.summary-stat{page-break-inside:avoid}';
    h += '.declaration-box{page-break-inside:avoid}';
    h += '.info-box{page-break-inside:avoid}';
    h += '.strategy-item{page-break-inside:avoid}';
    h += 'table{page-break-inside:auto}';
    h += 'thead{display:table-header-group}';
    h += 'tr{page-break-inside:avoid}';

    h += '</style></head><body>';

    // ============================================================
    // SECTION 1 — COVER PAGE
    // ============================================================
    h += '<div class="cover-page">';
    h += '<div class="cover-title">' + escapeHtml(rd.cover.reportTitle) + '</div>';
    h += '<div class="cover-subtitle">' + escapeHtml(rd.cover.subtitle) + '</div>';
    h += '<div class="cover-project">' + escapeHtml(rd.cover.projectName || 'Project') + '</div>';
    if (rd.cover.projectRef) h += '<p style="font-size:14px;opacity:0.9;margin-top:8px">Reference: ' + escapeHtml(rd.cover.projectRef) + '</p>';
    if (rd.cover.projectAddress) h += '<p style="font-size:13px;opacity:0.85;margin-top:4px">' + escapeHtml(rd.cover.projectAddress) + '</p>';
    h += '<div class="cover-meta">';
    h += '<p>Project Type: ' + escapeHtml(rd.cover.projectType || 'N/A') + '</p>';
    h += '<p>Higher-Risk Building: ' + (rd.cover.isHRB ? 'Yes' : 'No') + '</p>';
    if (rd.cover.client) h += '<p>Client: ' + escapeHtml(rd.cover.client) + '</p>';
    if (rd.cover.principalDesigner) h += '<p>Principal Designer: ' + escapeHtml(rd.cover.principalDesigner) + '</p>';
    if (rd.cover.principalContractor) h += '<p>Principal Contractor: ' + escapeHtml(rd.cover.principalContractor) + '</p>';
    h += '<p>Issue Number: ' + escapeHtml(rd.cover.issueNumber) + '</p>';
    h += '<p>Report Date: ' + escapeHtml(rd.cover.reportDate) + '</p>';
    if (rd.cover.preparedBy) h += '<p>Prepared By: ' + escapeHtml(rd.cover.preparedBy) + '</p>';
    h += '</div>';
    h += '<div class="cover-brand">AHS Compliance Consulting</div>';
    h += '</div>';

    // ============================================================
    // SECTION 2 — DOCUMENT CONTROL
    // ============================================================
    h += '<div class="page" style="page-break-after:always">';
    h += '<h1 class="section-title">Document Control</h1>';
    h += '<table><thead><tr><th>Issue / Revision</th><th>Date</th><th>Description</th><th>Prepared By</th><th>Approved By</th></tr></thead><tbody>';
    rd.documentControl.rows.forEach(function(row) {
        h += '<tr><td>' + escapeHtml(row.issue) + '</td><td>' + escapeHtml(row.date) + '</td><td>' + escapeHtml(row.description) + '</td><td>' + escapeHtml(row.preparedBy) + '</td><td>' + escapeHtml(row.approvedBy || '\u2014') + '</td></tr>';
    });
    h += '</tbody></table>';

    // ============================================================
    // SECTION 3 — REGULATORY SCOPE
    // ============================================================
    h += '<h1 class="section-title" style="margin-top:40px">Regulatory Scope</h1>';
    h += '<div class="narrative">' + escapeHtml(rd.regulatoryScope.text) + '</div>';
    h += '</div>';

    // ============================================================
    // SECTION 4 — PROJECT PARTICULARS
    // ============================================================
    h += '<div class="page" style="page-break-after:always">';
    h += '<h1 class="section-title">Project Particulars</h1>';
    h += '<div class="info-box"><div class="info-grid">';
    h += '<p><span class="label">Project Name:</span> ' + escapeHtml(rd.projectParticulars.projectName || 'N/A') + '</p>';
    h += '<p><span class="label">Project Reference:</span> ' + escapeHtml(rd.projectParticulars.projectRef || 'N/A') + '</p>';
    h += '<p><span class="label">Project Address:</span> ' + escapeHtml(rd.projectParticulars.projectAddress || 'N/A') + '</p>';
    h += '<p><span class="label">Project Type:</span> ' + escapeHtml(rd.projectParticulars.projectType || 'N/A') + '</p>';
    h += '<p><span class="label">HRB Status:</span> ' + (rd.projectParticulars.isHRB ? 'Yes' : 'No') + '</p>';
    h += '<p><span class="label">Building Use:</span> ' + escapeHtml(rd.projectParticulars.buildingUse || 'N/A') + '</p>';
    h += '<p><span class="label">Project Description:</span> ' + escapeHtml(rd.projectParticulars.projectDescription || '\u2014') + '</p>';
    h += '<p><span class="label">Height / Storeys:</span> ' + escapeHtml(rd.projectParticulars.heightStoreys || '\u2014') + '</p>';
    h += '<p><span class="label">Number of Units:</span> ' + escapeHtml(rd.projectParticulars.numberOfUnits || '\u2014') + '</p>';
    h += '</div></div>';

    // ============================================================
    // SECTION 5 — DUTYHOLDER REGISTER
    // ============================================================
    h += '<h1 class="section-title" style="margin-top:40px">Dutyholder Register</h1>';
    h += '<table><thead><tr><th>Role</th><th>Organisation</th><th>Name</th><th>Appointment Date</th></tr></thead><tbody>';
    rd.dutyholders.forEach(function(dh) {
        h += '<tr><td>' + escapeHtml(dh.role) + '</td><td>' + escapeHtml(dh.organisation || '\u2014') + '</td><td>' + escapeHtml(dh.name || '\u2014') + '</td><td>' + escapeHtml(dh.appointmentDate || '\u2014') + '</td></tr>';
    });
    h += '</tbody></table>';
    h += '</div>';

    // ============================================================
    // SECTION 5b — BUILDING CONTROL INFORMATION
    // ============================================================
    h += '<div class="page" style="page-break-after:always">';
    h += '<h1 class="section-title">Building Control Information</h1>';
    h += '<div class="info-box"><div class="info-grid">';
    h += '<p><span class="label">Building Control Authority:</span> ' + escapeHtml(rd.buildingControlInfo.authority || 'N/A') + '</p>';
    h += '<p><span class="label">Building Control Route:</span> ' + escapeHtml(rd.buildingControlInfo.route || 'N/A') + '</p>';
    h += '<p><span class="label">Application / Approval Reference:</span> ' + escapeHtml(rd.buildingControlInfo.reference || '\u2014') + '</p>';
    h += '<p><span class="label">Approval Type:</span> ' + escapeHtml(rd.buildingControlInfo.approvalType || '\u2014') + '</p>';
    h += '<p><span class="label">Approval Date:</span> ' + escapeHtml(rd.buildingControlInfo.approvalDate || '\u2014') + '</p>';
    h += '</div></div>';

    // ============================================================
    // HRB-ONLY: HIGHER-RISK BUILDING DETERMINATION
    // ============================================================
    if (rd.hrbDetermination) {
        h += '<h1 class="section-title" style="margin-top:40px">Higher-Risk Building Determination</h1>';
        h += '<div class="narrative">The project has been assessed against the Higher-Risk Building criteria and is treated as a Higher-Risk Building for the purposes of the Building Safety Act 2022 and associated building control procedures.</div>';
        h += '<div class="info-box"><div class="info-grid">';
        h += '<p><span class="label">HRB Determination Confirmed:</span> ' + (rd.hrbDetermination.confirmed ? 'Yes' : 'No') + '</p>';
        h += '<p><span class="label">Height (m):</span> ' + escapeHtml(rd.hrbDetermination.height || '\u2014') + '</p>';
        h += '<p><span class="label">Number of Storeys:</span> ' + escapeHtml(rd.hrbDetermination.storeys || '\u2014') + '</p>';
        h += '<p><span class="label">Residential Units:</span> ' + escapeHtml(rd.hrbDetermination.residentialUnits || '\u2014') + '</p>';
        h += '<p><span class="label">Building Use:</span> ' + escapeHtml(rd.hrbDetermination.buildingUse || '\u2014') + '</p>';
        h += '</div></div>';
        if (rd.hrbDetermination.notes) {
            h += '<h3>Determination Notes</h3>';
            h += '<div class="narrative">' + escapeHtml(rd.hrbDetermination.notes) + '</div>';
        }
    }

    // ============================================================
    // HRB-ONLY: HRB APPROVAL AND GATEWAY INFORMATION
    // ============================================================
    if (rd.hrbGateway) {
        h += '<h1 class="section-title" style="margin-top:40px">HRB Approval and Gateway Information</h1>';
        h += '<div class="info-box"><div class="info-grid">';
        h += '<p><span class="label">BSR Approval Reference:</span> ' + escapeHtml(rd.hrbGateway.bsrApprovalReference || '\u2014') + '</p>';
        h += '<p><span class="label">Gateway 2 Submission Reference:</span> ' + escapeHtml(rd.hrbGateway.gateway2Reference || '\u2014') + '</p>';
        h += '<p><span class="label">Gateway 2 Approval Date:</span> ' + escapeHtml(rd.hrbGateway.gateway2ApprovalDate || '\u2014') + '</p>';
        h += '<p><span class="label">Gateway 3 Submission Reference:</span> ' + escapeHtml(rd.hrbGateway.gateway3Reference || '\u2014') + '</p>';
        h += '<p><span class="label">Gateway 3 Completion Certificate Reference:</span> ' + escapeHtml(rd.hrbGateway.gateway3CompletionReference || '\u2014') + '</p>';
        h += '</div></div>';
        if (rd.hrbGateway.notes) {
            h += '<h3>Gateway Notes</h3>';
            h += '<div class="narrative">' + escapeHtml(rd.hrbGateway.notes) + '</div>';
        }
    }

    // ============================================================
    // HRB-ONLY: GOLDEN THREAD AND MANDATORY OCCURRENCE REPORTING
    // ============================================================
    if (rd.goldenThread) {
        h += '<h1 class="section-title" style="margin-top:40px">Golden Thread and Mandatory Occurrence Reporting</h1>';
        h += '<div class="narrative">Information for the project has been managed in accordance with the higher-risk building information management regime. A process for maintaining prescribed project information and, where applicable, mandatory occurrence reporting has been established.</div>';
        h += '<div class="info-box"><div class="info-grid">';
        h += '<p><span class="label">Golden Thread Location / Platform:</span> ' + escapeHtml(rd.goldenThread.location || '\u2014') + '</p>';
        h += '<p><span class="label">Golden Thread Reference:</span> ' + escapeHtml(rd.goldenThread.reference || '\u2014') + '</p>';
        h += '<p><span class="label">MOR Process Established:</span> ' + (rd.goldenThread.morEstablished ? 'Yes' : 'No') + '</p>';
        h += '</div></div>';
        if (rd.goldenThread.morNotes) {
            h += '<h3>MOR Notes</h3>';
            h += '<div class="narrative">' + escapeHtml(rd.goldenThread.morNotes) + '</div>';
        }
        if (rd.goldenThread.informationManagementNotes) {
            h += '<h3>Information Management Notes</h3>';
            h += '<div class="narrative">' + escapeHtml(rd.goldenThread.informationManagementNotes) + '</div>';
        }
    }

    h += '</div>';

    // ============================================================
    // SECTION 6 — DESIGN COMPLIANCE STRATEGY
    // ============================================================
    h += '<div class="page" style="page-break-after:always">';
    h += '<h1 class="section-title">Design Compliance Strategy</h1>';
    h += '<p style="font-size:13px;color:#4a5568;margin-bottom:14px">This section summarises how design compliance has been planned, coordinated, and managed under the Principal Designer\u2019s oversight throughout the project.</p>';
    // Group items by status for summary
    var dsComplete = rd.designComplianceStrategy.filter(function(it){return it.status==='complete';}).length;
    var dsIP = rd.designComplianceStrategy.filter(function(it){return it.status==='in-progress';}).length;
    var dsNA = rd.designComplianceStrategy.filter(function(it){return it.status==='not-applicable';}).length;
    var dsNS = rd.designComplianceStrategy.filter(function(it){return it.status==='not-started';}).length;
    h += '<div class="info-box" style="margin-bottom:16px"><strong style="display:block;margin-bottom:6px;font-size:12px;color:#4a5568;text-transform:uppercase">Strategy Status</strong>';
    h += '<p>Complete: ' + dsComplete + ' &nbsp;|&nbsp; In Progress: ' + dsIP + ' &nbsp;|&nbsp; Not Started: ' + dsNS + ' &nbsp;|&nbsp; Not Applicable: ' + dsNA + '</p></div>';
    rd.designComplianceStrategy.forEach(function(it) {
        var cls = 'si-' + it.status;
        var statusLabel = formatStatus(it.status);
        h += '<div class="strategy-item ' + cls + '">';
        h += '<span class="si-status">' + statusLabel + '</span>';
        h += '<span class="si-title">' + escapeHtml(it.title) + '</span>';
        if (it.notes) h += '<div class="si-notes">' + escapeHtml(it.notes) + '</div>';
        h += '</div>';
    });
    h += '</div>';

    // ============================================================
    // SECTION 7 — BUILDING REGULATIONS COMPLIANCE SCHEDULE
    // ============================================================
    h += '<div class="page" style="page-break-after:always">';
    h += '<h1 class="section-title">Building Regulations Compliance Schedule</h1>';
    rd.complianceSchedule.forEach(function(docSection) {
        h += '<div class="doc-hdr">' + escapeHtml(docSection.regulationRef) + ' \u2013 ' + escapeHtml(docSection.title);
        if (docSection.guidanceRef) h += '<br><span class="doc-guidance">Guidance: ' + escapeHtml(docSection.guidanceRef) + '</span>';
        h += '</div>';

        docSection.items.forEach(function(item) {
            h += '<div class="req-card">';
            h += '<div class="req-title">' + escapeHtml(item.requirement) + '</div>';

            // Show merged designer responses first (preferred)
            if (item.designerResponses.length > 0) {
                item.designerResponses.forEach(function(resp) {
                    h += '<div class="resp-card">';
                    h += '<div class="resp-header"><span><span class="resp-name">' + escapeHtml(resp.designerName) + '</span><span class="resp-spec">' + escapeHtml(resp.designerSpecialism) + '</span></span>';
                    h += '<span style="font-size:11px;color:#64748b">' + new Date(resp.submissionDate).toLocaleDateString() + '</span></div>';
                    if (resp.status) {
                        var statusLabel = resp.status.replace(/-/g, ' ').replace(/\b\w/g, function(c){ return c.toUpperCase(); });
                        var sbClass = resp.status === 'compliant' ? 'sb-compliant' : resp.status === 'not-compliant' ? 'sb-not-compliant' : resp.status === 'not-applicable' ? 'sb-not-applicable' : 'sb-not-assessed';
                        h += '<div class="resp-field"><span class="resp-field-label">Status: </span><span class="status-badge ' + sbClass + '">' + statusLabel + '</span></div>';
                    }
                    if (resp.standardsUsed) h += '<div class="resp-field"><div class="resp-field-label">Standards Used</div><div class="resp-field-value">' + escapeHtml(resp.standardsUsed) + '</div></div>';
                    if (resp.compliancePathway) h += '<div class="resp-field"><div class="resp-field-label">Compliance Pathway</div><div class="resp-field-value">' + escapeHtml(resp.compliancePathway) + '</div></div>';
                    if (resp.complianceEvidence) h += '<div class="resp-field"><div class="resp-field-label">Compliance Evidence</div><div class="resp-field-value">' + escapeHtml(resp.complianceEvidence) + '</div></div>';
                    h += '</div>';
                });
            } else if (item.localStatus) {
                // Fallback: show local compliance data if no merged responses
                h += '<div class="resp-card">';
                var lsl = item.localStatus.replace(/-/g, ' ').replace(/\b\w/g, function(c){ return c.toUpperCase(); });
                var lsbClass = item.localStatus === 'compliant' ? 'sb-compliant' : item.localStatus === 'not-compliant' ? 'sb-not-compliant' : item.localStatus === 'not-applicable' ? 'sb-not-applicable' : 'sb-not-assessed';
                h += '<div class="resp-field"><span class="resp-field-label">Status: </span><span class="status-badge ' + lsbClass + '">' + lsl + '</span></div>';
                if (item.localStandards) h += '<div class="resp-field"><div class="resp-field-label">Standards Used</div><div class="resp-field-value">' + escapeHtml(item.localStandards) + '</div></div>';
                if (item.localPathway) h += '<div class="resp-field"><div class="resp-field-label">Compliance Pathway</div><div class="resp-field-value">' + escapeHtml(item.localPathway) + '</div></div>';
                if (item.localEvidence) h += '<div class="resp-field"><div class="resp-field-label">Compliance Evidence</div><div class="resp-field-value">' + escapeHtml(item.localEvidence) + '</div></div>';
                h += '</div>';
            } else {
                h += '<div style="color:#94a3b8;font-style:italic;font-size:12px;padding:6px">No designer submissions received.</div>';
            }

            // PD Review
            var rsClass = item.reviewStatus === 'Reviewed' ? 'rs-reviewed' : item.reviewStatus === 'Accepted for Report' ? 'rs-accepted' : item.reviewStatus === 'Query Raised' ? 'rs-query' : 'rs-not-reviewed';
            h += '<div class="review-box"><h4>PD Review</h4>';
            h += '<span class="review-status ' + rsClass + '">' + escapeHtml(item.reviewStatus) + '</span>';
            if (item.reviewComment) h += '<div class="review-comment">' + escapeHtml(item.reviewComment) + '</div>';
            h += '</div>';

            h += '</div>';
        });
    });
    h += '</div>';

    // ============================================================
    // SECTION 8 — CONSTRUCTION AND COMPLIANCE MANAGEMENT
    // ============================================================
    h += '<div class="page" style="page-break-after:always">';
    h += '<h1 class="section-title">Construction and Compliance Management</h1>';
    h += '<p style="font-size:13px;color:#4a5568;margin-bottom:14px">This section records how compliance has been managed during the construction phase, including materials verification, contractor design review, and design change management.</p>';
    h += '<table><thead><tr><th>Status</th><th>ID</th><th>Item</th><th>Regulation</th><th>Notes</th></tr></thead><tbody>';
    rd.constructionCompliance.forEach(function(it) {
        var rowClass = it.status === 'complete' ? 'row-complete' : it.status === 'not-applicable' ? 'row-na' : it.status === 'in-progress' ? 'row-ip' : '';
        h += '<tr class="' + rowClass + '"><td>' + formatStatus(it.status) + '</td><td>' + escapeHtml(it.id) + '</td><td>' + escapeHtml(it.title) + '</td><td style="font-size:10px">' + escapeHtml(it.regulationRef) + '</td><td>' + escapeHtml(it.notes) + '</td></tr>';
    });
    h += '</tbody></table>';
    h += '</div>';

    // ============================================================
    // SECTION 9 — INFORMATION MANAGEMENT AND HANDOVER
    // ============================================================
    h += '<div class="page" style="page-break-after:always">';
    h += '<h1 class="section-title">Information Management and Handover</h1>';
    h += '<p style="font-size:13px;color:#4a5568;margin-bottom:14px">This section records the project information management, evidence trail, and handover readiness status.</p>';
    h += '<table><thead><tr><th>Status</th><th>ID</th><th>Item</th><th>Regulation</th><th>Notes</th></tr></thead><tbody>';
    rd.informationHandover.forEach(function(it) {
        var rowClass = it.status === 'complete' ? 'row-complete' : it.status === 'not-applicable' ? 'row-na' : it.status === 'in-progress' ? 'row-ip' : '';
        h += '<tr class="' + rowClass + '"><td>' + formatStatus(it.status) + '</td><td>' + escapeHtml(it.id) + '</td><td>' + escapeHtml(it.title) + '</td><td style="font-size:10px">' + escapeHtml(it.regulationRef) + '</td><td>' + escapeHtml(it.notes) + '</td></tr>';
    });
    h += '</tbody></table>';
    h += '</div>';

    // ============================================================
    // SECTION 10 — PD REVIEW SUMMARY
    // ============================================================
    h += '<div class="page" style="page-break-after:always">';
    h += '<h1 class="section-title">PD Review Summary</h1>';
    h += '<div class="summary-box"><strong>Review Status Overview</strong>';
    h += '<div class="summary-grid">';
    h += '<div class="summary-stat"><span class="num">' + rd.reviewSummary.reviewed + '</span><span class="lbl">Reviewed</span></div>';
    h += '<div class="summary-stat"><span class="num">' + rd.reviewSummary.accepted + '</span><span class="lbl">Accepted for Report</span></div>';
    h += '<div class="summary-stat"><span class="num">' + rd.reviewSummary.queryRaised + '</span><span class="lbl">Query Raised</span></div>';
    h += '<div class="summary-stat"><span class="num">' + rd.reviewSummary.notReviewed + '</span><span class="lbl">Not Reviewed</span></div>';
    h += '</div></div>';
    // Review notes
    if (rd.reviewSummary.notes.length > 0) {
        h += '<h2>Review Notes</h2>';
        h += '<table><thead><tr><th>Item</th><th>Status</th><th>PD Review Notes</th></tr></thead><tbody>';
        rd.reviewSummary.notes.forEach(function(n) {
            var rsClass2 = n.status === 'Reviewed' ? 'rs-reviewed' : n.status === 'Accepted for Report' ? 'rs-accepted' : n.status === 'Query Raised' ? 'rs-query' : 'rs-not-reviewed';
            h += '<tr><td>' + escapeHtml(n.reqId) + '</td><td><span class="review-status ' + rsClass2 + '">' + escapeHtml(n.status) + '</span></td><td style="white-space:pre-wrap">' + escapeHtml(n.comment) + '</td></tr>';
        });
        h += '</tbody></table>';
    }
    h += '</div>';

    // ============================================================
    // SECTION 11 — PRINCIPAL DESIGNER DECLARATION
    // ============================================================
    h += '<div class="page">';
    h += '<h1 class="section-title">Principal Designer Declaration</h1>';
    h += '<div class="declaration-box">';
    h += '<div class="declaration-text">' + escapeHtml(rd.declaration.text) + '</div>';
    h += '<div class="sign-grid">';
    h += '<div><div class="sign-field">' + escapeHtml(rd.declaration.name || '') + '</div><div class="sign-label">Name</div></div>';
    h += '<div><div class="sign-field">' + escapeHtml(rd.declaration.organisation || '') + '</div><div class="sign-label">Organisation</div></div>';
    h += '<div><div class="sign-field">' + escapeHtml(rd.declaration.signature || '') + '</div><div class="sign-label">Signature</div></div>';
    h += '<div><div class="sign-field">' + escapeHtml(rd.declaration.date || '') + '</div><div class="sign-label">Date</div></div>';
    h += '</div></div>';

    // Report footer
    h += '<div class="report-footer">';
    h += '<strong>Report generated:</strong> ' + new Date().toLocaleString() + '<br>';
    h += '<strong>Application:</strong> AHS Compliance Consulting \u2014 Building Regulations Compliance Tracker<br>';
    h += '<strong>Report Type:</strong> Final Building Regulations Compliance Report (Consolidated)';
    h += '</div></div>';

    h += '</body></html>';
    return h;
}
