import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { AriaFloatingWidget } from './components/chat/AriaFloatingWidget';

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

export function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-surface-warm text-stone-900">
        <Navbar />
        
        <main className="flex-1">
          <Routes>
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
        </main>

        <Footer />
        <AriaFloatingWidget />
      </div>
    </Router>
  );
}

export default App;
