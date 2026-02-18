import { jsPDF } from "jspdf";
import "jspdf-autotable";

/**
 * Standard Professional Medical Report Generator
 * @param {Object} data - The report data (patient info, results, metadata)
 * @param {string} title - Report title (e.g., "Diagnostic Imaging Report")
 * @param {string} filename - Output filename
 */
export const generateMedicalPDF = (data, title = "Diagnostic Imaging Report", filename = "Report.pdf") => {
    const doc = jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();

    // -- Header Section --
    doc.setFillColor(14, 145, 233); // Medical Blue
    doc.rect(0, 0, pageWidth, 40, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("AI MEDICAL PLATFORM", 20, 25);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Imaging & Diagnostic Intelligence Center", 20, 32);
    doc.text(new Date().toLocaleString(), pageWidth - 60, 25);

    // -- Title Section --
    doc.setTextColor(30, 41, 59);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(title.toUpperCase(), 20, 60);

    // -- Patient Information --
    doc.setFontSize(12);
    doc.setDrawColor(226, 232, 240);
    doc.line(20, 65, pageWidth - 20, 65);

    doc.text("PATIENT INFORMATION", 20, 75);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);

    const patientInfo = [
        ["Patient Name:", data.name || "N/A", "Patient ID:", data.id || "N/A"],
        ["Age:", data.age || "N/A", "Gender:", data.gender || "N/A"],
        ["Scan Type:", data.scanType || "N/A", "Scan Date:", data.date || new Date().toLocaleDateString()]
    ];

    doc.autoTable({
        startY: 80,
        head: [],
        body: patientInfo,
        theme: 'plain',
        styles: { fontSize: 10, cellPadding: 2 },
        columnStyles: {
            0: { fontStyle: 'bold', cellWidth: 35 },
            2: { fontStyle: 'bold', cellWidth: 35 }
        }
    });

    // -- Clinical Findings --
    const finalY = doc.lastAutoTable.finalY + 15;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text("CLINICAL FINDINGS & AI ANALYSIS", 20, finalY);

    doc.autoTable({
        startY: finalY + 5,
        head: [['Finding', 'Value/Status', 'Confidence']],
        body: data.findings || [
            ['Condition', data.condition || 'N/A', `${data.confidence || 0}%`],
            ['Risk Level', data.risk || 'Low', '-'],
            ['Status', 'Verified by AI Core v2.0', '-']
        ],
        theme: 'striped',
        headStyles: { fillColor: [14, 145, 233] },
        styles: { fontSize: 10 }
    });

    // -- Summary Section --
    const summaryY = doc.lastAutoTable.finalY + 15;
    doc.setFont("helvetica", "bold");
    doc.text("CLINICAL SUMMARY", 20, summaryY);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const splitSummary = doc.splitTextToSize(data.summary || "No clinical summary provided for this scan.", pageWidth - 40);
    doc.text(splitSummary, 20, summaryY + 8);

    // -- Footer --
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(`AI Medical Platform - Secure Diagnostic Intelligence System | Page ${i} of ${pageCount}`, pageWidth / 2, doc.internal.pageSize.getHeight() - 10, { align: 'center' });
    }

    doc.save(filename);
};
