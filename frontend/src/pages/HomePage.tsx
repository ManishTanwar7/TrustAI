import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, AlertTriangle, ArrowRight, Sparkles, 
  CheckCircle2, Chrome, Search, RotateCcw, Download,
  Briefcase, ShoppingCart, FileCheck, Scale, Image as ImageIcon, 
  UploadCloud, Eye, Users, Zap, FileText, Scan, ShieldAlert,
  QrCode, MessageSquare, Globe, Printer, ChevronRight, Activity,
  Lock, ExternalLink, Cpu, Heart, Check, X, Flame, Shield, HelpCircle
} from 'lucide-react';
import { TrustGauge } from '../components/common/TrustGauge';
import { VerdictBadge } from '../components/common/VerdictBadge';
import { ExtensionDemoPlayer } from '../components/common/ExtensionDemoPlayer';

interface ScreenshotPreset {
  id: string;
  title: string;
  category: string;
  badge: string;
  colorScheme: {
    bg: string;
    border: string;
    text: string;
    accent: string;
    glow: string;
  };
  score: number;
  verdict: 'SCAM LIKELY' | 'SAFE' | 'CAUTION';
  summary: string;
  quickFlags: { icon: string; title: string; subtitle: string; color: string }[];
  characterMood: 'shocked' | 'warning' | 'happy';
  msAdvice: string;
  steps: string[];
  mockImage: {
    sender: string;
    channel: string;
    message: string;
    highlight: string;
  };
}

