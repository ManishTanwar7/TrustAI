import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Chrome, Download, CheckCircle2, Shield, AlertTriangle, 
  Sparkles, Terminal, ArrowRight, Eye, Laptop 
} from 'lucide-react';
import { TrustGauge } from '../components/common/TrustGauge';
import { VerdictBadge } from '../components/common/VerdictBadge';

export const ExtensionHubPage: React.FC = () => {
  const [simDomain, setSimDomain] = useState('fake-internship-portal.xyz');
  const [simScore, setSimScore] = useState(14);
  const [simVerdict, setSimVerdict] = useState<'SCAM LIKELY' | 'SAFE' | 'CAUTION'>('SCAM LIKELY');
  const [activeTab, setActiveTab] = useState<'overview' | 'simulation' | 'guide'>('overview');

  const setPreset = (domain: string, score: number, verdict: 'SCAM LIKELY' | 'SAFE' | 'CAUTION') => {
    setSimDomain(domain);
    setSimScore(score);
    setSimVerdict(verdict);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
          <Chrome className="w-3.5 h-3.5" />
          <span>Chrome Extension (Manifest V3)</span>
        </div>
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
          TrustAI Ambient Browser Shield
        </h1>
        <p className="text-sm text-stone-500">
          Real-time security auditing right in your browser toolbar, warning you of scams and deceptive UX as you browse.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center border-b border-stone-200">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'overview' ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            Capabilities & Architecture
          </button>
          <button
            onClick={() => setActiveTab('simulation')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'simulation' ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            🔥 Interactive Extension Simulator
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`pb-3 text-xs font-semibold border-b-2 transition-colors ${
              activeTab === 'guide' ? 'border-stone-900 text-stone-900' : 'border-transparent text-stone-400 hover:text-stone-700'
            }`}
          >
            Developer Mode Installation
          </button>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-subtle space-y-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Shield className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-stone-900">Dynamic Toolbar Badge</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Color-coded numerical Trust Score (0–100) updates automatically on every active tab navigation, powered by background service workers.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-subtle space-y-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-stone-900">In-Page Dark Pattern Pill</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Content script analyzes the live DOM for countdown timers, pre-checked checkboxes, and upfront employment deposits, showing a subtle floating badge.
              </p>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-subtle space-y-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-stone-900">One-Click Aria Chat</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Instant access to Aria AI Security Consultant right in the browser extension popup to ask about current offers or checkout flows.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Simulation Tab */}
      {activeTab === 'simulation' && (
        <div className="space-y-6">
          <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
            <span>Test the Extension Popup in real-time right here in your browser:</span>
            <div className="flex gap-2">
              <button
                onClick={() => setPreset('novatech-careers.xyz', 14, 'SCAM LIKELY')}
                className="px-2.5 py-1 bg-rose-600 text-white rounded font-bold hover:bg-rose-700"
              >
                Simulate Scam Internship
              </button>
              <button
                onClick={() => setPreset('linear.app', 96, 'SAFE')}
                className="px-2.5 py-1 bg-white border border-stone-300 rounded font-medium text-stone-800"
              >
                Simulate Safe Site
              </button>
            </div>
          </div>

          {/* Interactive Simulation Frame */}
          <div className="flex justify-center">
            <div className="w-[360px] bg-stone-50 border border-stone-300 rounded-2xl p-4 shadow-elevated space-y-4">
              {/* Fake Chrome Toolbar Header */}
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                    T
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900">TrustAI Extension</div>
                    <div className="text-[10px] text-stone-400">Live Active Tab Monitor</div>
                  </div>
                </div>
                <VerdictBadge verdict={simVerdict} size="sm" />
              </div>

              {/* Main Card */}
              <div className="bg-white rounded-xl border border-stone-200 p-3 shadow-subtle space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-stone-400">Domain:</span>
                  <span className="font-mono font-bold text-stone-800">{simDomain}</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full border-4 border-emerald-500 flex flex-col items-center justify-center"
                    style={{ borderColor: simScore < 40 ? '#EF4444' : simScore < 75 ? '#F59E0B' : '#10B981' }}
                  >
                    <span className="text-lg font-extrabold text-stone-900 leading-none">{simScore}</span>
                    <span className="text-[7px] font-bold text-stone-400 mt-0.5">TRUST</span>
                  </div>

                  <div className="flex-1 space-y-1.5 text-[11px]">
                    <div className="flex justify-between">
                      <span className="text-stone-500">Scam Risk</span>
                      <span className="font-semibold text-stone-800">{100 - simScore}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-500">Credibility</span>
                      <span className="font-semibold text-stone-800">{simScore}%</span>
                    </div>
                  </div>
                </div>

                {simScore < 40 && (
                  <div className="p-2 rounded bg-rose-50 border border-rose-100 text-[11px] text-rose-800">
                    ⚠️ <strong>Warning:</strong> Upfront $250 laptop fee detected on page.
                  </div>
                )}
              </div>

              {/* Aria Assistant mini box */}
              <div className="bg-white rounded-xl border border-stone-200 p-3 shadow-subtle space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-500 text-stone-900 text-[10px] font-bold flex items-center justify-center">
                    A
                  </div>
                  <span className="text-xs font-bold text-stone-900">Aria Security Consultant</span>
                </div>
                <div className="text-[11px] text-stone-600 bg-stone-50 p-2 rounded border border-stone-100">
                  {simScore < 40
                    ? "I reviewed the internship offer on this page. Key concern: Security deposit required. Recommendation: Avoid paying any upfront amount."
                    : "I verified this domain. Credentials, TLS certificates, and transparent privacy disclosures match standard security benchmarks."}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Guide Tab */}
      {activeTab === 'guide' && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-card space-y-4 text-xs sm:text-sm text-stone-700">
          <h3 className="text-base font-bold text-stone-900">How to load the Extension in Google Chrome:</h3>
          <ol className="list-decimal pl-5 space-y-2.5">
            <li>Open Google Chrome and navigate to <code className="bg-stone-100 px-1.5 py-0.5 rounded text-stone-900 font-mono">chrome://extensions/</code> in the URL bar.</li>
            <li>In the top right corner, toggle on <strong>Developer mode</strong>.</li>
            <li>Click the <strong>Load unpacked</strong> button on the top left.</li>
            <li>Select the folder: <code className="bg-stone-100 px-1.5 py-0.5 rounded text-stone-900 font-mono">trustai/extension</code> from your repository.</li>
            <li>The TrustAI shield icon will immediately appear in your extensions list and browser toolbar!</li>
          </ol>
        </div>
      )}
    </div>
  );
};
