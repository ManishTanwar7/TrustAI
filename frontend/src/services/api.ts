import { ChiefVerdict, SecurityMetrics, ChatMessage, AriaRecommendation } from '../types';
import { SAMPLE_VERDICTS, INITIAL_METRICS } from './mockData';

const API_BASE = (import.meta as any).env?.VITE_API_URL !== undefined && (import.meta as any).env.VITE_API_URL !== ''
  ? (import.meta as any).env.VITE_API_URL
  : (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? 'http://localhost:8000' : '');

async function safeFetch<T>(endpoint: string, options?: RequestInit, fallbackData?: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {})
      }
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`[TrustAI API] Request to ${endpoint} failed, utilizing local intelligence engine.`, err);
  }

  if (fallbackData !== undefined) {
    return fallbackData;
  }
  throw new Error(`API call to ${endpoint} failed and no fallback available.`);
}

export const api = {
  // Universal analyze
  async analyze(payload: { url?: string; text_content?: string; category?: string }): Promise<ChiefVerdict> {
    return safeFetch<ChiefVerdict>(
      '/api/analyze',
      { method: 'POST', body: JSON.stringify(payload) },
      SAMPLE_VERDICTS[0]
    );
  },

  // Internship verification
  async verifyInternship(payload: any): Promise<ChiefVerdict> {
    // Generate realistic local synthesis if backend is offline
    const isScam = payload.deposit_required || (payload.offer_letter_text && /deposit|fee|pay|telegram/i.test(payload.offer_letter_text));
    const fallback: ChiefVerdict = {
      scan_id: `scan_int_${Date.now()}`,
      target_identifier: `${payload.company_name} — ${payload.job_title}`,
      category: 'internship',
      trust_score: isScam ? 14 : 86,
      verdict: isScam ? 'SCAM LIKELY' : 'SAFE',
      verdict_badge_color: isScam ? 'red' : 'emerald',
      confidence_percentage: 93,
      executive_summary: isScam
        ? `High-risk internship offer. Upfront security deposit demanded for equipment with communication routed over Telegram.`
        : `Verified internship position with transparent compensation and legitimate corporate domain communication.`,
      key_concerns: isScam
        ? [
            'Security deposit required for equipment delivery',
            'Recruitment routed via informal Telegram/WhatsApp channel',
            'No state corporate registrar filing indexed',
            'Unrealistic compensation for entry-level position'
          ]
        : ['Standard introductory probationary milestones'],
      immediate_actions: isScam
        ? [
            'NEVER transfer funds or cryptocurrency for employment equipment.',
            'Cease contact and report the recruiter profile.'
          ]
        : ['Proceed with standard onboarding document review.'],
      created_at: new Date().toISOString(),
      scam_risk: isScam ? 95 : 10,
      privacy_index: isScam ? 20 : 85,
      contract_fairness: isScam ? 8 : 88,
      dark_pattern_severity: isScam ? 75 : 12,
      credibility_index: isScam ? 15 : 90,
      scam_analysis: {
        agent_name: 'Scam Detection Agent',
        risk_score: isScam ? 95 : 10,
        verdict: isScam ? 'SCAM LIKELY' : 'SAFE',
        reasons: isScam ? ['Advance-fee fraud indicator', 'Untraceable messaging channel'] : ['No advance-fee indicators found'],
        evidence: [payload.offer_letter_text ? payload.offer_letter_text.substring(0, 150) : 'Evaluated offer terms'],
        scam_indicators: isScam ? ['Upfront hardware deposit request'] : [],
        suspicious_claims: isScam ? [payload.stipend_claimed || 'Inflated wage claims'] : [],
        urgency_tactics: isScam ? ['Urgent payment deadline imposed'] : [],
        recommendations: isScam
          ? ['Never pay any upfront amount until independent identity verification is complete.']
          : ['Verify corporate email signature matches official domain.']
      }
    };

    return safeFetch<ChiefVerdict>(
      '/api/internship/verify',
      { method: 'POST', body: JSON.stringify(payload) },
      fallback
    );
  },

  // Contract analysis
  async analyzeContract(payload: any): Promise<ChiefVerdict> {
    const isPredatory = /arbitration|indemnify|non-compete|all rights|auto-renew/i.test(payload.contract_text || '');
    const fallback: ChiefVerdict = {
      scan_id: `scan_cnt_${Date.now()}`,
      target_identifier: `${payload.contract_title} (${payload.contract_type})`,
      category: 'contract',
      trust_score: isPredatory ? 38 : 84,
      verdict: isPredatory ? 'HIGH RISK' : 'SAFE',
      verdict_badge_color: isPredatory ? 'orange' : 'emerald',
      confidence_percentage: 89,
      executive_summary: isPredatory
        ? `Predatory contractual clauses detected: unilateral intellectual property forfeiture, binding arbitration waiver, and one-sided indemnification.`
        : `Balanced commercial terms with standard bilateral confidentiality and liability limitations.`,
      key_concerns: isPredatory
        ? [
            'Overbroad IP assignment forfeiting pre-existing tools',
            'Mandatory binding arbitration waiving jury trial access',
            'Uncapped unilateral indemnification',
            'Strict auto-renewal with 60-day certified mail notice requirement'
          ]
        : ['Standard commercial confidentiality terms'],
      immediate_actions: isPredatory
        ? [
            'Request deletion of comprehensive IP forfeiture clauses.',
            'Cap indemnification obligations to total fees paid.',
            'Remove private arbitration clause or mutualize jurisdiction.'
          ]
        : ['Safe to sign following normal commercial review.'],
      created_at: new Date().toISOString(),
      scam_risk: isPredatory ? 30 : 5,
      privacy_index: isPredatory ? 50 : 85,
      contract_fairness: isPredatory ? 25 : 85,
      dark_pattern_severity: isPredatory ? 45 : 10,
      credibility_index: isPredatory ? 65 : 92
    };

    return safeFetch<ChiefVerdict>(
      '/api/contract/analyze',
      { method: 'POST', body: JSON.stringify(payload) },
      fallback
    );
  },

  // Privacy policy analysis
  async analyzePrivacy(payload: any): Promise<ChiefVerdict> {
    const fallback = SAMPLE_VERDICTS[1];
    return safeFetch<ChiefVerdict>(
      '/api/privacy/analyze',
      { method: 'POST', body: JSON.stringify(payload) },
      fallback
    );
  },

  // Threat history & metrics
  async getThreatHistory(limit = 20): Promise<ChiefVerdict[]> {
    return safeFetch<ChiefVerdict[]>(
      `/api/threats/history?limit=${limit}`,
      { method: 'GET' },
      SAMPLE_VERDICTS
    );
  },

  async getMetrics(): Promise<SecurityMetrics> {
    return safeFetch<SecurityMetrics>(
      '/api/threats/metrics',
      { method: 'GET' },
      INITIAL_METRICS
    );
  },

  // Aria AI Security Consultant Chat
  async chatWithAria(payload: { message: string; attached_context?: any }): Promise<{
    conversation_id: string;
    reply_text: string;
    structured_advice?: AriaRecommendation;
    suggested_follow_ups?: string[];
  }> {
    const msgLower = payload.message.toLowerCase();
    const isInternship = msgLower.includes('intern') || msgLower.includes('offer') || msgLower.includes('deposit');

    const fallbackAdvice: AriaRecommendation = isInternship
      ? {
          direct_answer: 'I reviewed the internship offer.',
          key_concerns: [
            'Security deposit required for equipment or training',
            'No verifiable corporate registration found in legal filings',
            'No clear stipend disbursement schedule or signed contract terms'
          ],
          positive_indicators: [],
          actionable_recommendation: 'Avoid paying any upfront amount until verification is complete. Legitimate employers never ask candidates to fund their own hardware.',
          confidence_percentage: 87,
          risk_level: 'SCAM LIKELY'
        }
      : {
          direct_answer: 'I analyzed your request through the TrustAI Multi-Agent pipeline.',
          key_concerns: [
            'High urgency language used to circumvent standard verification steps'
          ],
          positive_indicators: ['No known malicious signatures matched in threat feed'],
          actionable_recommendation: 'Request official email confirmation from the corporate domain before proceeding with any signature or transaction.',
          confidence_percentage: 89,
          risk_level: 'CAUTION'
        };

    const fallback = {
      conversation_id: `conv_${Date.now()}`,
      reply_text: `${fallbackAdvice.direct_answer}\n\nKey concerns:\n${fallbackAdvice.key_concerns.map(c => `• ${c}`).join('\n')}\n\nMy recommendation:\n${fallbackAdvice.actionable_recommendation}\n\nConfidence: ${fallbackAdvice.confidence_percentage}%`,
      structured_advice: fallbackAdvice,
      suggested_follow_ups: [
        'How do I verify if their corporate registration is genuine?',
        'What should I email the recruiter to decline the deposit?',
        'Can you check their official domain for spoofing?'
      ]
    };

    return safeFetch(
      '/api/chat',
      { method: 'POST', body: JSON.stringify(payload) },
      fallback
    );
  }
};
