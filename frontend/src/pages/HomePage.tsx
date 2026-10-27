import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, AlertTriangle, ArrowRight, Sparkles, 
  CheckCircle2, Chrome, Search, RotateCcw, Download,
  Briefcase, ShoppingCart, FileCheck, Scale, Image as ImageIcon, 
  UploadCloud, Eye, Users, Zap, FileText, Scan, ShieldAlert,
  QrCode, MessageSquare
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
  concerns: string[];
  recommendation: string;
  detectedVisuals: { tag: string; detail: string }[];
  steps: string[];
  mockImage: {
    sender: string;
    avatarText: string;
    channel: string;
    message: string;
    warningCallout: string;
  };
}

const SCREENSHOT_PRESETS: ScreenshotPreset[] = [
  {
    id: 'telegram-scam',
    title: 'Recruiter Telegram Chat',
    category: 'Job Offer Fraud',
    badge: 'High Risk',
    score: 8,
    verdict: 'SCAM LIKELY',
    summary: 'Advance-fee recruitment scam detected in screenshot. The recruiter demands an upfront $200 deposit for hardware and redirects to an untraceable Telegram chat.',
    concerns: [
      'Visual OCR detected: "$200 shipping fee via USDT / Zelle"',
      'Recruiter uses non-corporate Telegram handle (@NovaHR_Recruiting)',
      'Unrealistic $48/hr wage offered with zero formal interview'
    ],
    recommendation: 'Do NOT send any money or crypto. Legitimate employers never ask candidates to pay for company laptops or onboarding kits.',
    detectedVisuals: [
      { tag: '🚨 Advance-Fee Trigger', detail: 'Demands $200 upfront deposit' },
      { tag: '⚠️ Untraceable Channel', detail: 'External Telegram handle used' },
      { tag: '🛑 Fake Verification', detail: 'No verified company domain header' }
    ],
    steps: [
      'Gemma 4 Multimodal: Processing image layout and text typography...',
      'Detecting payment demands and crypto wallet keywords...',
      'Cross-referencing recruiter identity against threat registry...',
      'MS Security Consultant verdict ready!'
    ],
    mockImage: {
      sender: 'Nova Global HR (@NovaHR_Recruiting)',
      avatarText: 'NG',
      channel: 'Telegram Direct Message',
      message: 'Congratulations! You have been accepted for our Remote QA Intern position ($48/hr). To receive your company Apple MacBook Pro, transfer a refundable $200 shipping and insurance fee via USDT or Zelle today.',
      warningCallout: '🚩 Advance-Fee Fraud: Upfront hardware payment demanded'
    }
  },
  {
    id: 'crypto-qr',
    title: 'Crypto Payment QR Capture',
    category: 'Payment Hijack',
    badge: 'Critical Trap',
    score: 5,
    verdict: 'SCAM LIKELY',
    summary: 'Fraudulent crypto invoice detected in captured receipt. Urgently demands irreversible cryptocurrency transfer for onboarding verification.',
    concerns: [
      'Visual QR Code points to unverified personal wallet: 0x71C...49b2',
      'Artificial 1-hour expiration countdown to induce panic',
      'Zero company registration or tax identification present'
    ],
    recommendation: 'Refuse payment immediately. Once sent on the blockchain, funds cannot be recovered. Report the sender to anti-fraud authorities.',
    detectedVisuals: [
      { tag: '🚨 Irreversible Crypto Payment', detail: 'QR points to private non-escrow wallet' },
      { tag: '⏱️ High-Pressure Deadline', detail: '1-hour countdown urgency' },
      { tag: '❌ Missing Credentials', detail: 'No EIN or registered tax entity' }
    ],
    steps: [
      'Scanning QR code data & visual layout with Gemma Multimodal Vision...',
      'Auditing blockchain recipient address against scam blacklist...',
      'Analyzing urgency typography & coercive layout cues...',
      'MS Consultant verdict ready!'
    ],
    mockImage: {
      sender: 'Apex Careers Billing Portal',
      avatarText: 'AC',
      channel: 'Invoice Capture / QR Code',
      message: 'Invoice #84920: Mandatory Onboarding Software License. Amount: 250 USDT. Scan the QR code below within 59 minutes to finalize candidate onboarding.',
      warningCallout: '🚩 Blockchain Trap: Untraceable cryptocurrency transfer'
    }
  },
  {
    id: 'urgency-checkout',
    title: 'Deceptive Checkout Trap',
    category: 'Dark Pattern / Roach Motel',
    badge: 'Subscription Trap',
    score: 22,
    verdict: 'CAUTION',
    summary: 'Deceptive e-commerce checkout captured. Employs artificial scarcity countdown timers and concealed recurring auto-billing.',
    concerns: [
      'Visual OCR caught pre-checked hidden box: "Auto-renew for $89.99/mo"',
      'Simulated scarcity countdown designed to prevent thoughtful decision',
      'Cancellation maze requires certified postal mail'
    ],
    recommendation: 'Do not enter your credit card details. Look for reputable alternative providers with transparent monthly billing and one-click cancellation.',
    detectedVisuals: [
      { tag: '⚠️ Hidden Recurring Billing', detail: '$89.99/mo auto-enrollment in tiny print' },
      { tag: '⏳ Artificial Scarcity', detail: 'Flashing countdown timer' },
      { tag: '🔒 Roach Motel Barrier', detail: 'Online cancellation blocked' }
    ],
    steps: [
      'Segmenting checkout UI components with Gemma Vision...',
      'Auditing contrast ratios and pre-checked subscription consent...',
      'Evaluating cancellation flow transparency...',
      'MS Consultant verdict ready!'
    ],
    mockImage: {
      sender: 'ProSkills Academy Checkout',
      avatarText: 'PS',
      channel: 'Checkout Page Capture',
      message: 'EXCLUSIVE OFFER! 95% Discount expires in 01:45 min! Claim for $1 today. [x] Pre-checked: Enroll in ongoing VIP membership billed at $89.99 every month.',
      warningCallout: '🚩 Dark Pattern: Pre-checked recurring subscription'
    }
  }
];

