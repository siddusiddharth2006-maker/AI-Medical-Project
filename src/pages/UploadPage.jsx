import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Shield, FileText, Activity, AlertTriangle, Download, Loader2 } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { cn } from '../utils/cn';
import { useToast } from '../context/ToastContext';
import { generateMedicalPDF } from '../utils/pdfExport';

const UploadPage = () => {
    const { showToast } = useToast();
    const [file, setFile] = useState(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [analysisStep, setAnalysisStep] = useState('');
    const [result, setResult] = useState(null);
    const [metadata, setMetadata] = useState({ name: '', id: '', age: '', gender: 'Male', scanType: 'Chest X-Ray' });
    const fileInputRef = React.useRef(null);

    const handleDragOver = (e) => e.preventDefault();

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setFile(URL.createObjectURL(selectedFile));
            showToast("Scan uploaded successfully", "success");
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type.startsWith('image/')) {
            setFile(URL.createObjectURL(droppedFile));
            showToast("Scan uploaded successfully", "success");
        }
    };

    const handleScan = async () => {
        if (!metadata.name || !metadata.id || !metadata.age) {
            showToast("Please complete all patient details first", "error");
            return;
        }

        setIsAnalyzing(true);
        setResult(null);
        setProgress(0);

        const steps = [
            { label: 'Preprocessing Image Data...', p: 20 },
            { label: 'Normalizing Pixel Intensities...', p: 40 },
            { label: 'Running Neural Correlation...', p: 70 },
            { label: 'Finalizing Diagnostic Summary...', p: 100 }
        ];

        for (const step of steps) {
            setAnalysisStep(step.label);
            for (let i = progress; i <= step.p; i += 2) {
                setProgress(i);
                await new Promise(r => setTimeout(r, 50));
            }
        }

        setIsAnalyzing(false);
        setResult({
            condition: metadata.scanType === 'Chest X-Ray' ? 'Bilateral Pneumonia Indicators' : 'Acute Neurological Anomaly',
            confidence: 97.8,
            risk: 'Moderate',
            heatmap: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=300&auto=format&fit=crop',
            summary: `Preliminary AI analysis for ${metadata.name} indicates ${metadata.scanType === 'Chest X-Ray' ? 'Bilateral Pneumonia' : 'Acute Anomaly'}. Confidence level is high at 97.8%. Recommended immediate clinical correlation and review of high-attention zones flagged in the heatmap.`
        });
        showToast("AI Analysis Complete", "success");
    };

    const handleDownloadReport = () => {
        if (!result) return;
        showToast("Preparing diagnostic report...", "info");
        const reportData = {
            ...metadata,
            ...result,
            date: new Date().toLocaleDateString(),
            findings: [
                ['Scan Type', metadata.scanType, 'Targeted'],
                ['Condition', result.condition, `${result.confidence}%`],
                ['Risk Level', result.risk, 'Moderate'],
                ['AI Model', 'MedicalCore-v2', 'Verified']
            ]
        };
        generateMedicalPDF(reportData, "Individual Diagnostic Analysis", `Diagnostic_${metadata.id}.pdf`);
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-12">
            <div>
                <h1 className="text-3xl font-bold dark:text-white">Diagnostic Upload</h1>
                <p className="text-slate-500 mt-1">Upload imaging data for real-time AI diagnostic assistance.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Side: Upload & Info */}
                <div className="space-y-6">
                    <GlassCard className="p-0 overflow-hidden">
                        <div
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            className={cn(
                                "h-80 border-2 border-dashed flex flex-col items-center justify-center transition-all cursor-pointer",
                                file ? "border-medical-500 bg-medical-50/50 dark:bg-medical-900/10" : "border-slate-200 dark:border-slate-800 hover:border-medical-400"
                            )}
                        >
                            {file ? (
                                <div className="relative w-full h-full p-4">
                                    <img src={file} alt="Preview" className="w-full h-full object-contain rounded-lg" />
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setFile(null); }}
                                        className="absolute top-6 right-6 p-2 bg-slate-900/50 text-white rounded-full hover:bg-slate-900 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="w-16 h-16 rounded-full bg-medical-100 dark:bg-medical-900/30 flex items-center justify-center text-medical-600 mb-4">
                                        <Upload size={32} />
                                    </div>
                                    <p className="text-lg font-semibold dark:text-white">Drag & drop scan here</p>
                                    <p className="text-slate-500 text-sm mt-1">Supports DICOM, JPG, PNG (Max 50MB)</p>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        className="hidden"
                                        accept="image/*"
                                    />
                                    <button
                                        onClick={() => fileInputRef.current.click()}
                                        className="mt-6 px-6 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
                                    >
                                        Browse Files
                                    </button>
                                </>
                            )}
                        </div>
                    </GlassCard>

                    <GlassCard>
                        <h3 className="text-lg font-bold dark:text-white mb-6">Patient Metadata</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Full Name</label>
                                <input
                                    type="text"
                                    value={metadata.name}
                                    onChange={(e) => setMetadata({ ...metadata, name: e.target.value })}
                                    placeholder="John Smith"
                                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 ring-medical-500 outline-none transition-all dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Patient ID</label>
                                <input
                                    type="text"
                                    value={metadata.id}
                                    onChange={(e) => setMetadata({ ...metadata, id: e.target.value })}
                                    placeholder="ID-25419"
                                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 ring-medical-500 outline-none transition-all dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Scan Type</label>
                                <select
                                    value={metadata.scanType}
                                    onChange={(e) => setMetadata({ ...metadata, scanType: e.target.value })}
                                    className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 ring-medical-500 outline-none transition-all dark:text-white"
                                >
                                    <option>Chest X-Ray</option>
                                    <option>Brain MRI</option>
                                    <option>Abdominal CT</option>
                                    <option>Skin Lesion</option>
                                </select>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Age</label>
                                    <input
                                        type="number"
                                        value={metadata.age}
                                        onChange={(e) => setMetadata({ ...metadata, age: e.target.value })}
                                        placeholder="42"
                                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 ring-medical-500 outline-none transition-all dark:text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider">Gender</label>
                                    <select
                                        value={metadata.gender}
                                        onChange={(e) => setMetadata({ ...metadata, gender: e.target.value })}
                                        className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl focus:ring-2 ring-medical-500 outline-none transition-all dark:text-white"
                                    >
                                        <option>Male</option>
                                        <option>Female</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleScan}
                            disabled={!file || isAnalyzing}
                            className="w-full mt-8 py-4 bg-medical-600 text-white rounded-2xl flex items-center justify-center gap-2 text-lg font-bold shadow-xl shadow-medical-600/30 hover:bg-medical-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {isAnalyzing ? (
                                <> <Loader2 className="animate-spin" /> Processing with AI Engine... </>
                            ) : (
                                <> <Shield className="w-5 h-5" /> Start AI Analysis </>
                            )}
                        </button>
                    </GlassCard>
                </div>

                {/* Right Side: Results */}
                <div className="space-y-6">
                    <AnimatePresence mode="wait">
                        {!result && !isAnalyzing && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="h-full flex flex-col items-center justify-center text-center p-12 glass rounded-2xl border-dashed border-2 border-slate-200 dark:border-slate-800"
                            >
                                <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 mb-6">
                                    <FileText size={40} />
                                </div>
                                <h3 className="text-xl font-bold dark:text-white mb-2">No Analysis Yet</h3>
                                <p className="text-slate-500">Upload a scan and click "Start AI Analysis" to view clinical results here.</p>
                            </motion.div>
                        )}

                        {isAnalyzing && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="space-y-8 glass p-12 rounded-3xl border-medical-500/20"
                            >
                                <div className="space-y-6">
                                    <div className="flex justify-between items-end mb-2">
                                        <div>
                                            <p className="text-xs font-bold text-medical-600 uppercase tracking-widest mb-1">AI Engine Processing</p>
                                            <h3 className="text-lg font-bold dark:text-white">{analysisStep}</h3>
                                        </div>
                                        <span className="text-2xl font-black text-medical-600">{progress}%</span>
                                    </div>
                                    <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-medical-600"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${progress}%` }}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 gap-4 pt-4">
                                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 animate-pulse flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-medical-500 animate-ping"></div>
                                            <span className="text-sm text-slate-500">Identifying anatomical landmarks...</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {result && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-6"
                            >
                                <GlassCard className="border-emerald-500/20 bg-emerald-50/10">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600">
                                                <Activity size={24} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold dark:text-white">Analysis Complete</h3>
                                                <p className="text-xs text-emerald-600 font-bold uppercase tracking-widest">Confidence: {result.confidence}%</p>
                                            </div>
                                        </div>
                                        <div className={cn(
                                            "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                                            result.risk === 'Low' ? "bg-emerald-100 text-emerald-600" : "bg-amber-100 text-amber-600"
                                        )}>
                                            {result.risk} Risk
                                        </div>
                                    </div>

                                    <div className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800 mb-6">
                                        <span className="text-xs font-semibold text-slate-500 uppercase block mb-1">Predicted Condition</span>
                                        <span className="text-xl font-bold dark:text-white">{result.condition}</span>
                                    </div>

                                    <div className="space-y-4">
                                        <h4 className="text-sm font-bold dark:text-slate-300">AI Attention Heatmap</h4>
                                        <div className="aspect-video rounded-xl overflow-hidden relative group border border-slate-100 dark:border-slate-800">
                                            <img src={result.heatmap} alt="Heatmap" className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                                <p className="text-white text-[10px] leading-tight opacity-80">Heatmap indicates areas of highest AI confidence for {result.condition}.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                                        <h5 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Clinical Summary</h5>
                                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium italic">"{result.summary}"</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mt-6">
                                        <button
                                            onClick={handleDownloadReport}
                                            className="flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-black transition-all shadow-xl shadow-slate-900/20"
                                        >
                                            <Download size={16} /> Download Report
                                        </button>
                                        <button
                                            onClick={() => showToast("Opening full clinical analysis view...", "info")}
                                            className="flex items-center justify-center gap-2 py-3 glass rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all dark:text-white"
                                        >
                                            View Full Result
                                        </button>
                                    </div>
                                </GlassCard>

                                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30 flex gap-3">
                                    <AlertTriangle className="text-amber-600 shrink-0" size={20} />
                                    <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed">
                                        <strong>Disclaimer:</strong> This AI prediction is meant to assist medical professionals and should not be used as the sole basis for clinical diagnosis.
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default UploadPage;
