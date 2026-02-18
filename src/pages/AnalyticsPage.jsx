import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    AreaChart, Area, PieChart, Pie, Cell, ComposedChart, Line
} from 'recharts';
import { Loader2, TrendingUp, PieChartIcon, Calendar, Download, FileSpreadsheet, FileText } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { useToast } from '../context/ToastContext';
import { cn } from '../utils/cn';

const initialMonthlyData = [
    { month: 'Jan', scans: 450, precision: 98.2, risk: 12 },
    { month: 'Feb', scans: 520, precision: 99.1, risk: 10 },
    { month: 'Mar', scans: 610, precision: 98.8, risk: 15 },
    { month: 'Apr', scans: 580, precision: 99.4, risk: 8 },
    { month: 'May', scans: 720, precision: 99.7, risk: 14 },
    { month: 'Jun', scans: 850, precision: 99.8, risk: 9 },
];

const diseaseData = [
    { name: 'Pneumonia', value: 35, color: '#0e91e9' },
    { name: 'Fractures', value: 25, color: '#10b981' },
    { name: 'Tumors', value: 20, color: '#f59e0b' },
    { name: 'Normal', value: 20, color: '#6366f1' },
];

const performanceData = [
    { month: 'Jan', scans: 450, accuracy: 98.2 },
    { month: 'Feb', scans: 520, accuracy: 99.1 },
    { month: 'Mar', scans: 610, accuracy: 98.8 },
    { month: 'Apr', scans: 580, accuracy: 99.4 },
    { month: 'May', scans: 720, accuracy: 99.7 },
    { month: 'Jun', scans: 850, accuracy: 99.8 },
];

const riskData = [
    { label: 'Critical', count: 12 },
    { label: 'High', count: 28 },
    { label: 'Moderate', count: 145 },
    { label: 'Low', count: 420 },
    { label: 'Normal', count: 850 },
];

const AnalyticsPage = () => {
    const { showToast } = useToast();

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold dark:text-white">Clinical Analytics</h1>
                    <p className="text-slate-500 mt-1">Deep insights into AI performance and diagnostic trends.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => showToast("Filtering by custom date range...", "info")}
                        className="px-4 py-2.5 glass dark:text-white rounded-xl flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all font-medium"
                    >
                        <Calendar size={18} /> Last 6 Months
                    </button>
                    <div className="group relative">
                        <button className="px-6 py-2.5 bg-medical-600 text-white rounded-xl flex items-center gap-2 shadow-lg shadow-medical-600/30 hover:bg-medical-700 transition-all font-bold">
                            <Download size={18} /> Export Data
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 p-2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-10">
                            <button
                                onClick={() => showToast("Generating Excel file...", "info")}
                                className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-sm flex items-center gap-2 dark:text-slate-300"
                            >
                                <FileSpreadsheet size={16} /> Excel (.xlsx)
                            </button>
                            <button
                                onClick={() => showToast("Generating PDF analytics report...", "info")}
                                className="w-full text-left px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-sm flex items-center gap-2 dark:text-slate-300"
                            >
                                <FileText size={16} /> PDF Report
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Performance Trends */}
                <GlassCard delay={0.1}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <h3 className="text-xl font-bold dark:text-white">AI Diagnostic Accuracy vs Volume</h3>
                        <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
                            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-medical-500"></span> Volume</div>
                            <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500"></span> Accuracy</div>
                        </div>
                    </div>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <ComposedChart data={performanceData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis yAxisId="right" orientation="right" domain={[95, 100]} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', backdropFilter: 'blur(10px)' }}
                                />
                                <Bar yAxisId="left" dataKey="scans" fill="#0e91e9" radius={[6, 6, 0, 0]} barSize={40} />
                                <Line yAxisId="right" type="monotone" dataKey="accuracy" stroke="#10b981" strokeWidth={4} dot={{ r: 6, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} />
                            </ComposedChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                {/* Risk Distribution */}
                <GlassCard delay={0.2}>
                    <h3 className="text-xl font-bold dark:text-white mb-8">Risk Level Heat Distribution</h3>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={riskData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" opacity={0.3} />
                                <XAxis type="number" hide />
                                <YAxis dataKey="label" type="category" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12, fontWeight: 'bold' }} />
                                <Tooltip
                                    cursor={{ fill: 'transparent' }}
                                    contentStyle={{ backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', border: 'none' }}
                                />
                                <Bar dataKey="count" radius={[0, 10, 10, 0]} barSize={32}>
                                    {riskData.map((entry, index) => (
                                        <Bar key={`bar-${index}`} dataKey="count" fill={index > 3 ? '#f43f5e' : index > 2 ? '#f59e0b' : '#0e91e9'} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-5 gap-2 mt-4">
                        {riskData.map((r, i) => (
                            <div key={i} className="text-center">
                                <div className="text-xs font-bold dark:text-white">{r.count}</div>
                                <div className="text-[10px] text-slate-500 uppercase tracking-tighter">{r.label}</div>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatSummaryCard label="Platform Latency" value="24ms" sub="Avg processing time" trend="-2ms" />
                <StatSummaryCard label="Peak Scan Time" value="11:30 AM" sub="High traffic window" trend="Stable" />
                <StatSummaryCard label="Team Usage" value="86%" sub="Seats utilized" trend="+4%" />
            </div>
        </div>
    );
};

const StatSummaryCard = ({ label, value, sub, trend }) => (
    <GlassCard className="text-center">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-2">{label}</div>
        <div className="text-3xl font-bold dark:text-white mb-1 tracking-tight">{value}</div>
        <div className="text-sm text-slate-400 mb-4">{sub}</div>
        <div className={cn(
            "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold",
            trend.startsWith('+') ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30" :
                trend.startsWith('-') ? "text-medical-600 bg-medical-50 dark:bg-medical-950/30" :
                    "text-slate-500 bg-slate-100 dark:bg-slate-800"
        )}>
            {trend}
        </div>
    </GlassCard>
);

export default AnalyticsPage;
