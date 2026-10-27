import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Database, Search, Filter, Download, 
  ExternalLink, ShieldAlert, CheckCircle, AlertTriangle 
} from 'lucide-react';
import { api } from '../services/api';
import { ChiefVerdict } from '../types';
import { VerdictBadge } from '../components/common/VerdictBadge';
import { SAMPLE_VERDICTS } from '../services/mockData';

export const ThreatHistoryPage: React.FC = () => {
  const [threats, setThreats] = useState<ChiefVerdict[]>(SAMPLE_VERDICTS);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  useEffect(() => {
    loadThreats();
  }, []);

  const loadThreats = async () => {
    try {
      const data = await api.getThreatHistory(50);
      if (data.length > 0) setThreats(data);
    } catch (e) {
      console.warn('Threat archive fallback used.');
    }
  };

  const filtered = threats.filter(t => {
    const matchesSearch = t.target_identifier.toLowerCase().includes(search.toLowerCase()) ||
                          t.executive_summary.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'all' || t.category === category;
    return matchesSearch && matchesCategory;
  });

  const exportJSON = () => {
    const blob = new Blob([JSON.stringify(filtered, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `trustai-threat-archive-${Date.now()}.json`;
    a.click();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <h1 className="text-3xl font-extrabold text-stone-900 tracking-tight">
            Threat Intelligence Archive
          </h1>
          <p className="text-sm text-stone-500 mt-1">
            Global repository of detected fraudulent internships, phishing sites, and predatory terms.
          </p>
        </div>

        <button
          onClick={exportJSON}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-stone-200 rounded-xl text-xs font-semibold text-stone-700 hover:bg-stone-50 transition-colors shadow-subtle shrink-0"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Export Archive (JSON)</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-white rounded-xl border border-stone-200 w-full flex-1 shadow-subtle">
          <Search className="w-4 h-4 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by company name, domain, scam tactic, or clause..."
            className="w-full text-xs bg-transparent outline-none text-stone-900 placeholder:text-stone-400"
          />
        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="text-xs bg-white border border-stone-200 rounded-xl px-3 py-2.5 text-stone-700 shadow-subtle focus:outline-none w-full sm:w-auto"
        >
          <option value="all">All Threat Types</option>
          <option value="internship">Internships</option>
          <option value="contract">Contracts</option>
          <option value="website">Websites</option>
          <option value="privacy">Privacy</option>
        </select>
      </div>

      {/* Threats Feed Cards */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.scan_id}
            className="bg-white rounded-2xl border border-stone-200 p-6 shadow-subtle hover:shadow-card transition-all space-y-3"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <VerdictBadge verdict={item.verdict} size="sm" />
                <span className="text-xs font-semibold text-stone-900">{item.target_identifier}</span>
                <span className="text-[10px] text-stone-400 font-mono">[{item.category}]</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-stone-500">
                <span className="font-bold text-stone-800">Trust Score: {item.trust_score}/100</span>
                <span>•</span>
                <span className="font-mono text-[11px]">{new Date(item.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {item.executive_summary}
            </p>

            <div className="pt-2 border-t border-stone-100 flex flex-wrap gap-2">
              {item.key_concerns.map((concern, i) => (
                <span
                  key={i}
                  className="text-[11px] bg-stone-50 text-stone-600 px-2.5 py-1 rounded-md border border-stone-100"
                >
                  ⚠️ {concern}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
