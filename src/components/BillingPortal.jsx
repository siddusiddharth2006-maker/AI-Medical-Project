import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    CreditCard,
    History,
    ShieldCheck,
    Download,
    CheckCircle2,
    ArrowUpRight,
    Zap,
    Plus,
    X,
    ExternalLink
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { useToast } from '../context/ToastContext';
import { cn } from '../utils/cn';

const plans = [
    { name: 'Professional', price: '$499/mo', features: ['500 AI Scans/mo', 'Full PDF Reports', 'Team Collaboration', '24/7 Support'], active: true },
    { name: 'Enterprise', price: 'Custom', features: ['Unlimited Scans', 'Priority API Access', 'Custom AI Training', 'Dedicated Manager'], active: false },
];

const invoices = [
    { id: 'INV-2026-001', date: 'Feb 01, 2026', amount: '$499.00', status: 'Paid' },
    { id: 'INV-2026-002', date: 'Jan 01, 2026', amount: '$499.00', status: 'Paid' },
];

const BillingPortal = ({ isOpen, onClose }) => {
    const { showToast } = useToast();
    const [selectedPlan, setSelectedPlan] = useState('Professional');

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                className="relative w-full max-w-5xl bg-slate-50 dark:bg-slate-900 rounded-[40px] shadow-3xl overflow-hidden border border-white/20"
            >
                {/* Header */}
                <div className="p-8 md:p-12 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900">
                    <div className="flex items-center gap-6">
                        <div className="w-16 h-16 bg-slate-900 rounded-3xl flex items-center justify-center text-white shadow-2xl">
                            <CreditCard size={32} />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black dark:text-white leading-tight">Enterprise Billing Portal</h2>
                            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Manage your subscription, invoices, and payments</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-4 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all">
                        <X size={32} className="text-slate-400" />
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-200 dark:divide-slate-800 max-h-[70vh] overflow-y-auto">
                    {/* Left: Subscription & Payment */}
                    <div className="lg:w-7/12 p-12 space-y-12">
                        <section>
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-black dark:text-white uppercase tracking-wider flex items-center gap-2">
                                    <Zap className="text-medical-600" /> Active Selection
                                </h3>
                                <div className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-widest">Auto-Renew: ON</div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {plans.map((plan) => (
                                    <div
                                        key={plan.name}
                                        onClick={() => setSelectedPlan(plan.name)}
                                        className={cn(
                                            "relative p-8 rounded-[32px] cursor-pointer transition-all border-4",
                                            selectedPlan === plan.name
                                                ? "bg-slate-900 border-medical-500 shadow-2xl scale-[1.02]"
                                                : "bg-white dark:bg-slate-800 border-transparent hover:border-slate-300 dark:hover:border-slate-700"
                                        )}
                                    >
                                        {selectedPlan === plan.name && (
                                            <div className="absolute -top-3 -right-3 w-8 h-8 bg-medical-500 rounded-full flex items-center justify-center text-white shadow-lg">
                                                <CheckCircle2 size={20} />
                                            </div>
                                        )}
                                        <h4 className={cn("text-lg font-black uppercase tracking-widest mb-1", selectedPlan === plan.name ? "text-medical-500" : "text-slate-500")}>{plan.name}</h4>
                                        <div className={cn("text-3xl font-black mb-6", selectedPlan === plan.name ? "text-white" : "dark:text-white")}>{plan.price}</div>
                                        <ul className="space-y-3">
                                            {plan.features.map(f => (
                                                <li key={f} className={cn("text-sm flex items-center gap-2", selectedPlan === plan.name ? "text-slate-400" : "text-slate-500")}>
                                                    <div className="w-1.5 h-1.5 rounded-full bg-medical-500" /> {f}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                            <button className="mt-8 w-full py-5 bg-medical-600 text-white rounded-3xl font-black text-lg shadow-xl shadow-medical-600/30 hover:bg-medical-700 transition-all flex items-center justify-center gap-3 active:scale-[0.98]">
                                Update Subscription Plan <ArrowUpRight size={22} />
                            </button>
                        </section>

                        <section className="p-8 rounded-[32px] bg-slate-900 text-white border border-slate-800 shadow-2xl">
                            <h3 className="text-sm font-black uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
                                <CreditCard size={18} /> Default Payment Method
                            </h3>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-6">
                                    <div className="w-16 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-[10px] font-black italic tracking-tighter shadow-lg">VISA</div>
                                    <div>
                                        <p className="font-black text-lg">•••• •••• •••• 4242</p>
                                        <p className="text-xs text-slate-500 font-bold">Expires 12/28</p>
                                    </div>
                                </div>
                                <button className="text-xs font-black uppercase tracking-widest text-medical-500 hover:underline">Edit Method</button>
                            </div>
                        </section>
                    </div>

                    {/* Right: History & Legal */}
                    <div className="lg:w-5/12 p-12 bg-white dark:bg-slate-900/50 space-y-12">
                        <section>
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-black dark:text-white uppercase tracking-wider flex items-center gap-2">
                                    <History className="text-indigo-600" /> Invoice History
                                </h3>
                                <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500 hover:text-medical-600 transition-all">
                                    <Plus size={18} />
                                </button>
                            </div>
                            <div className="space-y-4">
                                {invoices.map(inv => (
                                    <div key={inv.id} className="p-6 rounded-2xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{inv.date}</span>
                                            <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 rounded text-[10px] font-black uppercase">{inv.status}</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-black dark:text-white">{inv.id}</p>
                                                <p className="text-sm text-slate-500 font-bold">{inv.amount}</p>
                                            </div>
                                            <button
                                                onClick={() => showToast(`Downloading ${inv.id} PDF...`, "success")}
                                                className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 dark:text-white flex items-center justify-center group-hover:bg-medical-600 group-hover:text-white transition-all shadow-sm"
                                            >
                                                <Download size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="space-y-4">
                            <div className="p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/20 flex gap-4">
                                <ShieldCheck size={32} className="text-indigo-600 shrink-0" />
                                <div>
                                    <h4 className="text-sm font-black text-indigo-900 dark:text-indigo-400 uppercase tracking-widest mb-1">Tax & Legal</h4>
                                    <p className="text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed">Ensure your VAT ID and corporate details are up to date for compliant medical billing.</p>
                                    <button className="mt-3 text-[10px] font-black uppercase text-indigo-600 hover:underline flex items-center gap-1">Update Details <ArrowUpRight size={12} /></button>
                                </div>
                            </div>
                            <a href="#" className="flex items-center justify-between p-6 rounded-2xl border border-slate-100 dark:border-slate-800 text-sm font-black dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                                View Full Billing Terms <ExternalLink size={16} className="text-slate-400" />
                            </a>
                        </section>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default BillingPortal;
