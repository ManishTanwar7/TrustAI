import React from 'react';

export const BackgroundSecurityGraph: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* High-Fidelity Cybersecurity & Financial Telemetry Graph Backdrop */}
      <svg
        className="w-full h-full object-cover"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          {/* Coordinate Grid Pattern */}
          <pattern id="telemetry-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#64748B" strokeWidth="1" strokeOpacity="0.18" />
            <circle cx="60" cy="60" r="1.5" fill="#475569" fillOpacity="0.3" />
            <path d="M 30 25 L 30 35 M 25 30 L 35 30" stroke="#64748B" strokeWidth="0.5" strokeOpacity="0.12" />
          </pattern>

          {/* Forest Green Gradient Fill for Security Defense Graph */}
          <linearGradient id="chart-green-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#166534" stopOpacity="0.22" />
            <stop offset="50%" stopColor="#15803D" stopOpacity="0.10" />
            <stop offset="100%" stopColor="#166534" stopOpacity="0.01" />
          </linearGradient>

          {/* Deep Navy/Teal Gradient Fill for Threat Detection Curve */}
          <linearGradient id="chart-blue-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.18" />
            <stop offset="50%" stopColor="#0284C7" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.01" />
          </linearGradient>

          {/* Amber Accent Gradient */}
          <linearGradient id="chart-amber-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#D97706" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* 1. Underlying Telemetry Grid */}
        <rect width="100%" height="100%" fill="url(#telemetry-grid)" />

        {/* 2. Primary Security Defense Curve (Area + Line) */}
        <path
          d="M 0,680 Q 200,640 400,560 T 800,420 T 1200,340 T 1600,210 L 1600,1000 L 0,1000 Z"
          fill="url(#chart-green-gradient)"
        />
        <path
          d="M 0,680 Q 200,640 400,560 T 800,420 T 1200,340 T 1600,210"
          fill="none"
          stroke="#166534"
          strokeWidth="3"
          strokeOpacity="0.55"
        />

        {/* 3. Secondary Threat Mitigation Wave (Area + Dashed Line) */}
        <path
          d="M 0,520 Q 300,580 650,460 T 1150,380 T 1600,290 L 1600,1000 L 0,1000 Z"
          fill="url(#chart-blue-gradient)"
        />
        <path
          d="M 0,520 Q 300,580 650,460 T 1150,380 T 1600,290"
          fill="none"
          stroke="#1E3A8A"
          strokeWidth="2.5"
          strokeOpacity="0.45"
          strokeDasharray="6 4"
        />

        {/* 4. Telemetry Coordinate Axes & Ticks */}
        <g stroke="#475569" strokeOpacity="0.3" strokeWidth="1.2">
          {/* Vertical Y Axis */}
          <line x1="120" y1="180" x2="120" y2="820" />
          {/* Horizontal X Axis */}
          <line x1="120" y1="820" x2="1520" y2="820" />
          
          {/* Axis Ticks */}
          <line x1="112" y1="300" x2="120" y2="300" />
          <line x1="112" y1="460" x2="120" y2="460" />
          <line x1="112" y1="620" x2="120" y2="620" />
          
          <line x1="400" y1="820" x2="400" y2="828" />
          <line x1="800" y1="820" x2="800" y2="828" />
          <line x1="1200" y1="820" x2="1200" y2="828" />
        </g>

        {/* Axis Labels in SVG Text */}
        <g fill="#475569" fillOpacity="0.55" fontSize="11" fontFamily="monospace" fontWeight="600">
          <text x="50" y="304">100%</text>
          <text x="56" y="464">75%</text>
          <text x="56" y="624">50%</text>
          <text x="64" y="824">0%</text>

          <text x="375" y="845">00:00</text>
          <text x="775" y="845">08:00</text>
          <text x="1175" y="845">16:00</text>
          <text x="1480" y="845">24:00</text>

          <text x="130" y="210" fill="#166534" fillOpacity="0.8" fontSize="12" fontWeight="700">
            ▲ SCAM MITIGATION INDEX (99.8%)
          </text>
        </g>

        {/* 5. Prominent Graph Data Nodes with Pulse Rings */}
        <g>
          {/* Point 1 */}
          <circle cx="400" cy="560" r="5" fill="#166534" />
          <circle cx="400" cy="560" r="14" stroke="#166534" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
          
          {/* Point 2 */}
          <circle cx="800" cy="420" r="6" fill="#166534" />
          <circle cx="800" cy="420" r="18" stroke="#166534" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />
          
          {/* Point 3 */}
          <circle cx="1200" cy="340" r="5" fill="#166534" />
          <circle cx="1200" cy="340" r="14" stroke="#166534" strokeWidth="1.5" strokeOpacity="0.4" fill="none" />

          {/* Navy Wave Points */}
          <circle cx="650" cy="460" r="4.5" fill="#1E3A8A" />
          <circle cx="650" cy="460" r="12" stroke="#1E3A8A" strokeWidth="1.5" strokeOpacity="0.35" fill="none" />

          <circle cx="1150" cy="380" r="4.5" fill="#1E3A8A" />
          <circle cx="1150" cy="380" r="12" stroke="#1E3A8A" strokeWidth="1.5" strokeOpacity="0.35" fill="none" />
        </g>

        {/* 6. Security Bar Chart Distribution (Bottom Right) */}
        <g opacity="0.45">
          <rect x="1320" y="720" width="16" height="100" rx="3" fill="#166534" />
          <rect x="1346" y="680" width="16" height="140" rx="3" fill="#166534" />
          <rect x="1372" y="640" width="16" height="180" rx="3" fill="#15803D" />
          <rect x="1398" y="590" width="16" height="230" rx="3" fill="#166534" />
          <rect x="1424" y="550" width="16" height="270" rx="3" fill="#166534" />
          <rect x="1450" y="520" width="16" height="300" rx="3" fill="#166534" />
        </g>

        {/* 7. Security Radar Crosshairs & Concentric Rings (Top Right) */}
        <g opacity="0.35" transform="translate(1380, 220)">
          <circle cx="0" cy="0" r="110" stroke="#166534" strokeWidth="1.2" fill="none" strokeDasharray="4 4" />
          <circle cx="0" cy="0" r="75" stroke="#166534" strokeWidth="1" fill="none" />
          <circle cx="0" cy="0" r="40" stroke="#166534" strokeWidth="1" fill="none" strokeDasharray="3 3" />
          <circle cx="0" cy="0" r="6" fill="#166534" />
          <line x1="-120" y1="0" x2="120" y2="0" stroke="#166534" strokeWidth="1" />
          <line x1="0" y1="-120" x2="0" y2="120" stroke="#166534" strokeWidth="1" />
          {/* Radar Sweep Line */}
          <line x1="0" y1="0" x2="78" y2="-78" stroke="#166534" strokeWidth="2.5" strokeOpacity="0.8" />
        </g>

        {/* 8. Top-Left Network Topology Clusters */}
        <g opacity="0.35" stroke="#475569" strokeWidth="1" strokeDasharray="2 2">
          <line x1="160" y1="120" x2="240" y2="160" />
          <line x1="240" y1="160" x2="310" y2="110" />
          <line x1="240" y1="160" x2="260" y2="230" />
          
          <circle cx="160" cy="120" r="4" fill="#0F172A" />
          <circle cx="240" cy="160" r="5" fill="#166534" />
          <circle cx="310" cy="110" r="4" fill="#0F172A" />
          <circle cx="260" cy="230" r="4" fill="#1E3A8A" />
        </g>
      </svg>
    </div>
  );
};
