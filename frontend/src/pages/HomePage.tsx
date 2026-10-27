import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield, CheckCircle, AlertTriangle, ArrowRight, Sparkles, 
  Eye, FileText, Briefcase, Chrome, Lock, Globe, Terminal, Users
} from 'lucide-react';
import { TrustGauge } from '../components/common/TrustGauge';
import { VerdictBadge } from '../components/common/VerdictBadge';
import { LiveRadar } from '../components/common/LiveRadar';
import { SAMPLE_VERDICTS } from '../services/mockData';

export const HomePage: React.FC = () => {
  const [quickInput, setQuickInput] = useState('');
  const navigate = useNavigate();

  const handleQuickScan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) return;
    navigate(`/analyze?q=${encodeURIComponent(quickInput.trim())}`);
  };

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="pt-12 sm:pt-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs font-medium text-stone-700"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>TrustAI Multi-Agent Security Engine</span>
          <span className="text-stone-300">|</span>
          <span className="text-emerald-700 font-semibold">Gemini-4 Powered</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-extrabold text-stone-900 tracking-tight leading-[1.1]"
        >
          The AI Security Consultant <br className="hidden sm:inline" />
          protecting your digital life.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto text-base sm:text-lg text-stone-600 leading-relaxed"
        >
          Never fall for fraudulent internships, predatory fine print, deceptive dark patterns, or privacy abuse again. Six specialized Gemini agents analyze every risk, synthesized by your personal consultant, <strong>Aria</strong>.
        </motion.p>

        {/* Quick URL / Text Bar */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-2xl mx-auto pt-2"
        >
          <form onSubmit={handleQuickScan} className="flex flex-col sm:flex-row items-center gap-2 bg-white p-2 rounded-2xl border border-stone-200 shadow-card">
            <div className="flex items-center gap-2.5 px-3 flex-1 w-full">
              <Globe className="w-4 h-4 text-stone-400 shrink-0" />
              <input
                type="text"
                value={quickInput}
                onChange={(e) => setQuickInput(e.target.value)}
                placeholder="Paste any website URL, offer letter excerpt, or contract clause..."
                className="w-full text-sm bg-transparent outline-none placeholder:text-stone-400 text-stone-900 py-1.5"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-subtle shrink-0"
            >
              <span>Analyze Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs text-stone-500">
            <span>Instant tests:</span>
            <button
              onClick={() => setQuickInput('https://linear.app')}
              className="text-stone-600 hover:text-stone-900 underline"
            >
              linear.app
            </button>
            <span>•</span>
            <button
              onClick={() => navigate('/internship-verification')}
              className="text-stone-600 hover:text-stone-900 underline"
            >
              Verify Fake Internship ($250 deposit)
            </button>
            <span>•</span>
            <button
              onClick={() => navigate('/contract-analysis')}
              className="text-stone-600 hover:text-stone-900 underline"
            >
              Audit Predatory Contract
            </button>
          </div>
        </motion.div>
      </section>

      {/* Live Threat Radar & Live Multi-Agent Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <LiveRadar />
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200 p-6 shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                  Featured Incident Audit
                </span>
                <VerdictBadge verdict="SCAM LIKELY" size="sm" />
              </div>

              <h3 className="text-lg font-bold text-stone-900 mb-2">
                Student Internship Advance-Fee Scam Ring
              </h3>
              <p className="text-sm text-stone-600 mb-4 leading-relaxed">
                TrustAI agents detected an active wave of remote job offers impersonating tech companies. Recruiter demands a $250 upfront equipment deposit via Telegram with no corporate registrar verification.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                  <div className="text-[11px] text-stone-500">Trust Score</div>
                  <div className="text-lg font-bold text-red-600">12/100</div>
                </div>
                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                  <div className="text-[11px] text-stone-500">Scam Probability</div>
                  <div className="text-lg font-bold text-stone-900">95%</div>
                </div>
                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                  <div className="text-[11px] text-stone-500">Domain Filing</div>
                  <div className="text-lg font-bold text-amber-600">Unregistered</div>
                </div>
                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                  <div className="text-[11px] text-stone-500">Consultant</div>
                  <div className="text-lg font-bold text-emerald-600">Aria Alert</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-stone-500">Aria: "Avoid paying any upfront amount until verification is complete."</span>
              <Link
                to="/internship-verification"
                className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
              >
                Inspect in Verifier <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The 5 Core Defense Pillars */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Comprehensive Digital Defense
          </h2>
          <p className="text-sm text-stone-500 max-w-xl mx-auto">
            Traditional antivirus checks malware files. TrustAI checks the logic, terms, incentives, and deception patterns of modern technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <Link
            to="/internship-verification"
            className="group bg-white rounded-2xl border border-stone-200 p-6 shadow-subtle hover:shadow-card hover:-translate-y-1 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-4 group-hover:bg-rose-100 transition-colors">
              <Briefcase className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900 mb-1 group-hover:text-emerald-700 transition-colors">
              Internship Verifier
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              Protects students and career switchers from upfront deposit scams, ghost companies, and Telegram interview traps.
            </p>
            <span className="text-xs font-semibold text-stone-900 inline-flex items-center gap-1">
              Verify Offer <ArrowRight className="w-3 h-3" />
            </span>
          </Link>

          {/* Card 2 */}
          <Link
            to="/contract-analysis"
            className="group bg-white rounded-2xl border border-stone-200 p-6 shadow-subtle hover:shadow-card hover:-translate-y-1 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900 mb-1 group-hover:text-emerald-700 transition-colors">
              Contract Intelligence
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              Scans freelance terms, NDAs, and ToS for predatory IP forfeiture, binding arbitration traps, and unilateral liability.
            </p>
            <span className="text-xs font-semibold text-stone-900 inline-flex items-center gap-1">
              Audit Agreement <ArrowRight className="w-3 h-3" />
            </span>
          </Link>

          {/* Card 3 */}
          <Link
            to="/privacy-center"
            className="group bg-white rounded-2xl border border-stone-200 p-6 shadow-subtle hover:shadow-card hover:-translate-y-1 transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-indigo-100 transition-colors">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-stone-900 mb-1 group-hover:text-emerald-700 transition-colors">
              Privacy Center
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed mb-4">
              Translates 40-page privacy policies into plain English, flagging data brokers, cross-device trackers, and GPS sales.
            </p>
            <span className="text-xs font-semibold text-stone-900 inline-flex items-center gap-1">
              Inspect Privacy <ArrowRight className="w-3 h-3" />
            </span>
          </Link>
        </div>
      </section>

      {/* Browser Extension Banner */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 shadow-elevated relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-800 text-emerald-400 text-xs font-medium border border-stone-700">
              <Chrome className="w-3.5 h-3.5" />
              <span>Manifest V3 Ready</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Real-time protection in your browser.
            </h2>
            <p className="text-sm text-stone-300 leading-relaxed">
              Detect fake job portals, manipulative checkout countdowns, and dark UX patterns in real time as you browse. Floating ambient security pill with instant access to Aria.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <Link
                to="/extension-hub"
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 text-xs font-bold rounded-xl transition-all shadow-subtle flex items-center gap-2"
              >
                <Chrome className="w-4 h-4" />
                <span>Explore Extension Hub</span>
              </Link>
              <Link
                to="/assistant"
                className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded-xl border border-stone-700 transition-all"
              >
                Chat with Aria
              </Link>
            </div>
          </div>

          <div className="w-full md:w-auto bg-stone-800/90 border border-stone-700 rounded-2xl p-5 max-w-xs shadow-2xl">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-stone-700">
              <span className="text-xs font-medium text-stone-300">Active Extension Pill</span>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">CONNECTED</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-stone-300">
                <span>Current Tab:</span>
                <span className="font-mono text-stone-400">jobs-portal.xyz</span>
              </div>
              <div className="flex justify-between items-center text-stone-300">
                <span>Trust Score:</span>
                <span className="font-bold text-rose-400">14/100 (Scam Likely)</span>
              </div>
              <div className="p-2.5 rounded-lg bg-stone-900 border border-stone-700 text-[11px] text-stone-300 leading-snug">
                ⚠️ Warning: Upfront $250 laptop fee detected on page.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
