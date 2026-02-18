import React from 'react';
import { Bell, Search, Sun, Moon, User } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useToast } from '../context/ToastContext';
import { motion } from 'framer-motion';

const Navbar = () => {
    const { isDark, toggleTheme } = useTheme();
    const { showToast } = useToast();

    return (
        <motion.header
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            className="h-20 glass sticky top-0 z-40 px-8 flex items-center justify-between ml-20 md:ml-64 transition-all duration-500"
        >
            <div className="flex-1 max-w-xl">
                <div className="relative group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-medical-600 transition-colors" size={18} />
                    <input
                        type="text"
                        placeholder="Search patients, scans or reports..."
                        onKeyPress={(e) => e.key === 'Enter' && showToast(`Searching for "${e.target.value}"...`, "info")}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-100/50 dark:bg-slate-800/50 border border-transparent focus:border-medical-600/50 focus:bg-white dark:focus:bg-slate-900 outline-none transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={toggleTheme}
                    className="p-2.5 rounded-xl glass hover:bg-medical-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-all"
                >
                    {isDark ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <button
                    onClick={() => showToast("Opening notifications center...", "info")}
                    className="p-2.5 rounded-xl glass hover:bg-medical-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 relative"
                >
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
                </button>

                <div className="h-10 w-[1px] bg-slate-200 dark:bg-slate-800 mx-2"></div>

                <button
                    onClick={() => showToast("Opening admin profile settings...", "info")}
                    className="flex items-center gap-3 p-1.5 pl-3 rounded-xl hover:bg-medical-50 dark:hover:bg-slate-800 transition-all"
                >
                    <span className="text-sm font-medium dark:text-slate-200 hidden lg:block">Medical Admin</span>
                    <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                        <User size={20} className="text-slate-500" />
                    </div>
                </button>
            </div>
        </motion.header>
    );
};

export default Navbar;
