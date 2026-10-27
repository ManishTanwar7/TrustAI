import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ShieldAlert, Send, CheckCircle2, MessageSquare, AlertTriangle } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'scam-report',
    target_info: '',
    details: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
          Report a Threat & Contact Us
        </h1>
        <p className="text-sm text-stone-500">
          Encountered a fake internship recruiter, deceptive website, or predatory agreement? Report it directly to feed the TrustAI intelligence archive.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-stone-200 p-6 sm:p-8 shadow-card">
        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">Incident Report Submitted</h3>
            <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto">
              Thank you for contributing to collective digital safety. The TrustAI threat intelligence agents are cross-referencing your report against global registrar feeds.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', category: 'scam-report', target_info: '', details: '' });
              }}
              className="px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition-colors"
            >
              Submit Another Report
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Alex Mercer"
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-stone-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Your Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="alex@university.edu"
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-stone-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Report Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-stone-400"
                >
                  <option value="scam-report">Fake Internship / Advance-Fee Scam</option>
                  <option value="phishing-url">Deceptive Website / Phishing URL</option>
                  <option value="dark-pattern">Deceptive UX / Dark Pattern Complaint</option>
                  <option value="contract-abuse">Predatory Contract / Fine Print</option>
                  <option value="general">Campus / Enterprise Partnership Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">
                  Target Identifier (Domain, Recruiter Handle, or Company)
                </label>
                <input
                  type="text"
                  required
                  value={formData.target_info}
                  onChange={(e) => setFormData({ ...formData, target_info: e.target.value })}
                  placeholder="e.g. @NovaRecruiter on Telegram or fraudulent domain"
                  className="w-full text-xs p-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-stone-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">Incident Details</label>
              <textarea
                rows={5}
                required
                value={formData.details}
                onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                placeholder="Describe how they contacted you, what payment was demanded, or what unfair terms were enforced..."
                className="w-full text-xs p-3 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-stone-400"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-stone-900 text-white text-xs font-bold rounded-xl hover:bg-stone-800 transition-colors flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Threat Report</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
