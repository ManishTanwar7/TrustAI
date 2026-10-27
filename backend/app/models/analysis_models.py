from typing import List, Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field
from app.models.agent_models import (
    ScamAgentOutput,
    PrivacyAgentOutput,
    ContractAgentOutput,
    DarkPatternAgentOutput,
    CredibilityAgentOutput,
    ThreatAgentOutput
)

class UniversalAnalyzeRequest(BaseModel):
    url: Optional[str] = None
    text_content: Optional[str] = None
    category: str = Field(
        default="general",
        description="general, internship, contract, privacy, website"
    )
    metadata: Optional[Dict[str, Any]] = None

class InternshipVerifyRequest(BaseModel):
    company_name: str
    job_title: str
    offer_letter_text: Optional[str] = None
    recruiter_email: Optional[str] = None
    recruiter_channel: Optional[str] = Field(default=None, description="Email, Telegram, WhatsApp, LinkedIn")
    stipend_claimed: Optional[str] = None
    deposit_required: Optional[bool] = False
    deposit_amount: Optional[str] = None
    website_url: Optional[str] = None

class ContractAnalyzeRequest(BaseModel):
    contract_title: str
    contract_type: str = Field(description="Employment, Freelance, NDA, Terms of Service, Lease, SaaS")
    contract_text: str
    user_role: Optional[str] = Field(default="Signer / Service Provider", description="Contractor, Employee, Consumer")

class PrivacyAnalyzeRequest(BaseModel):
    service_name: str
    privacy_policy_url: Optional[str] = None
    privacy_policy_text: Optional[str] = None

class DarkPatternScanRequest(BaseModel):
    url: str
    dom_text_snapshot: Optional[str] = None
    detected_elements: Optional[List[Dict[str, Any]]] = None

class ChiefVerdict(BaseModel):
    scan_id: str
    target_identifier: str
    category: str
    trust_score: int = Field(ge=0, le=100, description="0 = dangerous scam, 100 = completely trustworthy")
    verdict: str = Field(description="SAFE, CAUTION, HIGH RISK, SCAM LIKELY")
    verdict_badge_color: str = Field(description="emerald, amber, orange, red")
    confidence_percentage: int = Field(ge=0, le=100)
    executive_summary: str
    key_concerns: List[str]
    immediate_actions: List[str]
    created_at: str
    
    # Sub-scores breakdown
    scam_risk: int
    privacy_index: int
    contract_fairness: int
    dark_pattern_severity: int
    credibility_index: int
    
    # Detailed agent reports
    scam_analysis: Optional[ScamAgentOutput] = None
    privacy_analysis: Optional[PrivacyAgentOutput] = None
    contract_analysis: Optional[ContractAgentOutput] = None
    dark_pattern_analysis: Optional[DarkPatternAgentOutput] = None
    credibility_analysis: Optional[CredibilityAgentOutput] = None
    threat_analysis: Optional[ThreatAgentOutput] = None
