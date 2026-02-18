import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Upload,
    FileText,
    BarChart3,
    MessageSquare,
    Settings,
    Activity,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: Upload, label: 'Upload Scan', path: '/upload' },
    { icon: FileText, label: 'Reports', path: '/reports' },
    { icon: BarChart3, label: 'Analytics', path: '/analytics' },
    { icon: MessageSquare, label: 'AI Assistant', path: '/assistant' },
    { icon: Settings, label: 'Settings', path: '/settings' },
];

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    return (
        <motion.aside
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            className={cn(
                "glass h-screen fixed left-0 top-0 transition-all duration-500 z-50 flex flex-col",
                isCollapsed ? "w-20" : "w-64"
            )}
        >
            <div className="p-6 flex items-center justify-between">
                {!isCollapsed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-medical-600 font-bold text-xl"
                    >
                        <Activity className="w-8 h-8" />
                        <span>AI Med</span>
                    </motion.div>
                )}
                {isCollapsed && <Activity className="w-8 h-8 text-medical-600 mx-auto" />}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-medical-600 transition-colors"
                >
                    {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>
            </div>

            <nav className="flex-1 mt-6 px-3 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => cn(
                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                            isActive
                                ? "bg-medical-600 text-white shadow-lg shadow-medical-600/30"
                                : "text-slate-500 hover:bg-medical-50 dark:hover:bg-slate-800 hover:text-medical-600"
                        )}
                    >
                        <item.icon size={22} className={cn("min-w-[22px]", !isCollapsed && "mr-1")} />
                        {!isCollapsed && (
                            <motion.span
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                            >
                                {item.label}
                            </motion.span>
                        )}
                        {isCollapsed && (
                            <div className="absolute left-full ml-6 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity">
                                {item.label}
                            </div>
                        )}
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-slate-100 dark:border-slate-800">
                {!isCollapsed && (
                    <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                        <div className="w-10 h-10 rounded-full bg-medical-600 flex items-center justify-center text-white font-bold">
                            JD
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold dark:text-white">Dr. John Doe</span>
                            <span className="text-xs text-slate-500">Sr. Radiologist</span>
                        </div>
                    </div>
                )}
            </div>
        </motion.aside>
    );
};

export default Sidebar;
