import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User,
    Lock,
    Bell,
    Monitor,
    CreditCard,
    Camera,
    Upload,
    Mail,
    Shield,
    ShieldCheck,
    Key,
    X
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { useToast } from '../context/ToastContext';
import { cn } from '../utils/cn';
import BillingPortal from '../components/BillingPortal';

const SettingsPage = () => {
    const { showToast } = useToast();
    const [activeTab, setActiveTab] = useState('profile');
    const [isBillingOpen, setIsBillingOpen] = useState(false);
    const [profile, setProfile] = useState({
        name: 'Dr. John Doe',
        email: 'john.doe@hospital.ai',
        role: 'Chief Radiologist',
        hospital: 'St. Mary\'s Intelligence Center',
        bio: 'Specializing in neural diagnostics and AI-assisted oncology.',
        photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=200&auto=format&fit=crop'
    });

    const handleProfileSave = (e) => {
        e.preventDefault();
        showToast("Personal professional data updated successfully", "success");
    };

    const handleCameraPhoto = () => {
        showToast("Accessing encrypted camera stream...", "info");
        setTimeout(() => {
            showToast("Profile identity photo captured", "success");
        }, 1500);
    };

    const handleFileSelect = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                setProfile(prev => ({ ...prev, photo: URL.createObjectURL(file) }));
                showToast("Profile image uploaded", "success");
            }
        };
        input.click();
    };

    return (
        <div className="space-y-8 pb-12 overflow-x-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black dark:text-white">Platform Configuration</h1>
                    <p className="text-slate-500 mt-1">Manage your identity, security, and enterprise subscription</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => setIsBillingOpen(true)}
                        className="flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl shadow-xl hover:bg-black transition-all font-bold group"
                    >
                        <CreditCard size={18} className="group-hover:rotate-12 transition-transform" /> Manage Billing
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-1 space-y-2">
                    <TabButton active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={<User size={18} />} label="Identity Profile" />
                    <TabButton active={activeTab === 'security'} onClick={() => setActiveTab('security')} icon={<Lock size={18} />} label="Security & Access" />
                    <TabButton active={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} icon={<Bell size={18} />} label="Alert Preferences" />
                    <TabButton active={activeTab === 'system'} onClick={() => setActiveTab('system')} icon={<Monitor size={18} />} label="Engine Settings" />
                </div>

                {/* Content Area */}
                <div className="lg:col-span-3">
                    <AnimatePresence mode="wait">
                        {activeTab === 'profile' && (
                            <motion.div
                                key="profile"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-8"
                            >
                                <GlassCard className="p-8 md:p-12 overflow-hidden relative">
                                    <div className="absolute top-0 right-0 p-8 opacity-5">
                                        <User size={160} className="text-slate-900" />
                                    </div>
                                    <form onSubmit={handleProfileSave} className="space-y-12">
                                        <div className="flex flex-col md:flex-row items-center gap-10">
                                            <div className="relative group">
                                                <div className="w-40 h-40 rounded-[40px] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl relative">
                                                    <img src={profile.photo} alt="Profile" className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700" />
                                                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <Camera className="text-white" size={32} />
                                                    </div>
                                                </div>
                                                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                                    <button type="button" onClick={handleCameraPhoto} className="p-2.5 bg-medical-600 text-white rounded-xl shadow-lg hover:bg-medical-700 active:scale-90 transition-all">
                                                        <Camera size={16} />
                                                    </button>
                                                    <button type="button" onClick={handleFileSelect} className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-white rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 active:scale-90 transition-all">
                                                        <Upload size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="flex-1 space-y-4">
                                                <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Clinical Identity</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    <Input label="Full Medical Name" value={profile.name} onChange={(val) => setProfile(p => ({ ...p, name: val }))} />
                                                    <Input label="Specialization" value={profile.role} onChange={(val) => setProfile(p => ({ ...p, role: val }))} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                                            <Input label="Professional Email" value={profile.email} onChange={(val) => setProfile(p => ({ ...p, email: val }))} icon={<Mail size={16} />} />
                                            <Input label="Affiliated Hospital" value={profile.hospital} onChange={(val) => setProfile(p => ({ ...p, hospital: val }))} icon={<Shield size={16} />} />
                                            <div className="md:col-span-2">
                                                <label className="text-xs font-black text-slate-400 uppercase tracking-widest mb-2 block pl-1">Professional Biography</label>
                                                <textarea
                                                    value={profile.bio}
                                                    onChange={(e) => setProfile(p => ({ ...p, bio: e.target.value }))}
                                                    className="w-full h-32 p-4 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-2xl outline-none focus:ring-2 ring-medical-500 transition-all dark:text-white text-sm font-medium resize-none shadow-inner-sm"
                                                />
                                            </div>
                                        </div>

                                        <div className="flex justify-end">
                                            <button type="submit" className="px-12 py-4 bg-medical-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-medical-600/30 hover:bg-medical-700 transition-all active:scale-95">
                                                Securely Save Professional Identity
                                            </button>
                                        </div>
                                    </form>
                                </GlassCard>
                            </motion.div>
                        )}

                        {activeTab === 'security' && (
                            <motion.div key="security" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-6">
                                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <SecurityCard
                                        icon={<ShieldCheck className="text-emerald-500" size={24} />}
                                        title="Two-Factor Authentication"
                                        desc="Add an extra layer of clinical data protection."
                                        enabled={true}
                                    />
                                    <SecurityCard
                                        icon={<Key className="text-indigo-500" size={24} />}
                                        title="Biometric Login"
                                        desc="Use FaceID or Fingerprint for instant access."
                                        enabled={false}
                                    />
                                </section>
                                <GlassCard>
                                    <h3 className="font-black dark:text-white uppercase tracking-wider mb-6">Active Professional Sessions</h3>
                                    <div className="space-y-4">
                                        <SessionItem device="MacBook Pro" location="London, UK (Station Dr-04)" current />
                                        <SessionItem device="iPad Pro" location="San Francisco, US" />
                                    </div>
                                </GlassCard>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <BillingPortal isOpen={isBillingOpen} onClose={() => setIsBillingOpen(false)} />
        </div>
    );
};

