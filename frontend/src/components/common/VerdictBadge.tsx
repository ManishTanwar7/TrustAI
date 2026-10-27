import React from 'react';
import { VerdictType } from '../../types';

interface VerdictBadgeProps {
  verdict: VerdictType | string;
  size?: 'sm' | 'md' | 'lg';
}

export const VerdictBadge: React.FC<VerdictBadgeProps> = ({ verdict, size = 'md' }) => {
  const v = verdict.toUpperCase();
  
  let styles = 'bg-stone-100 text-stone-700 border-stone-200';
  let dotColor = 'bg-stone-400';

  if (v.includes('SAFE')) {
    styles = 'bg-emerald-50 text-emerald-800 border-emerald-200';
    dotColor = 'bg-emerald-500';
  } else if (v.includes('CAUTION')) {
    styles = 'bg-amber-50 text-amber-800 border-amber-200';
    dotColor = 'bg-amber-500';
  } else if (v.includes('HIGH RISK')) {
    styles = 'bg-orange-50 text-orange-800 border-orange-200';
    dotColor = 'bg-orange-500';
  } else if (v.includes('SCAM')) {
    styles = 'bg-red-50 text-red-800 border-red-200';
    dotColor = 'bg-red-500 animate-pulse';
  }

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5 gap-1.5',
    md: 'text-xs px-3 py-1 gap-2',
    lg: 'text-sm px-4 py-1.5 gap-2.5 font-semibold'
  }[size];

  return (
    <span className={`inline-flex items-center font-medium rounded-full border shadow-subtle ${sizeClasses} ${styles}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      <span>{verdict}</span>
    </span>
  );
};
