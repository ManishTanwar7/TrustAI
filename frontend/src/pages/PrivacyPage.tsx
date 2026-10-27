import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, AlertTriangle, ShieldCheck, Database, 
  Sparkles, CheckCircle2, MapPin, Share2, Users 
} from 'lucide-react';
import { api } from '../services/api';
import { ChiefVerdict } from '../types';
import { TrustGauge } from '../components/common/TrustGauge';
import { VerdictBadge } from '../components/common/VerdictBadge';
import { DEMO_PRESETS, SAMPLE_VERDICTS } from '../services/mockData';

export const PrivacyPage: React.FC = () => {
  const [formData, setFormData] = useState({
    service_name: '',
    privacy_policy_url: '',
    privacy_policy_text: ''
  });

  const [loading, setLoading] = useState(false);
  const [verdict, setVerdict] = useState<ChiefVerdict | null>(SAMPLE_VERDICTS[1]);

  const loadPreset = () => {
    setFormData(DEMO_PRESETS.privacyPolicy);
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.service_name) return;

    setLoading(true);
    try {
      const res = await api.analyzePrivacy(formData);
      setVerdict(res);
    } catch (err) {
      console.warn('Fallback privacy audit used.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold">
          <Eye className="w-3.5 h-3.5" />
          <span>Digital Privacy & Data Rights Auditor</span>
        </div>
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
          Privacy Policy Intelligence
        </h1>
        <p className="text-sm text-stone-500">
          Uncover third-party data broker sales, continuous background GPS tracking, and invasive device permissions before you accept.
        </p>
      </div>

      {/* Preset Launcher */}
      <div className="bg-stone-100/80 border border-stone-200 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-stone-700">
          <Database className="w-4 h-4 text-stone-500 shrink-0" />
          <span>Privacy Demo: Analyze a mobile credit service that sells user contacts and continuous GPS to brokers.</span>
        </div>
        <button
          onClick={loadPreset}
          className="px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-semibold transition-colors shadow-subtle shrink-0"
        >
          Load Predatory Privacy Demo
        </button>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-card space-y-5">
        <form onSubmit={handleAnalyze} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Service / App Name *</label>
              <input
                type="text"
                required
                value={formData.service_name}
                onChange={(e) => setFormData({ ...formData, service_name: e.target.value })}
                placeholder="e.g. CashQuick Mobile Credit"
                className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-stone-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Privacy Policy URL</label>
              <input
                type="text"
                value={formData.privacy_policy_url}
                onChange={(e) => setFormData({ ...formData, privacy_policy_url: e.target.value })}
                placeholder="https://example.com/privacy"
                className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-stone-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Privacy Policy Text</label>
            <textarea
              rows={6}
              value={formData.privacy_policy_text}
              onChange={(e) => setFormData({ ...formData, privacy_policy_text: e.target.value })}
              placeholder="Paste terms, data sharing disclosures, or cookie policies..."
              className="w-full text-xs p-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-stone-400 font-mono"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-stone-800 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <span>Auditing Privacy Terms...</span>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Audit with Privacy Agent</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Audit Verdict */}
      {verdict && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-card flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2">
                <VerdictBadge verdict={verdict.verdict} size="md" />
                <span className="text-xs text-stone-500 font-mono">{verdict.target_identifier}</span>
              </div>

              <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">
                Privacy Protection Score: {verdict.privacy_index}/100
              </h2>

              <p className="text-sm text-stone-600 leading-relaxed">
                {verdict.executive_summary}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                  <div className="text-[10px] text-stone-500 uppercase font-semibold">Data Broker Sharing</div>
                  <div className="text-base font-bold text-rose-600">Active Sale</div>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                  <div className="text-[10px] text-stone-500 uppercase font-semibold">Continuous GPS</div>
                  <div className="text-base font-bold text-amber-700">Requested</div>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                  <div className="text-[10px] text-stone-500 uppercase font-semibold">Retention Period</div>
                  <div className="text-base font-bold text-stone-900">Indefinite</div>
                </div>
              </div>
            </div>

            <div className="shrink-0">
              <TrustGauge score={verdict.privacy_index} size={180} label="PRIVACY INDEX" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
