import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AriaFloatingWidget } from './components/chat/AriaFloatingWidget';
import { BackgroundSecurityGraph } from './components/layout/BackgroundSecurityGraph';

import { HomePage } from './pages/HomePage';
import { DashboardPage } from './pages/DashboardPage';
import { AnalyzePage } from './pages/AnalyzePage';
import { InternshipPage } from './pages/InternshipPage';
import { ContractPage } from './pages/ContractPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { ThreatHistoryPage } from './pages/ThreatHistoryPage';
import { ExtensionHubPage } from './pages/ExtensionHubPage';
import { AssistantPage } from './pages/AssistantPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

function AnimatedAppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="flex-1"
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/analyze" element={<AnalyzePage />} />
          <Route path="/internship-verification" element={<InternshipPage />} />
          <Route path="/contract-analysis" element={<ContractPage />} />
          <Route path="/privacy-center" element={<PrivacyPage />} />
          <Route path="/threat-history" element={<ThreatHistoryPage />} />
          <Route path="/extension-hub" element={<ExtensionHubPage />} />
          <Route path="/assistant" element={<AssistantPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Catch-all fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col relative text-[#0F172A] selection:bg-[#DCFCE7] selection:text-[#166534]">
        {/* Subtle Security & Financial Telemetry Graph Background */}
        <BackgroundSecurityGraph />
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          
          <main className="flex-1 flex flex-col">
            <AnimatedAppRoutes />
          </main>

          <Footer />
          <AriaFloatingWidget />
        </div>
      </div>
    </Router>
  );
}

export default App;
