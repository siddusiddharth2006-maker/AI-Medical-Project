import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, User, Bot, Sparkles, ChevronRight, Stethoscope, Pill, AlertCircle, X, Shield } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { cn } from '../utils/cn';
import { getGeminiResponse } from '../utils/gemini';
import { useToast } from '../context/ToastContext';

const initialMessages = [
    { id: 1, type: 'bot', text: 'Hello, Dr. Doe. I am your AI Virtual Health Assistant. I have clinical tools and real-time database access active. How can I help today?', time: '10:00 AM' },
];

const suggestedQuestions = [
    "Check Patient P-8429 status",
    "Summarize last Chest X-Ray",
    "Set medication reminder",
    "Symptom check protocols"
];

const AssistantPage = () => {
    const { showToast } = useToast();
    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [activeModal, setActiveModal] = useState(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [messages, isTyping]);

    const handleSend = async (textInput = input) => {
        const currentInput = typeof textInput === 'string' ? textInput.trim() : input.trim();
        if (!currentInput) return;

        const userMsg = { id: Date.now(), type: 'user', text: currentInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setMessages(prev => [...prev, userMsg]);
        if (textInput === input) setInput('');
        setIsTyping(true);

        // Call Gemini (with Fallback Engine)
        const responseText = await getGeminiResponse(currentInput);

        const botMsg = {
            id: Date.now() + 1,
            type: 'bot',
            text: responseText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, botMsg]);
        setIsTyping(false);
    };

    const clearChat = () => {
        setMessages([{ id: Date.now(), type: 'bot', text: 'Chat cleared. How else can I assist with your clinical workflow?', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
        showToast("Chat history cleared locally", "info");
    };

    const handleReviewNow = () => {
        showToast("Opening High-Priority Ward 4 Anomaly Report...", "info");
        setActiveModal({
            title: "Ward 4 Anomaly Report",
            content: (
                <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/20 rounded-2xl">
                        <Shield size={32} className="text-rose-600" />
                        <div>
                            <h4 className="font-black text-rose-700 dark:text-rose-400">Critical Anomaly Detected</h4>
                            <p className="text-sm text-rose-600">3 high-risk detections in Ward 4 scan batch.</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-l-4 border-rose-500">
                            <p className="text-xs font-bold text-slate-400 mb-1 font-black underline uppercase">Patient P-9912 (Chest CT)</p>
                            <p className="text-sm dark:text-white">Detected Pulmonary Embolism Indicators. Accuracy: 94%.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border-l-4 border-amber-500">
                            <p className="text-xs font-bold text-slate-400 mb-1 font-black underline uppercase">Patient P-8821 (Abdominal MRI)</p>
                            <p className="text-sm dark:text-white">Atypical vascular structure in renal artery. Correlation advised.</p>
                        </div>
                    </div>
                </div>
            )
        });
    };

    return (
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 h-[calc(100vh-160px)] min-h-[600px] pb-8">
            {/* Chat Area */}
            <div className="xl:col-span-2 flex flex-col h-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/20">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-medical-600 flex items-center justify-center text-white relative">
                            <Bot size={24} />
                            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></span>
                        </div>
                        <div>
                            <h3 className="font-black dark:text-white">AI Clinical Assistant</h3>
                            <p className="text-xs text-emerald-600 font-black uppercase tracking-widest">Active Intelligence Engine</p>
                        </div>
                    </div>
                    <button onClick={clearChat} className="p-2 text-slate-400 hover:text-rose-500 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide">
                    {messages.map((msg) => (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={msg.id}
                            className={cn(
                                "flex gap-4 max-w-[85%]",
                                msg.type === 'user' ? "ml-auto flex-row-reverse" : ""
                            )}
                        >
                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm",
                                msg.type === 'user' ? "bg-slate-100 dark:bg-slate-800 text-slate-500" : "bg-medical-50 dark:bg-medical-900/30 text-medical-600"
                            )}>
                                {msg.type === 'user' ? <User size={20} /> : <Bot size={20} />}
                            </div>
                            <div className="space-y-1">
                                <div className={cn(
                                    "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
                                    msg.type === 'user'
                                        ? "bg-slate-900 text-white rounded-tr-none border border-black"
                                        : "bg-slate-50 dark:bg-slate-800 dark:text-slate-300 rounded-tl-none border border-slate-100 dark:border-slate-700"
                                )}>
                                    {msg.text}
                                </div>
                                <p className={cn("text-[10px] text-slate-400 font-medium", msg.type === 'user' ? "text-right" : "")}>{msg.time}</p>
                            </div>
                        </motion.div>
                    ))}
                    {isTyping && (
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-xl bg-medical-50 dark:bg-medical-900/30 flex items-center justify-center text-medical-600">
                                <Bot size={20} />
                            </div>
                            <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl flex gap-1 items-center border border-slate-100 dark:border-slate-700">
                                <span className="w-1.5 h-1.5 bg-medical-500 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-medical-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                <span className="w-1.5 h-1.5 bg-medical-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Input */}
                <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/20">
                    <div className="flex flex-wrap gap-2 mb-4">
                        {suggestedQuestions.map((q) => (
                            <button
                                key={q}
                                onClick={() => handleSend(q)}
                                className="px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 hover:border-medical-500 hover:text-medical-600 transition-all shadow-sm"
                            >
                                {q}
                            </button>
                        ))}
                    </div>
                    <div className="relative group">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask me for patient status, clinical advice, or data lookup..."
                            className="w-full pl-6 pr-14 py-4 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 ring-medical-500 transition-all dark:text-white shadow-xl"
                        />
                        <button
                            onClick={() => handleSend()}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-medical-600 text-white rounded-xl flex items-center justify-center hover:bg-medical-700 transition-all shadow-lg shadow-medical-600/30 active:scale-90"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Side Panels */}
            <div className="space-y-6 overflow-y-auto pr-2 scrollbar-hide">
                <GlassCard>
                    <div className="flex items-center gap-2 mb-4 text-emerald-600">
                        <Stethoscope size={20} />
                        <h4 className="font-black text-sm uppercase tracking-widest">Clinical Toolkit</h4>
                    </div>
                    <div className="space-y-3">
                        <ToolItem label="Symptom Checker" onClick={() => setActiveModal({ title: "Symptom Checker", content: <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-sm font-medium dark:text-slate-300">Enter symptoms to correlate with recent scan data and ICD-11 protocols. <button className="mt-4 w-full py-2 bg-medical-600 text-white rounded-lg">Launch Checker</button></div> })} />
                        <ToolItem label="Dosage Calculator" onClick={() => setActiveModal({ title: "Clinical Dosage Calculator", content: <div className="space-y-4"><div className="grid grid-cols-2 gap-4"><input className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg" placeholder="Patient Weight (kg)" /><input className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg" placeholder="Medication" /></div><button className="w-full py-3 bg-medical-600 text-white rounded-xl font-bold">Calculate Dosage</button></div> })} />
                        <ToolItem label="Lab Reference Range" onClick={() => setActiveModal({ title: "Lab Reference System", content: <p className="text-sm dark:text-white">Active lab ranges for Hematology, Metabolic Panel, and Lipid Profile are currently synced with Ward 4 standard.</p> })} />
                        <ToolItem label="ICD-11 Lookup" onClick={() => setActiveModal({ title: "ICD-11 Official Registry", content: <input className="w-full p-4 bg-slate-100 dark:bg-slate-800 rounded-xl" placeholder="Search ICD-11 codes..." /> })} />
                    </div>
                </GlassCard>

                <GlassCard className="border-indigo-500/20">
                    <div className="flex items-center gap-2 mb-4 text-indigo-600">
                        <Pill size={20} />
                        <h4 className="font-black text-sm uppercase tracking-widest">Active Reminders</h4>
                    </div>
                    <div className="space-y-3">
                        <ReminderItem
                            time="12:00 PM"
                            text="Patient P-3105 Meds"
                            color="bg-indigo-500"
                            onClick={() => setActiveModal({ title: "Medication Reminder", content: <p className="text-sm dark:text-white">Patient: Sarah Connor (P-3105). Dosage: 50mg Lisinopril. Status: Pending administration.</p> })}
                        />
                        <ReminderItem time="01:30 PM" text="Radiology Team Meeting" color="bg-emerald-500" />
                        <ReminderItem time="04:00 PM" text="New Lab Reports Review" color="bg-medical-500" />
                    </div>
                </GlassCard>

                <div className="p-6 rounded-2xl bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:scale-125 transition-transform">
                        <Shield size={64} className="text-rose-600" />
                    </div>
                    <div className="flex items-center gap-2 mb-2 text-rose-600">
                        <AlertCircle size={20} />
                        <h4 className="font-black text-sm">Priority Clinical Alert</h4>
                    </div>
                    <p className="text-xs text-rose-800 dark:text-rose-200 leading-normal font-bold">
                        3 High-Risk anomalies detected in the last scan batch for Ward 4. Review immediately.
                    </p>
                    <button
                        onClick={handleReviewNow}
                        className="mt-3 w-full py-2.5 bg-rose-600 text-white rounded-xl text-xs font-black shadow-lg shadow-rose-600/20 hover:bg-rose-700 transition-all flex items-center justify-center gap-1"
                    >
                        Review Anomaly Now <ChevronRight size={14} />
                    </button>
                </div>
            </div>

            {/* Global Tool Modal */}
            <AnimatePresence>
                {activeModal && (
                    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveModal(null)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
                        <motion.div initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }} className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden">
                            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
                                <h3 className="text-lg font-black dark:text-white uppercase tracking-widest">{activeModal.title}</h3>
                                <button onClick={() => setActiveModal(null)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors"><X size={24} /></button>
                            </div>
                            <div className="p-8">
                                {activeModal.content}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

const ToolItem = ({ label, onClick }) => (
    <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 hover:bg-medical-50 dark:hover:bg-medical-900/30 hover:text-medical-600 transition-all text-sm font-black dark:text-slate-300 border border-slate-100 dark:border-slate-700 shadow-sm"
    >
        {label} <ChevronRight size={16} />
    </button>
);

const ReminderItem = ({ time, text, color, onClick }) => (
    <button
        onClick={onClick}
        className="w-full flex items-center gap-3 p-4 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 relative overflow-hidden text-left hover:scale-[1.02] transition-transform active:scale-95 group"
    >
        <div className={cn("w-1.5 h-full absolute left-0 rounded-l-xl opacity-60 group-hover:opacity-100 transition-opacity", color)}></div>
        <div className="shrink-0 text-xs font-black text-slate-500 uppercase">{time}</div>
        <div className="text-sm font-bold dark:text-slate-300 truncate">{text}</div>
    </button>
);

export default AssistantPage;
