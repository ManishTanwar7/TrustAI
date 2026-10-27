import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Shield, Sparkles, Menu, X, Chrome, ChevronDown, 
  Briefcase, Scale, Search, History, BarChart3, Info, ExternalLink
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const location = useLocation();

  const primaryLinks = [
    { name: 'Live Scanner', path: '/' },
    { name: 'Internship Shield', path: '/internship-verification' },
    { name: 'Contract Auditor', path: '/contract-analysis' },
  ];

  const dropdownTools = [
    { name: 'Deep URL & Dark Pattern Scan', path: '/analyze', icon: Search, desc: 'Scan active websites & checkout traps' },
    { name: 'Threat Intelligence Feed', path: '/threat-history', icon: History, desc: 'Real-time database of intercepted scams' },
    { name: 'Security Analytics Dashboard', path: '/dashboard', icon: BarChart3, desc: 'Aggregate metrics & societal impact stats' },
    { name: 'About TrustAI & Gemma 4', path: '/about', icon: Info, desc: 'Multi-agent architecture & research' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 rounded-xl bg-[#0F172A] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <Shield className="w-4 h-4 text-[#4ADE80] stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black text-[#0F172A] tracking-tight leading-none">
                TrustAI
              </span>
              <span className="text-[10px] text-[#64748B] font-medium tracking-wide mt-0.5">
                Financial & Career Defense
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1.5">
            {primaryLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive(link.path)
                    ? 'text-[#0F172A] bg-[#F1F5F9] font-bold'
                    : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                }`}
              >
                {link.name}
              </Link>
            ))}

            {/* More Security Tools Dropdown */}
            <div className="relative">
              <button
                onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
                onBlur={() => setTimeout(() => setToolsDropdownOpen(false), 200)}
                className={`flex items-center gap-1 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  toolsDropdownOpen || dropdownTools.some(t => isActive(t.path))
                    ? 'text-[#0F172A] bg-[#F1F5F9] font-bold'
                    : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
                }`}
              >
                <span>Security Tools</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-[#E2E8F0] p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {dropdownTools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Link
                        key={tool.path}
                        to={tool.path}
                        onClick={() => setToolsDropdownOpen(false)}
                        className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors ${
                          isActive(tool.path) ? 'bg-[#F1F5F9]' : 'hover:bg-[#F8FAFC]'
                        }`}
                      >
                        <div className="p-2 rounded-lg bg-[#F1F5F9] text-[#166534] shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#0F172A] leading-snug">{tool.name}</div>
                          <div className="text-[10px] text-[#64748B] mt-0.5">{tool.desc}</div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            <Link
              to="/extension-hub"
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                isActive('/extension-hub')
                  ? 'text-[#0F172A] bg-[#F1F5F9] font-bold'
                  : 'text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]'
              }`}
            >
              Extension Hub
            </Link>
          </nav>

          {/* Clean Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            <a
              href="/trustai-extension.zip"
              download="trustai-extension.zip"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#0F172A] hover:bg-[#F1F5F9] transition-colors border border-[#E2E8F0] bg-white shadow-sm"
            >
              <Chrome className="w-3.5 h-3.5 text-[#64748B]" />
              <span>Get Extension (.zip)</span>
            </a>

            <Link
              to="/assistant"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-[#166534] hover:bg-[#14532D] shadow-sm transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
              <span>Ask MS</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9]"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#E2E8F0] px-4 pt-2 pb-5 space-y-1.5 max-h-[80vh] overflow-y-auto">
          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider px-3 pt-1">
            Primary Defense Tools
          </div>
          {primaryLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-xl text-xs font-semibold ${
                isActive(link.path)
                  ? 'text-[#0F172A] bg-[#F1F5F9] font-bold'
                  : 'text-[#64748B] hover:bg-[#F8FAFC]'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider px-3 pt-2">
            Advanced Security Hub
          </div>
          {dropdownTools.map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-xl text-xs font-semibold ${
                isActive(tool.path)
                  ? 'text-[#0F172A] bg-[#F1F5F9] font-bold'
                  : 'text-[#64748B] hover:bg-[#F8FAFC]'
              }`}
            >
              {tool.name}
            </Link>
          ))}

          <Link
            to="/extension-hub"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-xs font-semibold text-[#64748B] hover:bg-[#F8FAFC]"
          >
            Chrome Extension Hub
          </Link>

          <div className="pt-3 border-t border-[#E2E8F0] flex flex-col gap-2">
            <a
              href="/trustai-extension.zip"
              download="trustai-extension.zip"
              className="w-full text-center py-2.5 bg-white text-[#0F172A] rounded-xl text-xs font-bold border border-[#E2E8F0] shadow-sm"
            >
              Download Chrome Extension (.zip)
            </a>
            <Link
              to="/assistant"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 bg-[#166534] text-white rounded-xl text-xs font-bold"
            >
              Consult MS (AI Security Guide)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
