import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Sparkles, AlertCircle, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';
import { ChatMessage } from '../../types';

export const AriaFloatingWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello, I'm MS, your TrustAI Security Consultant. Paste any internship offer, suspicious message, contract clause, or link, and I'll break down the hidden risks for you.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.chatWithAria({ message: query });
      const assistantMsg: ChatMessage = {
        id: `asst_${Date.now()}`,
        role: 'assistant',
        content: res.reply_text,
        structured_advice: res.structured_advice,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `err_${Date.now()}`,
          role: 'assistant',
          content: "I encountered an error connecting to MS intelligence engine. Please try again.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating launcher button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 bg-stone-900 text-white px-4 py-3 rounded-full shadow-elevated border border-stone-800 hover:bg-stone-800 transition-all"
        >
          <div className="relative">
            <div className="w-7 h-7 rounded-full bg-emerald-500 text-stone-950 font-black text-xs flex items-center justify-center">
              MS
            </div>
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-stone-900 animate-pulse" />
          </div>
          <div className="text-left">
            <div className="text-xs font-bold leading-tight">Ask MS</div>
            <div className="text-[10px] text-stone-400">Security Consultant</div>
          </div>
        </motion.button>
      </div>

      {/* Slide-out Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-32px)] h-[540px] bg-white rounded-2xl shadow-2xl border border-stone-200 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-4 py-3 bg-stone-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-stone-950 font-black text-xs flex items-center justify-center">
                  MS
                </div>
                <div>
                  <div className="text-sm font-bold flex items-center gap-1.5">
                    MS Consultant
                    <span className="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.2 rounded font-bold">
                      ACTIVE
                    </span>
                  </div>
                  <div className="text-[10px] text-stone-400">AI Trust & Security Guide</div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-stone-400 hover:text-white p-1 rounded-md"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Quick Demo Prompts */}
            <div className="px-3 py-2 bg-stone-50 border-b border-stone-100 flex items-center gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap">
              <span className="text-stone-400 font-medium">Try:</span>
              <button
                onClick={() => handleSend("Should I accept an internship asking for a $200 laptop deposit on Telegram?")}
                className="bg-white border border-stone-200 px-2 py-0.5 rounded text-stone-700 hover:border-emerald-500 transition-colors"
              >
                Internship deposit scam?
              </button>
              <button
                onClick={() => handleSend("What are red flags in a freelance contract?")}
                className="bg-white border border-stone-200 px-2 py-0.5 rounded text-stone-700 hover:border-emerald-500 transition-colors"
              >
                Contract red flags?
              </button>
            </div>

            {/* Message History */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-stone-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-stone-900 text-white rounded-br-sm'
                        : 'bg-white text-stone-800 border border-stone-200 shadow-subtle rounded-bl-sm'
                    }`}
                  >
                    {msg.structured_advice ? (
                      <div className="space-y-2">
                        <div className="font-semibold text-stone-900 border-b border-stone-100 pb-1">
                          {msg.structured_advice.direct_answer.replace(/Aria/g, 'MS')}
                        </div>

                        {msg.structured_advice.key_concerns.length > 0 && (
                          <div>
                            <div className="font-semibold text-rose-700 text-[11px] mb-1">Key concerns:</div>
                            <ul className="space-y-0.5 text-stone-700 pl-2">
                              {msg.structured_advice.key_concerns.map((c, i) => (
                                <li key={i} className="flex items-start gap-1">
                                  <span className="text-rose-500 font-bold">•</span>
                                  <span>{c}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        <div className="pt-1.5 border-t border-stone-100 bg-emerald-50/70 p-2 rounded-lg border border-emerald-100">
                          <div className="font-semibold text-emerald-900 text-[11px]">My recommendation:</div>
                          <div className="text-emerald-800 mt-0.5 font-medium">
                            {msg.structured_advice.actionable_recommendation}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1 text-[10px] text-stone-400">
                          <span>Confidence: <strong>{msg.structured_advice.confidence_percentage}%</strong></span>
                          <span className="font-bold text-stone-600">{msg.structured_advice.risk_level}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="whitespace-pre-line">{msg.content}</div>
                    )}
                  </div>
                  <span className="text-[9px] text-stone-400 mt-1 px-1">{msg.timestamp}</span>
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-xs text-stone-500 bg-white p-3 rounded-2xl border border-stone-200 w-fit">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-spin" />
                  <span>MS Consultant is evaluating the threat...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-3 bg-white border-t border-stone-200">
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
                  placeholder="Ask MS about an offer, contract, or link..."
                  className="flex-1 bg-stone-50 border border-stone-200 rounded-xl px-3 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-stone-400 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="w-8 h-8 rounded-xl bg-stone-900 text-white flex items-center justify-center disabled:opacity-30 hover:bg-stone-800 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
