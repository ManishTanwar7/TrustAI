import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Sparkles } from 'lucide-react';

interface SecurityShieldSpinnerProps {
  label?: string;
  sublabel?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const SecurityShieldSpinner: React.FC<SecurityShieldSpinnerProps> = ({
  label = "MS Guardian Shield Active",
  sublabel = "Auditing threat telemetry & verifying credentials...",
  size = 'md'
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4 text-center">
      <div className="relative flex items-center justify-center">
        {/* Outer Rotating Threat Radar Wheel */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2.4, ease: "linear" }}
          className="w-16 h-16 rounded-full border-2 border-dashed border-[#166534]/40"
        />

        {/* Middle Pulse Ring */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.7, 0.3] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="absolute inset-0 rounded-full bg-[#166534]/10"
        />

        {/* Center Warrior Protective Shield */}
        <div className="absolute w-10 h-10 rounded-full bg-[#166534] text-white flex items-center justify-center shadow-md">
          <Shield className="w-5 h-5 text-emerald-100" />
        </div>
      </div>

      <div className="space-y-1 max-w-xs">
        <div className="text-xs font-bold text-[#0F172A] flex items-center justify-center gap-1.5">
          <span>{label}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#166534] animate-ping" />
        </div>
        <p className="text-[11px] text-[#64748B] leading-relaxed">
          {sublabel}
        </p>
      </div>
    </div>
  );
};
