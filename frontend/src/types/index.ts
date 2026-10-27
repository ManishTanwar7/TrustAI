export type VerdictType = 'SAFE' | 'CAUTION' | 'HIGH RISK' | 'SCAM LIKELY';

export interface ScamAgentOutput {
  agent_name: string;
  risk_score: number;
  verdict: string;
  reasons: string[];
  evidence: string[];
  scam_indicators: string[];
  suspicious_claims: string[];
  urgency_tactics: string[];
  recommendations: string[];
}

export interface PrivacyAgentOutput {
  agent_name: string;
  privacy_score: number;
  risk_level: string;
  high_risk_areas: string[];
  data_collection_practices: string[];
  third_party_sharing: string[];
  tracking_technologies: string[];
  unnecessary_permissions: string[];
  user_friendly_summary: string;
}

export interface PredatoryClause {
  clause: string;
  risk: string;
  plain_english: string;
}

export interface ContractAgentOutput {
  agent_name: string;
  contract_risk_score: number;
  verdict: string;
  predatory_clauses: PredatoryClause[];
  hidden_liabilities: string[];
  cancellation_traps: string[];
  arbitration_lockin: boolean;
  favorable_clauses: string[];
  summary: string;
}

export interface DarkPatternAgentOutput {
  agent_name: string;
  dark_pattern_score: number;
  detected_patterns: string[];
  false_urgency: string[];
  forced_continuity: string[];
  hidden_cancellation: string[];
  misleading_pricing: string[];
  confirmshaming: string[];
  evidence: string[];
  explanation: string;
}

export interface CredibilityAgentOutput {
  agent_name: string;
  credibility_score: number;
  is_corporate_registered: boolean;
  domain_age_days?: number;
  ssl_valid: boolean;
  contact_transparency: string;
  impersonation_risk: string;
  findings: string[];
}

export interface ThreatAgentOutput {
  agent_name: string;
  threat_level: string;
  threat_score: number;
  matched_blacklist: boolean;
  known_signatures: string[];
  phishing_indicators: string[];
  malicious_heuristics: string[];
}

export interface ChiefVerdict {
  scan_id: string;
  target_identifier: string;
  category: string;
  trust_score: number;
  verdict: VerdictType;
  verdict_badge_color: 'emerald' | 'amber' | 'orange' | 'red';
  confidence_percentage: number;
  executive_summary: string;
  key_concerns: string[];
  immediate_actions: string[];
  created_at: string;
  scam_risk: number;
  privacy_index: number;
  contract_fairness: number;
  dark_pattern_severity: number;
  credibility_index: number;
  scam_analysis?: ScamAgentOutput;
  privacy_analysis?: PrivacyAgentOutput;
  contract_analysis?: ContractAgentOutput;
  dark_pattern_analysis?: DarkPatternAgentOutput;
  credibility_analysis?: CredibilityAgentOutput;
  threat_analysis?: ThreatAgentOutput;
}

export interface AriaRecommendation {
  direct_answer: string;
  key_concerns: string[];
  positive_indicators: string[];
  actionable_recommendation: string;
  confidence_percentage: number;
  risk_level: VerdictType;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  structured_advice?: AriaRecommendation;
  timestamp: string;
}

export interface SecurityMetrics {
  total_entities_analyzed: number;
  scams_averted: number;
  average_trust_score: number;
  safe_verified_count: number;
  active_protection_nodes: number;
  agent_fleet_status: string;
}
