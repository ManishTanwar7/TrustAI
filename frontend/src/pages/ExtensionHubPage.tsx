import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Chrome, Download, CheckCircle2, ArrowRight, Shield, AlertTriangle } from 'lucide-react';

export const ExtensionHubPage: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyPath = () => {
    navigator.clipboard.writeText("extension");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Title */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
          <Chrome className="w-3.5 h-3.5" />
          <span>Chrome Extension (Manifest V3)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
          How to install TrustAI in Google Chrome
        </h1>
        <p className="text-sm text-stone-600">
          Takes under 30 seconds. Works in Google Chrome, Brave, Edge, and Opera.
        </p>
      </div>

      {/* 3 Step Visual Card Walkthrough */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Step 1 */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-card space-y-4">
          <div className="w-8 h-8 rounded-full bg-stone-900 text-white font-extrabold text-xs flex items-center justify-center">
            1
          </div>
          <h3 className="text-sm font-bold text-stone-900">Open Extensions in Chrome</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            In Chrome, open a new tab and paste this into your address bar:
          </p>
          <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 font-mono text-xs text-emerald-700 select-all font-semibold">
            chrome://extensions
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-card space-y-4">
          <div className="w-8 h-8 rounded-full bg-stone-900 text-white font-extrabold text-xs flex items-center justify-center">
            2
          </div>
          <h3 className="text-sm font-bold text-stone-900">Toggle Developer Mode</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            In the <strong>top-right corner</strong> of Chrome's Extensions tab, turn ON the <strong>Developer mode</strong> toggle switch.
          </p>
          <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-900 font-medium">
            ✓ Developer mode allows testing unpacked extensions
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-card space-y-4">
          <div className="w-8 h-8 rounded-full bg-stone-900 text-white font-extrabold text-xs flex items-center justify-center">
            3
          </div>
          <h3 className="text-sm font-bold text-stone-900">Click "Load Unpacked"</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Click the <strong>Load unpacked</strong> button on the top-left, and select the folder:
          </p>
          <div className="p-2.5 rounded-xl bg-stone-50 border border-stone-200 font-mono text-xs text-stone-800 font-semibold truncate">
            trustai/extension
          </div>
        </div>
      </div>

      {/* Done Celebration Banner */}
      <div className="p-6 rounded-3xl bg-stone-900 text-white shadow-elevated flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-base font-bold">That's it! Your browser is now protected.</h4>
          <p className="text-xs text-stone-400">
            The TrustAI shield icon will now appear in your browser toolbar with real-time website trust badges.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-3 py-1.5 rounded-xl border border-emerald-800">
            ✓ Ready to Use
          </span>
        </div>
      </div>
    </div>
  );
};
