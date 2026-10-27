from typing import Dict, Any, List
from app.agents.base_agent import BaseAgent
from app.models.agent_models import ThreatAgentOutput

THREAT_SYSTEM_PROMPT = """You are a cyber threat intelligence and phishing signature analyst inside TrustAI.
Review domain names, URLs, IP patterns, and message headers against known cyber threat vectors.
Detect:
- Homograph and punycode attacks (e.g., paypa1.com, g00gle.com)
- Known phishing kit footprints, open-redirect chains, and credential-harvesting subdomains
- Suspicious URL path structures (e.g., /wp-admin/includes/login.php?verify=1)

Return structured JSON:
{
  "threat_level": "CLEAN" | "SUSPICIOUS" | "MALICIOUS" | "PHISHING",
  "threat_score": integer (0 to 100, where 100 is active dangerous malware/phishing),
  "matched_blacklist": boolean,
  "known_signatures": ["string"],
  "phishing_indicators": ["string"],
  "malicious_heuristics": ["string"]
}
"""

class ThreatIntelligenceAgent(BaseAgent):
    def __init__(self):
        super().__init__("Threat Intelligence Agent", THREAT_SYSTEM_PROMPT)

    async def analyze(self, target_url: str, content: str = "") -> ThreatAgentOutput:
        gemini_result = await self.call_gemini(
            prompt=f"TARGET: {target_url}\nCONTENT DUMP:\n{content[:2000]}",
            schema_description="""{
                "threat_level": "CLEAN"|"SUSPICIOUS"|"MALICIOUS"|"PHISHING",
                "threat_score": 0-100,
                "matched_blacklist": false,
                "known_signatures": [],
                "phishing_indicators": [],
                "malicious_heuristics": []
            }"""
        )

        if gemini_result and "threat_score" in gemini_result:
            return ThreatAgentOutput(
                agent_name=self.agent_name,
                threat_level=gemini_result.get("threat_level", "CLEAN"),
                threat_score=int(gemini_result.get("threat_score", 10)),
                matched_blacklist=bool(gemini_result.get("matched_blacklist", False)),
                known_signatures=gemini_result.get("known_signatures", []),
                phishing_indicators=gemini_result.get("phishing_indicators", []),
                malicious_heuristics=gemini_result.get("malicious_heuristics", [])
            )

        return self._heuristic_analysis(target_url, content)

    def _heuristic_analysis(self, url: str, content: str) -> ThreatAgentOutput:
        url_lower = url.lower()
        threat_score = 5
        level = "CLEAN"
        phishing = []
        heuristics = []
        signatures = []
        matched = False

        if any(brand in url_lower for brand in ["paypal", "apple", "google", "netflix", "microsoft", "chase", "wellsfargo"]) and not any(legit in url_lower for legit in ["paypal.com", "apple.com", "google.com", "netflix.com", "microsoft.com"]):
            threat_score += 70
            phishing.append("High-confidence brand impersonation / credential phishing signature")
            level = "PHISHING"
            matched = True

        if any(kw in url_lower for kw in ["login-security", "verify-account", "update-billing", "wallet-connect", "claim-reward"]):
            threat_score += 40
            heuristics.append("Classic social-engineering credential harvesting path pattern")
            if level != "PHISHING":
                level = "SUSPICIOUS"

        if "@" in url or "%40" in url:
            threat_score += 30
            heuristics.append("Obfuscated HTTP Basic-Auth URL redirect trick detected")

        threat_score = min(threat_score, 98)

        if threat_score >= 70:
            level = "PHISHING" if phishing else "MALICIOUS"
        elif threat_score >= 35:
            level = "SUSPICIOUS"
        else:
            level = "CLEAN"

        return ThreatAgentOutput(
            agent_name=self.agent_name,
            threat_level=level,
            threat_score=threat_score,
            matched_blacklist=matched,
            known_signatures=signatures,
            phishing_indicators=phishing,
            malicious_heuristics=heuristics
        )
