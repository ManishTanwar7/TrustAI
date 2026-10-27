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
    { name: 'Multimodal Scanner', path: '/' },
    { name: 'Job & Internship Shield', path: '/internship-verification' },
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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-8 h-8 rounded-xl bg-stone-900 flex items-center justify-center text-white shadow-subtle group-hover:bg-stone-800 transition-colors">
              <Shield className="w-4 h-4 text-emerald-400 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-black text-stone-900 tracking-tight leading-none">
                TrustAI
              </span>
              <span className="text-[10px] text-stone-500 font-medium tracking-wide mt-0.5">
                MS Security Shield
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
                    ? 'text-stone-900 bg-stone-100 font-bold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
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
                    ? 'text-stone-900 bg-stone-100 font-bold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
                }`}
              >
                <span>Security Tools</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {toolsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-stone-200 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  {dropdownTools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                      <Link
                        key={tool.path}
                        to={tool.path}
                        onClick={() => setToolsDropdownOpen(false)}
                        className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors ${
                          isActive(tool.path) ? 'bg-stone-100' : 'hover:bg-stone-50'
                        }`}
                      >
                        <div className="p-2 rounded-lg bg-stone-100 text-stone-700 shrink-0">
                          <Icon className="w-4 h-4 text-emerald-600" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-stone-900 leading-snug">{tool.name}</div>
                          <div className="text-[10px] text-stone-500 mt-0.5">{tool.desc}</div>
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
                  ? 'text-stone-900 bg-stone-100 font-bold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors border border-stone-200"
            >
              <Chrome className="w-3.5 h-3.5 text-stone-500" />
              <span>Get Extension (.zip)</span>
            </a>

            <Link
              to="/assistant"
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 shadow-subtle transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ask MS</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-5 space-y-1.5 max-h-[80vh] overflow-y-auto">
          <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider px-3 pt-1">
            Primary Defense Tools
          </div>
          {primaryLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-xl text-xs font-semibold ${
                isActive(link.path)
                  ? 'text-stone-900 bg-stone-100 font-bold'
                  : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              {link.name}
            </Link>
          ))}

          <div className="text-[10px] font-bold text-stone-400 uppercase tracking-wider px-3 pt-2">
            Advanced Security Hub
          </div>
          {dropdownTools.map((tool) => (
            <Link
              key={tool.path}
              to={tool.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-xl text-xs font-semibold ${
                isActive(tool.path)
                  ? 'text-stone-900 bg-stone-100 font-bold'
                  : 'text-stone-600 hover:bg-stone-50'
              }`}
            >
              {tool.name}
            </Link>
          ))}

          <Link
            to="/extension-hub"
            onClick={() => setMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-50"
          >
            Chrome Extension Hub
          </Link>

          <div className="pt-3 border-t border-stone-100 flex flex-col gap-2">
            <a
              href="/trustai-extension.zip"
              download="trustai-extension.zip"
              className="w-full text-center py-2.5 bg-stone-100 text-stone-800 rounded-xl text-xs font-bold border border-stone-200"
            >
              Download Chrome Extension (.zip)
            </a>
            <Link
              to="/assistant"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold"
            >
              Consult MS (AI Security Guide)
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
