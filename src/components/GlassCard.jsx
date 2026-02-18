import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

const GlassCard = ({ children, className, delay = 0 }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            className={cn(
                "glass p-6 rounded-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1",
                className
            )}
        >
            {children}
        </motion.div>
    );
};

export default GlassCard;
