import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, FileText, Download, Eye, Calendar, User, Activity, X } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { cn } from '../utils/cn';
import { useToast } from '../context/ToastContext';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { generateMedicalPDF } from '../utils/pdfExport';

const allReports = [
    { id: 'P-8429', name: 'John Smith', type: 'Chest X-Ray', date: '2026-02-18', status: 'Completed', result: 'Bilateral Pneumonia Indicators', conf: 99.2, age: 45, gender: 'Male' },
    { id: 'P-3105', name: 'Sarah Connor', type: 'MRI', date: '2026-02-17', status: 'Completed', result: 'Normal Brain Scan', conf: 98.4, age: 34, gender: 'Female' },
    { id: 'P-7721', name: 'Mike Ross', type: 'CT Scan', date: '2026-02-16', status: 'Partial', result: 'Acute Anomaly Detected', conf: 85.4, age: 29, gender: 'Male' },
    { id: 'P-1284', name: 'Rachel Zane', type: 'Dermatology', date: '2026-02-15', status: 'Completed', result: 'Benign Lesion', conf: 98.7, age: 28, gender: 'Female' },
    { id: 'P-9902', name: 'Harvey Specter', type: 'Chest X-Ray', date: '2026-02-14', status: 'Completed', result: 'Cardiomegaly Trace', conf: 99.5, age: 52, gender: 'Male' },
    { id: 'P-4432', name: 'Donna Paulsen', type: 'MRI', date: '2026-02-13', status: 'Completed', result: 'No Significant Findings', conf: 98.2, age: 40, gender: 'Female' },
];

