import re
from typing import Dict, Any
from app.agents.base_agent import BaseAgent
from app.models.agent_models import ScamAgentOutput

SCAM_AGENT_SYSTEM_PROMPT = """You are a scam detection specialist inside the TrustAI defense architecture.
Analyze:
- URLs and domains
- Job offers and employment propositions
- Email content and communication logs
- Payment / transaction requests

Find:
- scam indicators
- suspicious claims
- unrealistic promises
- urgency tactics
- upfront fee demands, crypto/gift card requests, or spoofed brands

Output structured JSON:
{
  "risk_score": integer (0 to 100, where 100 is extreme scam),
  "verdict": "SAFE" | "CAUTION" | "HIGH RISK" | "SCAM LIKELY",
  "reasons": ["string"],
  "evidence": ["string"],
  "scam_indicators": ["string"],
  "suspicious_claims": ["string"],
  "urgency_tactics": ["string"],
  "recommendations": ["string"]
}
"""

class ScamDetectionAgent(BaseAgent):
    def __init__(self):
        super().__init__("Scam Detection Agent", SCAM_AGENT_SYSTEM_PROMPT)

    async def analyze(self, content: str, url: str = "", metadata: Dict[str, Any] = None) -> ScamAgentOutput:
        metadata = metadata or {}
        combined_input = f"URL: {url}\nMETADATA: {metadata}\nCONTENT:\n{content}"
        
        gemini_result = await self.call_gemini(
            prompt=combined_input,
            schema_description="""{
                "risk_score": 0-100,
                "verdict": "SAFE" | "CAUTION" | "HIGH RISK" | "SCAM LIKELY",
                "reasons": [], "evidence": [], "scam_indicators": [],
                "suspicious_claims": [], "urgency_tactics": [], "recommendations": []
            }"""
        )

        if gemini_result and "risk_score" in gemini_result:
            return ScamAgentOutput(
                agent_name=self.agent_name,
                risk_score=int(gemini_result.get("risk_score", 50)),
                verdict=gemini_result.get("verdict", "CAUTION"),
                reasons=gemini_result.get("reasons", []),
                evidence=gemini_result.get("evidence", []),
                scam_indicators=gemini_result.get("scam_indicators", []),
                suspicious_claims=gemini_result.get("suspicious_claims", []),
                urgency_tactics=gemini_result.get("urgency_tactics", []),
                recommendations=gemini_result.get("recommendations", [])
            )

        # High-precision heuristic fallback engine
        return self._heuristic_analysis(content, url, metadata)

    def _heuristic_analysis(self, text: str, url: str, metadata: Dict[str, Any]) -> ScamAgentOutput:
        text_lower = text.lower()
        score = 10
        reasons = []
        evidence = []
        scam_indicators = []
        suspicious_claims = []
        urgency_tactics = []
        recommendations = ["Always verify domain WHOIS and corporate registry before submitting sensitive details."]

        # High risk flags
        if any(w in text_lower for w in ["security deposit", "registration fee", "training fee", "laptop deposit", "refundable deposit"]):
            score += 45
            reasons.append("Demands upfront monetary deposit or registration fee")
            evidence.append("Explicit request for upfront deposit/fee before commencement")
            scam_indicators.append("Advance-fee fraud indicator")
            recommendations.insert(0, "NEVER pay upfront fees or equipment deposits for any legitimate job or internship.")

        if any(w in text_lower for w in ["telegram", "whatsapp only", "dm on telegram", "@t.me", "wa.me"]):
            score += 25
            reasons.append("Directs candidate to encrypted messaging apps (Telegram/WhatsApp) instead of corporate ATS")
            evidence.append("Recruitment routing via informal messaging platforms")
            scam_indicators.append("Untraceable communication channel")

        if any(w in text_lower for w in ["guaranteed return", "earn $500/day", "earn $1000/day", "no experience required $", "quick cash", "100% guaranteed"]):
            score += 30
            suspicious_claims.append("Unrealistically high remuneration for entry-level tasks")
            reasons.append("Unrealistic promises of guaranteed high income with minimal effort")
            scam_indicators.append("Bait-and-switch income lure")

        if any(w in text_lower for w in ["act now", "offer expires in 2 hours", "immediate response required", "only 3 spots left today"]):
            score += 20
            urgency_tactics.append("Manufactured artificial time pressure")
            reasons.append("High-pressure psychological urgency tactics detected")

        if any(w in text_lower for w in ["crypto", "usdt", "bitcoin", "gift card", "western union", "wire transfer"]):
            score += 35
            scam_indicators.append("Irreversible payment rail requested")
            reasons.append("Demands untraceable cryptocurrency or gift card transactions")

        score = min(max(score, 5), 98)

        if score >= 75:
            verdict = "SCAM LIKELY"
        elif score >= 50:
            verdict = "HIGH RISK"
        elif score >= 25:
            verdict = "CAUTION"
        else:
            verdict = "SAFE"
            reasons.append("No obvious advance-fee or high-pressure scam indicators detected in provided text.")
            recommendations.append("Continue standard due diligence.")

        return ScamAgentOutput(
            agent_name=self.agent_name,
            risk_score=score,
            verdict=verdict,
            reasons=reasons,
            evidence=evidence if evidence else ["Standard pattern evaluation of submitted copy"],
            scam_indicators=scam_indicators,
            suspicious_claims=suspicious_claims,
            urgency_tactics=urgency_tactics,
            recommendations=recommendations
        )
