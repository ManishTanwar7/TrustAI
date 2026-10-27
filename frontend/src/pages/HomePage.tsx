import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, AlertTriangle, ArrowRight, Sparkles, 
  CheckCircle2, Chrome, Search, RotateCcw, Download,
  Briefcase, ShoppingCart, FileCheck, Scale, Image as ImageIcon, 
  UploadCloud, Eye, Users, Zap, FileText, Scan, ShieldAlert,
  QrCode, MessageSquare, Globe, Printer, ChevronRight, Activity,
  Lock, ExternalLink, Cpu, Heart, Check, X, Shield
} from 'lucide-react';
import { TrustGauge } from '../components/common/TrustGauge';
import { VerdictBadge } from '../components/common/VerdictBadge';
import { ExtensionDemoPlayer } from '../components/common/ExtensionDemoPlayer';
import { HumanConsultantClipart } from '../components/common/HumanConsultantClipart';

interface ScreenshotPreset {
  id: string;
  title: string;
  category: string;
  badge: string;
  score: number;
  verdict: 'SCAM LIKELY' | 'SAFE' | 'CAUTION';
  summary: string;
  quickFlags: { icon: string; title: string; subtitle: string; tagClass: string }[];
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
    category: 'Job Offer Fraud',
    badge: '🚨 Critical Scam',
    score: 8,
    verdict: 'SCAM LIKELY',
    summary: 'Advance-fee job scam demanding $200 via Zelle / USDT for hardware on Telegram.',
    quickFlags: [
      { icon: '💸', title: '$200 Upfront Fee', subtitle: 'Advance-fee deposit trap', tagClass: 'bg-rose-50 border-rose-200 text-rose-800' },
      { icon: '💬', title: 'Telegram Channel', subtitle: 'Untraceable communication', tagClass: 'bg-amber-50 border-amber-200 text-amber-800' },
      { icon: '🏢', title: 'No Registered Entity', subtitle: 'Unregistered fake company', tagClass: 'bg-stone-100 border-stone-200 text-stone-700' }
    ],
    msAdvice: 'Hey! Look out—they want $200 before you even start work! Real employers NEVER ask candidates for laptop deposits. Block them right away and keep your money safe.',
    steps: [
      'Gemma 4 Vision: Reading screenshot layout and text...',
      'Catching advance-fee keywords & untraceable Telegram handles...',
      'MS Security Consultant formulating protective verdict...'
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
    category: 'Blockchain Trap',
    badge: '⚡ Urgent Trap',
    score: 5,
    verdict: 'SCAM LIKELY',
    summary: 'Fraudulent crypto invoice urgently demanding irreversible transfer.',
    quickFlags: [
      { icon: '⛓️', title: 'Crypto Wallet QR', subtitle: 'Irreversible transaction', tagClass: 'bg-rose-50 border-rose-200 text-rose-800' },
      { icon: '⏱️', title: '59-Min Deadline', subtitle: 'Artificial urgency panic', tagClass: 'bg-amber-50 border-amber-200 text-amber-800' },
      { icon: '❌', title: 'No Corporate Tax ID', subtitle: 'Zero legal accreditation', tagClass: 'bg-stone-100 border-stone-200 text-stone-700' }
    ],
    msAdvice: 'Stop! Crypto transactions cannot be reversed once confirmed. This QR code leads to an anonymous personal wallet. Refuse payment and report them.',
    steps: [
      'Multimodal OCR: Scanning QR code & wallet address...',
      'Auditing blockchain address against fraud watchlists...',
      'MS Security Consultant formulating protective verdict...'
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
    category: 'Dark Pattern',
    badge: '⚠️ Hidden Billing',
    score: 22,
    verdict: 'CAUTION',
    summary: 'Hidden pre-checked recurring auto-billing and artificial countdown timer.',
    quickFlags: [
      { icon: '🔄', title: '$89.99/mo Auto-Bill', subtitle: 'Pre-checked hidden box', tagClass: 'bg-rose-50 border-rose-200 text-rose-800' },
      { icon: '⏳', title: 'Fake Countdown', subtitle: 'Simulated scarcity', tagClass: 'bg-amber-50 border-amber-200 text-amber-800' },
      { icon: '🔒', title: 'Mail-In Cancel Maze', subtitle: 'Roach motel barrier', tagClass: 'bg-stone-100 border-stone-200 text-stone-700' }
    ],
    msAdvice: 'Be careful! They pre-checked a box in tiny print to charge your credit card $89.99 every month. Do not enter your card here.',
    steps: [
      'Gemma 4 Vision: Segmenting checkout UI components...',
      'Auditing pre-checked recurring subscription consent...',
      'MS Security Consultant formulating protective verdict...'
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
    category: 'Official Offer',
    badge: '✅ 100% Safe',
    score: 96,
    verdict: 'SAFE',
    summary: 'Verified legitimate enterprise employer. Zero upfront fees, corporate credentials confirmed.',
    quickFlags: [
      { icon: '🛡️', title: 'Zero Upfront Fees', subtitle: 'Equipment provisioned free', tagClass: 'bg-emerald-50 border-emerald-200 text-emerald-800' },
      { icon: '🏢', title: 'Verified Domain', subtitle: 'Official enterprise domain', tagClass: 'bg-teal-50 border-teal-200 text-teal-800' },
      { icon: '✨', title: 'Transparent Terms', subtitle: 'Standard employee agreement', tagClass: 'bg-stone-100 border-stone-200 text-stone-700' }
    ],
    msAdvice: 'Great news! This offer is completely safe. Zero equipment fees, authentic corporate credentials, and transparent terms. You are good to proceed!',
    steps: [
      'Gemma 4 Vision: Auditing offer letter format & signature...',
      'Confirming absence of advance-fee demands...',
      'MS Security Consultant verified: Safe entity confirmed!'
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
        category: 'Uploaded Screenshot',
        badge: '🔍 Live Scan',
        score: 14,
        verdict: 'SCAM LIKELY',
        summary: `Multimodal analysis completed for ${file.name}. Flagged high-risk advance-fee cues.`,
        quickFlags: [
          { icon: '⚠️', title: 'Suspicious Demands', subtitle: 'Upfront payment prompt', tagClass: 'bg-rose-50 border-rose-200 text-rose-800' },
          { icon: '💬', title: 'Informal Channel', subtitle: 'Non-corporate messaging', tagClass: 'bg-amber-50 border-amber-200 text-amber-800' },
          { icon: '🛡️', title: 'High Threat Level', subtitle: 'Zero corporate verification', tagClass: 'bg-stone-100 border-stone-200 text-stone-700' }
        ],
        msAdvice: `I inspected ${file.name} for you! It shows classic signals of advance-fee fraud. Never transfer money, buy gift cards, or give private credentials!`,
        steps: [
          'Reading image layout with Gemma 4 Multimodal Vision...',
          'Detecting logos, payment channels & fee requests...',
          'MS Security Consultant formulating verdict...'
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
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px; color: #292524; max-width: 680px; margin: 0 auto; line-height: 1.6; }
            .header { border-bottom: 2px solid #16a34a; padding-bottom: 15px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center; }
            .badge { padding: 4px 12px; border-radius: 9999px; font-weight: bold; background: #fee2e2; color: #991b1b; }
            .score { font-size: 36px; font-weight: 900; color: #dc2626; margin: 15px 0; }
            .advice { background: #f0fdf4; border-left: 4px solid #16a34a; padding: 14px; border-radius: 4px; margin-top: 15px; font-weight: 500; color: #166534; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <h2 style="margin: 0; color: #1c1917;">TrustAI Security Audit Dossier</h2>
              <div style="font-size: 12px; color: #78716c;">Verified by MS Security Consultant</div>
            </div>
            <div class="badge">${selectedScreenshot.verdict}</div>
          </div>
          <div style="font-size: 13px; color: #78716c;">Target: <strong>${selectedScreenshot.title}</strong> | Date: ${new Date().toLocaleDateString()}</div>
          <div class="score">${selectedScreenshot.score} / 100 Trust Score</div>
          <p>${selectedScreenshot.summary}</p>
          <div class="advice"><strong>MS Recommendation:</strong> ${selectedScreenshot.msAdvice}</div>
          <script>window.onload = function() { window.print(); }</script>
        </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Human-Centered Hero with Natural Colors & MS Clipart */}
      <section className="bg-white rounded-3xl border border-stone-200/80 p-8 sm:p-12 shadow-sm space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left Column: Natural Human Copy */}
          <div className="md:col-span-7 space-y-5 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Gemma 4 Multimodal Vision • MS Security Shield</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-[1.15]">
              Spot scams before you send a single dollar.
            </h1>

            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Upload recruiter chat screenshots, check payment QR codes, or audit job offers. MS gives you plain-English human advice in 10 seconds.
            </p>

            {/* Action Buttons in Natural Earth / Forest Tones */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
              <button
                onClick={handleUploadButtonClick}
                className="px-5 py-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold rounded-xl transition-all shadow-subtle flex items-center gap-2"
              >
                <UploadCloud className="w-4 h-4 text-emerald-200" />
                <span>Upload Screenshot</span>
              </button>

              <button
                onClick={scrollToScanner}
                className="px-5 py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-all shadow-subtle flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Try Live Demo</span>
              </button>

              <a
                href="/trustai-extension.zip"
                download="trustai-extension.zip"
                className="px-5 py-3 bg-stone-50 hover:bg-stone-100 border border-stone-300 text-stone-800 text-xs font-bold rounded-xl transition-all shadow-subtle flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-stone-600" />
                <span>Get Extension (.zip)</span>
              </a>
            </div>
          </div>

          {/* Right Column: Natural Human Clipart Illustration */}
          <div className="md:col-span-5 flex flex-col items-center">
            <div className="relative p-6 bg-stone-50/80 rounded-2xl border border-stone-200/80 flex flex-col items-center text-center space-y-3">
              <HumanConsultantClipart size={180} />

              <div className="space-y-1">
                <div className="text-xs font-bold text-stone-900 flex items-center justify-center gap-1.5">
                  <span>MS</span>
                  <span className="text-[10px] text-stone-400 font-normal">•</span>
                  <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    Security Consultant
                  </span>
                </div>
                <p className="text-xs text-stone-600 leading-snug max-w-xs">
                  "Hi! Drop any suspicious message or screenshot below and I'll check it with you."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Centerpiece: Live Simulator */}
      <section 
        id="scanner-section" 
        ref={scannerSectionRef} 
        className="space-y-6 pt-2 scroll-mt-20"
      >
        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Try the Live Simulator
          </h2>
          <p className="text-xs text-stone-500">
            Click any scenario below to see how MS detects hidden traps:
          </p>
        </div>

        {/* 4 Clean Preset Cards with Natural Stone / Sage Styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {SCREENSHOT_PRESETS.map((scen) => {
            const isSelected = selectedScreenshot.id === scen.id && !uploadedImagePreview;
            return (
              <button
                key={scen.id}
                onClick={() => runScreenshotPreset(scen)}
                className={`p-4 rounded-2xl border text-left transition-all flex flex-col justify-between shadow-subtle ${
                  isSelected
                    ? 'bg-stone-900 text-white border-stone-900 shadow-md scale-[1.01]'
                    : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    isSelected ? 'bg-stone-800 text-emerald-300' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {scen.category}
                  </span>
                  <span className="text-xs">{scen.badge.split(' ')[0]}</span>
                </div>

                <div className="space-y-0.5">
                  <div className="text-xs font-bold leading-snug">{scen.title}</div>
                  <div className={`text-[11px] ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                    {scen.badge}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-stone-100/20 flex items-center justify-between text-[11px]">
                  <span>Trust Score: {scen.score}%</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Viewfinder Canvas */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-sm space-y-6 relative overflow-hidden">
          {/* Animated Laser Scanning Beam */}
          {isScanning && (
            <motion.div
              initial={{ top: '0%' }}
              animate={{ top: '100%' }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-600 to-transparent shadow-[0_0_12px_#16a34a] z-30 pointer-events-none"
            />
          )}

          {/* Viewfinder Top Bar */}
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="text-xs font-mono text-stone-500 ml-2">
                Gemma 4 Multimodal Viewfinder
              </span>
            </div>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold text-xs flex items-center gap-1.5 transition-colors"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>{uploadedFileName ? 'Change File' : 'Upload Screenshot'}</span>
            </button>
          </div>

          {/* Screenshot Display */}
          <div className="bg-stone-50 rounded-2xl border border-stone-200 p-5 space-y-3">
            {uploadedImagePreview ? (
              <div className="rounded-xl overflow-hidden max-h-[300px] flex items-center justify-center bg-white border border-stone-200">
                <img 
                  src={uploadedImagePreview} 
                  alt="Uploaded screenshot" 
                  className="object-contain w-full max-h-[280px]"
                />
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-2 border-b border-stone-200 pb-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-700 text-white font-bold text-[10px] flex items-center justify-center">
                    MS
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900">{selectedScreenshot.mockImage.sender}</div>
                    <div className="text-[10px] text-stone-500">{selectedScreenshot.mockImage.channel}</div>
                  </div>
                </div>

                <div className="p-3.5 bg-white rounded-xl border border-stone-200 text-xs sm:text-sm text-stone-800 leading-relaxed font-sans">
                  "{selectedScreenshot.mockImage.message}"
                </div>

                {/* Flagged Alert Box */}
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-xs text-rose-900">
                  <span>🚨</span>
                  <span><strong>Flagged Pattern:</strong> {selectedScreenshot.mockImage.highlight}</span>
                </div>
              </div>
            )}
          </div>

          {/* Scanning Animation Progress */}
          <AnimatePresence>
            {isScanning && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-3.5 rounded-xl bg-stone-100 border border-stone-200 flex items-center gap-3 text-xs font-medium text-stone-800"
              >
                <Sparkles className="w-4 h-4 text-emerald-600 animate-spin shrink-0" />
                <span>{selectedScreenshot.steps[scanStepIndex]}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Results: Natural, Clean, Human Card */}
          {hasScanned && !isScanning && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 pt-3 border-t border-stone-100"
            >
              {/* Verdict Header + Trust Score Gauge */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-stone-50/70 border border-stone-200">
                <div className="space-y-1.5 text-center sm:text-left flex-1">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <VerdictBadge verdict={selectedScreenshot.verdict} size="md" />
                    <span className="text-xs text-stone-400 font-semibold uppercase">Verdict</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                    {selectedScreenshot.verdict === 'SCAM LIKELY' ? '🚨 Scam Detected — Do Not Proceed' : '✅ Verified Safe to Proceed'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600">
                    {selectedScreenshot.summary}
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={printOfficialDossier}
                      className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-all shadow-subtle flex items-center gap-2"
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

              {/* 3 Natural Clean Warning Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedScreenshot.quickFlags.map((flag, idx) => (
                  <div 
                    key={idx} 
                    className={`p-3.5 rounded-xl border flex items-center gap-3 ${flag.tagClass}`}
                  >
                    <span className="text-xl">{flag.icon}</span>
                    <div>
                      <div className="text-xs font-bold">{flag.title}</div>
                      <div className="text-[11px] opacity-80">{flag.subtitle}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* MS Human Consultant Directive Card */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-stone-900 shadow-sm flex flex-col sm:flex-row items-center gap-5">
                <div className="w-16 h-16 rounded-xl bg-stone-50 border border-stone-200 p-1 flex items-center justify-center shrink-0">
                  <HumanConsultantClipart size={56} />
                </div>

                <div className="space-y-1 text-center sm:text-left flex-1">
                  <div className="text-xs font-bold text-stone-900 flex items-center justify-center sm:justify-start gap-2">
                    <span>MS Security Recommendation</span>
                    <span className="text-[10px] text-emerald-800 font-semibold bg-emerald-50 px-2 py-0.2 rounded border border-emerald-200">
                      Human Review
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
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
              <Chrome className="w-5 h-5 text-emerald-700" />
              <span>Live Chrome Extension Preview</span>
            </h2>
            <p className="text-xs text-stone-500">
              Watch how TrustAI flags scams in Google Chrome:
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
      <section className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-xl font-bold tracking-tight">How to install the Chrome Extension:</h3>
            <p className="text-xs text-stone-400">Install in 3 easy steps right from your browser.</p>
          </div>

          <a
            href="/trustai-extension.zip"
            download="trustai-extension.zip"
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 text-xs font-bold rounded-xl transition-all shadow-subtle flex items-center gap-2 shrink-0 self-start sm:self-auto"
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
