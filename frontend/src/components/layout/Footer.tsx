import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-stone-200 mt-16 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
        <div className="flex items-center gap-2 font-bold text-stone-800">
          <div className="w-5 h-5 rounded bg-stone-900 text-emerald-400 flex items-center justify-center text-[10px]">T</div>
          <span>TrustAI</span>
          <span className="text-stone-300 font-normal">|</span>
          <span className="font-normal text-stone-500">MS Security Shield</span>
        </div>
        <div>
          © 2026 TrustAI. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