const TabButton = ({ active, onClick, icon, label }) => (
    <button
        onClick={onClick}
        className={cn(
            "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all",
            active
                ? "bg-slate-900 text-white shadow-2xl scale-[1.05]"
                : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/50"
        )}
    >
        {icon}
        {label}
    </button>
);

const Input = ({ label, value, onChange, icon }) => (
    <div className="space-y-2">
        <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">{label}</label>
        <div className="relative group">
            {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-medical-600 transition-colors">{icon}</div>}
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={cn(
                    "w-full py-3 bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl outline-none focus:ring-2 ring-medical-500 transition-all dark:text-white text-sm font-bold shadow-inner-sm px-4",
                    icon ? "pl-11" : ""
                )}
            />
        </div>
    </div>
);

const SecurityCard = ({ icon, title, desc, enabled }) => {
    const [isOn, setIsOn] = useState(enabled);
    return (
        <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center">{icon}</div>
                <button
                    onClick={() => setIsOn(!isOn)}
                    className={cn(
                        "w-12 h-6 rounded-full transition-all relative",
                        isOn ? "bg-medical-600" : "bg-slate-200 dark:bg-slate-700"
                    )}
                >
                    <motion.div animate={{ x: isOn ? 24 : 4 }} className="w-4 h-4 bg-white rounded-full absolute top-1 shadow-sm" />
                </button>
            </div>
            <h4 className="font-black dark:text-white text-sm uppercase tracking-widest mb-1">{title}</h4>
            <p className="text-xs text-slate-500 font-medium">{desc}</p>
        </GlassCard>
    );
};

const SessionItem = ({ device, location, current }) => (
    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
        <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-slate-500">
                <Monitor size={20} />
            </div>
            <div>
                <p className="font-bold dark:text-white text-sm">{device} {current && <span className="ml-2 text-[10px] bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded font-black uppercase">Current</span>}</p>
                <p className="text-xs text-slate-500 font-medium">{location}</p>
            </div>
        </div>
        <button className="text-[10px] font-black uppercase text-rose-500 hover:underline">Revoke Access</button>
    </div>
);

export default SettingsPage;
