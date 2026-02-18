import React from 'react';
import { motion } from 'framer-motion';
import {
    ArrowRight,
    ShieldCheck,
    Brain,
    Zap,
    ChevronRight,
    Activity,
    Upload,
    ChartLine
} from 'lucide-react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 overflow-x-hidden">
            {/* Navbar */}
            <nav className="fixed top-0 w-full z-50 glass px-8 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-medical-600 font-bold text-2xl">
                    <Activity className="w-8 h-8" />
                    <span>AI Medical Imaging</span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-slate-600 dark:text-slate-300 font-medium">
                    <a href="#features" className="hover:text-medical-600 transition-colors">Features</a>
                    <a href="#how-it-works" className="hover:text-medical-600 transition-colors">How it Works</a>
                    <a href="#testimonials" className="hover:text-medical-600 transition-colors">Testimonials</a>
                    <Link to="/dashboard" className="px-6 py-2.5 bg-medical-600 text-white rounded-xl shadow-lg shadow-medical-600/30 hover:bg-medical-700 transition-all">
                        Open App
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-8 max-w-7xl mx-auto flex flex-col items-center">
                {/* Decorative elements */}
                <div className="absolute top-20 left-10 w-64 h-64 bg-medical-200/30 dark:bg-medical-900/10 blur-[100px] rounded-full -z-10"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200/30 dark:bg-blue-900/10 blur-[120px] rounded-full -z-10"></div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-6"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-medical-50 dark:bg-medical-900/30 text-medical-600 dark:text-medical-400 text-sm font-semibold border border-medical-100 dark:border-medical-800">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-medical-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-medical-500"></span>
                        </span>
                        New: V2.0 Diagnostic Engine is Live
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
                        AI-Powered Medical <br />
                        <span className="bg-gradient-to-r from-medical-600 to-blue-500 bg-clip-text text-transparent">Imaging Intelligence</span>
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed">
                        Advanced diagnostic assistance platform for healthcare professionals.
                        Accelerate screenings, detect anomalies with 99.8% accuracy, and improve patient outcomes.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                        <Link to="/upload" className="w-full sm:w-auto px-8 py-4 bg-medical-600 text-white rounded-2xl flex items-center justify-center gap-2 text-lg font-semibold shadow-xl shadow-medical-600/30 hover:bg-medical-700 hover:scale-105 transition-all group">
                            Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link to="/dashboard" className="w-full sm:w-auto px-8 py-4 glass text-slate-700 dark:text-slate-200 rounded-2xl flex items-center justify-center gap-2 text-lg font-semibold hover:bg-slate-50 dark:hover:bg-slate-900 transition-all">
                            View Demo
                        </Link>
                    </div>
                </motion.div>

                {/* Feature Preview Cards */}
                <div className="grid md:grid-cols-3 gap-8 mt-24">
                    <FeatureCard
                        icon={<Brain className="w-8 h-8 text-indigo-500" />}
                        title="Advanced AI Model"
                        description="Trained on 10M+ medical images across 50+ clinical conditions."
                        delay={0.1}
                    />
                    <FeatureCard
                        icon={<ShieldCheck className="w-8 h-8 text-emerald-500" />}
                        title="HIPAA Compliant"
                        description="Enterprise-grade security with end-to-end encryption for patient data."
                        delay={0.2}
                    />
                    <FeatureCard
                        icon={<Zap className="w-8 h-8 text-amber-500" />}
                        title="Real-time Analysis"
                        description="Get comprehensive diagnostic reports in under 30 seconds."
                        delay={0.3}
                    />
                </div>
            </section>

            {/* Trust Counters */}
            <section className="bg-slate-50 dark:bg-slate-900/50 py-20 px-8 border-y border-slate-100 dark:border-slate-800">
                <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                    <StatCounter value="500+" label="Hospitals & Clinics" />
                    <StatCounter value="12M+" label="Images Analyzed" />
                    <StatCounter value="99.8%" label="AI Accuracy Rate" />
                    <StatCounter value="25,000+" label="Specialists Onboarded" />
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-8 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2 text-medical-600 font-bold text-xl">
                        <Activity className="w-6 h-6" />
                        <span>AI Med</span>
                    </div>
                    <div className="flex gap-8 text-slate-500 dark:text-slate-400 text-sm">
                        <a href="#" className="hover:text-medical-600 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-medical-600 transition-colors">Terms of Service</a>
                        <a href="#" className="hover:text-medical-600 transition-colors">Contact Us</a>
                    </div>
                    <p className="text-slate-400 text-sm">© 2026 AI Medical Imaging. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

const FeatureCard = ({ icon, title, description, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay }}
        viewport={{ once: true }}
        className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none hover:border-medical-500/30 transition-all group"
    >
        <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
        <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{description}</p>
    </motion.div>
);

const StatCounter = ({ value, label }) => (
    <div>
        <div className="text-4xl font-bold text-slate-900 dark:text-white mb-2">{value}</div>
        <div className="text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider text-sm">{label}</div>
    </div>
);

export default LandingPage;
