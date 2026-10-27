from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class ChatMessage(BaseModel):
    role: str = Field(description="user or assistant or system")
    content: str
    timestamp: Optional[str] = None

class ChatRequest(BaseModel):
    message: str
    conversation_id: Optional[str] = None
    context_scan_id: Optional[str] = None
    attached_context: Optional[Dict[str, Any]] = None
    history: Optional[List[ChatMessage]] = None

class AriaRecommendation(BaseModel):
    direct_answer: str
    key_concerns: List[str] = Field(default_factory=list)
    positive_indicators: List[str] = Field(default_factory=list)
    actionable_recommendation: str
    confidence_percentage: int = Field(ge=0, le=100)
    risk_level: str = Field(description="SAFE, CAUTION, HIGH RISK, SCAM LIKELY")

class ChatResponse(BaseModel):
    conversation_id: str
    reply_text: str
    structured_advice: Optional[AriaRecommendation] = None
    suggested_follow_ups: List[str] = Field(default_factory=list)
    timestamp: str