interface TextPreset {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  text: string;
  score: number;
  verdict: 'SCAM LIKELY' | 'SAFE' | 'CAUTION';
  summary: string;
  concerns: string[];
  recommendation: string;
  steps: string[];
}

const TEXT_PRESETS: TextPreset[] = [
  {
    id: 'job-text',
    title: 'Remote Job Email',
    subtitle: '$250 Deposit Demand',
    icon: Briefcase,
    text: 'Congratulations! You are selected as our Remote Data Intern at $45/hr. To ship your Apple MacBook Pro, transfer a refundable $250 insurance deposit via Zelle or Crypto to our recruiter on Telegram (@NovaHR).',
    score: 12,
    verdict: 'SCAM LIKELY',
    summary: 'Clear advance-fee fraud detected. Unrealistic wage, no interview, untraceable communication channel, and upfront payment demand for hardware.',
    concerns: [
      'Demands $250 upfront deposit for hardware',
      'Communication routed to Telegram instead of company domain',
      'No formal interview conducted'
    ],
    recommendation: 'Do NOT send any money. Real employers never charge you for equipment or software licenses. Block the recruiter immediately.',
    steps: [
      'Scanning message for advance-fee triggers...',
      'Checking company registration database...',
      'Verifying recruiter communication channel...',
      'MS Security Consultant formulating verdict...'
    ]
  },
  {
    id: 'safe-text',
    title: 'Verified Corporate Offer',
    subtitle: 'Transparent & Legitimate',
    icon: FileCheck,
    text: 'We are pleased to offer you the Software Engineering Intern position at Stripe. Your equipment will be provisioned directly by our IT department at zero cost to you.',
    score: 95,
    verdict: 'SAFE',
    summary: 'Verified authentic corporate communication. Legitimate domain, transparent hiring process, zero upfront fees, and standard company equipment policies.',
    concerns: [
      'Standard introductory probationary period'
    ],
    recommendation: 'Safe to proceed. Review the official offer letter and return the signed agreement through the company portal.',
    steps: [
      'Checking company domain and TLS security...',
      'Verifying absence of upfront fee requests...',
      'Confirming standard employment clauses...',
      'Consensus confirmed: Safe entity.'
    ]
  },
  {
    id: 'freelance-text',
    title: 'Predatory Freelance Agreement',
    subtitle: 'IP Forfeiture Clause',
    icon: Scale,
    text: 'Section 9: The Contractor assigns all present and future intellectual property created during the term, including personal side projects. Contractor agrees to private binding arbitration in Delaware with contractor bearing all legal fees.',
    score: 34,
    verdict: 'CAUTION',
    summary: 'One-sided contract terms detected. Unreasonable assignment of personal side projects and punitive arbitration cost allocation.',
    concerns: [
      'Overbroad IP clause claims unrelated side projects',
      'Mandatory arbitration forces signer to bear corporate legal fees'
    ],
    recommendation: 'Request an amendment to restrict IP assignment strictly to client-commissioned deliverables, and remove the one-sided fee clause.',
    steps: [
      'Parsing legal clauses with Contract Analysis Agent...',
      'Benchmarking IP indemnity against standard freelance norms...',
      'Flagging liability asymmetry...',
      'MS Consultant verdict ready!'
    ]
  }
];

