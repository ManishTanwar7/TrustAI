import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Briefcase, AlertTriangle, ShieldCheck, DollarSign, 
  Sparkles, CheckCircle2, Building, Mail, Send, ExternalLink, Shield
} from 'lucide-react';
import { api } from '../services/api';
import { ChiefVerdict } from '../types';
import { TrustGauge } from '../components/common/TrustGauge';
import { VerdictBadge } from '../components/common/VerdictBadge';
import { DEMO_PRESETS, SAMPLE_VERDICTS } from '../services/mockData';
import { SecurityShieldSpinner } from '../components/common/SecurityShieldSpinner';
import { HumanConsultantClipart } from '../components/common/HumanConsultantClipart';

export const InternshipPage: React.FC = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    job_title: '',
    recruiter_email: '',
    recruiter_channel: 'Telegram',
    stipend_claimed: '',
    deposit_required: false,
    deposit_amount: '',
    website_url: '',
    offer_letter_text: ''
  });

  const [loading, setLoading] = useState(false);
  const [verdict, setVerdict] = useState<ChiefVerdict | null>(SAMPLE_VERDICTS[0]);
  const [msConsultation, setMsConsultation] = useState<{
    direct_answer: string;
    key_concerns: string[];
    actionable_recommendation: string;
    confidence_percentage: number;
  }>({
    direct_answer: "I reviewed the internship offer for you.",
    key_concerns: [
      "Security deposit required ($250 laptop fee)",
      "No corporate registration found in state business filings",
      "No formal interview conducted or verifiable company email"
    ],
    actionable_recommendation: "Avoid paying any upfront amount. Legitimate employers never charge candidates for equipment, software, or onboarding fees.",
    confidence_percentage: 92
  });

  const loadPreset = (type: 'fake' | 'legit') => {
    if (type === 'fake') {
      const p = DEMO_PRESETS.fakeInternship;
      setFormData(p);
    } else {
      setFormData({
        company_name: 'Stripe Open Source Foundation',
        job_title: 'Software Engineering Fellow',
        recruiter_email: 'internships@stripe.com',
        recruiter_channel: 'Official ATS Portal',
        stipend_claimed: '$38 / hour',
        deposit_required: false,
        deposit_amount: '',
        website_url: 'https://stripe.com/jobs',
        offer_letter_text: 'We are pleased to extend an offer for the Software Engineering Fellowship. Equipment will be provisioned directly by Stripe IT at zero cost to the fellow.'
      });
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.company_name) return;

    setLoading(true);
    try {
      const res = await api.verifyInternship(formData);
      setVerdict(res);

      const msRes = await api.chatWithAria({
        message: `Should I accept this internship offer from ${formData.company_name} for the ${formData.job_title} role?`,
        attached_context: res
      });

      if (msRes.structured_advice) {
        setMsConsultation(msRes.structured_advice);
      }
    } catch (err) {
      console.warn('Fallback internship verify used.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FEE2E2] text-[#DC2626] border border-red-200 text-xs font-semibold">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Student & Career Scam Shield</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-[#0F172A] tracking-tight">
          Internship Verification
        </h1>
        <p className="text-sm text-[#64748B] leading-relaxed">
          Verify remote job offers, upfront hardware deposit schemes, and ghost recruiters before you share private documents or money.
        </p>
      </div>

      {/* Preset Launcher Bar */}
      <div className="bg-white border border-[#E2E8F0] p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shadow-sm">
        <div className="flex items-center gap-2 text-[#0F172A] font-medium">
          <AlertTriangle className="w-4 h-4 text-[#D97706] shrink-0" />
          <span>1-Click Test Scenarios:</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => loadPreset('fake')}
            className="px-3.5 py-1.5 bg-[#DC2626] hover:bg-red-700 text-white rounded-xl font-bold transition-colors shadow-sm"
          >
            Load Fake Scam ($250 Deposit)
          </button>
          <button
            type="button"
            onClick={() => loadPreset('legit')}
            className="px-3.5 py-1.5 bg-white border border-[#E2E8F0] hover:bg-[#F8FAFC] text-[#0F172A] rounded-xl font-semibold transition-colors"
          >
            Load Verified Offer
          </button>
        </div>
      </div>

      {/* Verification Form */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm space-y-6">
        <form onSubmit={handleVerify} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Company Name *</label>
              <input
                type="text"
                required
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                placeholder="e.g. NovaTech Digital Labs"
                className="w-full text-xs sm:text-sm p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl outline-none focus:border-[#166534] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Job Title *</label>
              <input
                type="text"
                required
                value={formData.job_title}
                onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                placeholder="e.g. Front-End Engineering Intern"
                className="w-full text-xs sm:text-sm p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl outline-none focus:border-[#166534] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Recruiter Email</label>
              <input
                type="text"
                value={formData.recruiter_email}
                onChange={(e) => setFormData({ ...formData, recruiter_email: e.target.value })}
                placeholder="e.g. recruiter@gmail.com"
                className="w-full text-xs p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl outline-none focus:border-[#166534] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Interview Channel</label>
              <select
                value={formData.recruiter_channel}
                onChange={(e) => setFormData({ ...formData, recruiter_channel: e.target.value })}
                className="w-full text-xs p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl outline-none focus:border-[#166534] transition-colors"
              >
                <option value="Telegram">Telegram (High Risk)</option>
                <option value="WhatsApp">WhatsApp (High Risk)</option>
                <option value="Direct Email">Corporate Domain Email</option>
                <option value="LinkedIn">LinkedIn InMail</option>
                <option value="Official ATS Portal">Company ATS / Workday</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Stipend Claimed</label>
              <input
                type="text"
                value={formData.stipend_claimed}
                onChange={(e) => setFormData({ ...formData, stipend_claimed: e.target.value })}
                placeholder="e.g. $45/hr or $2,500/mo"
                className="w-full text-xs p-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl outline-none focus:border-[#166534] transition-colors"
              />
            </div>
          </div>

          {/* Deposit Toggle */}
          <div className="p-4 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="deposit-toggle"
                checked={formData.deposit_required}
                onChange={(e) => setFormData({ ...formData, deposit_required: e.target.checked })}
                className="w-4 h-4 text-[#DC2626] rounded border-[#CBD5E1] focus:ring-[#DC2626] cursor-pointer"
              />
              <label htmlFor="deposit-toggle" className="text-xs font-semibold text-[#0F172A] cursor-pointer">
                Recruiter requested an upfront fee (security deposit, laptop delivery, training, or software license)
              </label>
            </div>

            {formData.deposit_required && (
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-bold text-[#64748B]">Amount:</span>
                <input
                  type="text"
                  value={formData.deposit_amount}
                  onChange={(e) => setFormData({ ...formData, deposit_amount: e.target.value })}
                  placeholder="$250"
                  className="w-24 text-xs p-1.5 bg-white border border-[#E2E8F0] rounded-lg outline-none font-bold text-[#DC2626]"
                />
              </div>
            )}
          </div>

          {/* Offer Letter Text */}
          <div>
            <label className="block text-xs font-bold text-[#0F172A] mb-1.5">
              Offer Letter / Recruiter Correspondence
            </label>
            <textarea
              rows={4}
              value={formData.offer_letter_text}
              onChange={(e) => setFormData({ ...formData, offer_letter_text: e.target.value })}
              placeholder="Paste correspondence, onboarding instructions, or offer terms here..."
              className="w-full text-xs sm:text-sm p-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl outline-none focus:border-[#166534] transition-colors leading-relaxed"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all shadow-sm flex items-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verify Internship Legitimacy</span>
            </button>
          </div>
        </form>
      </div>

      {/* Rotating Threat Protection Spinner during Loading */}
      {loading && (
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-sm">
          <SecurityShieldSpinner 
            label="Auditing Offer & Threat Telemetry" 
            sublabel="Cross-referencing employer filings, advance-fee registries, and recruiter channels..."
          />
        </div>
      )}

      {/* Verdict & MS Human Consultation */}
      {verdict && !loading && (
        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 sm:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2">
                <VerdictBadge verdict={verdict.verdict} size="md" />
                <span className="text-xs text-[#64748B] font-mono">
                  Ref: {verdict.scan_id}
                </span>
              </div>

              <h2 className="text-2xl font-black text-[#0F172A] tracking-tight">
                {verdict.target_identifier}
              </h2>

              <p className="text-sm text-[#64748B] leading-relaxed">
                {verdict.executive_summary}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
                <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
                  <div className="text-[10px] text-[#64748B] uppercase font-bold">Advance-Fee Risk</div>
                  <div className="text-base font-black text-[#DC2626]">{verdict.scam_risk}%</div>
                </div>
                <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
                  <div className="text-[10px] text-[#64748B] uppercase font-bold">Company Status</div>
                  <div className="text-base font-bold text-[#0F172A]">
                    {verdict.credibility_analysis?.is_corporate_registered ? 'Verified Filing' : 'No State Filing'}
                  </div>
                </div>
                <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
                  <div className="text-[10px] text-[#64748B] uppercase font-bold">Channel Risk</div>
                  <div className="text-base font-bold text-[#D97706]">
                    {verdict.credibility_analysis?.contact_transparency || 'High Risk'}
                  </div>
                </div>
                <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0]">
                  <div className="text-[10px] text-[#64748B] uppercase font-bold">Chief Consensus</div>
                  <div className="text-base font-black text-[#166534]">{verdict.confidence_percentage}%</div>
                </div>
              </div>
            </div>

            <div className="shrink-0">
              <TrustGauge score={verdict.trust_score} size={160} strokeWidth={12} />
            </div>
          </div>

          {/* MS Human Security Consultant Directive */}
          <div className="bg-white rounded-2xl border-2 border-[#0F172A] p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-0.5 flex items-center justify-center">
                  <HumanConsultantClipart size={36} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0F172A] flex items-center gap-2">
                    MS — AI Security Consultant
                    <span className="text-[10px] font-semibold bg-[#DCFCE7] text-[#166534] px-2 py-0.5 rounded-full border border-green-200">
                      Human Review Directive
                    </span>
                  </h3>
                  <p className="text-xs text-[#64748B]">Practical, plain-English guidance</p>
                </div>
              </div>
              <span className="text-xs font-bold text-[#166534] bg-[#DCFCE7] px-2.5 py-1 rounded-full border border-green-200">
                Confidence: {msConsultation.confidence_percentage}%
              </span>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-[#0F172A] leading-relaxed">
              <p className="font-semibold text-[#0F172A]">
                {msConsultation.direct_answer}
              </p>

              <div>
                <div className="font-bold text-[#DC2626] mb-1.5 text-xs uppercase tracking-wider">
                  Flagged Red Flags:
                </div>
                <ul className="space-y-1 pl-1">
                  {msConsultation.key_concerns.map((concern, i) => (
                    <li key={i} className="flex items-start gap-2 text-[#334155]">
                      <span className="text-[#DC2626] font-bold">•</span>
                      <span>{concern}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-[#DCFCE7] border border-green-300">
                <div className="font-bold text-[#166534] mb-1 text-xs uppercase tracking-wider">
                  MS Directive:
                </div>
                <p className="text-[#14532D] font-semibold">
                  {msConsultation.actionable_recommendation}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
