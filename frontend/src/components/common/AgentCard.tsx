import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, FileText, Eye, Building2, Radio } from 'lucide-react';

interface AgentCardProps {
  title: string;
  role: string;
  score: number;
  scoreLabel: string;
  status: 'safe' | 'caution' | 'danger';
  findings: string[];
  evidence?: string[];
  iconType: 'scam' | 'privacy' | 'contract' | 'dark' | 'credibility' | 'threat';
}

export const AgentCard: React.FC<AgentCardProps> = ({
  title,
  role,
  score,
  scoreLabel,
  status,
  findings,
  evidence,
  iconType
}) => {
  const getIcon = () => {
    switch (iconType) {
      case 'scam': return <AlertTriangle className="w-4 h-4 text-rose-600" />;
      case 'privacy': return <Eye className="w-4 h-4 text-indigo-600" />;
      case 'contract': return <FileText className="w-4 h-4 text-amber-600" />;
      case 'dark': return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'credibility': return <Building2 className="w-4 h-4 text-emerald-600" />;
      case 'threat': return <Radio className="w-4 h-4 text-cyan-600" />;
      default: return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
    }
  };

  const getStatusBadge = () => {
    if (status === 'safe') {
      return <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">Optimal</span>;
    }
    if (status === 'caution') {
      return <span className="text-[11px] font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">Review</span>;
    }
    return <span className="text-[11px] font-medium text-red-700 bg-red-50 px-2 py-0.5 rounded-md border border-red-200">Critical</span>;
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white rounded-xl border border-stone-200 p-4 shadow-subtle hover:shadow-card transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-stone-50 border border-stone-200 flex items-center justify-center">
            {getIcon()}
          </div>
          <div>
            <h4 className="text-sm font-semibold text-stone-900 leading-tight">{title}</h4>
            <p className="text-[11px] text-stone-500">{role}</p>
          </div>
        </div>
        {getStatusBadge()}
      </div>

      <div className="flex items-baseline justify-between mb-3 px-2.5 py-1.5 bg-stone-50 rounded-lg border border-stone-100">
        <span className="text-xs text-stone-600">{scoreLabel}</span>
        <span className="text-sm font-bold text-stone-900">{score}/100</span>
      </div>

      <div className="space-y-1.5 mb-2">
        <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">Findings:</div>
        {findings.length > 0 ? (
          <ul className="text-xs text-stone-700 space-y-1">
            {findings.slice(0, 3).map((f, i) => (
              <li key={i} className="flex items-start gap-1.5">
                <span className="text-stone-400 mt-1">•</span>
                <span className="leading-snug">{f}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs text-stone-400 italic">No adverse flags reported.</p>
        )}
      </div>

      {evidence && evidence.length > 0 && (
        <div className="mt-2.5 pt-2 border-t border-stone-100">
          <div className="text-[10px] font-medium text-stone-500 mb-1">Snippet Evidence:</div>
          <div className="text-[11px] font-mono text-stone-600 bg-stone-50 p-2 rounded border border-stone-100 truncate">
            {evidence[0]}
          </div>
        </div>
      )}
    </motion.div>
  );
};