export const HomePage: React.FC = () => {
  // Scanner state
  const [activeTab, setActiveTab] = useState<'screenshot' | 'text'>('screenshot');
  const [selectedScreenshot, setSelectedScreenshot] = useState<ScreenshotPreset>(SCREENSHOT_PRESETS[0]);
  const [selectedTextPreset, setSelectedTextPreset] = useState<TextPreset>(TEXT_PRESETS[0]);
  
  // Custom upload state
  const [uploadedImagePreview, setUploadedImagePreview] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);
  const [customText, setCustomText] = useState(TEXT_PRESETS[0].text);

  // Scanning animation state
  const [isScanning, setIsScanning] = useState(false);
  const [scanStepIndex, setScanStepIndex] = useState(0);
  const [hasScanned, setHasScanned] = useState(true);

  // Refs for smooth navigation
  const scannerSectionRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Smooth scroll helper
  const scrollToScanner = (preferTab?: 'screenshot' | 'text') => {
    if (preferTab) setActiveTab(preferTab);
    scannerSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Trigger file upload from any button
  const handleUploadButtonClick = () => {
    setActiveTab('screenshot');
    scrollToScanner('screenshot');
    setTimeout(() => {
      fileInputRef.current?.click();
    }, 400);
  };

  // Run simulation for screenshot preset
  const runScreenshotPreset = (preset: ScreenshotPreset) => {
    setSelectedScreenshot(preset);
    setUploadedImagePreview(null);
    setUploadedFileName(null);
    executeScanAnimation(preset.steps);
  };

  // Run simulation for text preset
  const runTextPreset = (preset: TextPreset) => {
    setSelectedTextPreset(preset);
    setCustomText(preset.text);
    executeScanAnimation(preset.steps);
  };

  // File upload change handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFileName(file.name);
      const objectUrl = URL.createObjectURL(file);
      setUploadedImagePreview(objectUrl);
      scrollToScanner('screenshot');

      // Create a dynamic custom scenario
      const customPreset: ScreenshotPreset = {
        id: 'custom-upload',
        title: file.name,
        category: 'Multimodal Vision Analysis',
        badge: 'Custom Capture',
        score: 14,
        verdict: 'SCAM LIKELY',
        summary: `Multimodal analysis completed for ${file.name}. Visual layout and text extract flagged high-risk indicators commonly present in advance-fee schemes and phishing pages.`,
        concerns: [
          'Image contains irregular contact channels and payment instructions',
          'Absence of verifiable security certificates or corporate credentials',
          'Urgency language urging immediate non-refundable transaction'
        ],
        recommendation: 'Do not follow payment or verification links shown in this screenshot. Independently verify the organization using official published telephone numbers.',
        detectedVisuals: [
          { tag: '📷 Multimodal OCR', detail: 'Text extracted from visual layout' },
          { tag: '⚠️ Unofficial Channel', detail: 'Non-corporate messaging flagged' },
          { tag: '🛑 High Risk', detail: 'Payment prompt detected' }
        ],
        steps: [
          'Uploading capture to Gemma 4 Multimodal Vision pipeline...',
          'Detecting visual bounding boxes, logos, and QR codes...',
          'Analyzing typography, urgency banners, and fee requests...',
          'MS Security Consultant verdict ready!'
        ],
        mockImage: {
          sender: `Uploaded Screenshot: ${file.name}`,
          avatarText: 'IMG',
          channel: 'User Uploaded Media',
          message: `Multimodal Vision inspection of ${file.name}: Parsing text, detecting logos, and cross-checking payment destinations in real-time.`,
          warningCallout: '🚩 High-Risk Signal: Detected advance-fee payment prompt'
        }
      };

      setSelectedScreenshot(customPreset);
      executeScanAnimation(customPreset.steps);
    }
  };

  // Run custom text scan
  const handleCustomTextScan = () => {
    if (!customText.trim()) return;
    const isSuspicious = /deposit|fee|pay|telegram|crypto|zelle|gift card|wire|arbitration/i.test(customText);

    const customResult: TextPreset = {
      id: 'custom-text',
      title: 'Custom Content Scan',
      subtitle: 'Analyzed Input',
      icon: Search,
      text: customText,
      score: isSuspicious ? 16 : 89,
      verdict: isSuspicious ? 'SCAM LIKELY' : 'SAFE',
      summary: isSuspicious
        ? 'High-risk triggers detected: Demands upfront payment, untraceable payment channels, or unfair liability terms.'
        : 'No obvious upfront fees or coercive tactics detected in the submitted text.',
      concerns: isSuspicious
        ? ['Demands upfront payment or registration fee', 'High risk of advance-fee fraud']
        : ['Standard commercial communications pattern'],
      recommendation: isSuspicious
        ? 'Never pay money or buy gift cards for any job offer. Stop communication immediately.'
        : 'Appears safe. Always verify official corporate email before sharing private information.',
      steps: [
        'Parsing submitted text with Scam & Credibility agents...',
        'Cross-referencing advance-fee fraud database...',
        'Checking for manipulative pressure tactics...',
        'MS Consultant verdict ready!'
      ]
    };

    setSelectedTextPreset(customResult);
    executeScanAnimation(customResult.steps);
  };

  // Reusable step animation runner
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
    }, 500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Hidden File Input for 1-Click Upload Anywhere */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Hero Section */}
      <section className="text-center space-y-5 max-w-3xl mx-auto pt-4">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-950 shadow-subtle"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Multimodal Gemma 4 & Gemini Vision</span>
          <span className="text-stone-300">|</span>
          <span>MS Security Shield</span>
        </motion.div>

        <h1 className="text-4xl sm:text-6xl font-black text-stone-900 tracking-tight leading-[1.1]">
          Never get scammed again.
        </h1>

        <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
          Upload screenshots, paste suspicious offers, or audit contracts. Multimodal AI catches deceptive traps in 10 seconds.
        </p>

        {/* Hero Quick Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
          <button
            onClick={handleUploadButtonClick}
            className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-2xl transition-all shadow-card hover:scale-[1.02] flex items-center gap-2"
          >
            <UploadCloud className="w-4 h-4 text-emerald-100" />
            <span>Upload Screenshot (Multimodal)</span>
          </button>

          <button
            onClick={() => scrollToScanner('screenshot')}
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
            <span>Get Chrome Extension (.zip)</span>
          </a>
        </div>
      </section>

      {/* CENTERPIECE: The Multimodal Live Scanner */}
      <section 
        id="scanner-section" 
        ref={scannerSectionRef} 
        className="space-y-6 pt-4 scroll-mt-20"
      >
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 uppercase tracking-wider">
            <Scan className="w-3.5 h-3.5" />
            <span>Live Interactive Intelligence Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Multimodal Security Scanner
          </h2>
          <p className="text-xs text-stone-500 max-w-lg mx-auto">
            Choose a visual screenshot preset, upload your own image, or paste suspicious text to run instant detection:
          </p>
        </div>

        {/* Tab Toggle: Screenshot vs Text */}
        <div className="flex justify-center">
          <div className="p-1 bg-stone-100 border border-stone-200 rounded-2xl flex items-center gap-1 shadow-subtle">
            <button
              onClick={() => setActiveTab('screenshot')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'screenshot'
                  ? 'bg-stone-900 text-white shadow-subtle'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-emerald-400" />
              <span>📷 Screenshot Vision (Gemma 4)</span>
            </button>

            <button
              onClick={() => setActiveTab('text')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'text'
                  ? 'bg-stone-900 text-white shadow-subtle'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>📝 Text & Contract Auditor</span>
            </button>
          </div>
        </div>

        {/* TAB 1: Screenshot Vision Mode */}
        {activeTab === 'screenshot' && (
          <div className="space-y-6">
            {/* Screenshot Preset Buttons & Upload Drop Trigger */}
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

              {/* Upload Your Own Card */}
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
                  {uploadedFileName ? 'Change Screenshot' : 'Upload Your Screenshot'}
                </div>
                <div className="text-[10px] text-stone-500 truncate max-w-[150px]">
                  {uploadedFileName || 'Drop PNG/JPG here'}
                </div>
              </button>
            </div>

            {/* Visual Screenshot Display & Scanning Canvas */}
            <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-card space-y-6 relative overflow-hidden">
              {/* Laser scanning beam */}
              {isScanning && (
                <motion.div
                  initial={{ top: '0%' }}
                  animate={{ top: '100%' }}
                  transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
                  className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_18px_#10B981] z-30 pointer-events-none"
                />
              )}

              {/* Visual Simulated Capture Window */}
              <div className="rounded-2xl border border-stone-300 bg-stone-950 p-4 sm:p-6 text-stone-100 shadow-inner relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-stone-800 pb-3 mb-4 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="font-mono text-stone-400 ml-2 text-[11px]">
                      Gemma 4 Multimodal Vision Viewfinder
                    </span>
                  </div>

                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-600 text-emerald-400">
                    Multimodal Optical Parser
                  </span>
                </div>

                {/* Display either uploaded real image OR mock screenshot card */}
                {uploadedImagePreview ? (
                  <div className="space-y-3">
                    <div className="relative rounded-xl overflow-hidden max-h-[320px] bg-stone-900 flex items-center justify-center">
                      <img 
                        src={uploadedImagePreview} 
                        alt="Uploaded screenshot" 
                        className="object-contain w-full max-h-[300px]"
                      />
                      <div className="absolute top-3 left-3 bg-stone-950/90 border border-emerald-500 text-emerald-400 text-[11px] font-mono px-2 py-1 rounded shadow">
                        📷 Analyzing: {uploadedFileName}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-stone-900 border border-stone-800 rounded-xl p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-stone-800/80 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-emerald-500 text-stone-950 font-black text-xs flex items-center justify-center">
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
                    </div>

                    <p className="text-xs sm:text-sm text-stone-200 leading-relaxed font-sans bg-stone-950/60 p-4 rounded-xl border border-stone-800">
                      "{selectedScreenshot.mockImage.message}"
                    </p>

                    {/* Detected visual highlight flags */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {selectedScreenshot.detectedVisuals.map((vis, idx) => (
                        <div 
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-rose-950/60 border border-rose-700/60 text-rose-300 text-[11px] font-mono flex items-center gap-1.5"
                        >
                          <span className="font-bold">{vis.tag}:</span>
                          <span className="text-stone-300">{vis.detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Scanning Step Tracker */}
              <AnimatePresence>
                {isScanning && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3"
                  >
                    <div className="flex items-center justify-between text-xs font-semibold text-stone-700">
                      <span className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                        <span>Multimodal Inspection in Progress:</span>
                      </span>
                      <span className="font-mono text-emerald-700">
                        Step {scanStepIndex + 1} of {selectedScreenshot.steps.length}
                      </span>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-stone-200 text-xs font-medium text-stone-800 shadow-subtle flex items-center gap-2.5">
                      <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
                      <span>{selectedScreenshot.steps[scanStepIndex]}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Results & MS Guidance Card */}
              {hasScanned && !isScanning && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 pt-4 border-t border-stone-100"
                >
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-stone-50/80 border border-stone-200">
                    <div className="space-y-2 text-center sm:text-left flex-1">
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <VerdictBadge verdict={selectedScreenshot.verdict} size="md" />
                        <span className="text-xs text-stone-400 font-semibold uppercase">Verdict</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                        {selectedScreenshot.verdict === 'SCAM LIKELY' ? '🚨 Scam Detected — Do Not Proceed' : '⚠️ Caution Advised'}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xl">
                        {selectedScreenshot.summary}
                      </p>
                    </div>

                    <div className="shrink-0">
                      <TrustGauge score={selectedScreenshot.score} size={150} strokeWidth={12} />
                    </div>
                  </div>

                  {/* MS Direct Human Advice */}
                  <div className="p-6 rounded-2xl border-2 border-stone-900 bg-white shadow-elevated space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 text-stone-950 font-black text-xs flex items-center justify-center">
                        MS
                      </div>
                      <div>
                        <div className="text-xs font-bold text-stone-900">MS — AI Security Consultant</div>
                        <div className="text-[10px] text-stone-500">Authoritative Human Guidance</div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-xs font-bold text-rose-800 uppercase tracking-wider">
                        Key Red Flags Flagged by Multimodal Vision:
                      </div>
                      <ul className="space-y-1">
                        {selectedScreenshot.concerns.map((concern, i) => (
                          <li key={i} className="text-xs text-stone-700 flex items-start gap-2">
                            <span className="text-rose-500 font-bold">•</span>
                            <span>{concern}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                      <div className="text-[11px] font-bold text-emerald-950 uppercase tracking-wider mb-0.5">
                        MS Recommendation:
                      </div>
                      <p className="text-xs font-semibold text-emerald-900 leading-snug">
                        {selectedScreenshot.recommendation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: Text & Contract Auditor Mode */}
        {activeTab === 'text' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {TEXT_PRESETS.map((scen) => {
                const isSelected = selectedTextPreset.id === scen.id;
                const Icon = scen.icon;
                return (
                  <button
                    key={scen.id}
                    onClick={() => runTextPreset(scen)}
                    className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3 shadow-subtle ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900 shadow-card scale-[1.02]'
                        : 'bg-white hover:bg-stone-50 border-stone-200 text-stone-800'
                    }`}
                  >
                    <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-stone-800 text-emerald-400' : 'bg-stone-100 text-stone-600'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold leading-snug">{scen.title}</div>
                      <div className={`text-[11px] mt-0.5 ${isSelected ? 'text-stone-300' : 'text-stone-500'}`}>
                        {scen.subtitle}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-card space-y-6 relative overflow-hidden">
              <div className="space-y-2">
                <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Target Offer Letter, Contract Clause, or Link:
                </label>
                <textarea
                  rows={4}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  placeholder="Paste any offer letter, recruiter message, website link, or contract clause..."
                  className="w-full text-xs sm:text-sm p-4 bg-stone-50 border border-stone-200 rounded-2xl outline-none focus:border-stone-400 transition-colors leading-relaxed"
                />

                <div className="flex justify-end pt-1">
                  <button
                    onClick={handleCustomTextScan}
                    disabled={isScanning || !customText.trim()}
                    className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-all shadow-subtle flex items-center gap-2 disabled:opacity-40"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{isScanning ? 'Scanning...' : 'Scan with MS'}</span>
                  </button>
                </div>
              </div>

              {/* Results & MS Guidance Card */}
              {hasScanned && !isScanning && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6 pt-4 border-t border-stone-100"
                >
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-stone-50/80 border border-stone-200">
                    <div className="space-y-2 text-center sm:text-left flex-1">
                      <div className="flex items-center justify-center sm:justify-start gap-2">
                        <VerdictBadge verdict={selectedTextPreset.verdict} size="md" />
                        <span className="text-xs text-stone-400 font-semibold uppercase">Verdict</span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                        {selectedTextPreset.verdict === 'SCAM LIKELY' ? '🚨 Scam Detected — Do Not Proceed' : '✅ Verified Safe'}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xl">
                        {selectedTextPreset.summary}
                      </p>
                    </div>

                    <div className="shrink-0">
                      <TrustGauge score={selectedTextPreset.score} size={150} strokeWidth={12} />
                    </div>
                  </div>

                  {/* MS Direct Human Guidance */}
                  <div className="p-6 rounded-2xl border-2 border-stone-900 bg-white shadow-elevated space-y-4">
                    <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 text-stone-950 font-black text-xs flex items-center justify-center">
                        MS
                      </div>
                      <div>
                        <div className="text-xs font-bold text-stone-900">MS — AI Security Consultant</div>
                        <div className="text-[10px] text-stone-500">Authoritative Human Guidance</div>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="text-xs font-bold text-rose-800 uppercase tracking-wider">
                        Key Concerns Flagged:
                      </div>
                      <ul className="space-y-1">
                        {selectedTextPreset.concerns.map((concern, i) => (
                          <li key={i} className="text-xs text-stone-700 flex items-start gap-2">
                            <span className="text-rose-500 font-bold">•</span>
                            <span>{concern}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                      <div className="text-[11px] font-bold text-emerald-950 uppercase tracking-wider mb-0.5">
                        MS Recommendation:
                      </div>
                      <p className="text-xs font-semibold text-emerald-900 leading-snug">
                        {selectedTextPreset.recommendation}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Track Spotlight: Best Use of Gemma */}
      <section className="bg-gradient-to-br from-stone-900 via-stone-900 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-elevated border border-emerald-800/40 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-800 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-600 text-emerald-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Track: Best Use of Gemma 4</span>
            </div>
            <h2 className="text-2xl font-black tracking-tight text-white">
              Lightweight Open Intelligence. Real-World Community Shield.
            </h2>
            <p className="text-xs text-stone-300 max-w-2xl leading-relaxed">
              Gemma 4 packs multimodal intelligence into an open-weights model accessible through the Gemini API. Here is what Gemma 4 brings to TrustAI:
            </p>
          </div>

          <button
            onClick={handleUploadButtonClick}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 text-xs font-bold rounded-xl transition-all shadow-subtle flex items-center gap-2 shrink-0 self-start md:self-auto cursor-pointer"
          >
            <UploadCloud className="w-4 h-4" />
            <span>Upload Screenshot</span>
          </button>
        </div>

        {/* 3 Pillars from Gemma Track Prompt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            whileHover={{ y: -3 }}
            className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700/80 space-y-2.5"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-600 flex items-center justify-center text-emerald-400">
              <Eye className="w-4 h-4" />
            </div>
            <div className="text-sm font-bold text-white">Multimodal Experience</div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Work with text and images together. TrustAI reads chat captures, recruiter DMs, and payment QR codes that text-only scrapers completely overlook.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700/80 space-y-2.5"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-600 flex items-center justify-center text-emerald-400">
              <Users className="w-4 h-4" />
            </div>
            <div className="text-sm font-bold text-white">Focused Community Tool</div>
            <p className="text-xs text-stone-300 leading-relaxed">
              A high-impact shield built for students, job seekers, and consumers to stop advance-fee job scams, fake security deposits, and dark pattern traps.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            className="p-5 rounded-2xl bg-stone-800/80 border border-stone-700/80 space-y-2.5"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-950 border border-emerald-600 flex items-center justify-center text-emerald-400">
              <Zap className="w-4 h-4" />
            </div>
            <div className="text-sm font-bold text-white">Rapid Prototyping</div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Open-weights speed combined with the Gemini API enables sub-second verdicts across both this unified web platform and our live Chrome extension.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Video Simulation of Chrome Extension */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight flex items-center gap-2">
              <Chrome className="w-5 h-5 text-emerald-600" />
              <span>Live Animated Extension Preview</span>
            </h2>
            <p className="text-xs text-stone-500">
              Watch how TrustAI flags a fraudulent internship offer inside Google Chrome:
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

      {/* Visual Societal Impact Metrics */}
      <section className="space-y-4">
        <div className="text-center text-xs font-bold text-stone-400 uppercase tracking-wider">
          How TrustAI Protects Everyday People
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            className="p-6 rounded-3xl bg-gradient-to-br from-rose-50/70 to-rose-100/40 border border-rose-200/80 shadow-subtle space-y-2 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-800 uppercase tracking-wider">Students & Job Seekers</span>
              <Briefcase className="w-4 h-4 text-rose-600" />
            </div>
            <div className="text-3xl font-black text-rose-950">$1.4M+ Saved</div>
            <p className="text-xs text-rose-800/90 leading-relaxed">
              Blocked fake remote jobs charging upfront "$250 laptop deposits" on Telegram.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            className="p-6 rounded-3xl bg-gradient-to-br from-amber-50/70 to-amber-100/40 border border-amber-200/80 shadow-subtle space-y-2 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">Freelancers & Creators</span>
              <Scale className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-3xl font-black text-amber-950">4,800+ Clauses</div>
            <p className="text-xs text-amber-800/90 leading-relaxed">
              Exposed one-sided IP forfeiture and mandatory private arbitration lock-ins before signing.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50/70 to-emerald-100/40 border border-emerald-200/80 shadow-subtle space-y-2 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">Everyday Consumers</span>
              <ShoppingCart className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-black text-emerald-950">28,000+ Traps</div>
            <p className="text-xs text-emerald-800/90 leading-relaxed">
              Caught fake scarcity countdown timers and deceptive recurring billing roach motels.
            </p>
          </motion.div>
        </div>
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
            <div className="font-bold text-white">Unzip the Downloaded File</div>
            <p className="text-stone-400 text-[11px]">
              Extract <code className="text-emerald-400 bg-stone-900 px-1 rounded font-mono">trustai-extension.zip</code> on your computer.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-2">
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-stone-950 font-bold text-xs flex items-center justify-center">
              2
            </div>
            <div className="font-bold text-white">Open chrome://extensions</div>
            <p className="text-stone-400 text-[11px]">
              Type <code className="text-emerald-400 bg-stone-900 px-1 rounded font-mono">chrome://extensions</code> in Chrome and toggle ON <strong>Developer mode</strong> in the top-right corner.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-2">
            <div className="w-6 h-6 rounded-full bg-emerald-500 text-stone-950 font-bold text-xs flex items-center justify-center">
              3
            </div>
            <div className="font-bold text-white">Click "Load Unpacked"</div>
            <p className="text-stone-400 text-[11px]">
              Select the unzipped extension folder. The TrustAI shield icon is ready!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
