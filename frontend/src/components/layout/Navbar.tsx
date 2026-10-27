import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Sparkles, Menu, X, Chrome } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Live Scanner', path: '/' },
    { name: 'Internship Verifier', path: '/internship-verification' },
    { name: 'Chrome Extension', path: '/extension-hub' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
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

          {/* Clean Minimal Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1.5">
            {links.map((link) => (
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
          <div className="md:hidden flex items-center">
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
        <div className="md:hidden bg-white border-b border-stone-200 px-4 pt-2 pb-4 space-y-1">
          {links.map((link) => (
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
          <div className="pt-2 border-t border-stone-100 flex flex-col gap-2">
            <Link
              to="/assistant"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center px-4 py-2 rounded-xl text-xs font-bold text-white bg-stone-900"
            >
              Ask MS Consultant
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
