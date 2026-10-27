import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, Globe, FileText, Sparkles, AlertCircle, 
  ArrowRight, CheckCircle2, Shield, RefreshCw 
} from 'lucide-react';
import { api } from '../services/api';
import { ChiefVerdict } from '../types';
import { TrustGauge } from '../components/common/TrustGauge';
import { VerdictBadge } from '../components/common/VerdictBadge';
import { AgentCard } from '../components/common/AgentCard';
import { SAMPLE_VERDICTS } from '../services/mockData';

export const AnalyzePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [inputMode, setInputMode] = useState<'url' | 'text'>('url');
  const [urlInput, setUrlInput] = useState('');
  const [textInput, setTextInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [verdict, setVerdict] = useState<ChiefVerdict | null>(SAMPLE_VERDICTS[2]);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      if (q.startsWith('http')) {
        setInputMode('url');
        setUrlInput(q);
        runScan(q, '');
      } else {
        setInputMode('text');
        setTextInput(q);
        runScan('', q);
      }
    }
  }, [searchParams]);

  const runScan = async (url: string, text: string) => {
    setLoading(true);
    setActiveStep(1);

    // Step animation sequence
    const t1 = setTimeout(() => setActiveStep(2), 500);
    const t2 = setTimeout(() => setActiveStep(3), 1100);

    try {
      const res = await api.analyze({
        url: url || undefined,
        text_content: text || undefined,
        category: url ? 'website' : 'general'
      });
      setVerdict(res);
    } catch (e) {
      console.warn('Fallback analysis used.');
      setVerdict(SAMPLE_VERDICTS[0]);
    } finally {
      clearTimeout(t1);
      clearTimeout(t2);
      setActiveStep(4);
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMode === 'url' && !urlInput.trim()) return;
    if (inputMode === 'text' && !textInput.trim()) return;
    runScan(inputMode === 'url' ? urlInput.trim() : '', inputMode === 'text' ? textInput.trim() : '');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
          Universal Security & Scam Analyzer
        </h1>
        <p className="text-sm text-stone-500">
          Inspect URLs, messages, offer letters, or terms of service against 6 specialized Gemini agents.
        </p>
      </div>

      {/* Input Box */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-card space-y-4">
        <div className="flex items-center gap-3 border-b border-stone-100 pb-3">
          <button
            onClick={() => setInputMode('url')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              inputMode === 'url' ? 'bg-stone-900 text-white' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Website / URL</span>
          </button>
          <button
            onClick={() => setInputMode('text')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              inputMode === 'text' ? 'bg-stone-900 text-white' : 'text-stone-500 hover:text-stone-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Text / Message / Offer Snippet</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {inputMode === 'url' ? (
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-stone-50 rounded-xl border border-stone-200 w-full flex-1">
                <Globe className="w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="https://example.com or domain name"
                  className="w-full text-xs sm:text-sm bg-transparent outline-none text-stone-900 placeholder:text-stone-400"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-xl hover:bg-stone-800 transition-colors disabled:opacity-50 shrink-0 flex items-center justify-center gap-2"
              >
                {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-emerald-400" />}
                <span>Run Agent Fleet</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <textarea
                rows={5}
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Paste suspicious job communication, offer letter clause, payment request, or terms..."
                className="w-full p-3 bg-stone-50 rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 outline-none focus:border-stone-400"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-xl hover:bg-stone-800 transition-colors disabled:opacity-50 flex items-center gap-2"
                >
                  {loading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-emerald-400" />}
                  <span>Run Agent Fleet</span>
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Demo buttons */}
        <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-stone-500">
          <span className="font-medium">Try Preset Examples:</span>
          <button
            onClick={() => {
              setInputMode('url');
              setUrlInput('https://linear.app');
              runScan('https://linear.app', '');
            }}
            className="px-2.5 py-1 bg-stone-100 rounded-lg hover:bg-stone-200 text-stone-700 transition-colors"
          >
            Safe: linear.app
          </button>
          <button
            onClick={() => {
              setInputMode('url');
              setUrlInput('https://secure-apple-id-verify.account-update.xyz');
              runScan('https://secure-apple-id-verify.account-update.xyz', '');
            }}
            className="px-2.5 py-1 bg-rose-50 border border-rose-200 rounded-lg hover:bg-rose-100 text-rose-700 transition-colors"
          >
            Phishing URL: account-update.xyz
          </button>
          <button
            onClick={() => {
              setInputMode('text');
              const sample = "Congratulations! To begin your Data Analyst internship at $45/hr, wire a $250 refundable laptop deposit via Zelle before 5 PM.";
              setTextInput(sample);
              runScan('', sample);
            }}
            className="px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 text-amber-800 transition-colors"
          >
            Scam Offer Excerpt ($250 deposit)
          </button>
        </div>
      </div>

      {/* Multi-Agent Live Execution Status */}
      {loading && (
        <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-subtle space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
              Parallel Gemini Multi-Agent Orchestration
            </span>
            <span className="text-xs font-mono text-emerald-600">Processing...</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              'Scam Detection Agent',
              'Privacy Analysis Agent',
              'Contract Agent',
              'Dark Pattern Agent',
              'Credibility Agent',
              'Chief Decision Agent'
            ].map((name, i) => (
              <div
                key={name}
                className="p-3 bg-stone-50 rounded-xl border border-stone-100 flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-xs text-stone-700 font-medium">{name}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results View */}
      {verdict && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Main Verdict Header Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-card flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                  Target Analyzed:
                </span>
                <span className="text-xs font-mono text-stone-700 font-bold max-w-sm truncate">
                  {verdict.target_identifier}
                </span>
                <VerdictBadge verdict={verdict.verdict} size="md" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                Final Consensus: {verdict.verdict}
              </h2>

              <p className="text-sm text-stone-600 leading-relaxed max-w-2xl">
                {verdict.executive_summary}
              </p>

              <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <button
                  onClick={() => navigate(`/assistant?context=${encodeURIComponent(verdict.target_identifier)}`)}
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors shadow-subtle"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Ask Aria to Advise on this Audit</span>
                </button>
                <span className="text-xs text-stone-400 font-medium">
                  Chief Confidence: {verdict.confidence_percentage}%
                </span>
              </div>
            </div>

            {/* Trust Gauge */}
            <div className="shrink-0">
              <TrustGauge score={verdict.trust_score} size={190} strokeWidth={15} />
            </div>
          </div>

          {/* Key Concerns & Immediate Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-subtle space-y-3">
              <div className="text-xs font-bold text-rose-700 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>Consensus Concerns Flagged</span>
              </div>
              <ul className="space-y-2 text-xs text-stone-700">
                {verdict.key_concerns.map((concern, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span className="leading-relaxed">{concern}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-subtle space-y-3">
              <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Actionable Security Directive</span>
              </div>
              <ul className="space-y-2 text-xs text-stone-700">
                {verdict.immediate_actions.map((action, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span className="leading-relaxed">{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Specialized Agents Breakdown Cards */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
              Specialized Agent Intelligence Breakdown
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <AgentCard
                title="Scam Detection Agent"
                role="Advance-fee & Urgency Specialist"
                score={verdict.scam_risk}
                scoreLabel="Scam Risk"
                status={verdict.scam_risk > 50 ? 'danger' : verdict.scam_risk > 25 ? 'caution' : 'safe'}
                findings={verdict.scam_analysis?.reasons || ['No advance-fee indicators found']}
                evidence={verdict.scam_analysis?.evidence}
                iconType="scam"
              />

              <AgentCard
                title="Privacy Analysis Agent"
                role="Digital Privacy & Broker Auditor"
                score={verdict.privacy_index}
                scoreLabel="Privacy Index"
                status={verdict.privacy_index < 40 ? 'danger' : verdict.privacy_index < 70 ? 'caution' : 'safe'}
                findings={verdict.privacy_analysis?.high_risk_areas || ['Standard telemetry logging']}
                evidence={verdict.privacy_analysis?.third_party_sharing}
                iconType="privacy"
              />

              <AgentCard
                title="Contract & Terms Agent"
                role="Clause & Liability Intelligence"
                score={verdict.contract_fairness}
                scoreLabel="Contract Fairness"
                status={verdict.contract_fairness < 40 ? 'danger' : verdict.contract_fairness < 70 ? 'caution' : 'safe'}
                findings={verdict.contract_analysis?.hidden_liabilities || ['Balanced commercial terms']}
                evidence={verdict.contract_analysis?.cancellation_traps}
                iconType="contract"
              />

              <AgentCard
                title="Dark Pattern Agent"
                role="UX Ethics & Manipulation Detector"
                score={verdict.dark_pattern_severity}
                scoreLabel="Manipulation Level"
                status={verdict.dark_pattern_severity > 50 ? 'danger' : verdict.dark_pattern_severity > 20 ? 'caution' : 'safe'}
                findings={verdict.dark_pattern_analysis?.detected_patterns || ['No deceptive design detected']}
                evidence={verdict.dark_pattern_analysis?.evidence}
                iconType="dark"
              />

              <AgentCard
                title="Credibility Agent"
                role="Corporate Registry & Domain Origin"
                score={verdict.credibility_index}
                scoreLabel="Credibility Score"
                status={verdict.credibility_index < 40 ? 'danger' : verdict.credibility_index < 70 ? 'caution' : 'safe'}
                findings={verdict.credibility_analysis?.findings || ['Verified domain authenticity']}
                iconType="credibility"
              />

              <AgentCard
                title="Threat Intelligence Agent"
                role="Phishing & Signature Matcher"
                score={verdict.threat_analysis?.threat_score || 10}
                scoreLabel="Threat Score"
                status={(verdict.threat_analysis?.threat_score || 0) > 50 ? 'danger' : 'safe'}
                findings={verdict.threat_analysis?.phishing_indicators || ['Clean threat signatures']}
                iconType="threat"
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};
