import React from 'react';

interface HumanClipartProps {
  className?: string;
  size?: number;
}

export const HumanConsultantClipart: React.FC<HumanClipartProps> = ({ 
  className = "w-48 h-48",
  size = 200 
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Soft natural background circle */}
      <circle cx="120" cy="120" r="105" fill="#f0fdf4" stroke="#dcfce7" strokeWidth="3" />
      
      {/* Decorative calm background elements */}
      <path d="M40 180C60 165 90 170 120 185C150 200 180 195 200 180" stroke="#bbf7d0" strokeWidth="4" strokeLinecap="round" />
      <circle cx="65" cy="80" r="6" fill="#86efac" opacity="0.6" />
      <circle cx="185" cy="70" r="8" fill="#86efac" opacity="0.6" />
      
      {/* Torso & Sweater (Natural Forest Green / Sage) */}
      <path
        d="M60 215C60 185 85 160 120 160C155 160 180 185 180 215"
        fill="#15803d"
        stroke="#14532d"
        strokeWidth="3.5"
      />
      {/* Shirt Collar (Clean Off-White) */}
      <path d="M105 160L120 180L135 160Z" fill="#ffffff" stroke="#14532d" strokeWidth="2.5" />
      <path d="M110 160L120 172L130 160" stroke="#cbd5e1" strokeWidth="2" />

      {/* Neck */}
      <rect x="108" y="130" width="24" height="32" rx="4" fill="#f6d5b8" stroke="#14532d" strokeWidth="3" />

      {/* Head / Face (Warm Human Skin Tone) */}
      <ellipse cx="120" cy="105" rx="34" ry="38" fill="#f6d5b8" stroke="#14532d" strokeWidth="3.5" />

      {/* Hair (Natural Dark Brown / Soft Waves) */}
      <path
        d="M86 98C84 75 98 56 120 56C142 56 156 75 154 98C154 98 148 78 135 78C122 78 120 85 110 82C100 79 92 88 86 98Z"
        fill="#3e2723"
        stroke="#14532d"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* Sideburns & Ear */}
      <ellipse cx="86" cy="110" rx="5" ry="8" fill="#f6d5b8" stroke="#14532d" strokeWidth="2.5" />
      <ellipse cx="154" cy="110" rx="5" ry="8" fill="#f6d5b8" stroke="#14532d" strokeWidth="2.5" />

      {/* Modern Round Glasses */}
      <circle cx="106" cy="106" r="12" fill="#ffffff" fillOpacity="0.4" stroke="#1e293b" strokeWidth="3" />
      <circle cx="134" cy="106" r="12" fill="#ffffff" fillOpacity="0.4" stroke="#1e293b" strokeWidth="3" />
      <path d="M118 106H122" stroke="#1e293b" strokeWidth="3" strokeLinecap="round" />
      <path d="M94 105L86 102" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M146 105L154 102" stroke="#1e293b" strokeWidth="2.5" strokeLinecap="round" />

      {/* Friendly Eyes */}
      <circle cx="106" cy="106" r="3.5" fill="#1e293b" />
      <circle cx="134" cy="106" r="3.5" fill="#1e293b" />
      <circle cx="107.5" cy="104.5" r="1" fill="#ffffff" />
      <circle cx="135.5" cy="104.5" r="1" fill="#ffffff" />

      {/* Smiling Eyebrows */}
      <path d="M97 92C101 89 111 89 115 92" stroke="#3e2723" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M125 92C129 89 139 89 143 92" stroke="#3e2723" strokeWidth="2.5" strokeLinecap="round" />

      {/* Warm Smile */}
      <path d="M111 124C114 130 126 130 129 124" stroke="#8d4b38" strokeWidth="3" strokeLinecap="round" />

      {/* Nose */}
      <path d="M120 112V117C120 118 118 119 116 119" stroke="#d49b78" strokeWidth="2" strokeLinecap="round" />

      {/* Cute Shield Badge on Chest (Natural Forest & Gold) */}
      <g transform="translate(142, 168) scale(0.9)">
        <path
          d="M18 4L32 10V22C32 30 25 38 18 42C11 38 4 30 4 22V10L18 4Z"
          fill="#16a34a"
          stroke="#ffffff"
          strokeWidth="2.5"
        />
        <path d="M13 22L17 26L24 17" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
};