const SCREENSHOT_PRESETS: ScreenshotPreset[] = [
  {
    id: 'telegram-scam',
    title: 'Recruiter Telegram Chat',
    category: 'Advance-Fee Job Trap',
    badge: '🚨 Critical Fraud',
    colorScheme: {
      bg: 'from-purple-900/30 via-indigo-900/20 to-stone-900',
      border: 'border-purple-500/40',
      text: 'text-purple-300',
      accent: 'bg-purple-500',
      glow: 'shadow-[0_0_25px_rgba(168,85,247,0.35)]'
    },
    score: 8,
    verdict: 'SCAM LIKELY',
    summary: 'Advance-fee job scam demanding $200 via Zelle / USDT for hardware on Telegram.',
    characterMood: 'shocked',
    quickFlags: [
      { icon: '💸', title: '$200 Upfront Fee', subtitle: 'Deposit scam trap', color: 'bg-rose-500/20 border-rose-500/40 text-rose-300' },
      { icon: '💬', title: 'Telegram Handle', subtitle: 'Untraceable channel', color: 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300' },
      { icon: '🏢', title: 'No Legal Filing', subtitle: 'Unregistered fake company', color: 'bg-amber-500/20 border-amber-500/40 text-amber-300' }
    ],
    msAdvice: 'Hey friend! Look out—they want $200 before you even start work! Real employers NEVER ask for laptop deposits. Block them right away and keep your money safe!',
    steps: [
      'Gemma 4 Vision: Reading screenshot layout and text...',
      'Catching advance-fee keywords & untraceable Telegram handles...',
      'Cross-referencing threat blacklist database...',
      'MS Guardian shield activated: Verdict ready!'
    ],
    mockImage: {
      sender: 'Nova Global HR (@NovaHR_Recruiting)',
      channel: 'Telegram Direct Message',
      message: 'Congratulations! You are selected as Remote QA Intern ($48/hr). To ship your Apple MacBook Pro, transfer a refundable $200 equipment fee via USDT or Zelle today.',
      highlight: 'transfer a refundable $200 equipment fee via USDT or Zelle'
    }
  },
  {
    id: 'crypto-qr',
    title: 'Crypto Payment QR Capture',
    category: 'Blockchain Wallet Hijack',
    badge: '⚡ Urgent Trap',
    colorScheme: {
      bg: 'from-amber-900/30 via-orange-900/20 to-stone-900',
      border: 'border-amber-500/40',
      text: 'text-amber-300',
      accent: 'bg-amber-500',
      glow: 'shadow-[0_0_25px_rgba(245,158,11,0.35)]'
    },
    score: 5,
    verdict: 'SCAM LIKELY',
    summary: 'Fraudulent crypto invoice urgently demanding irreversible transfer.',
    characterMood: 'warning',
    quickFlags: [
      { icon: '⛓️', title: 'Crypto Wallet QR', subtitle: 'Irreversible transaction', color: 'bg-amber-500/20 border-amber-500/40 text-amber-300' },
      { icon: '⏱️', title: '59-Min Deadline', subtitle: 'Artificial urgency panic', color: 'bg-rose-500/20 border-rose-500/40 text-rose-300' },
      { icon: '❌', title: 'No Corporate Tax ID', subtitle: 'Zero legal identity', color: 'bg-purple-500/20 border-purple-500/40 text-purple-300' }
    ],
    msAdvice: 'Stop! Crypto transactions cannot be refunded once sent. This QR code leads to an anonymous private wallet. Refuse payment and report them!',
    steps: [
      'Multimodal OCR: Scanning QR code & wallet address...',
      'Auditing blockchain address against fraud watchlists...',
      'Flagging panic countdown timer layout...',
      'MS Guardian shield activated: Verdict ready!'
    ],
    mockImage: {
      sender: 'Apex Careers Billing Portal',
      channel: 'Invoice Capture / QR Code',
      message: 'Invoice #84920: Mandatory Onboarding Software License. Amount: 250 USDT. Scan the QR code below within 59 minutes to finalize onboarding.',
      highlight: 'Amount: 250 USDT. Scan the QR code below within 59 minutes'
    }
  },
  {
    id: 'urgency-checkout',
    title: 'Deceptive Checkout Trap',
    category: 'Dark Pattern / Roach Motel',
    badge: '⚠️ Hidden Billing',
    colorScheme: {
      bg: 'from-rose-900/30 via-pink-900/20 to-stone-900',
      border: 'border-rose-500/40',
      text: 'text-rose-300',
      accent: 'bg-rose-500',
      glow: 'shadow-[0_0_25px_rgba(244,63,94,0.35)]'
    },
    score: 22,
    verdict: 'CAUTION',
    summary: 'Hidden pre-checked recurring auto-billing and artificial countdown timer.',
    characterMood: 'warning',
    quickFlags: [
      { icon: '🔄', title: '$89.99/mo Auto-Bill', subtitle: 'Pre-checked hidden box', color: 'bg-rose-500/20 border-rose-500/40 text-rose-300' },
      { icon: '⏳', title: 'Fake Countdown', subtitle: 'Simulated scarcity', color: 'bg-orange-500/20 border-orange-500/40 text-orange-300' },
      { icon: '🔒', title: 'Mail-In Cancel Maze', subtitle: 'Roach motel trap', color: 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300' }
    ],
    msAdvice: 'Be very careful! They checked a hidden box in tiny print to charge your card $89.99 every month! Do not enter your payment info here.',
    steps: [
      'Gemma 4 Vision: Segmenting checkout UI components...',
      'Auditing pre-checked recurring subscription consent...',
      'Catching fake scarcity countdown scripts...',
      'MS Guardian shield activated: Verdict ready!'
    ],
    mockImage: {
      sender: 'ProSkills Academy Checkout',
      channel: 'Checkout Page Capture',
      message: 'FLASH SALE! 95% Discount expires in 01:45 min! Claim for $1 today. [x] Pre-checked: Auto-enroll in VIP membership billed at $89.99 every month.',
      highlight: '[x] Pre-checked: Auto-enroll in VIP membership billed at $89.99 every month.'
    }
  },
  {
    id: 'safe-job',
    title: 'Verified Legitimate Job',
    category: 'Official Corporate Offer',
    badge: '✅ 100% Verified',
    colorScheme: {
      bg: 'from-emerald-900/30 via-teal-900/20 to-stone-900',
      border: 'border-emerald-500/40',
      text: 'text-emerald-300',
      accent: 'bg-emerald-500',
      glow: 'shadow-[0_0_25px_rgba(16,185,129,0.35)]'
    },
    score: 96,
    verdict: 'SAFE',
    summary: 'Verified legitimate enterprise employer. Zero upfront fees, corporate credentials confirmed.',
    characterMood: 'happy',
    quickFlags: [
      { icon: '🛡️', title: 'Zero Upfront Fees', subtitle: 'Company provisions equipment', color: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' },
      { icon: '🏢', title: 'Verified Domain', subtitle: 'Official enterprise domain', color: 'bg-teal-500/20 border-teal-500/40 text-teal-300' },
      { icon: '✨', title: 'Transparent Terms', subtitle: 'Standard employee agreement', color: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300' }
    ],
    msAdvice: 'Great news! This offer is completely safe. Zero equipment fees, authentic corporate credentials, and transparent terms. You are good to proceed!',
    steps: [
      'Gemma 4 Vision: Auditing offer letter format & signature...',
      'Confirming absence of advance-fee demands...',
      'Validating corporate domain registration history...',
      'MS Guardian verified: Safe entity confirmed!'
    ],
    mockImage: {
      sender: 'Stripe Careers (talent@stripe.com)',
      channel: 'Official Corporate Email',
      message: 'We are pleased to offer you the Software Engineering Fellowship at Stripe. All hardware and software licenses will be provisioned directly by our IT team at zero cost to you.',
      highlight: 'provisioned directly by our IT team at zero cost to you.'
    }
  }
];

export const HomePage: React.FC = () => {
  const [selectedScreenshot, setSelectedScreenshot] = useState<ScreenshotPreset>(SCREENSHOT_PRESETS[0]);
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const [isScanning, setIsScanning] = useState(false);
  const [scanStepIndex, setScanStepIndex] = useState(0);
  const [hasScanned, setHasScanned] = useState(true);

  const scannerSectionRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToScanner = () => {
    scannerSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleUploadButtonClick = () => {
    scrollToScanner();
    setTimeout(() => {
      fileInputRef.current?.click();
    }, 350);
  };

  const runScreenshotPreset = (preset: ScreenshotPreset) => {
    setSelectedScreenshot(preset);
    setUploadedImagePreview(null);
    setUploadedFileName(null);
    executeScanAnimation(preset.steps);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      const objectUrl = URL.createObjectURL(file);
      setUploadedImagePreview(objectUrl);
      scrollToScanner();

      const customPreset: ScreenshotPreset = {
        id: 'custom-upload',
        title: file.name,
        category: 'Custom Uploaded Screenshot',
        badge: '🔍 Live Scan',
        colorScheme: {
          bg: 'from-cyan-900/30 via-blue-900/20 to-stone-900',
          border: 'border-cyan-500/40',
          text: 'text-cyan-300',
          accent: 'bg-cyan-500',
          glow: 'shadow-[0_0_25px_rgba(6,182,212,0.35)]'
        },
        score: 14,
        verdict: 'SCAM LIKELY',
        summary: `Multimodal analysis completed for ${file.name}. Flagged high-risk advance-fee cues.`,
        characterMood: 'shocked',
        quickFlags: [
          { icon: '⚠️', title: 'Suspicious Demands', subtitle: 'Upfront payment prompt', color: 'bg-rose-500/20 border-rose-500/40 text-rose-300' },
          { icon: '💬', title: 'Informal Channel', subtitle: 'Non-corporate messaging', color: 'bg-amber-500/20 border-amber-500/40 text-amber-300' },
          { icon: '🛡️', title: 'High Threat Level', subtitle: 'Zero corporate verification', color: 'bg-purple-500/20 border-purple-500/40 text-purple-300' }
        ],
        msAdvice: `I inspected ${file.name} for you! It shows classic signals of advance-fee fraud. Never transfer money, buy gift cards, or give private credentials!`,
        steps: [
          'Reading image layout with Gemma 4 Multimodal Vision...',
          'Detecting logos, payment channels & fee requests...',
          'MS Guardian shield activated: Verdict ready!'
        ],
        mockImage: {
          sender: `Screenshot: ${file.name}`,
          channel: 'User Uploaded Media',
          message: `Analyzing visual typography, payment QR codes, and suspicious channels inside ${file.name}.`,
          highlight: 'Advance-fee keywords and untraceable contact found'
        }
      };

      setSelectedScreenshot(customPreset);
      executeScanAnimation(customPreset.steps);
    }
  };

  const executeScanAnimation = (steps: string[]) => {
    setIsScanning(true);
    setHasScanned(false);
    setScanStepIndex(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < steps.length) {
        setScanStepIndex(step);
      } else {
        clearInterval(interval);
        setIsScanning(false);
        setHasScanned(true);
      }
    }, 450);
  };

  // 1-Click Printable Dossier
  const printOfficialDossier = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>TrustAI Audit - ${selectedScreenshot.title}</title>
          <style>
            body { font-family: sans-serif; padding: 40px; color: #1c1917; max-width: 700px; margin: 0 auto; line-height: 1.5; }
            .header { border-bottom: 2px solid #10b981; padding-bottom: 15px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
            .badge { padding: 4px 12px; border-radius: 9999px; font-weight: bold; background: #fee2e2; color: #991b1b; }
            .score { font-size: 36px; font-weight: 900; color: #ef4444; margin: 15px 0; }
            .advice { background: #ecfdf5; border-left: 4px solid #10b981; padding: 12px; border-radius: 4px; margin-top: 15px; font-weight: 500; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h2 style="margin: 0;">TrustAI Security Audit</h2>
              <div style="font-size: 12px; color: #78716c;">Verified by MS Security Guardian</div>
            </div>
            <div class="badge">${selectedScreenshot.verdict}</div>
          </div>
          <div style="font-size: 13px; color: #78716c;">Target: <strong>${selectedScreenshot.title}</strong> | Date: ${new Date().toLocaleDateString()}</div>
          <div class="score">${selectedScreenshot.score} / 100 Trust Score</div>
          <p>${selectedScreenshot.summary}</p>
          <div class="advice"><strong>MS Directive:</strong> ${selectedScreenshot.msAdvice}</div>
          <script>window.onload = function() { window.print(); }</script>
        </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Colorful Animated Hero with Floating Stickers & Clipart */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-indigo-950 via-stone-900 to-emerald-950 border border-emerald-500/30 p-8 sm:p-12 shadow-2xl text-white">
        {/* Animated Glow Background Blobs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Floating Clipart Sticker 1: Saved Badge */}
        <motion.div
          animate={{ y: [-6, 6, -6], rotate: [-2, 2, -2] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="hidden md:flex absolute top-6 right-10 bg-gradient-to-r from-emerald-500 to-teal-400 text-stone-950 px-4 py-2 rounded-2xl font-black text-xs shadow-lg items-center gap-2 border-2 border-white/40 z-20"
        >
          <span className="text-lg">🛡️</span>
          <span>$1.4M+ Saved from Scams</span>
        </motion.div>

        {/* Floating Clipart Sticker 2: Trap Blocked */}
        <motion.div
          animate={{ y: [6, -6, 6], rotate: [2, -2, 2] }}
          transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
          className="hidden md:flex absolute bottom-8 left-8 bg-gradient-to-r from-rose-500 to-orange-400 text-white px-4 py-2 rounded-2xl font-black text-xs shadow-lg items-center gap-2 border-2 border-white/40 z-20"
        >
          <span className="text-lg">🛑</span>
          <span>Fake Laptop Deposit Blocked!</span>
        </motion.div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/50 text-emerald-300 text-xs font-bold shadow-inner"
            >
              <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
              <span>Gemma 4 Multimodal AI + MS Guardian Companion</span>
            </motion.div>

            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-[1.1]">
              Outsmart Scams With Your <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">AI Guardian</span>
            </h1>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0">
              Upload any recruiter chat screenshot, payment QR code, or checkout page. MS scans and catches deceptive traps in 10 seconds.
            </p>

            {/* Quick Action Buttons with Vibrancy */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleUploadButtonClick}
                className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-400 text-stone-950 text-xs font-black rounded-2xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center gap-2"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Upload Screenshot (Multimodal)</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToScanner}
                className="px-6 py-3.5 bg-stone-800/80 hover:bg-stone-800 text-white text-xs font-bold rounded-2xl border border-stone-700 transition-all shadow-subtle flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Try 10-Second Demo</span>
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/trustai-extension.zip"
                download="trustai-extension.zip"
                className="px-5 py-3.5 bg-stone-900/90 text-stone-300 hover:text-white text-xs font-bold rounded-2xl border border-stone-800 transition-all flex items-center gap-2"
              >
                <Chrome className="w-4 h-4 text-emerald-400" />
                <span>Get Extension (.zip)</span>
              </motion.a>
            </div>
          </div>

          {/* Hero Right: Ghibli Guardian Mascot with Animated Speech Bubble */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* Clipart / Ghibli Avatar Container */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative w-full max-w-sm rounded-3xl overflow-hidden border-4 border-emerald-400/60 shadow-[0_0_40px_rgba(16,185,129,0.3)] bg-stone-950"
            >
              <img 
                src="/ms_guardian.jpg" 
                alt="MS Ghibli Guardian Character" 
                className="w-full h-72 sm:h-80 object-cover object-top"
              />

              {/* Animated Floating Speech Bubble on Character */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-3 left-3 right-3 bg-stone-950/90 backdrop-blur-md border border-emerald-400/50 p-3 rounded-2xl text-xs space-y-1 shadow-lg"
              >
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[11px]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>MS Guardian Alert System</span>
                </div>
                <p className="text-stone-200 text-[11px] leading-snug">
                  "Ready to inspect! Paste a job chat, scan a QR code, or drop an image below."
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Visual Centerpiece: Interactive Colorful Simulator */}
      <section 
        id="scanner-section" 
        ref={scannerSectionRef} 
        className="space-y-6 pt-4 scroll-mt-20"
      >
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
            <Scan className="w-3.5 h-3.5 text-emerald-600" />
            <span>Interactive Visual Detection</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
            Try the Multimodal Simulator
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 max-w-md mx-auto">
            Click any color-coded scenario below or upload your own screenshot:
          </p>
        </div>

        {/* 4 Colorful Preset Cards with Distinct Gradient Accents */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SCREENSHOT_PRESETS.map((scen) => {
            const isSelected = selectedScreenshot.id === scen.id && !uploadedImagePreview;
            return (
              <motion.button
                key={scen.id}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => runScreenshotPreset(scen)}
                className={`p-4 rounded-3xl border-2 text-left transition-all flex flex-col justify-between relative overflow-hidden ${
                  isSelected
                    ? `bg-gradient-to-br ${scen.colorScheme.bg} text-white ${scen.colorScheme.border} ${scen.colorScheme.glow} ring-2 ring-emerald-400`
                    : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800 shadow-subtle'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-stone-100 text-stone-700'
                  }`}>
                    {scen.category}
                  </span>
                  <span className="text-sm">{scen.badge.split(' ')[0]}</span>
                </div>

                <div className="space-y-1">
                  <div className="text-sm font-black leading-snug">{scen.title}</div>
                  <div className={`text-xs ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                    {scen.badge}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                  <span>Trust: {scen.score}%</span>
                  <span className="font-bold flex items-center gap-1">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Scanner Viewfinder with Colorful Accents & Laser Sweep */}
        <div className="bg-stone-900 rounded-[2.5rem] border-2 border-stone-800 p-6 sm:p-8 shadow-2xl text-white space-y-6 relative overflow-hidden">
          {/* Animated Laser Scanning Beam */}
          {isScanning && (
            <motion.div
              initial={{ top: '0%' }}
              animate={{ top: '100%' }}
              transition={{ duration: 1.0, repeat: Infinity, ease: 'linear' }}
              className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_25px_#22d3ee] z-30 pointer-events-none"
            />
          )}

          {/* Viewfinder Top Bar */}
          <div className="flex items-center justify-between border-b border-stone-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500" />
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-mono text-stone-400 ml-2">
                Gemma 4 Multimodal Viewfinder
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => fileInputRef.current?.click()}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-bold text-xs flex items-center gap-1.5 transition-colors"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Upload Screenshot</span>
              </button>
            </div>
          </div>

          {/* Visual Screenshot Display */}
          <div className="bg-stone-950 rounded-2xl border border-stone-800 p-5 space-y-4">
            {uploadedImagePreview ? (
              <div className="rounded-xl overflow-hidden max-h-[300px] flex items-center justify-center bg-stone-900">
                <img 
                  src={uploadedImagePreview} 
                  alt="Uploaded screenshot" 
                  className="object-contain w-full max-h-[280px]"
                />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-stone-800/80 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-emerald-500 text-stone-950 font-black text-xs flex items-center justify-center">
                      MS
                    </span>
                    <div>
                      <div className="text-xs font-bold text-white">{selectedScreenshot.mockImage.sender}</div>
                      <div className="text-[10px] text-stone-400">{selectedScreenshot.mockImage.channel}</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-stone-900/90 rounded-xl border border-stone-800 text-xs sm:text-sm text-stone-200 leading-relaxed font-sans">
                  "{selectedScreenshot.mockImage.message}"
                </div>

                {/* Highlighted Clipart Alert Bar */}
                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 flex items-center gap-2 text-xs text-rose-300">
                  <span className="text-base">🚨</span>
                  <span><strong>Gemma 4 Vision Flag:</strong> {selectedScreenshot.mockImage.highlight}</span>
                </div>
              </div>
            )}
          </div>

          {/* Animated Scanning Step Progress */}
          <AnimatePresence>
            {isScanning && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 flex items-center gap-3 text-xs font-medium text-emerald-300"
              >
                <Sparkles className="w-4 h-4 text-cyan-400 animate-spin shrink-0" />
                <span>{selectedScreenshot.steps[scanStepIndex]}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Visual Result Dashboard (Zero text bloat, colorful badges & Ghibli speech bubble!) */}
          {hasScanned && !isScanning && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 pt-4 border-t border-stone-800"
            >
              {/* Verdict Banner + Trust Score Gauge */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-3xl bg-stone-950 border border-stone-800">
                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <VerdictBadge verdict={selectedScreenshot.verdict} size="md" />
                    <span className="text-xs text-stone-400 font-mono">Consensus Verified</span>
                  </div>
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    {selectedScreenshot.verdict === 'SCAM LIKELY' ? '🚨 Scam Detected — Do Not Proceed' : '✅ Verified Safe to Proceed'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-400 max-w-lg">
                    {selectedScreenshot.summary}
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={printOfficialDossier}
                      className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold rounded-xl transition-all border border-stone-700 flex items-center gap-2"
                    >
                      <Printer className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Export Official Audit Dossier (Print / PDF)</span>
                    </button>
                  </div>
                </div>

                <div className="shrink-0">
                  <TrustGauge score={selectedScreenshot.score} size={140} strokeWidth={12} />
                </div>
              </div>

              {/* 3 Colorful Visual Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedScreenshot.quickFlags.map((flag, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ scale: 1.03 }}
                    className={`p-4 rounded-2xl border flex items-center gap-3.5 ${flag.color}`}
                  >
                    <span className="text-2xl">{flag.icon}</span>
                    <div>
                      <div className="text-xs font-black">{flag.title}</div>
                      <div className="text-[11px] opacity-80">{flag.subtitle}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Ghibli Companion Character MS Directive Card */}
              <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-950 via-stone-900 to-indigo-950 border-2 border-emerald-500/40 shadow-xl flex flex-col sm:flex-row items-center gap-5">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.4)] shrink-0">
                  <img 
                    src="/ms_guardian.jpg" 
                    alt="MS Guardian Portrait" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="space-y-1.5 text-center sm:text-left flex-1">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold">
                    <Heart className="w-3 h-3 text-rose-400 fill-rose-400" />
                    <span>MS Guardian Advice</span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-100 font-medium leading-relaxed">
                    "{selectedScreenshot.msAdvice}"
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Interactive Video Simulation of Chrome Extension */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight flex items-center gap-2">
              <Chrome className="w-5 h-5 text-emerald-600" />
              <span>Live Extension Simulation</span>
            </h2>
            <p className="text-xs text-stone-500">
              Watch how TrustAI catches traps directly inside Google Chrome:
            </p>
          </div>
          <a
            href="/trustai-extension.zip"
            download="trustai-extension.zip"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold hover:bg-emerald-100 transition-colors shadow-subtle"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install Extension (.zip)</span>
          </a>
        </div>

        <ExtensionDemoPlayer />
      </section>

      {/* 30-Second Chrome Extension Installation Bar */}
      <section className="bg-gradient-to-r from-stone-900 via-indigo-950 to-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-indigo-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold tracking-tight">How to install the Chrome Extension:</h3>
            <p className="text-xs text-stone-400">Install in 3 easy steps right from your browser.</p>
          </div>

          <a
            href="/trustai-extension.zip"
            download="trustai-extension.zip"
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-400 text-stone-950 text-xs font-black rounded-xl transition-all shadow-subtle flex items-center gap-2 shrink-0 self-start sm:self-auto"
          >
            <Download className="w-4 h-4" />
            <span>Download trustai-extension.zip</span>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 border-t border-stone-800 text-xs">
          <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-2">
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-stone-950 font-bold text-xs flex items-center justify-center">
              1
            </div>
            <div className="font-bold text-white">Unzip Download</div>
            <p className="text-stone-400 text-[11px]">
              Extract <code className="text-emerald-400 bg-stone-900 px-1 rounded font-mono">trustai-extension.zip</code>.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-2">
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-stone-950 font-bold text-xs flex items-center justify-center">
              2
            </div>
            <div className="font-bold text-white">chrome://extensions</div>
            <p className="text-stone-400 text-[11px]">
              Toggle ON <strong>Developer mode</strong> in Chrome.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-2">
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-stone-950 font-bold text-xs flex items-center justify-center">
              3
            </div>
            <div className="font-bold text-white">Load Unpacked</div>
            <p className="text-stone-400 text-[11px]">
              Select the unzipped folder. Shield icon is ready!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
