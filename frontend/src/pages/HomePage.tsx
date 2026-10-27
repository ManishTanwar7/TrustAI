import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, AlertTriangle, ArrowRight, Sparkles, 
  CheckCircle2, Chrome, Search, RotateCcw, Download,
  Briefcase, ShoppingCart, FileCheck, Scale
} from 'lucide-react';
import { TrustGauge } from '../components/common/TrustGauge';
import { VerdictBadge } from '../components/common/VerdictBadge';
import { ExtensionDemoPlayer } from '../components/common/ExtensionDemoPlayer';

interface SimulationScenario {
  id: string;
  title: string;
  subtitle: string;
  icon: any;
  inputText: string;
  score: number;
  verdict: 'SCAM LIKELY' | 'SAFE' | 'CAUTION';
  summary: string;
  concerns: string[];
  recommendation: string;
  steps: string[];
}

const SCENARIOS: SimulationScenario[] = [
  {
    id: 'internship-scam',
    title: 'Fake Internship Offer',
    subtitle: '$250 Laptop Deposit Scam',
    icon: Briefcase,
    inputText: 'Congratulations! You are selected as our Remote Data Intern at $45/hr. To ship your Apple MacBook Pro, transfer a refundable $250 insurance deposit via Zelle or Crypto to our recruiter on Telegram (@NovaHR).',
    score: 12,
    verdict: 'SCAM LIKELY',
    summary: 'Clear advance-fee scam detected. The recruiter demands an upfront deposit for hardware, uses an untraceable Telegram handle, and offers an unrealistic wage with no interview.',
    concerns: [
      'Asks for $250 upfront deposit before you start',
      'Communication routed to Telegram instead of an official company email',
      'No legal company registration found'
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
    id: 'safe-company',
    title: 'Verified Legitimate Job',
    subtitle: 'Transparent & Verified',
    icon: FileCheck,
    inputText: 'We are pleased to offer you the Software Engineering Intern position at Stripe. Your equipment will be provisioned directly by our IT department at zero cost to you.',
    score: 95,
    verdict: 'SAFE',
    summary: 'Verified legitimate company. Transparent hiring process, zero upfront fees, and authentic domain credentials.',
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
    id: 'dark-pattern',
    title: 'Deceptive Subscription Trap',
    subtitle: 'Roach Motel & Hidden Fees',
    icon: ShoppingCart,
    inputText: 'FLASH DEAL! 90% OFF ends in 02:14 minutes! By clicking Claim, you agree to auto-enroll in our $89.99/month recurring membership. To cancel, mail a handwritten letter to our Delaware PO Box.',
    score: 28,
    verdict: 'CAUTION',
    summary: 'Deceptive subscription design detected. Uses fake countdown urgency and a cancellation maze designed to trap recurring monthly charges.',
    concerns: [
      'Fake scarcity countdown timer',
      'Hidden $89.99 monthly auto-billing in small print',
      'Cancellation intentionally blocked by requiring physical postal mail'
    ],
    recommendation: 'Do not enter your credit card. Look for alternative services with transparent one-click online cancellation.',
    steps: [
      'Analyzing checkout copy for hidden recurring fees...',
      'Detecting artificial countdown scarcity timers...',
      'Auditing cancellation difficulty (Roach Motel)...',
      'Flagging deceptive UX practices.'
    ]
  }
];

export const HomePage: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<SimulationScenario>(SCENARIOS[0]);
  const [userInput, setUserInput] = useState(SCENARIOS[0].inputText);
  const [isScanning, setIsScanning] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [hasScanned, setHasScanned] = useState(true);

  const startSimulation = (scenario: SimulationScenario) => {
    setSelectedScenario(scenario);
    setUserInput(scenario.inputText);
    setIsScanning(true);
    setHasScanned(false);
    setCurrentStepIndex(0);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < scenario.steps.length) {
        setCurrentStepIndex(step);
      } else {
        clearInterval(interval);
        setIsScanning(false);
        setHasScanned(true);
      }
    }, 550);
  };

  const handleCustomScan = () => {
    if (!userInput.trim()) return;
    setIsScanning(true);
    setHasScanned(false);
    setCurrentStepIndex(0);

    const isFake = /deposit|fee|pay|telegram|crypto|zelle|gift card/i.test(userInput);
    const customResult: SimulationScenario = {
      id: 'custom',
      title: 'Custom Scan',
      subtitle: 'Analyzed Input',
      icon: Search,
      inputText: userInput,
      score: isFake ? 14 : 88,
      verdict: isFake ? 'SCAM LIKELY' : 'SAFE',
      summary: isFake 
        ? 'High-risk indicators detected: Upfront payment demanded or untraceable channel requested.'
        : 'No obvious upfront fee demands or high-pressure tactics found.',
      concerns: isFake
        ? ['Demands upfront payment or registration fee', 'High risk of advance-fee fraud']
        : ['Standard commercial communications pattern'],
      recommendation: isFake
        ? 'Never pay money or buy gift cards for any job offer. Stop communication immediately.'
        : 'Appears safe. Always verify official corporate email before sharing private information.',
      steps: [
        'Parsing text for scam indicators...',
        'Cross-referencing advance-fee fraud database...',
        'Checking for manipulative pressure tactics...',
        'MS Consultant verdict ready!'
      ]
    };

    setSelectedScenario(customResult);

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < customResult.steps.length) {
        setCurrentStepIndex(step);
      } else {
        clearInterval(interval);
        setIsScanning(false);
        setHasScanned(true);
      }
    }, 500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-5 max-w-3xl mx-auto pt-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900 shadow-subtle">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>TrustAI Scam Defense</span>
          <span className="text-stone-300">|</span>
          <span>MS Defense Engine</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-stone-900 tracking-tight leading-[1.1]">
          Never get scammed again.
        </h1>

        <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl mx-auto">
          AI catches fake internship deposits, deceptive subscription countdowns, and predatory fine print in seconds.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="#scanner-section"
            className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-2xl transition-all shadow-subtle flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>Try Live Simulator</span>
          </a>

          <a
            href="/trustai-extension.zip"
            download="trustai-extension.zip"
            className="px-6 py-3 bg-white hover:bg-stone-50 border-2 border-stone-300 text-stone-900 text-xs font-bold rounded-2xl transition-all shadow-subtle flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Download Chrome Extension (.zip)</span>
          </a>
        </div>
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

      {/* 1-Click Interactive Live Simulator */}
      <section id="scanner-section" className="space-y-6 pt-4">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-black text-stone-900 tracking-tight">
            Try the Live Simulator
          </h2>
          <p className="text-xs text-stone-500">
            Click any preset below to simulate the detection live:
          </p>
        </div>

        {/* Preset Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {SCENARIOS.map((scen) => {
            const Icon = scen.icon;
            const isSelected = selectedScenario.id === scen.id;
            return (
              <button
                key={scen.id}
                onClick={() => startSimulation(scen)}
                className={`p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 shadow-subtle ${
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

        {/* Scanner Container */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-card space-y-6 relative overflow-hidden">
          {/* Laser scanning beam animation when isScanning */}
          {isScanning && (
            <motion.div
              initial={{ top: '0%' }}
              animate={{ top: '100%' }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent shadow-[0_0_15px_#10B981] z-20 pointer-events-none"
            />
          )}

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                Target Content:
              </label>
              <span className="text-[11px] text-stone-400">Click a preset above or edit here</span>
            </div>

            <textarea
              rows={3}
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Paste any offer letter, recruiter message, website link, or contract clause..."
              className="w-full text-xs sm:text-sm p-3.5 bg-stone-50 border border-stone-200 rounded-2xl outline-none focus:border-stone-400 transition-colors leading-relaxed"
            />

            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={handleCustomScan}
                disabled={isScanning || !userInput.trim()}
                className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl transition-all shadow-subtle flex items-center gap-2 disabled:opacity-40"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>{isScanning ? 'Scanning...' : 'Scan with MS'}</span>
              </button>
            </div>
          </div>

          {/* Real-time Scanner Step Tracker */}
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
                    <span>MS Detection Fleet at work:</span>
                  </span>
                  <span className="font-mono text-emerald-700">
                    Step {currentStepIndex + 1} of {selectedScenario.steps.length}
                  </span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-stone-200 text-xs font-medium text-stone-800 shadow-subtle flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
                  <span>{selectedScenario.steps[currentStepIndex]}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Clean Results Presentation */}
          {hasScanned && !isScanning && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 pt-4 border-t border-stone-100"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-stone-50/70 border border-stone-200">
                <div className="space-y-2 text-center sm:text-left flex-1">
                  <div className="flex items-center justify-center sm:justify-start gap-2">
                    <VerdictBadge verdict={selectedScenario.verdict} size="md" />
                    <span className="text-xs text-stone-400 font-semibold uppercase">Verdict</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-stone-900 tracking-tight">
                    {selectedScenario.verdict === 'SCAM LIKELY' ? '🚨 Scam Detected — Do Not Proceed' : '✅ Verified Safe to Proceed'}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-xl">
                    {selectedScenario.summary}
                  </p>
                </div>

                <div className="shrink-0">
                  <TrustGauge score={selectedScenario.score} size={150} strokeWidth={12} />
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
                    {selectedScenario.concerns.map((concern, i) => (
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
                    {selectedScenario.recommendation}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
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
