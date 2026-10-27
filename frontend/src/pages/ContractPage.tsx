import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, AlertTriangle, ShieldCheck, Scale, 
  Sparkles, CheckCircle2, Lock, ArrowRight 
} from 'lucide-react';
import { api } from '../services/api';
import { ChiefVerdict } from '../types';
import { TrustGauge } from '../components/common/TrustGauge';
import { VerdictBadge } from '../components/common/VerdictBadge';
import { DEMO_PRESETS, SAMPLE_VERDICTS } from '../services/mockData';

export const ContractPage: React.FC = () => {
  const [formData, setFormData] = useState({
    contract_title: '',
    contract_type: 'Freelance',
    user_role: 'Independent Contractor',
    contract_text: ''
  });

  const [loading, setLoading] = useState(false);
  const [verdict, setVerdict] = useState<ChiefVerdict | null>(SAMPLE_VERDICTS[1]);

  const loadPreset = () => {
    setFormData(DEMO_PRESETS.predatoryContract);
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.contract_text) return;

    setLoading(true);
    try {
      const res = await api.analyzeContract(formData);
      setVerdict(res);
    } catch (err) {
      console.warn('Fallback contract audit used.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold">
          <Scale className="w-3.5 h-3.5" />
          <span>Legal Intelligence & Terms Defense</span>
        </div>
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
          Contract & Fine Print Analyzer
        </h1>
        <p className="text-sm text-stone-500">
          Unmask unilateral intellectual property forfeiture, binding arbitration traps, and predatory indemnification before signing.
        </p>
      </div>

      {/* Preset Launcher */}
      <div className="bg-stone-100/80 border border-stone-200 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-stone-700">
          <FileText className="w-4 h-4 text-stone-500 shrink-0" />
          <span>Interactive Audit Demo: Test a predatory freelance agreement with IP forfeiture & arbitration traps.</span>
        </div>
        <button
          onClick={loadPreset}
          className="px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-semibold transition-colors shadow-subtle shrink-0"
        >
          Load Predatory Contract Demo
        </button>
      </div>

      {/* Contract Input Box */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-card space-y-5">
        <form onSubmit={handleAnalyze} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Contract Title</label>
              <input
                type="text"
                value={formData.contract_title}
                onChange={(e) => setFormData({ ...formData, contract_title: e.target.value })}
                placeholder="e.g. Master Services Agreement"
                className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-stone-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Contract Type</label>
              <select
                value={formData.contract_type}
                onChange={(e) => setFormData({ ...formData, contract_type: e.target.value })}
                className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-stone-400"
              >
                <option value="Freelance">Freelance / Statement of Work</option>
                <option value="Employment">Employment Contract</option>
                <option value="NDA">Non-Disclosure Agreement (NDA)</option>
                <option value="Terms of Service">Terms of Service / EULA</option>
                <option value="Lease">Commercial Lease</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Your Role</label>
              <input
                type="text"
                value={formData.user_role}
                onChange={(e) => setFormData({ ...formData, user_role: e.target.value })}
                placeholder="e.g. Independent Contractor"
                className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-stone-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">Agreement Clauses / Document Text *</label>
            <textarea
              rows={8}
              required
              value={formData.contract_text}
              onChange={(e) => setFormData({ ...formData, contract_text: e.target.value })}
              placeholder="Paste agreement text, NDA clauses, non-compete terms, or subscription cancellation policies..."
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
                <span>Auditing Legal Clauses...</span>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Audit Terms with Contract Agent</span>
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
                Contract Fairness: {verdict.contract_fairness}/100
              </h2>

              <p className="text-sm text-stone-600 leading-relaxed">
                {verdict.executive_summary}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                  <div className="text-[10px] text-stone-500 uppercase font-semibold">Predatory Clauses</div>
                  <div className="text-base font-bold text-rose-600">
                    {verdict.contract_analysis?.predatory_clauses.length || 0} Flagged
                  </div>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                  <div className="text-[10px] text-stone-500 uppercase font-semibold">Arbitration Lock-in</div>
                  <div className="text-base font-bold text-amber-700">
                    {verdict.contract_analysis?.arbitration_lockin ? 'Yes (Waiver Active)' : 'No'}
                  </div>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                  <div className="text-[10px] text-stone-500 uppercase font-semibold">Chief Consensus</div>
                  <div className="text-base font-bold text-stone-900">{verdict.confidence_percentage}%</div>
                </div>
              </div>
            </div>

            <div className="shrink-0">
              <TrustGauge score={verdict.trust_score} size={180} />
            </div>
          </div>

          {/* Predatory Clauses Plain English Translation */}
          {verdict.contract_analysis && verdict.contract_analysis.predatory_clauses.length > 0 && (
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-card space-y-4">
              <div className="text-xs font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Flagged Clauses & Plain-English Translation</span>
              </div>

              <div className="space-y-3">
                {verdict.contract_analysis.predatory_clauses.map((clause, i) => (
                  <div key={i} className="p-4 rounded-xl bg-stone-50 border border-stone-200 space-y-2">
                    <div className="text-xs font-bold text-stone-900">{clause.clause}</div>
                    <div className="text-xs text-rose-700 font-semibold">{clause.risk}</div>
                    <div className="text-xs text-stone-700 bg-white p-2.5 rounded-lg border border-stone-100">
                      <strong className="text-stone-900">In plain English:</strong> {clause.plain_english}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
