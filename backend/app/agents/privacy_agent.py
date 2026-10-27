from typing import Dict, Any, List
from app.agents.base_agent import BaseAgent
from app.models.agent_models import PrivacyAgentOutput

PRIVACY_AGENT_SYSTEM_PROMPT = """You are a digital privacy auditor inside TrustAI.
Review:
- Privacy policies
- Terms of service
- App permissions requests
- Cookie and tracker disclosures

Find:
- data collection practices (biometrics, precise geolocation, browsing history)
- third-party data broker sharing and marketing syndication
- tracking technologies (cross-device fingerprints, canvas tracking, invisible pixels)
- unnecessary permissions and over-reaching data retention

Return structured JSON:
{
  "privacy_score": integer (0 to 100, where 100 = best privacy protection, 0 = severe privacy invasion),
  "risk_level": "LOW" | "MODERATE" | "HIGH" | "CRITICAL",
  "high_risk_areas": ["string"],
  "data_collection_practices": ["string"],
  "third_party_sharing": ["string"],
  "tracking_technologies": ["string"],
  "unnecessary_permissions": ["string"],
  "user_friendly_summary": "string"
}
"""

class PrivacyAnalysisAgent(BaseAgent):
    def __init__(self):
        super().__init__("Privacy Analysis Agent", PRIVACY_AGENT_SYSTEM_PROMPT)

    async def analyze(self, policy_text: str, service_name: str = "") -> PrivacyAgentOutput:
        gemini_result = await self.call_gemini(
            prompt=f"SERVICE: {service_name}\nPRIVACY POLICY TEXT:\n{policy_text}",
            schema_description="""{
                "privacy_score": 0-100,
                "risk_level": "LOW"|"MODERATE"|"HIGH"|"CRITICAL",
                "high_risk_areas": [], "data_collection_practices": [],
                "third_party_sharing": [], "tracking_technologies": [],
                "unnecessary_permissions": [], "user_friendly_summary": ""
            }"""
        )

        if gemini_result and "privacy_score" in gemini_result:
            return PrivacyAgentOutput(
                agent_name=self.agent_name,
                privacy_score=int(gemini_result.get("privacy_score", 50)),
                risk_level=gemini_result.get("risk_level", "MODERATE"),
                high_risk_areas=gemini_result.get("high_risk_areas", []),
                data_collection_practices=gemini_result.get("data_collection_practices", []),
                third_party_sharing=gemini_result.get("third_party_sharing", []),
                tracking_technologies=gemini_result.get("tracking_technologies", []),
                unnecessary_permissions=gemini_result.get("unnecessary_permissions", []),
                user_friendly_summary=gemini_result.get("user_friendly_summary", "Privacy analysis completed.")
            )

        return self._heuristic_analysis(policy_text, service_name)

    def _heuristic_analysis(self, text: str, service: str) -> PrivacyAgentOutput:
        text_lower = text.lower()
        score = 85
        high_risk = []
        data_collection = []
        third_party = []
        tracking = []
        permissions = []

        if any(w in text_lower for w in ["sell your personal information", "sell your data", "data brokers"]):
            score -= 35
            high_risk.append("Explicit right reserved to sell or monetize personal data to third parties")
            third_party.append("Data brokers and commercial advertisers")

        if any(w in text_lower for w in ["precise location", "gps", "geolocation at all times", "background location"]):
            score -= 15
            data_collection.append("Continuous precise GPS background location")
            permissions.append("Access to system-level continuous location services")

        if any(w in text_lower for w in ["cross-site tracking", "fingerprinting", "third-party cookies", "beacons"]):
            score -= 15
            tracking.append("Persistent cross-site behavioral tracking and device fingerprinting")

        if any(w in text_lower for w in ["indefinitely", "retain your data perpetually", "no deletion guarantee"]):
            score -= 15
            high_risk.append("Indefinite data retention with ambiguous account erasure procedures")

        if any(w in text_lower for w in ["contacts list", "read sms", "audio recordings", "microphone"]):
            score -= 20
            permissions.append("Broad device permissions (contacts, microphone, or storage)")

        score = max(min(score, 95), 10)

        if score < 40:
            risk = "CRITICAL"
        elif score < 60:
            risk = "HIGH"
        elif score < 80:
            risk = "MODERATE"
        else:
            risk = "LOW"

        summary = (
            f"Review of {service or 'policy'}: Privacy score is {score}/100 ({risk} risk). "
            + ("Warning: Discloses commercial third-party data sharing or extensive tracking." if score < 70 else "Standard commercial data handling with moderate user protections.")
        )

        return PrivacyAgentOutput(
            agent_name=self.agent_name,
            privacy_score=score,
            risk_level=risk,
            high_risk_areas=high_risk if high_risk else ["Standard automated logging and performance cookies"],
            data_collection_practices=data_collection if data_collection else ["Account credentials", "Basic device telemetries"],
            third_party_sharing=third_party if third_party else ["Infrastructure vendors (AWS/Cloudflare) under confidentiality"],
            tracking_technologies=tracking if tracking else ["First-party session cookies"],
            unnecessary_permissions=permissions if permissions else ["No excessive permissions requested"],
            user_friendly_summary=summary
        )
