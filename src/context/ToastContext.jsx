import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const showToast = useCallback((message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 4000);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed bottom-8 right-8 z-[100] space-y-4">
                <AnimatePresence>
                    {toasts.map(toast => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 100, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 100, scale: 0.9 }}
                            className={`flex items-center gap-3 p-4 rounded-2xl shadow-2xl min-w-[300px] border backdrop-blur-md ${toast.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600' :
                                    toast.type === 'error' ? 'bg-rose-500/10 border-rose-500/20 text-rose-600' :
                                        'bg-blue-500/10 border-blue-500/20 text-blue-600'
                                }`}
                        >
                            {toast.type === 'success' && <CheckCircle2 size={24} />}
                            {toast.type === 'error' && <AlertCircle size={24} />}
                            {toast.type === 'info' && <Info size={24} />}
                            <p className="flex-1 font-bold text-sm">{toast.message}</p>
                            <button onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}>
                                <X size={18} className="opacity-50 hover:opacity-100 transition-opacity" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
