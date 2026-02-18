import React from 'react';
import { motion } from 'framer-motion';
import {
    Activity,
    Users,
    ShieldAlert,
    CheckCircle2,
    TrendingUp,
    Clock,
    MoreVertical,
    ExternalLink,
    X
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell
} from 'recharts';
import GlassCard from '../components/GlassCard';
import { useToast } from '../context/ToastContext';
import { cn } from '../utils/cn';

import { generateMedicalPDF } from '../utils/pdfExport';

const initialData = [
    { name: 'Mon', scans: 45, date: '2026-02-12' },
    { name: 'Tue', scans: 52, date: '2026-02-13' },
    { name: 'Wed', scans: 38, date: '2026-02-14' },
    { name: 'Thu', scans: 65, date: '2026-02-15' },
    { name: 'Fri', scans: 48, date: '2026-02-16' },
    { name: 'Sat', scans: 32, date: '2026-02-17' },
    { name: 'Sun', scans: 20, date: '2026-02-18' },
];

const dashboardActivities = [
    { id: "P-8429", name: "John Smith", type: "Chest X-Ray", status: "Success", time: "12 mins ago", conf: "99.2%", date: '2026-02-18' },
    { id: "P-3105", name: "Sarah Connor", type: "Brain MRI", status: "Pending", time: "45 mins ago", conf: "--", date: '2026-02-18' },
    { id: "P-7721", name: "Mike Ross", type: "CT Scan", status: "Warning", time: "1 hour ago", conf: "85.4%", date: '2026-02-15' },
    { id: "P-1284", name: "Rachel Zane", type: "Skin Derm", status: "Success", time: "2 hours ago", conf: "98.7%", date: '2026-02-10' },
    { id: "P-9902", name: "Harvey Specter", type: "Chest X-Ray", status: "Success", time: "5 hours ago", conf: "99.5%", date: '2026-02-05' },
    { id: "P-4432", name: "Donna Paulsen", type: "Brain MRI", status: "Success", time: "1 day ago", conf: "98.2%", date: '2026-02-17' },
];

const pieData = [
    { name: 'Pneumonia', value: 40, color: '#0e91e9' },
    { name: 'Brain Tumor', value: 25, color: '#10b981' },
    { name: 'Fracture', value: 20, color: '#f59e0b' },
    { name: 'Other', value: 15, color: '#6366f1' },
];