const ReportsPage = () => {
    const { showToast } = useToast();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');
    const [selectedReport, setSelectedReport] = useState(null);

    const filteredReports = allReports.filter(report => {
        const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) || report.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'All' || report.type === filterType;
        return matchesSearch && matchesType;
    });

    const handleExportList = () => {
        showToast("Generating comprehensive patient list...", "info");
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.setTextColor(14, 145, 233);
        doc.text("AI MEDICAL - PATIENT REPORT LIST", 20, 20);
        doc.setFontSize(10);
        doc.setTextColor(100);
        doc.text(`Generated on: ${new Date().toLocaleString()}`, 20, 28);

        const tableData = filteredReports.map(r => [r.id, r.name, r.type, r.date, r.status, `${r.conf}%`]);
        doc.autoTable({
            startY: 35,
            head: [['Patient ID', 'Full Name', 'Scan Type', 'Scan Date', 'Status', 'Accuracy']],
            body: tableData,
            theme: 'striped',
            headStyles: { fillColor: [14, 145, 233] }
        });

        doc.save(`Patient_List_${filterType}.pdf`);
        showToast("Patient list exported successfully", "success");
    };

    const handleDownloadReport = (report) => {
        showToast(`Preparing report for ${report.name}...`, "info");
        const reportData = {
            name: report.name,
            id: report.id,
            age: report.age,
            gender: report.gender,
            scanType: report.type,
            date: report.date,
            condition: report.result,
            confidence: report.conf,
            risk: report.conf < 90 ? 'Moderate' : 'Low',
            findings: [
                ['Scan Category', report.type, 'Targeted'],
                ['AI Conclusion', report.result, `${report.conf}%`],
                ['Review Status', 'Finalized', 'System Verified']
            ],
            summary: `Automated summary for ${report.name}. The ${report.type} scan performed on ${report.date} shows ${report.result}. Statistical confidence is ${report.conf}%. No urgent revision needed based on standard protocol.`
        };
        generateMedicalPDF(reportData, "Detailed Patient Report", `Report_${report.id}.pdf`);
    };

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold dark:text-white">Diagnostic Reports</h1>
                    <p className="text-slate-500 mt-1">Review and manage clinical diagnostic findings</p>
                </div>
                <button
                    onClick={handleExportList}
                    className="px-6 py-2.5 bg-slate-900 text-white rounded-xl shadow-lg hover:bg-black transition-all font-bold flex items-center gap-2"
                >
                    <Download size={18} /> Export List
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Search & Filter */}
                <div className="lg:col-span-1 space-y-6">
                    <GlassCard>
                        <h3 className="font-bold dark:text-white mb-4">Search & Filters</h3>
                        <div className="space-y-4">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search patients..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl outline-none focus:ring-2 ring-medical-500 transition-all dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Scan Type</p>
                                <div className="space-y-1">
                                    {['All', 'Chest X-Ray', 'MRI', 'CT Scan', 'Dermatology'].map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setFilterType(type)}
                                            className={cn(
                                                "w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                                filterType === type
                                                    ? "bg-medical-600 text-white shadow-lg shadow-medical-600/30"
                                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                                            )}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                </div>

                {/* Report Grid */}
                <div className="lg:col-span-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <AnimatePresence>
                            {filteredReports.map((report, index) => (
                                <motion.div
                                    key={report.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <ReportCard
                                        report={report}
                                        onView={() => setSelectedReport(report)}
                                        onDownload={() => handleDownloadReport(report)}
                                    />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                    {filteredReports.length === 0 && (
                        <div className="text-center py-20 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800">
                            <p className="text-slate-500 font-bold">No reports found matching your criteria</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Detailed View Modal */}
            <AnimatePresence>
                {selectedReport && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedReport(null)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-medical-50 dark:bg-medical-900/30">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-medical-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-medical-600/30">
                                        <FileText size={28} />
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black dark:text-white leading-tight">Patient Diagnostic Brief</h2>
                                        <p className="text-sm text-medical-600 font-bold">Secure ID: {selectedReport.id}</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedReport(null)} className="p-2 hover:bg-white dark:hover:bg-slate-700 rounded-full transition-colors shadow-sm">
                                    <X size={24} className="text-slate-500" />
                                </button>
                            </div>
                            <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Patient Details</h4>
                                        <div className="space-y-2">
                                            <p className="text-sm dark:text-slate-300"><span className="font-bold text-slate-600 dark:text-slate-500 mr-2">NAME:</span> {selectedReport.name}</p>
                                            <p className="text-sm dark:text-slate-300"><span className="font-bold text-slate-600 dark:text-slate-500 mr-2">AGE:</span> {selectedReport.age}</p>
                                            <p className="text-sm dark:text-slate-300"><span className="font-bold text-slate-600 dark:text-slate-500 mr-2">SCAN:</span> {selectedReport.type}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                                        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">AI Result Metrics</h4>
                                        <div className="space-y-2">
                                            <p className="text-sm dark:text-slate-300"><span className="font-bold text-slate-600 dark:text-slate-500 mr-2">ACCURACY:</span> {selectedReport.conf}%</p>
                                            <p className="text-sm dark:text-slate-300"><span className="font-bold text-slate-600 dark:text-slate-500 mr-2">STATUS:</span> {selectedReport.status}</p>
                                            <p className="text-sm font-bold text-emerald-600 italic underline">Verified</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 bg-slate-900 text-slate-300 rounded-2xl shadow-inner-lg border border-slate-800">
                                    <h4 className="text-xs font-black text-medical-500 uppercase tracking-widest mb-4">Clinical Findings</h4>
                                    <p className="text-sm leading-relaxed font-medium">"{selectedReport.result}. Analysis indicates no immediate surgical urgency, but clinical correlation with patient history is advised. Automated flagged zones have been sent to original radiology department."</p>
                                </div>
                                <button
                                    onClick={() => handleDownloadReport(selectedReport)}
                                    className="w-full py-4 bg-medical-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-medical-600/30 hover:bg-medical-700 transition-all flex items-center justify-center gap-3 active:scale-95"
                                >
                                    <Download size={22} /> Download Final Report
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ReportCard = ({ report, onView, onDownload }) => (
    <GlassCard className="group">
        <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl group-hover:bg-medical-600 group-hover:text-white transition-all duration-300">
                <FileText size={24} />
            </div>
            <span className={cn(
                "px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider",
                report.status === 'Completed' ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"
            )}>
                {report.status}
            </span>
        </div>
        <h4 className="font-bold text-lg dark:text-white mb-1">{report.name}</h4>
        <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-slate-500 font-medium">{report.id}</span>
            <span className="text-xs text-slate-300">•</span>
            <span className="text-xs text-medical-600 font-bold">{report.type}</span>
        </div>
        <div className="flex items-center justify-between text-xs mb-6 text-slate-400">
            <span className="flex items-center gap-1 font-medium"><Calendar size={14} /> {report.date}</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
            <button
                onClick={onView}
                className="py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            >
                View Full
            </button>
            <button
                onClick={onDownload}
                className="py-2.5 px-4 bg-medical-50 dark:bg-medical-900/30 text-medical-600 dark:text-medical-400 hover:bg-medical-600 hover:text-white rounded-xl text-xs font-bold transition-all shadow-sm border border-medical-500/20"
            >
                Download
            </button>
        </div>
    </GlassCard>
);

export default ReportsPage;
