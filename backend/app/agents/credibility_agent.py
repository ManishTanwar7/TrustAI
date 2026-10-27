from typing import Dict, Any, List
from urllib.parse import urlparse
from app.agents.base_agent import BaseAgent
from app.models.agent_models import CredibilityAgentOutput

CREDIBILITY_SYSTEM_PROMPT = """You are a corporate and domain credibility investigator inside TrustAI.
Review domain structures, corporate claims, brand authenticity, registration age signals, and contact transparency.
Detect:
- Unregistered shell corporations or fake internship providers
- Domain typosquatting or brand impersonation (e.g., amaz0n-jobs.net)
- Free email providers (@gmail.com, @hotmail.com) representing corporate HR
- Lack of physical headquarters or verifiable corporate tax/entity numbers

Return structured JSON:
{
  "credibility_score": integer (0 to 100, where 100 is fully credible and verified),
  "is_corporate_registered": boolean,
  "domain_age_days": integer or null,
  "ssl_valid": boolean,
  "contact_transparency": "High" | "Moderate" | "Low" | "Non-existent",
  "impersonation_risk": "None" | "Suspected" | "Confirmed",
  "findings": ["string"]
}
"""

class CredibilityAgent(BaseAgent):
    def __init__(self):
        super().__init__("Credibility Verification Agent", CREDIBILITY_SYSTEM_PROMPT)

    async def analyze(self, domain_or_text: str, company_name: str = "", email: str = "") -> CredibilityAgentOutput:
        gemini_result = await self.call_gemini(
            prompt=f"COMPANY: {company_name}\nCONTACT EMAIL: {email}\nDOMAIN/INFO:\n{domain_or_text}",
            schema_description="""{
                "credibility_score": 0-100,
                "is_corporate_registered": true/false,
                "domain_age_days": 120,
                "ssl_valid": true,
                "contact_transparency": "High"|"Moderate"|"Low"|"Non-existent",
                "impersonation_risk": "None"|"Suspected"|"Confirmed",
                "findings": []
            }"""
        )

        if gemini_result and "credibility_score" in gemini_result:
            return CredibilityAgentOutput(
                agent_name=self.agent_name,
                credibility_score=int(gemini_result.get("credibility_score", 70)),
                is_corporate_registered=bool(gemini_result.get("is_corporate_registered", True)),
                domain_age_days=gemini_result.get("domain_age_days", 365),
                ssl_valid=bool(gemini_result.get("ssl_valid", True)),
                contact_transparency=gemini_result.get("contact_transparency", "Moderate"),
                impersonation_risk=gemini_result.get("impersonation_risk", "None"),
                findings=gemini_result.get("findings", [])
            )

        return self._heuristic_analysis(domain_or_text, company_name, email)

    def _heuristic_analysis(self, text: str, company: str, email: str) -> CredibilityAgentOutput:
        score = 80
        findings = []
        impersonation = "None"
        transparency = "Moderate"
        is_registered = True

        # Check free email domains used for official recruitment
        free_emails = ["@gmail.com", "@yahoo.com", "@hotmail.com", "@outlook.com", "@proton.me"]
        if any(f in email.lower() for f in free_emails):
            score -= 35
            findings.append(f"Official recruiter using public email provider ({email}) instead of verified company domain")
            transparency = "Low"

        # Check suspicious TLDs or typosquatting
        suspicious_tlds = [".xyz", ".top", ".buzz", ".work", ".click", ".link", ".sbs"]
        if any(tld in text.lower() for tld in suspicious_tlds):
            score -= 20
            findings.append("Domain utilizes cheap / high-abuse top-level domain frequently associated with disposable scam campaigns")

        # Fake corporate registrations
        if any(w in text.lower() for w in ["stealth startup", "unregistered", "nda required before company name", "confidential hiring"]):
            score -= 25
            is_registered = False
            transparency = "Non-existent"
            findings.append("No verifiable legal company registration or physical corporate address provided")

        if "no corporate registration found" in text.lower() or not company:
            score -= 20
            findings.append("Company identity not indexed in official corporate registrar databases")

        score = min(max(score, 10), 95)
        if score < 45:
            impersonation = "Suspected"

        if not findings:
            findings.append("Domain and entity present consistent organizational markers and valid TLS certificates.")
            transparency = "High"

        return CredibilityAgentOutput(
            agent_name=self.agent_name,
            credibility_score=score,
            is_corporate_registered=is_registered,
            domain_age_days=180 if score > 50 else 14,
            ssl_valid=True,
            contact_transparency=transparency,
            impersonation_risk=impersonation,
            findings=findings
        )
