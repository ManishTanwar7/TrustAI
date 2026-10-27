import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#E2E8F0] mt-16 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#64748B]">
        <div className="flex items-center gap-2 font-bold text-[#0F172A]">
          <div className="w-5 h-5 rounded bg-[#0F172A] text-[#4ADE80] flex items-center justify-center text-[10px]">T</div>
          <span>TrustAI</span>
          <span className="text-[#CBD5E1] font-normal">|</span>
          <span className="font-normal text-[#64748B]">MS Security Shield</span>
        </div>
        <div>
          © 2026 TrustAI. Financial & Career Defense.
        </div>
      </div>
    </footer>
  );
};
