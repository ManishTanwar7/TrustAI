import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Sparkles, Send, ShieldCheck, AlertTriangle, 
  HelpCircle, CheckCircle2, User, RefreshCw 
} from 'lucide-react';
import { api } from '../services/api';
import { ChatMessage, AriaRecommendation } from '../types';
import { VerdictBadge } from '../components/common/VerdictBadge';

export const AssistantPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const contextParam = searchParams.get('context');

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'assistant',
      content: "Hello, I'm MS, your TrustAI Security Consultant.\n\nI combine intelligence from all specialized detection agents to give you direct, human, and protective guidance.\n\nAsk me about an internship offer, suspicious message, freelance agreement, or website.",
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState(contextParam ? `Can you review this target: ${contextParam}?` : '');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (customText?: string) => {
    const text = (customText || input).trim();
    if (!text || loading) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.chatWithAria({ message: text });
      const assistantMsg: ChatMessage = {
        id: `asst_${Date.now()}`,
        role: 'assistant',
        content: res.reply_text.replace(/Aria/g, 'MS'),
        structured_advice: res.structured_advice,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      console.warn('MS consultation fallback used.');
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    "Should I accept this internship offer? They asked for a $200 laptop deposit.",
    "Can you check if this freelance contract's arbitration clause is predatory?",
    "A recruiter contacted me on Telegram offering $48/hr. Is this legitimate?",
    "Does this privacy policy allow selling my personal GPS data to brokers?"
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-stone-900 text-white flex items-center justify-center font-black text-lg shadow-subtle relative">
            <span>MS</span>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-stone-900">MS Consultant</h1>
              <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                AI Security Guide
              </span>
            </div>
            <p className="text-xs text-stone-500">
              Direct, Protective Scam & Legal Guidance
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-stone-400 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Active Intelligence Fleet</span>
        </div>
      </div>

      {/* Suggested Scenarios */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
          Suggested Consultation Scenarios:
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="text-left p-3 rounded-xl bg-white border border-stone-200 text-xs text-stone-700 hover:border-emerald-500 hover:bg-emerald-50/20 transition-all shadow-subtle flex items-start gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
              <span>{p}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Thread */}
      <div className="bg-white rounded-2xl border border-stone-200 shadow-card flex flex-col h-[520px] overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-stone-50/40">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-stone-900 text-white rounded-br-none'
                    : 'bg-white text-stone-800 border border-stone-200 shadow-subtle rounded-bl-none'
                }`}
              >
                {msg.structured_advice ? (
                  <div className="space-y-3.5">
                    <div className="font-semibold text-stone-900 text-sm pb-2 border-b border-stone-100 flex items-center justify-between">
                      <span>{msg.structured_advice.direct_answer.replace(/Aria/g, 'MS')}</span>
                      <VerdictBadge verdict={msg.structured_advice.risk_level} size="sm" />
                    </div>

                    {msg.structured_advice.key_concerns.length > 0 && (
                      <div>
                        <div className="font-bold text-rose-800 text-xs mb-1 uppercase tracking-wider">
                          Key concerns:
                        </div>
                        <ul className="space-y-1 pl-1">
                          {msg.structured_advice.key_concerns.map((c, i) => (
                            <li key={i} className="flex items-start gap-2 text-stone-700">
                              <span className="text-rose-500 font-bold">•</span>
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="p-3 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-1">
                      <div className="font-bold text-emerald-950 text-xs uppercase tracking-wider">
                        My recommendation:
                      </div>
                      <p className="text-emerald-900 font-medium">
                        {msg.structured_advice.actionable_recommendation}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[11px] text-stone-400">
                      <span>Confidence: <strong>{msg.structured_advice.confidence_percentage}%</strong></span>
                      <span className="font-mono">Synthesized by MS Decision Agent</span>
                    </div>
                  </div>
                ) : (
                  <div className="whitespace-pre-line">{msg.content}</div>
                )}
              </div>
              <span className="text-[10px] text-stone-400 mt-1 px-1">{msg.timestamp}</span>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-stone-500 bg-white p-3 rounded-xl border border-stone-200 w-fit">
              <RefreshCw className="w-3.5 h-3.5 text-emerald-600 animate-spin" />
              <span>MS Consultant is evaluating the threat...</span>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input Form */}
        <div className="p-3 sm:p-4 bg-white border-t border-stone-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask MS: 'Should I accept this internship offer?', 'Is this contract safe?'..."
              className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-stone-900 outline-none focus:border-stone-400 transition-colors"
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="px-5 py-2.5 bg-stone-900 text-white rounded-xl text-xs font-bold hover:bg-stone-800 disabled:opacity-40 transition-colors flex items-center gap-1.5 shrink-0"
            >
              <span>Ask</span>
              <Send className="w-3 h-3" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
