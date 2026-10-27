import React from 'react';
import { motion } from 'framer-motion';

interface TrustGaugeProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export const TrustGauge: React.FC<TrustGaugeProps> = ({
  score,
  size = 180,
  strokeWidth = 14,
  label = 'TRUST SCORE'
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedScore = Math.max(0, Math.min(100, score));
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;

  let color = '#10B981'; // Emerald
  let bgTrack = '#ecfdf5';
  let statusText = 'Safe';

  if (clampedScore < 30) {
    color = '#EF4444'; // Red
    bgTrack = '#fef2f2';
    statusText = 'Scam Likely';
  } else if (clampedScore < 50) {
    color = '#F97316'; // Orange
    bgTrack = '#fff7ed';
    statusText = 'High Risk';
  } else if (clampedScore < 75) {
    color = '#F59E0B'; // Amber
    bgTrack = '#fffbeb';
    statusText = 'Caution';
  }

  return (
    <div className="flex flex-col items-center justify-center relative">
      <div style={{ width: size, height: size }} className="relative flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={bgTrack}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated score circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center content */}
        <div className="absolute flex flex-col items-center justify-center text-center">
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-4xl font-extrabold tracking-tight text-stone-900"
          >
            {clampedScore}
          </motion.span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-600 mt-0.5">
            {label}
          </span>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded-full mt-1.5"
            style={{ color, backgroundColor: bgTrack }}
          >
            {statusText}
          </span>
        </div>
      </div>
    </div>
  );
};
