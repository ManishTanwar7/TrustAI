import React, { useState } from 'react';
import { Activity, ShieldCheck, TrendingUp, AlertTriangle, Cpu, ArrowUpRight, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export const SecurityTelemetryGraphCard: React.FC = () => {
  const [activeRange, setActiveRange] = useState<'24h' | '7d' | '30d'>('24h');

  // Coordinates for the interactive graph lines based on range
  const graphData = {
    '24h': {
      line1: "M 0,140 Q 120,130 240,95 T 480,70 T 720,40 T 960,18",
      area1: "M 0,140 Q 120,130 240,95 T 480,70 T 720,40 T 960,18 L 960,180 L 0,180 Z",
      line2: "M 0,110 Q 160,125 320,100 T 640,65 T 960,35",
      intercepted: '4,129',
      rate: '99.8%',
      latency: '11ms',
      blockedLoss: '$148,200'
    },
    '7d': {
      line1: "M 0,150 Q 150,110 300,85 T 600,55 T 960,15",
      area1: "M 0,150 Q 150,110 300,85 T 600,55 T 960,15 L 960,180 L 0,180 Z",
      line2: "M 0,130 Q 200,105 400,90 T 700,50 T 960,25",
      intercepted: '28,940',
      rate: '99.9%',
      latency: '12ms',
      blockedLoss: '$1.04M'
    },
    '30d': {
      line1: "M 0,160 Q 200,120 400,75 T 750,45 T 960,10",
      area1: "M 0,160 Q 200,120 400,75 T 750,45 T 960,10 L 960,180 L 0,180 Z",
      line2: "M 0,145 Q 250,115 500,80 T 800,40 T 960,20",
      intercepted: '118,400',
      rate: '99.85%',
      latency: '12ms',
      blockedLoss: '$4.28M'
    }
  };

  const current = graphData[activeRange];

  return (
    <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-slate-300/80 p-6 sm:p-8 shadow-md space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#DCFCE7] border border-green-200 text-[#166534] text-[11px] font-bold mb-1">
            <span className="w-2 h-2 rounded-full bg-[#166534] animate-pulse" />
            <span>Live Security Telemetry Feed</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#0F172A] tracking-tight">
            Threat Interception & Telemetry Graph
          </h3>
          <p className="text-xs text-[#64748B]">
            Real-time visual monitoring of fake internships, telegram recruiter traps, and fraudulent checkouts.
          </p>
        </div>

        {/* Range Selector */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 self-start sm:self-auto">
          {(['24h', '7d', '30d'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                activeRange === range
                  ? 'bg-[#0F172A] text-white shadow-xs'
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              {range.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* 4 Quick Stat Metric Badges */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-1">
          <div className="text-[11px] text-[#64748B] font-semibold flex items-center justify-between">
            <span>Traps Intercepted</span>
            <ShieldCheck className="w-3.5 h-3.5 text-[#166534]" />
          </div>
          <div className="text-xl font-black text-[#0F172A]">{current.intercepted}</div>
          <div className="text-[10px] text-[#166534] font-bold flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" />
            <span>+14.2% defense velocity</span>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-1">
          <div className="text-[11px] text-[#64748B] font-semibold flex items-center justify-between">
            <span>Mitigation Rate</span>
            <Activity className="w-3.5 h-3.5 text-[#166534]" />
          </div>
          <div className="text-xl font-black text-[#166534]">{current.rate}</div>
          <div className="text-[10px] text-[#64748B]">Zero false positives today</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-1">
          <div className="text-[11px] text-[#64748B] font-semibold flex items-center justify-between">
            <span>User Capital Protected</span>
            <Zap className="w-3.5 h-3.5 text-[#D97706]" />
          </div>
          <div className="text-xl font-black text-[#0F172A]">{current.blockedLoss}</div>
          <div className="text-[10px] text-amber-700 font-semibold">Advance-fees prevented</div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200 space-y-1">
          <div className="text-[11px] text-[#64748B] font-semibold flex items-center justify-between">
            <span>Inference Speed</span>
            <Cpu className="w-3.5 h-3.5 text-blue-600" />
          </div>
          <div className="text-xl font-black text-[#0F172A]">{current.latency}</div>
          <div className="text-[10px] text-blue-700 font-semibold">Gemma 4 Multimodal Vision</div>
        </div>
      </div>

      {/* High-Definition Visual Vector Graph */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden text-white shadow-inner">
        {/* Graph Header overlay */}
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Scam Prevention Curve
            </span>
            <span className="flex items-center gap-1.5 text-blue-400 font-semibold">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              Fleet Consensus
            </span>
          </div>
          <span>Active Window: {activeRange.toUpperCase()}</span>
        </div>

        {/* SVG Graph View */}
        <svg
          viewBox="0 0 960 180"
          className="w-full h-44 sm:h-52 overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            {/* Grid Pattern inside chart */}
            <pattern id="card-chart-grid" width="40" height="30" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 30" fill="none" stroke="#334155" strokeWidth="0.5" strokeOpacity="0.4" />
            </pattern>

            <linearGradient id="card-green-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <rect width="960" height="180" fill="url(#card-chart-grid)" />

          {/* Green Area */}
          <path d={current.area1} fill="url(#card-green-area)" />

          {/* Blue Line */}
          <path
            d={current.line2}
            fill="none"
            stroke="#60A5FA"
            strokeWidth="2"
            strokeDasharray="4 4"
            opacity="0.75"
          />

          {/* Green Line */}
          <path
            d={current.line1}
            fill="none"
            stroke="#34D399"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Data Nodes */}
          <circle cx="240" cy="95" r="4.5" fill="#34D399" />
          <circle cx="480" cy="70" r="4.5" fill="#34D399" />
          <circle cx="720" cy="40" r="4.5" fill="#34D399" />
          <circle cx="960" cy="18" r="6" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
        </svg>

        {/* Bottom Time Marks */}
        <div className="flex justify-between text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-800">
          <span>T - 100% Interval</span>
          <span>T - 75%</span>
          <span>T - 50%</span>
          <span>T - 25%</span>
          <span className="text-emerald-400 font-bold">Now (Live)</span>
        </div>
      </div>
    </div>
  );
};
