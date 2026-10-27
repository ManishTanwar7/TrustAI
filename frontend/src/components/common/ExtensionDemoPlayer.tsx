import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, RotateCcw, Shield, AlertTriangle, 
  ExternalLink, Chrome, Lock, Sparkles, CheckCircle2 
} from 'lucide-react';

export const ExtensionDemoPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentFrame, setCurrentFrame] = useState(0);
  const totalFrames = 4;

  const frameLabels = [
    "1. Student opens job offer",
    "2. Extension scans page DOM",
    "3. Upfront deposit scam caught",
    "4. MS gives plain guidance"
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % totalFrames);
    }, 2800);
    return () => clearInterval(timer);
  }, [isPlaying]);

  return (
    <div className="bg-stone-900 rounded-3xl border border-stone-800 shadow-2xl overflow-hidden text-stone-100 space-y-0">
      {/* Chrome Window Top Bar */}
      <div className="px-4 py-3 bg-stone-950 border-b border-stone-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="text-[11px] text-stone-400 font-mono ml-2 hidden sm:inline">
            Google Chrome — TrustAI Extension Simulation
          </span>
        </div>

        <div className="flex-1 max-w-md mx-3 px-3 py-1 bg-stone-900 border border-stone-800 rounded-lg flex items-center gap-2 text-xs text-stone-400 font-mono">
          <Lock className="w-3 h-3 text-stone-500 shrink-0" />
          <span className="text-stone-300 truncate">https://apex-careers.xyz/internship-offer</span>
        </div>

        <div className="flex items-center gap-2">
          <div className={`relative px-2 py-1 rounded-md flex items-center gap-1.5 transition-all ${
            currentFrame >= 1 ? 'bg-rose-950/80 border border-rose-600/50 text-rose-300' : 'bg-stone-800 text-stone-400'
          }`}>
            <Shield className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold font-mono">
              {currentFrame >= 1 ? '12' : '98'}
            </span>
            {currentFrame >= 1 && (
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-ping absolute -top-0.5 -right-0.5" />
            )}
          </div>
        </div>
      </div>

      {/* Simulated Webpage Body */}
      <div className="relative min-h-[380px] p-6 bg-stone-950 text-stone-800 flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Webpage Content */}
        <div className="relative z-10 max-w-xl mx-auto w-full bg-white rounded-2xl p-6 shadow-xl border border-stone-200 space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                Unverified Portal
              </span>
              <h4 className="text-base font-extrabold text-stone-900 mt-1">
                Apex Labs — Data Analyst Internship
              </h4>
            </div>
            <span className="text-xs font-bold text-stone-900">$45 / Hour</span>
          </div>

          <div className="space-y-2 text-xs text-stone-600 leading-relaxed">
            <p>
              "Congratulations! You were selected for our remote internship program. We will courier your brand-new Apple MacBook Pro M3 and testing kit directly to your home address."
            </p>

            <div className={`p-3 rounded-xl border transition-all ${
              currentFrame >= 1 
                ? 'bg-rose-50 border-rose-300 ring-2 ring-rose-500/20 text-rose-900' 
                : 'bg-stone-50 border-stone-200 text-stone-700'
            }`}>
              <div className="font-bold flex items-center gap-1.5 text-xs">
                {currentFrame >= 1 && <AlertTriangle className="w-3.5 h-3.5 text-rose-600 shrink-0" />}
                <span>Equipment Security Deposit Requirement:</span>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed">
                "To release shipping tracking for your laptop, transfer a refundable $250 insurance deposit via Zelle or Crypto to our recruiter on Telegram (@ApexRecruit)."
              </p>
            </div>
          </div>
        </div>

        {/* Floating In-Page Security Pill in bottom right */}
        <AnimatePresence>
          {currentFrame >= 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-6 right-6 z-20 flex items-center gap-2 px-4 py-2.5 bg-rose-600 text-white rounded-full shadow-2xl border border-rose-400 text-xs font-bold"
            >
              <AlertTriangle className="w-4 h-4 text-white animate-bounce" />
              <span>TrustAI: $250 Laptop Deposit Scam Detected</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Extension Popup Dropdown Simulation */}
        <AnimatePresence>
          {currentFrame >= 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute top-4 right-6 z-30 w-80 bg-white rounded-2xl shadow-2xl border-2 border-stone-900 p-4 text-stone-900 space-y-3"
            >
              <div className="flex items-center justify-between pb-2 border-b border-stone-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-stone-900 text-emerald-400 flex items-center justify-center font-black text-xs">
                    MS
                  </div>
                  <div>
                    <div className="text-xs font-bold leading-tight">TrustAI Shield</div>
                    <div className="text-[10px] text-stone-400">Real-Time Extension Popup</div>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                  SCAM LIKELY
                </span>
              </div>

              <div className="flex items-center gap-3 p-2.5 rounded-xl bg-stone-50 border border-stone-200">
                <div className="w-11 h-11 rounded-full border-4 border-rose-500 flex flex-col items-center justify-center font-black text-sm text-stone-900">
                  12
                  <span className="text-[6px] text-stone-400">SCORE</span>
                </div>
                <div className="text-[11px] text-stone-700 leading-snug">
                  <strong>Advance-fee fraud alert:</strong> Recruiter demands upfront money on Telegram.
                </div>
              </div>

              {/* MS Guidance inside popup */}
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
                <div className="text-[10px] font-bold text-emerald-950 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-600" />
                  <span>MS Consultant Advice:</span>
                </div>
                <p className="text-xs font-bold text-emerald-900 leading-snug">
                  "Never send money for job equipment. Legitimate employers provide laptops for free. Block this recruiter immediately."
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Video Simulation Controls Bar */}
      <div className="px-6 py-4 bg-stone-950 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-400" />}
          </button>
          <button
            onClick={() => {
              setCurrentFrame(0);
              setIsPlaying(true);
            }}
            className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors"
            title="Replay from start"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-emerald-400 font-mono">
            {frameLabels[currentFrame]}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {frameLabels.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentFrame(idx);
                setIsPlaying(false);
              }}
              className={`h-2 rounded-full transition-all ${
                currentFrame === idx ? 'w-8 bg-emerald-400' : 'w-2 bg-stone-700 hover:bg-stone-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
