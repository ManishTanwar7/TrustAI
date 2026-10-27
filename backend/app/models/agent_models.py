from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class AgentFinding(BaseModel):
    title: str
    severity: str = Field(description="low, medium, high, critical")
    description: str
    evidence: Optional[str] = None

class ScamAgentOutput(BaseModel):
    agent_name: str = "Scam Detection Agent"
    risk_score: int = Field(ge=0, le=100, description="0 = safe, 100 = blatant scam")
    verdict: str = Field(description="SAFE, CAUTION, HIGH RISK, SCAM LIKELY")
    reasons: List[str]
    evidence: List[str]
    scam_indicators: List[str]
    suspicious_claims: List[str]
    urgency_tactics: List[str]
    recommendations: List[str]

class PrivacyAgentOutput(BaseModel):
    agent_name: str = "Privacy Analysis Agent"
    privacy_score: int = Field(ge=0, le=100, description="100 = respects privacy, 0 = privacy invasion")
    risk_level: str = Field(description="LOW, MODERATE, HIGH, CRITICAL")
    high_risk_areas: List[str]
    data_collection_practices: List[str]
    third_party_sharing: List[str]
    tracking_technologies: List[str]
    unnecessary_permissions: List[str]
    user_friendly_summary: str

class ContractAgentOutput(BaseModel):
    agent_name: str = "Contract Intelligence Agent"
    contract_risk_score: int = Field(ge=0, le=100, description="0 = balanced, 100 = predatory")
    verdict: str = Field(description="BALANCED, MINOR CONCERNS, UNFAVORABLE, PREDATORY")
    predatory_clauses: List[Dict[str, str]] = Field(default_factory=list)
    hidden_liabilities: List[str] = Field(default_factory=list)
    cancellation_traps: List[str] = Field(default_factory=list)
    arbitration_lockin: bool = False
    favorable_clauses: List[str] = Field(default_factory=list)
    summary: str

class DarkPatternAgentOutput(BaseModel):
    agent_name: str = "Dark Pattern Agent"
    dark_pattern_score: int = Field(ge=0, le=100, description="0 = ethical UX, 100 = malicious manipulation")
    detected_patterns: List[str]
    false_urgency: List[str] = Field(default_factory=list)
    forced_continuity: List[str] = Field(default_factory=list)
    hidden_cancellation: List[str] = Field(default_factory=list)
    misleading_pricing: List[str] = Field(default_factory=list)
    confirmshaming: List[str] = Field(default_factory=list)
    evidence: List[str] = Field(default_factory=list)
    explanation: str

class CredibilityAgentOutput(BaseModel):
    agent_name: str = "Credibility Verification Agent"
    credibility_score: int = Field(ge=0, le=100, description="0 = fake/unregistered, 100 = verified legitimate")
    is_corporate_registered: bool
    domain_age_days: Optional[int] = None
    ssl_valid: bool = True
    contact_transparency: str = Field(description="High, Moderate, Low, Non-existent")
    impersonation_risk: str = Field(description="None, Suspected, Confirmed")
    findings: List[str]

class ThreatAgentOutput(BaseModel):
    agent_name: str = "Threat Intelligence Agent"
    threat_level: str = Field(description="CLEAN, SUSPICIOUS, MALICIOUS, PHISHING")
    threat_score: int = Field(ge=0, le=100)
    matched_blacklist: bool = False
    known_signatures: List[str] = Field(default_factory=list)
    phishing_indicators: List[str] = Field(default_factory=list)
    malicious_heuristics: List[str] = Field(default_factory=list)
