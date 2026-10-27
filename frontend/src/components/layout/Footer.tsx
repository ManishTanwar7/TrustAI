import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-stone-200 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Column */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-emerald-600 flex items-center justify-center text-white">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <span className="font-bold text-stone-900 tracking-tight">TrustAI</span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">
              Protecting users from fraudulent internships, predatory fine print, deceptive dark UX patterns, and privacy exploitation.
            </p>
            <div className="text-[11px] text-stone-400 font-mono">
              Powered by Google Gemini-4 Multi-Agent Fleet
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-3">Verification Tools</h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li><Link to="/internship-verification" className="hover:text-stone-900">Internship Verifier</Link></li>
              <li><Link to="/contract-analysis" className="hover:text-stone-900">Contract & Terms Auditor</Link></li>
              <li><Link to="/analyze" className="hover:text-stone-900">URL Security Analyzer</Link></li>
              <li><Link to="/privacy-center" className="hover:text-stone-900">Privacy Policy Inspector</Link></li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-3">Intelligence</h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li><Link to="/assistant" className="hover:text-stone-900">Aria AI Consultant</Link></li>
              <li><Link to="/extension-hub" className="hover:text-stone-900">Browser Extension (V3)</Link></li>
              <li><Link to="/threat-history" className="hover:text-stone-900">Threat Archive</Link></li>
              <li><Link to="/dashboard" className="hover:text-stone-900">Risk Radar Dashboard</Link></li>
            </ul>
          </div>

          {/* Organization */}
          <div>
            <h4 className="text-xs font-semibold text-stone-900 uppercase tracking-wider mb-3">Organization</h4>
            <ul className="space-y-2 text-xs text-stone-600">
              <li><Link to="/about" className="hover:text-stone-900">Mission & AI Ethics</Link></li>
              <li><Link to="/contact" className="hover:text-stone-900">Report a Scam</Link></li>
              <li><a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-stone-900">GitHub Repository</a></li>
              <li><span className="text-stone-400">Open Source (MIT)</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 TrustAI Project. Dedicated to transparent, ethical digital environments.</p>
          <div className="flex items-center gap-1 text-stone-400">
            <span>Built with ethical vigilance</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span>for human protection</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
