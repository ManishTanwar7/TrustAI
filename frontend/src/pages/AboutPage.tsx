import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Target, Eye, Users, Cpu, Heart, CheckCircle2, Globe } from 'lucide-react';
import { LiveRadar } from '../components/common/LiveRadar';

export const AboutPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-700 text-xs font-semibold">
          <span>About TrustAI</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-stone-900 tracking-tight leading-tight">
          Restoring symmetry to the internet.
        </h1>
        <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
          The modern web suffers from an overwhelming asymmetry: corporations and scammers deploy AI and psychological tricks to exploit individuals. TrustAI provides everyday people with the same level of intelligence to defend themselves.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-card space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
            <Target className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-stone-900">Our Mission</h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Protect users from fraudulent internships, predatory fine print, deceptive dark patterns, and digital privacy abuse by providing an authoritative, accessible AI Security Consultant.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-stone-200 p-8 shadow-card space-y-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold">
            <Eye className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-stone-900">Our Vision</h2>
          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
            Create a safer and more transparent internet where technology empowers human autonomy, financial dignity, and privacy rather than exploiting cognitive vulnerabilities.
          </p>
        </div>
      </section>

      {/* Social Implications of Technology */}
      <section className="bg-stone-50 rounded-3xl border border-stone-200 p-8 sm:p-10 space-y-6">
        <h2 className="text-2xl font-bold text-stone-900 tracking-tight">
          Social Implications of Technology
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs sm:text-sm text-stone-700 leading-relaxed">
          <div className="space-y-2">
            <h3 className="font-bold text-stone-900 text-sm">Vulnerable Students & Early Careers</h3>
            <p>
              Students desperate for internships are frequently lured into advance-fee scams, paying fake "laptop deposits" or "training fees" on Telegram that drain their limited savings.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-stone-900 text-sm">Freelance & Gig Economy Power Dynamics</h3>
            <p>
              Independent workers often sign one-sided master services agreements that secretly forfeit all pre-existing IP and mandate private out-of-state arbitration, eliminating legal recourse.
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-bold text-stone-900 text-sm">Manipulative UX & Privacy Erosion</h3>
            <p>
              Dark patterns weaponize behavioral economics to induce false urgency, roach-motel subscriptions, and hidden data broker syndication that ordinary consumers cannot detect.
            </p>
          </div>
        </div>
      </section>

      {/* Hierarchical Multi-Agent Architecture */}
      <section className="space-y-6">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
            Hierarchical Multi-Agent Architecture
          </h2>
          <p className="text-xs sm:text-sm text-stone-500">
            Rather than relying on a single fallible chatbot prompt, TrustAI employs 6 specialized agents powered by Google Gemini, unified by a Chief Decision Agent.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-stone-200 p-8 shadow-card space-y-6">
          <LiveRadar />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs pt-4 border-t border-stone-100">
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
              <span className="font-bold text-stone-900">1. Scam Detection Agent</span>
              <p className="text-stone-500">Advance-fee fraud, urgent payment demands, crypto rail requests, and unrealistic income claims.</p>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
              <span className="font-bold text-stone-900">2. Privacy Analysis Agent</span>
              <p className="text-stone-500">Audits third-party broker sales, cross-app tracking, and continuous GPS location harvesting.</p>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
              <span className="font-bold text-stone-900">3. Contract Intelligence Agent</span>
              <p className="text-stone-500">Flags unilateral IP forfeiture, mandatory binding arbitration waivers, and auto-renewal traps.</p>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
              <span className="font-bold text-stone-900">4. Dark Pattern Agent</span>
              <p className="text-stone-500">Detects false urgency countdowns, forced continuity, sneaky baskets, and confirmshaming.</p>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
              <span className="font-bold text-stone-900">5. Credibility Agent</span>
              <p className="text-stone-500">Cross-references corporate registrar databases, domain age, SSL authenticity, and email spoofing.</p>
            </div>
            <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 space-y-1">
              <span className="font-bold text-stone-900">6. Threat Intelligence Agent</span>
              <p className="text-stone-500">Matches known phishing kits, homoglyph typosquatting, and malicious URL patterns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Human AI Security Consultant Aria */}
      <section className="bg-stone-900 text-white rounded-3xl p-8 sm:p-12 shadow-elevated flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
            Conversational Intelligence
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Meet Aria, your Trust & Security Guide.
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Reports are useful, but human advice is transformative. When you ask Aria whether to accept an internship offer, Aria doesn't just output a percentage—she highlights the key red flags, gives an unambiguous recommendation, and stands with you in making safe decisions.
          </p>
        </div>
        <div className="w-16 h-16 rounded-3xl bg-emerald-500 text-stone-950 font-extrabold text-3xl flex items-center justify-center shrink-0 shadow-lg">
          A
        </div>
      </section>
    </div>
  );
};