const Dashboard = () => {
    const { showToast } = useToast();
    const [filter, setFilter] = React.useState('All');
    const [showAllLogs, setShowAllLogs] = React.useState(false);

    const filteredData = React.useMemo(() => {
        if (filter === 'All') return initialData;
        const days = filter === 'Last 7 Days' ? 7 : 30;
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);
        return initialData.filter(d => new Date(d.date) >= cutoff);
    }, [filter]);

    const filteredActivities = React.useMemo(() => {
        if (filter === 'All') return dashboardActivities;
        const days = filter === 'Last 7 Days' ? 7 : 30;
        const cutoff = new Date();
        cutoff.setDate(cutoff.getDate() - days);
        return dashboardActivities.filter(d => new Date(d.date) >= cutoff);
    }, [filter]);

    const handleGenerateReport = () => {
        showToast("Generating comprehensive executive report...", "info");
        const reportData = {
            name: "Dr. John Doe (Admin)",
            id: "STAFF-001",
            age: "N/A",
            gender: "N/A",
            scanType: "Executive Summary",
            date: new Date().toLocaleDateString(),
            findings: [
                ['Total Scans', '1,248', '+12%'],
                ['AI Accuracy', '99.8%', 'Stable'],
                ['Critical Cases', '12', 'Immediate Action'],
                ['System Status', 'Optimal', 'Green']
            ],
            summary: "Executive summary for the AI Medical Platform. Significant volume increase in Chest X-Ray modules. AI Diagnostic accuracy remains above target thresholds. Recommended action: Review High-Risk anomalies in Ward 4."
        };
        setTimeout(() => {
            generateMedicalPDF(reportData, "Executive Diagnostic Summary", "Executive_Report.pdf");
            showToast("Report downloaded successfully", "success");
        }, 1500);
    };

    return (
        <div className="space-y-8 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold dark:text-white">Radiology Command Center</h1>
                    <p className="text-slate-500 mt-1">Good morning, Dr. Doe. Here's what's happening today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="glass px-4 py-2 rounded-xl flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-sm font-medium dark:text-slate-300">System Online</span>
                    </div>
                    <button
                        onClick={handleGenerateReport}
                        className="px-6 py-2.5 bg-medical-600 text-white rounded-xl shadow-lg shadow-medical-600/30 hover:bg-medical-700 transition-all font-medium"
                    >
                        Generate Report
                    </button>
                </div>
            </div>

            {/* KPI Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KpiCard
                    icon={<Activity className="text-medical-600" />}
                    label="Total Scans"
                    value="1,248"
                    trend="+12%"
                    delay={0.1}
                />
                <KpiCard
                    icon={<CheckCircle2 className="text-emerald-600" />}
                    label="AI Accuracy"
                    value="99.8%"
                    trend="+0.2%"
                    delay={0.2}
                />
                <KpiCard
                    icon={<Users className="text-indigo-600" />}
                    label="Active Cases"
                    value="54"
                    trend="-5"
                    delay={0.3}
                />
                <KpiCard
                    icon={<ShieldAlert className="text-rose-600" />}
                    label="Risk Alerts"
                    value="12"
                    trend="+3"
                    delay={0.4}
                    isWarning
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Chart */}
                <GlassCard className="lg:col-span-2 min-h-[400px]" delay={0.5}>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold dark:text-white">Scan Volume Trends</h3>
                            <p className="text-sm text-slate-500">Weekly analysis of imaging requests</p>
                        </div>
                        <select
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm px-3 py-1.5 focus:ring-2 ring-medical-500 dark:text-slate-300 outline-none"
                        >
                            <option value="All">Show All</option>
                            <option value="Last 7 Days">Last 7 Days</option>
                            <option value="Last 30 Days">Last 30 Days</option>
                        </select>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={filteredData}>
                                <defs>
                                    <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#0e91e9" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#0e91e9" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                        borderRadius: '12px',
                                        border: 'none',
                                        boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                                        backdropFilter: 'blur(8px)'
                                    }}
                                />
                                <Area type="monotone" dataKey="scans" stroke="#0e91e9" strokeWidth={3} fillOpacity={1} fill="url(#colorScans)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                {/* Pie Chart */}
                <GlassCard delay={0.6}>
                    <h3 className="text-lg font-bold dark:text-white mb-6">Diagnosis Distribution</h3>
                    <div className="h-[250px] w-full flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="space-y-3 mt-4">
                        {pieData.map((item) => (
                            <div key={item.name} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                    <span className="text-slate-600 dark:text-slate-400">{item.name}</span>
                                </div>
                                <span className="font-bold dark:text-white tracking-widest leading-6">{item.value}%</span>
                            </div>
                        ))}
                    </div>
                </GlassCard>
            </div>

            {/* Recent Activity Table */}
            <GlassCard delay={0.7} className="overflow-hidden">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold dark:text-white">Recent Activity</h3>
                    <button
                        onClick={() => setShowAllLogs(true)}
                        className="text-medical-600 hover:text-medical-700 text-sm font-semibold flex items-center gap-1"
                    >
                        View All <ExternalLink size={14} />
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-100 dark:border-slate-800">
                                <th className="pb-4 font-semibold text-slate-500 uppercase text-xs tracking-wider">Patient ID</th>
                                <th className="pb-4 font-semibold text-slate-500 uppercase text-xs tracking-wider">Scan Type</th>
                                <th className="pb-4 font-semibold text-slate-500 uppercase text-xs tracking-wider">Status</th>
                                <th className="pb-4 font-semibold text-slate-500 uppercase text-xs tracking-wider">Time</th>
                                <th className="pb-4 font-semibold text-slate-500 uppercase text-xs tracking-wider">Confidence</th>
                                <th className="pb-4 text-slate-500 uppercase text-xs tracking-wider"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {filteredActivities.slice(0, 5).map(activity => (
                                <ActivityRow key={activity.id} {...activity} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </GlassCard>

            {/* View All Logs Modal */}
            <AnimatePresence>
                {showAllLogs && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowAllLogs(false)}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-4xl max-h-[80vh] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                        >
                            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
                                <h2 className="text-xl font-bold dark:text-white">Full Activity History</h2>
                                <button onClick={() => setShowAllLogs(false)} className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-full transition-colors">
                                    <X size={24} className="text-slate-500" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-6">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-slate-100 dark:border-slate-800">
                                            <th className="pb-4 font-semibold text-slate-500 uppercase text-xs tracking-wider">Patient Name</th>
                                            <th className="pb-4 font-semibold text-slate-500 uppercase text-xs tracking-wider">ID</th>
                                            <th className="pb-4 font-semibold text-slate-500 uppercase text-xs tracking-wider">Scan</th>
                                            <th className="pb-4 font-semibold text-slate-500 uppercase text-xs tracking-wider">Status</th>
                                            <th className="pb-4 font-semibold text-slate-500 uppercase text-xs tracking-wider">Date</th>
                                            <th className="pb-4 text-slate-500"></th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                        {dashboardActivities.map(activity => (
                                            <tr key={activity.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
                                                <td className="py-4 dark:text-white font-medium">{activity.name}</td>
                                                <td className="py-4 text-sm text-slate-500">{activity.id}</td>
                                                <td className="py-4 text-sm text-slate-500">{activity.type}</td>
                                                <td className="py-4">
                                                    <span className={cn(
                                                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase",
                                                        activity.status === 'Success' ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600" :
                                                            activity.status === 'Warning' ? "bg-rose-100 dark:bg-rose-900/30 text-rose-600" :
                                                                "bg-amber-100 dark:bg-amber-900/30 text-amber-600"
                                                    )}>
                                                        {activity.status}
                                                    </span>
                                                </td>
                                                <td className="py-4 text-xs text-slate-400">{activity.date}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

const KpiCard = ({ icon, label, value, trend, delay, isWarning }) => (
    <GlassCard delay={delay} className={cn("relative overflow-hidden group", isWarning && "border-rose-500/20")}>
        <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 group-hover:scale-110 transition-transform duration-500">
                {icon}
            </div>
            <div className={cn(
                "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg",
                trend.startsWith('+') ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30" : "text-rose-600 bg-rose-50 dark:bg-rose-950/30"
            )}>
                <TrendingUp size={12} className={trend.startsWith('-') && "rotate-180"} />
                {trend}
            </div>
        </div>
        <div className="text-slate-500 dark:text-slate-400 text-sm font-medium">{label}</div>
        <div className="text-2xl font-bold dark:text-white mt-1">{value}</div>
    </GlassCard>
);

const ActivityRow = ({ id, type, status, time, conf }) => (
    <tr className="group hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors">
        <td className="py-4 font-medium dark:text-slate-300">{id}</td>
        <td className="py-4 dark:text-slate-400">{type}</td>
        <td className="py-4">
            <span className={cn(
                "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                status === 'Success' ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600" :
                    status === 'Warning' ? "bg-rose-100 dark:bg-rose-900/30 text-rose-600" :
                        "bg-amber-100 dark:bg-amber-900/30 text-amber-600"
            )}>
                {status}
            </span>
        </td>
        <td className="py-4 text-sm text-slate-500 flex items-center gap-2">
            <Clock size={14} /> {time}
        </td>
        <td className="py-4 font-bold dark:text-white">{conf}</td>
        <td className="py-4 text-right">
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                <MoreVertical size={16} className="text-slate-400" />
            </button>
        </td>
    </tr>
);

export default Dashboard;
