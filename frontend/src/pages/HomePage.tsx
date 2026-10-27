import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, AlertTriangle, ArrowRight, Sparkles, 
  CheckCircle2, Chrome, Search, RotateCcw, HelpCircle,
  Briefcase, ShoppingCart, FileCheck
} from 'lucide-react';
import { TrustGauge } from '../components/common/TrustGauge';
import { VerdictBadge } from '../components/common/VerdictBadge';

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
      'Aria Security Consultant formulating verdict...'
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
  const [showExtensionGuide, setShowExtensionGuide] = useState(false);

  const startSimulation = (scenario: SimulationScenario) => {
    setSelectedScenario(scenario);
    setUserInput(scenario.inputText);
    setIsScanning(true);
    setHasScanned(false);
    setCurrentStepIndex(0);

    // Smooth step-by-step animation
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
    }, 600);
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
        'Aria Consultant verdict ready!'
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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Hero: Understand in 5 seconds */}
      <section className="text-center space-y-4 max-w-2xl mx-auto pt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>TrustAI Security Shield</span>
          <span className="text-stone-300">|</span>
          <span>Google Gemini Brain</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-stone-900 tracking-tight leading-[1.15]">
          Never get scammed again.
        </h1>

        <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
          Students lose thousands to fake internship deposits. Freelancers sign predatory contracts. TrustAI catches deceptive offers in seconds.
        </p>
      </section>

      {/* 1-Click Interactive Demo Buttons */}
      <section className="space-y-4">
        <div className="text-center text-xs font-bold text-stone-500 uppercase tracking-wider">
          Click any scenario to see it live:
        </div>

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
      </section>

      {/* Interactive Live Scanner Box */}
      <section className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-card space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider">
              Paste or Edit Text to Scan:
            </label>
            <span className="text-[11px] text-stone-400">Try pasting your own offer or email</span>
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
              <span>{isScanning ? 'Analyzing...' : 'Scan Now with Aria'}</span>
            </button>
          </div>
        </div>

        {/* Live Simulation Progress Indicator */}
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
                  <span>Simulating Multi-Agent Security Audit:</span>
                </span>
                <span className="font-mono text-emerald-700">
                  Step {currentStepIndex + 1} of {selectedScenario.steps.length}
                </span>
              </div>

              {/* Step indicator */}
              <div className="p-3 bg-white rounded-xl border border-stone-200 text-xs font-medium text-stone-800 shadow-subtle flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
                <span>{selectedScenario.steps[currentStepIndex]}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Clean, Non-Messy Results Presentation */}
        {hasScanned && !isScanning && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 pt-4 border-t border-stone-100"
          >
            {/* Top Score Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-stone-50/70 border border-stone-200">
              <div className="space-y-2 text-center sm:text-left flex-1">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <VerdictBadge verdict={selectedScenario.verdict} size="md" />
                  <span className="text-xs text-stone-400 font-semibold uppercase">Security Audit</span>
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

            {/* Aria's Clear Human Guidance */}
            <div className="p-6 rounded-2xl border-2 border-stone-900 bg-white shadow-elevated space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-stone-100">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-stone-950 font-black text-xs flex items-center justify-center">
                  A
                </div>
                <div>
                  <div className="text-xs font-bold text-stone-900">Aria — AI Security Consultant</div>
                  <div className="text-[10px] text-stone-500">Plain English Advice</div>
                </div>
              </div>

              {/* Key Concerns */}
              <div className="space-y-1.5">
                <div className="text-xs font-bold text-rose-800 uppercase tracking-wider">
                  What caught our attention:
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

              {/* Recommendation */}
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="text-[11px] font-bold text-emerald-950 uppercase tracking-wider mb-0.5">
                  Aria's Recommendation:
                </div>
                <p className="text-xs font-semibold text-emerald-900 leading-snug">
                  {selectedScenario.recommendation}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </section>

      {/* Chrome Extension: Dead Simple 30-Second Guide */}
      <section className="bg-stone-900 text-white rounded-3xl p-6 sm:p-10 shadow-elevated space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-800 text-emerald-400 text-[11px] font-semibold border border-stone-700">
              <Chrome className="w-3.5 h-3.5" />
              <span>Free Chrome Extension Included</span>
            </div>
            <h2 className="text-2xl font-bold tracking-tight">
              Add TrustAI to Chrome in 3 clicks
            </h2>
            <p className="text-xs text-stone-400">
              Get ambient protection as you browse. Flags fake job portals and scams in real time.
            </p>
          </div>

          <button
            onClick={() => setShowExtensionGuide(!showExtensionGuide)}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 text-xs font-bold rounded-xl transition-all shrink-0 self-start sm:self-auto"
          >
            {showExtensionGuide ? 'Hide Steps' : 'Show 3-Click Installation'}
          </button>
        </div>

        {showExtensionGuide && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="pt-4 border-t border-stone-800 grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-2">
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-stone-950 font-bold text-xs flex items-center justify-center">
                1
              </div>
              <div className="text-xs font-bold text-white">Open Extensions in Chrome</div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Type <code className="text-emerald-400 bg-stone-900 px-1.5 py-0.5 rounded font-mono">chrome://extensions</code> in your browser URL bar.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-2">
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-stone-950 font-bold text-xs flex items-center justify-center">
                2
              </div>
              <div className="text-xs font-bold text-white">Turn on Developer Mode</div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Toggle the switch in the top-right corner of Chrome's Extensions tab.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 space-y-2">
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-stone-950 font-bold text-xs flex items-center justify-center">
                3
              </div>
              <div className="text-xs font-bold text-white">Click "Load Unpacked"</div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Select the <code className="text-emerald-400 bg-stone-900 px-1.5 py-0.5 rounded font-mono">extension</code> folder from your project repository!
              </p>
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
};
