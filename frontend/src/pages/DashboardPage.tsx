import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, AlertTriangle, Activity, ArrowUpRight, 
  Search, Filter, RefreshCw, Briefcase, FileText, Eye, Globe 
} from 'lucide-react';
import { api } from '../services/api';
import { ChiefVerdict, SecurityMetrics } from '../types';
import { VerdictBadge } from '../components/common/VerdictBadge';
import { LiveRadar } from '../components/common/LiveRadar';
import { INITIAL_METRICS, SAMPLE_VERDICTS } from '../services/mockData';

export const DashboardPage: React.FC = () => {
  const [metrics, setMetrics] = useState<SecurityMetrics>(INITIAL_METRICS);
  const [scans, setScans] = useState<ChiefVerdict[]>(SAMPLE_VERDICTS);
  const [selectedScan, setSelectedScan] = useState<ChiefVerdict | null>(SAMPLE_VERDICTS[0]);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [m, s] = await Promise.all([api.getMetrics(), api.getThreatHistory(20)]);
      setMetrics(m);
      if (s.length > 0) {
        setScans(s);
        setSelectedScan(s[0]);
      }
    } catch (e) {
      console.warn('Dashboard fallback used.');
    } finally {
      setLoading(false);
    }
  };

  const filteredScans = filterCategory === 'all'
    ? scans
    : scans.filter(s => s.category === filterCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-200">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Security Intelligence Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Real-time consensus monitoring across the 6 Gemini security agents.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={loadDashboardData}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone-200 bg-white text-xs font-medium text-stone-700 hover:bg-stone-50 transition-colors shadow-subtle"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Sync Engine</span>
          </button>

          <Link
            to="/analyze"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-stone-900 text-white text-xs font-semibold hover:bg-stone-800 transition-colors shadow-subtle"
          >
            <span>+ New Verification</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-subtle">
          <div className="text-xs font-medium text-stone-500 mb-1">Entities Analyzed</div>
          <div className="text-2xl font-extrabold text-stone-900">{metrics.total_entities_analyzed.toLocaleString()}</div>
          <div className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <span>+18%</span>
            <span className="text-stone-400">vs last month</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-subtle">
          <div className="text-xs font-medium text-stone-500 mb-1">Scams Averted</div>
          <div className="text-2xl font-extrabold text-rose-600">{metrics.scams_averted.toLocaleString()}</div>
          <div className="text-[11px] text-stone-500 mt-1">Advance-fee & phishing</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-subtle">
          <div className="text-xs font-medium text-stone-500 mb-1">Avg Trust Score</div>
          <div className="text-2xl font-extrabold text-stone-900">{metrics.average_trust_score}/100</div>
          <div className="text-[11px] text-amber-600 font-medium mt-1">Cautionary baseline</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-subtle">
          <div className="text-xs font-medium text-stone-500 mb-1">Active Protection Fleet</div>
          <div className="text-2xl font-extrabold text-emerald-600">6 / 6 Agents</div>
          <div className="text-[11px] text-stone-500 mt-1">{metrics.agent_fleet_status}</div>
        </div>
      </div>

      {/* Grid: Live Radar + Selected Scan Drilldown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <LiveRadar />

          {/* Quick Categories Bar */}
          <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-subtle space-y-2">
            <div className="text-xs font-semibold text-stone-900 mb-2">Dedicated Verifiers</div>
            <Link
              to="/internship-verification"
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-stone-50 transition-colors border border-stone-100"
            >
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-rose-500" />
                <span className="text-xs font-medium text-stone-800">Internship Verifier</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
            </Link>
            <Link
              to="/contract-analysis"
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-stone-50 transition-colors border border-stone-100"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-medium text-stone-800">Contract Intelligence</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
            </Link>
            <Link
              to="/privacy-center"
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-stone-50 transition-colors border border-stone-100"
            >
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-indigo-500" />
                <span className="text-xs font-medium text-stone-800">Privacy Center</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
            </Link>
          </div>
        </div>

        {/* Selected Scan Detail */}
        <div className="lg:col-span-2">
          {selectedScan ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-card space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-stone-100">
                <div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
                    Category: {selectedScan.category}
                  </span>
                  <h3 className="text-lg font-bold text-stone-900 mt-0.5">
                    {selectedScan.target_identifier}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <VerdictBadge verdict={selectedScan.verdict} size="md" />
                  <span className="text-xs font-bold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-full">
                    Score: {selectedScan.trust_score}/100
                  </span>
                </div>
              </div>

              {/* Executive Summary */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-100 space-y-2">
                <div className="text-xs font-semibold text-stone-900 flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Chief Agent Executive Summary</span>
                </div>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {selectedScan.executive_summary}
                </p>
              </div>

              {/* Sub-scores breakdown */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-center">
                  <div className="text-[10px] text-stone-500">Scam Risk</div>
                  <div className="text-base font-bold text-stone-900 mt-0.5">{selectedScan.scam_risk}%</div>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-center">
                  <div className="text-[10px] text-stone-500">Privacy Index</div>
                  <div className="text-base font-bold text-stone-900 mt-0.5">{selectedScan.privacy_index}/100</div>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-center">
                  <div className="text-[10px] text-stone-500">Contract Terms</div>
                  <div className="text-base font-bold text-stone-900 mt-0.5">{selectedScan.contract_fairness}/100</div>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-center">
                  <div className="text-[10px] text-stone-500">Dark Patterns</div>
                  <div className="text-base font-bold text-stone-900 mt-0.5">{selectedScan.dark_pattern_severity}%</div>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100 text-center">
                  <div className="text-[10px] text-stone-500">Credibility</div>
                  <div className="text-base font-bold text-stone-900 mt-0.5">{selectedScan.credibility_index}/100</div>
                </div>
              </div>

              {/* Key Concerns */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-stone-900">Consensus Concerns:</div>
                <ul className="space-y-1.5">
                  {selectedScan.key_concerns.map((concern, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-stone-700">
                      <span className="text-rose-500 font-bold">•</span>
                      <span>{concern}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Immediate Recommendations */}
              <div className="p-4 bg-emerald-50/60 rounded-xl border border-emerald-100 space-y-1.5">
                <div className="text-xs font-bold text-emerald-900">Recommended Next Steps:</div>
                <ul className="space-y-1 text-xs text-emerald-800">
                  {selectedScan.immediate_actions.map((action, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{action}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 p-12 text-center text-stone-400">
              Select an item below to inspect multi-agent consensus report.
            </div>
          )}
        </div>
      </div>

      {/* Scans Table */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-card overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-stone-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-stone-900">Recent Security Audits</h3>
            <p className="text-xs text-stone-500">History of analyzed targets across the web</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-500">Filter:</span>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="text-xs bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-stone-800 focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="internship">Internships</option>
              <option value="contract">Contracts</option>
              <option value="website">Websites</option>
              <option value="privacy">Privacy</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-stone-50 border-b border-stone-100 text-stone-500 uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4 font-semibold">Target / Subject</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">Trust Score</th>
                <th className="py-3 px-4 font-semibold">Verdict</th>
                <th className="py-3 px-4 font-semibold">Timestamp</th>
                <th className="py-3 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredScans.map((scan) => (
                <tr
                  key={scan.scan_id}
                  onClick={() => setSelectedScan(scan)}
                  className={`cursor-pointer hover:bg-stone-50 transition-colors ${
                    selectedScan?.scan_id === scan.scan_id ? 'bg-stone-50/80 font-medium' : ''
                  }`}
                >
                  <td className="py-3 px-4 text-stone-900 max-w-xs truncate">
                    {scan.target_identifier}
                  </td>
                  <td className="py-3 px-4 text-stone-600 capitalize">
                    {scan.category}
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-stone-900">{scan.trust_score}</span>
                    <span className="text-stone-400">/100</span>
                  </td>
                  <td className="py-3 px-4">
                    <VerdictBadge verdict={scan.verdict} size="sm" />
                  </td>
                  <td className="py-3 px-4 text-stone-400 font-mono text-[11px]">
                    {new Date(scan.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-xs text-stone-600 hover:text-emerald-700 font-semibold">
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
