import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';

// Lazy load pages
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const UploadPage = React.lazy(() => import('./pages/UploadPage'));
const ReportsPage = React.lazy(() => import('./pages/ReportsPage'));
const AnalyticsPage = React.lazy(() => import('./pages/AnalyticsPage'));
const AssistantPage = React.lazy(() => import('./pages/AssistantPage'));
const SettingsPage = React.lazy(() => import('./pages/SettingsPage'));

const Layout = ({ children }) => (
  <div className="min-h-screen bg-slate-50 dark:bg-[#030712] transition-colors duration-500">
    <Sidebar />
    <Navbar />
    <main className="ml-20 md:ml-64 p-8 min-h-[calc(100vh-80px)]">
      <React.Suspense fallback={<SkeletonLoader />}>
        {children}
      </React.Suspense>
    </main>
  </div>
);

const SkeletonLoader = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-48 bg-slate-200 dark:bg-slate-800 rounded-2xl w-full"></div>
    <div className="grid grid-cols-3 gap-6">
      <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
      <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
      <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-2xl"></div>
    </div>
  </div>
);

import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Router>
          <Routes>
            <Route path="/" element={<React.Suspense fallback={<div>Loading...</div>}><LandingPage /></React.Suspense>} />
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/upload" element={<Layout><UploadPage /></Layout>} />
            <Route path="/reports" element={<Layout><ReportsPage /></Layout>} />
            <Route path="/analytics" element={<Layout><AnalyticsPage /></Layout>} />
            <Route path="/assistant" element={<Layout><AssistantPage /></Layout>} />
            <Route path="/settings" element={<Layout><SettingsPage /></Layout>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
