import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Cpu, Lock, CheckCircle2 } from 'lucide-react';

const AGENTS = [
  { name: 'Scam Agent', status: 'Active', latency: '42ms' },
  { name: 'Privacy Agent', status: 'Active', latency: '38ms' },
  { name: 'Contract Agent', status: 'Active', latency: '49ms' },
  { name: 'Dark Pattern Agent', status: 'Active', latency: '31ms' },
  { name: 'Credibility Agent', status: 'Active', latency: '28ms' },
  { name: 'Threat Intel Agent', status: 'Active', latency: '22ms' },
];

export const LiveRadar: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-card">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
        <div className="flex items-center gap-2">
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="absolute w-4 h-4 rounded-full bg-emerald-400 opacity-40 animate-ping" />
          </div>
          <span className="text-sm font-semibold text-stone-900">Multi-Agent Neural Grid</span>
        </div>
        <span className="text-xs text-stone-500 font-mono">Gemini-4 Backbone</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5">
        {AGENTS.map((agent, index) => (
          <motion.div
            key={agent.name}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="p-2.5 rounded-lg border border-stone-100 bg-stone-50/70 hover:bg-stone-50 transition-colors"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-medium text-stone-800">{agent.name}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
            <div className="flex items-center justify-between text-[10px] text-stone-400">
              <span>{agent.status}</span>
              <span className="font-mono">{agent.latency}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
        <span className="flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 text-stone-400" />
          Chief Decision Agent: Consensus Engine Active
        </span>
        <span className="font-medium text-emerald-600">6/6 Nodes Operational</span>
      </div>
    </div>
  );
};
