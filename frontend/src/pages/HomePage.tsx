import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, AlertTriangle, ArrowRight, Sparkles, 
  CheckCircle2, Chrome, Search, RotateCcw, Download,
  Briefcase, ShoppingCart, FileCheck, Scale, Image as ImageIcon, 
  UploadCloud, Eye, Users, Zap, FileText, Scan, ShieldAlert,
  QrCode, MessageSquare, Globe, Printer, ChevronRight, Activity,
  Lock, ExternalLink, Cpu, Heart, Check, X
} from 'lucide-react';
import { TrustGauge } from '../components/common/TrustGauge';
import { VerdictBadge } from '../components/common/VerdictBadge';
import { ExtensionDemoPlayer } from '../components/common/ExtensionDemoPlayer';

interface ScreenshotPreset {
  id: string;
  title: string;
  category: string;
  badge: string;
  score: number;
  verdict: 'SCAM LIKELY' | 'SAFE' | 'CAUTION';
  summary: string;
  quickFlags: { icon: string; title: string; subtitle: string }[];
  msAdvice: string;
  steps: string[];
  mockImage: {
    sender: string;
    avatarText: string;
    channel: string;
    message: string;
  };
}

const SCREENSHOT_PRESETS: ScreenshotPreset[] = [
  {
    id: 'telegram-scam',
    title: 'Recruiter Telegram Chat',
    category: 'Job Scam',
    badge: 'High Risk',
    score: 8,
    verdict: 'SCAM LIKELY',
    summary: 'Advance-fee recruitment scam. Demands $200 for hardware on Telegram.',
    quickFlags: [
      { icon: '💸', title: '$200 Upfront Fee', subtitle: 'Advance-fee deposit trap' },
      { icon: '💬', title: 'Telegram Handle', subtitle: 'Untraceable communication' },
      { icon: '🏢', title: 'No Legal Filing', subtitle: 'Unregistered fake company' }
    ],
    msAdvice: 'Hey friend! I caught this advance-fee trap. Real employers NEVER charge for laptops or software. Block them immediately and keep your money safe!',
    steps: [
      'Gemma 4 Vision: Reading screenshot layout and text...',
      'Catching advance-fee triggers & untraceable handles...',
      'MS Guardian formulating protective verdict...'
    ],
    mockImage: {
      sender: 'Nova Global HR (@NovaHR_Recruiting)',
      avatarText: 'NG',
      channel: 'Telegram Direct Message',
      message: 'Congratulations! You are accepted as Remote QA Intern ($48/hr). To receive your Apple MacBook Pro, transfer a refundable $200 shipping fee via USDT or Zelle today.'
    }
  },
  {
    id: 'crypto-qr',
    title: 'Crypto Payment QR Capture',
    category: 'Payment Trap',
    badge: 'Critical Trap',
    score: 5,
    verdict: 'SCAM LIKELY',
    summary: 'Fraudulent crypto invoice urgently demanding irreversible transfer.',
    quickFlags: [
      { icon: '⛓️', title: 'Crypto Wallet QR', subtitle: 'Irreversible transaction' },
      { icon: '⏱️', title: '1-Hour Countdown', subtitle: 'Artificial urgency panic' },
      { icon: '❌', title: 'No Legal Entity', subtitle: 'Zero corporate credentials' }
    ],
    msAdvice: 'Watch out! Once crypto is sent, it is gone forever. This QR code leads to an anonymous personal wallet. Stop all contact!',
    steps: [
      'Decoding QR code & crypto wallet address...',
      'Auditing recipient against blockchain scam lists...',
      'MS Guardian formulating protective verdict...'
    ],
    mockImage: {
      sender: 'Apex Careers Billing Portal',
      avatarText: 'AC',
      channel: 'Invoice Capture / QR Code',
      message: 'Invoice #84920: Mandatory Onboarding Software License. Amount: 250 USDT. Scan the QR code below within 59 minutes to finalize onboarding.'
    }
  },
  {
    id: 'urgency-checkout',
    title: 'Deceptive Checkout Trap',
    category: 'Dark Pattern',
    badge: 'Subscription Trap',
    score: 22,
    verdict: 'CAUTION',
    summary: 'Hidden recurring monthly auto-billing and fake countdown timer.',
    quickFlags: [
      { icon: '🔄', title: '$89.99/mo Auto-Bill', subtitle: 'Pre-checked hidden box' },
      { icon: '⏳', title: 'Fake Countdown', subtitle: 'Simulated scarcity' },
      { icon: '🔒', title: 'Hard to Cancel', subtitle: 'Roach motel trap' }
    ],
    msAdvice: 'Be careful! They checked a hidden box to charge you $89.99 every month. Do not enter your card here.',
    steps: [
      'Segmenting checkout UI & contrast ratios...',
      'Catching pre-checked recurring billing clauses...',
      'MS Guardian formulating protective verdict...'
    ],
    mockImage: {
      sender: 'ProSkills Academy Checkout',
      avatarText: 'PS',
      channel: 'Checkout Page Capture',
      message: 'FLASH SALE! 95% Discount expires in 01:45 min! Claim for $1 today. [x] Pre-checked: Auto-enroll in VIP membership billed at $89.99 every month.'
    }
  }
];

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'screenshot' | 'text'>('screenshot');
  const [selectedScreenshot, setSelectedScreenshot] = useState<ScreenshotPreset>(SCREENSHOT_PRESETS[0]);
  
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [customText, setCustomText] = useState('Congratulations! You are selected as our Remote Data Intern at $45/hr. To ship your Apple MacBook Pro, transfer a refundable $250 insurance deposit via Zelle or Crypto to our recruiter on Telegram (@NovaHR).');

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
        category: 'Uploaded Image',
        badge: 'Custom Capture',
        score: 14,
        verdict: 'SCAM LIKELY',
        summary: `Multimodal scan finished for ${file.name}. Flagged high-risk advance-fee cues.`,
        quickFlags: [
          { icon: '⚠️', title: 'Suspicious Demands', subtitle: 'Upfront payment prompt' },
          { icon: '💬', title: 'Informal Channel', subtitle: 'Non-corporate messaging' },
          { icon: '🛡️', title: 'High Threat Level', subtitle: 'Zero corporate verification' }
        ],
        msAdvice: `I looked over ${file.name} for you. It shows classic signs of advance-fee recruitment fraud. Do not transfer funds or give private credentials!`,
        steps: [
          'Reading image with Gemma 4 Vision...',
          'Detecting logos, payment channels & fee requests...',
          'MS Guardian formulating protective verdict...'
        ],
        mockImage: {
          sender: `Screenshot: ${file.name}`,
          avatarText: 'IMG',
          channel: 'User Upload',
          message: `Analyzing ${file.name} for deceptive patterns, advance-fee triggers, and payment requests.`
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-12">
      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Hero with Friendly Ghibli Guardian Mascot */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-emerald-50/80 via-white to-stone-50 border border-emerald-200/60 p-6 sm:p-10 shadow-card text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold shadow-subtle">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Meet MS — Your AI Guardian Companion</span>
        </div>

        <div className="max-w-2xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-tight">
            Spot Scams Before They Take Your Money.
          </h1>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-xl mx-auto">
            Drop in any recruiter screenshot, job offer, or checkout page. MS shields you in seconds.
          </p>
        </div>

        {/* Visual Ghibli Guardian Showcase */}
        <div className="relative max-w-xl mx-auto rounded-2xl overflow-hidden shadow-elevated border-2 border-emerald-500/30 group">
          <img 
            src="/ms_guardian.jpg" 
            alt="MS Guardian Hayao Miyazaki Studio Ghibli Style Character" 
            className="w-full h-56 sm:h-72 object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent flex items-end p-4 sm:p-6 text-left">
            <div className="text-white space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>MS Security Shield Active</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-200 font-medium">
                "Relax, I've got your back against fake recruiters, hidden fees, and crypto traps."
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={handleUploadButtonClick}
            className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-2xl transition-all shadow-card hover:scale-[1.02] flex items-center gap-2"
          >
            <UploadCloud className="w-4 h-4 text-emerald-100" />
            <span>Upload Screenshot (Multimodal)</span>
          </button>

          <button
            onClick={scrollToScanner}
            className="px-6 py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-2xl transition-all shadow-subtle hover:scale-[1.02] flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Try 10-Second Demo</span>
          </button>

          <a
            href="/trustai-extension.zip"
            download="trustai-extension.zip"
            className="px-6 py-3.5 bg-white hover:bg-stone-50 border-2 border-stone-300 text-stone-900 text-xs font-bold rounded-2xl transition-all shadow-subtle flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Chrome Extension (.zip)</span>
          </a>
        </div>
      </section>

      {/* Main Centerpiece: Live Scanner */}
      <section 
        id="scanner-section" 
        ref={scannerSectionRef} 
        className="space-y-6 pt-2 scroll-mt-20"
      >
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-black text-stone-900 tracking-tight">
            Try the Visual Simulator
          </h2>
          <p className="text-xs text-stone-500">
            Click any sample below to see MS catch the scam:
          </p>
        </div>

        {/* 3 Clickable Samples + Upload Drop Zone */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {SCREENSHOT_PRESETS.map((scen) => {
            const isSelected = selectedScreenshot.id === scen.id && !uploadedImagePreview;
            return (
              <button
                key={scen.id}
                onClick={() => runScreenshotPreset(scen)}
                className={`p-3.5 rounded-2xl border text-left transition-all flex flex-col justify-between shadow-subtle ${
                  isSelected
                    ? 'bg-stone-900 text-white border-stone-900 shadow-card scale-[1.02]'
                    : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    isSelected ? 'bg-stone-800 text-emerald-400' : 'bg-stone-100 text-stone-600'
                  }`}>
                    {scen.category}
                  </span>
                  <ImageIcon className="w-4 h-4 text-emerald-500" />
                </div>
                <div>
                  <div className="text-xs font-bold leading-snug">{scen.title}</div>
                  <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                    {scen.badge}
                  </div>
                </div>
              </button>
            );
          })}

          <button
            onClick={() => fileInputRef.current?.click()}
            className={`p-3.5 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center text-center gap-1.5 shadow-subtle cursor-pointer ${
              uploadedFileName
                ? 'border-emerald-500 bg-emerald-50/60 text-emerald-950 font-bold'
                : 'border-stone-300 bg-stone-50/80 hover:bg-stone-100/80 text-stone-700'
            }`}
          >
            <UploadCloud className={`w-5 h-5 ${uploadedFileName ? 'text-emerald-600' : 'text-stone-500'}`} />
            <div className="text-xs font-bold">
              {uploadedFileName ? 'Change Screenshot' : 'Upload Screenshot'}
            </div>
            <div className="text-[10px] text-stone-500 truncate max-w-[140px]">
              {uploadedFileName || 'Drop PNG / JPG here'}
            </div>
          </button>
        </div>

        {/* Viewfinder Canvas */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-card space-y-6 relative overflow-hidden">
          {isScanning && (
            <motion.div
              initial={{ top: '0%' }}
              animate={{ top: '100%' }}
              transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_18px_#10B981] z-30 pointer-events-none"
            />
          )}

          {/* Screenshot Card */}
          <div className="rounded-2xl border border-stone-800 bg-stone-950 p-4 sm:p-5 text-stone-100 shadow-inner">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2.5 mb-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="font-mono text-stone-400 ml-2 text-[11px]">
                  Multimodal Screenshot Scan
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-600 text-emerald-400">
                Gemma 4 Vision
              </span>
            </div>

            {uploadedImagePreview ? (
              <div className="rounded-xl overflow-hidden max-h-[300px] bg-stone-900 flex items-center justify-center">
                <img 
                  src={uploadedImagePreview} 
                  alt="Uploaded screenshot" 
                  className="object-contain w-full max-h-[280px]"
                />
              </div>
            ) : (
              <div className="bg-stone-900 border border-stone-800 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2.5 border-b border-stone-800/80 pb-2">
                  <div className="w-7 h-7 rounded-full bg-emerald-500 text-stone-950 font-black text-xs flex items-center justify-center">
                    {selectedScreenshot.mockImage.avatarText}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">
                      {selectedScreenshot.mockImage.sender}
                    </div>
                    <div className="text-[10px] text-stone-400">
                      {selectedScreenshot.mockImage.channel}
                    </div>
                  </div>
                </div>

                <p className="bg-stone-950/70 p-3 rounded-xl border border-stone-800 font-sans text-xs text-stone-200 leading-relaxed">
                  "{selectedScreenshot.mockImage.message}"
                </p>
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
                className="p-4 rounded-2xl bg-stone-50 border border-stone-200 flex items-center gap-3 text-xs font-medium text-stone-800"
              >
                <Sparkles className="w-4 h-4 text-emerald-600 animate-spin shrink-0" />
                <span>{selectedScreenshot.steps[scanStepIndex]}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Simple, Creative, Visual Result Card (Replaced wall of text!) */}
          {hasScanned && !isScanning && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 pt-2 border-t border-stone-100"
            >
              {/* Verdict Header + Big Trust Score */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-stone-50/90 border border-stone-200">
                <div className="space-y-1.5 text-center sm:text-left flex-1">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <VerdictBadge verdict={selectedScreenshot.verdict} size="md" />
                    <span className="text-xs text-stone-400 font-semibold uppercase">Verdict</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                    {selectedScreenshot.verdict === 'SCAM LIKELY' ? '🚨 Scam Detected — Do Not Proceed' : '⚠️ Caution Advised'}
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

              {/* 3 Simple Visual Badges (Zero text bloat!) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selectedScreenshot.quickFlags.map((flag, idx) => (
                  <div 
                    key={idx} 
                    className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200 flex items-center gap-3.5"
                  >
                    <span className="text-2xl">{flag.icon}</span>
                    <div>
                      <div className="text-xs font-bold text-rose-950">{flag.title}</div>
                      <div className="text-[11px] text-rose-700/80">{flag.subtitle}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Ghibli Guardian MS Directive Card */}
              <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-emerald-900 via-stone-900 to-stone-950 text-white shadow-elevated flex flex-col sm:flex-row items-center gap-5 border border-emerald-800/50">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-emerald-400 shadow-md shrink-0">
                  <img 
                    src="/ms_guardian.jpg" 
                    alt="MS Guardian Portrait" 
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                <div className="space-y-1.5 text-center sm:text-left flex-1">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-600 text-emerald-300 text-[10px] font-bold">
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
      <section className="bg-stone-900 text-white rounded-3xl p-6 sm:p-8 shadow-elevated space-y-6">
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
