import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase, AlertTriangle, ShieldCheck, DollarSign, 
  Sparkles, CheckCircle2, Building, Mail, Send, ExternalLink 
} from 'lucide-react';
import { api } from '../services/api';
import { ChiefVerdict } from '../types';
import { TrustGauge } from '../components/common/TrustGauge';
import { VerdictBadge } from '../components/common/VerdictBadge';
import { DEMO_PRESETS, SAMPLE_VERDICTS } from '../services/mockData';

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
  const [ariaConsultation, setAriaConsultation] = useState<{
    direct_answer: string;
    key_concerns: string[];
    actionable_recommendation: string;
    confidence_percentage: number;
  }>({
    direct_answer: "I reviewed the internship offer.",
    key_concerns: [
      "Security deposit required ($250 laptop fee)",
      "No corporate registration found in legal filings",
      "No clear stipend disbursement schedule or signed contract terms"
    ],
    actionable_recommendation: "Avoid paying any upfront amount until verification is complete. Legitimate employers never charge candidates for equipment or training.",
    confidence_percentage: 87
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

      // Trigger Aria AI consultation
      const ariaRes = await api.chatWithAria({
        message: `Should I accept this internship offer from ${formData.company_name} for the ${formData.job_title} role?`,
        attached_context: res
      });

      if (ariaRes.structured_advice) {
        setAriaConsultation(ariaRes.structured_advice);
      }
    } catch (err) {
      console.warn('Fallback internship verify used.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Student & Early Career Defense</span>
        </div>
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
          Internship Verification System
        </h1>
        <p className="text-sm text-stone-500">
          Unmask fraudulent job offers, upfront laptop deposit schemes, and ghost recruiters before you share identity papers or money.
        </p>
      </div>

      {/* Preset Launcher Bar for Demos */}
      <div className="bg-amber-50/80 border border-amber-200 p-4 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2 text-amber-900 font-medium">
          <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
          <span>Judges & Live Demo Presets: Load test scenarios in one click.</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => loadPreset('fake')}
            className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-semibold transition-colors shadow-subtle"
          >
            🔥 Load Fake Internship Scam ($250 Deposit)
          </button>
          <button
            onClick={() => loadPreset('legit')}
            className="px-3 py-1.5 bg-white border border-stone-300 hover:bg-stone-50 text-stone-700 rounded-lg font-medium transition-colors"
          >
            Load Verified Offer
          </button>
        </div>
      </div>

      {/* Verification Form */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-card space-y-6">
        <form onSubmit={handleVerify} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Company Name *</label>
              <input
                type="text"
                required
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                placeholder="e.g. NovaTech Digital Labs"
                className="w-full text-xs sm:text-sm p-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-stone-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Job Title *</label>
              <input
                type="text"
                required
                value={formData.job_title}
                onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                placeholder="e.g. Front-End Engineering Intern"
                className="w-full text-xs sm:text-sm p-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-stone-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Recruiter Email</label>
              <input
                type="text"
                value={formData.recruiter_email}
                onChange={(e) => setFormData({ ...formData, recruiter_email: e.target.value })}
                placeholder="e.g. recruiter@gmail.com"
                className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-stone-400"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Interview Channel</label>
              <select
                value={formData.recruiter_channel}
                onChange={(e) => setFormData({ ...formData, recruiter_channel: e.target.value })}
                className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-stone-400"
              >
                <option value="Telegram">Telegram (High Risk)</option>
                <option value="WhatsApp">WhatsApp (High Risk)</option>
                <option value="Direct Email">Corporate Domain Email</option>
                <option value="LinkedIn">LinkedIn InMail</option>
                <option value="Official ATS Portal">Company ATS / Workday</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Stipend Claimed</label>
              <input
                type="text"
                value={formData.stipend_claimed}
                onChange={(e) => setFormData({ ...formData, stipend_claimed: e.target.value })}
                placeholder="e.g. $45/hr or $2,500/mo"
                className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-stone-400"
              />
            </div>
          </div>

          {/* Deposit Toggle */}
          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="deposit-toggle"
                checked={formData.deposit_required}
                onChange={(e) => setFormData({ ...formData, deposit_required: e.target.checked })}
                className="w-4 h-4 text-rose-600 rounded border-stone-300 focus:ring-rose-500 cursor-pointer"
              />
              <label htmlFor="deposit-toggle" className="text-xs font-medium text-stone-800 cursor-pointer">
                Recruiter requested an upfront fee (security deposit, laptop delivery, training, or software license)
              </label>
            </div>

            {formData.deposit_required && (
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-semibold text-stone-600">Amount:</span>
                <input
                  type="text"
                  value={formData.deposit_amount}
                  onChange={(e) => setFormData({ ...formData, deposit_amount: e.target.value })}
                  placeholder="$250"
                  className="w-24 text-xs p-1.5 bg-white border border-stone-200 rounded-lg outline-none"
                />
              </div>
            )}
          </div>

          {/* Offer Letter Text */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Offer Letter / Recruiter Message Text
            </label>
            <textarea
              rows={5}
              value={formData.offer_letter_text}
              onChange={(e) => setFormData({ ...formData, offer_letter_text: e.target.value })}
              placeholder="Paste email correspondence, offer letter clauses, or onboarding instructions here..."
              className="w-full text-xs p-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-stone-400"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-stone-800 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              {loading ? (
                <span>Auditing Credentials...</span>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Verify Internship Legitimacy</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Verdict & Aria Consultation Presentation */}
      {verdict && (
        <div className="space-y-6">
          {/* Main Verdict Card */}
          <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-card flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-2">
                <VerdictBadge verdict={verdict.verdict} size="md" />
                <span className="text-xs text-stone-500 font-mono">
                  Scan Ref: {verdict.scan_id}
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-stone-900 tracking-tight">
                {verdict.target_identifier}
              </h2>

              <p className="text-sm text-stone-600 leading-relaxed">
                {verdict.executive_summary}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                  <div className="text-[10px] text-stone-500 uppercase font-semibold">Advance-Fee Risk</div>
                  <div className="text-base font-bold text-stone-900">{verdict.scam_risk}%</div>
                </div>
                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                  <div className="text-[10px] text-stone-500 uppercase font-semibold">Company Registered</div>
                  <div className="text-base font-bold text-stone-900">
                    {verdict.credibility_analysis?.is_corporate_registered ? 'Verified' : 'No Filing'}
                  </div>
                </div>
                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                  <div className="text-[10px] text-stone-500 uppercase font-semibold">Contact Authenticity</div>
                  <div className="text-base font-bold text-stone-900">
                    {verdict.credibility_analysis?.contact_transparency || 'Low'}
                  </div>
                </div>
                <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-100">
                  <div className="text-[10px] text-stone-500 uppercase font-semibold">Chief Consensus</div>
                  <div className="text-base font-bold text-emerald-700">{verdict.confidence_percentage}%</div>
                </div>
              </div>
            </div>

            <div className="shrink-0">
              <TrustGauge score={verdict.trust_score} size={180} />
            </div>
          </div>

          {/* Aria AI Security Consultant Section */}
          <div className="bg-white rounded-2xl border-2 border-stone-900 p-6 sm:p-8 shadow-elevated space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-stone-100">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-500 text-stone-950 font-extrabold text-sm flex items-center justify-center">
                  A
                </div>
                <div>
                  <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                    Aria — AI Security Consultant
                    <span className="text-[10px] font-normal bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full">
                      Google Gemini-4 Reasoning
                    </span>
                  </h3>
                  <p className="text-xs text-stone-500">Direct Human-Style Assessment</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Confidence: {ariaConsultation.confidence_percentage}%
              </span>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-stone-800 leading-relaxed font-sans">
              <p className="font-semibold text-stone-900">
                {ariaConsultation.direct_answer}
              </p>

              <div>
                <div className="font-bold text-stone-900 mb-1.5 text-xs uppercase tracking-wider">
                  Key concerns:
                </div>
                <ul className="space-y-1 pl-1">
                  {ariaConsultation.key_concerns.map((concern, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{concern}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200">
                <div className="font-bold text-emerald-950 mb-1 text-xs uppercase tracking-wider">
                  My recommendation:
                </div>
                <p className="text-emerald-900 font-medium">
                  {ariaConsultation.actionable_recommendation}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
