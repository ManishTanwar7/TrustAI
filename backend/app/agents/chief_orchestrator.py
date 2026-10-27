import asyncio
import uuid
from datetime import datetime, timezone
from typing import Dict, Any, List, Optional
from app.agents.base_agent import BaseAgent
from app.agents.scam_agent import ScamDetectionAgent
from app.agents.privacy_agent import PrivacyAnalysisAgent
from app.agents.contract_agent import ContractAnalysisAgent
from app.agents.dark_pattern_agent import DarkPatternAgent
from app.agents.credibility_agent import CredibilityAgent
from app.agents.threat_agent import ThreatIntelligenceAgent
from app.models.analysis_models import ChiefVerdict
from app.models.agent_models import (
    ScamAgentOutput, PrivacyAgentOutput, ContractAgentOutput,
    DarkPatternAgentOutput, CredibilityAgentOutput, ThreatAgentOutput
)

CHIEF_AGENT_SYSTEM_PROMPT = """You are the TrustAI Chief Decision Agent.
You will receive outputs from:
- Scam Agent
- Privacy Agent
- Contract Agent
- Dark Pattern Agent
- Credibility Agent
- Threat Intelligence Agent

Your task:
1. Combine findings.
2. Remove duplicates.
3. Calculate Trust Score (0 to 100, where 100 is completely safe and trustworthy, 0 is an active dangerous fraud).
4. Generate Final Verdict: "SAFE", "CAUTION", "HIGH RISK", or "SCAM LIKELY".
5. Provide a concise explanation understandable to everyday users, with bulleted key concerns and immediate actionable steps.

Return structured JSON:
{
  "trust_score": integer (0 to 100),
  "verdict": "SAFE" | "CAUTION" | "HIGH RISK" | "SCAM LIKELY",
  "confidence_percentage": integer (0 to 100),
  "executive_summary": "string",
  "key_concerns": ["string"],
  "immediate_actions": ["string"]
}
"""

class ChiefDecisionOrchestrator(BaseAgent):
    def __init__(self):
        super().__init__("TrustAI Chief Decision Agent", CHIEF_AGENT_SYSTEM_PROMPT)
        self.scam_agent = ScamDetectionAgent()
        self.privacy_agent = PrivacyAnalysisAgent()
        self.contract_agent = ContractAnalysisAgent()
        self.dark_pattern_agent = DarkPatternAgent()
        self.credibility_agent = CredibilityAgent()
        self.threat_agent = ThreatIntelligenceAgent()

    async def run_full_pipeline(
        self,
        identifier: str,
        content: str,
        category: str = "general",
        metadata: Optional[Dict[str, Any]] = None
    ) -> ChiefVerdict:
        metadata = metadata or {}
        scan_id = f"scan_{uuid.uuid4().hex[:12]}"
        now_iso = datetime.now(timezone.utc).isoformat()

        # Execute specialized agents concurrently in parallel
        scam_task = self.scam_agent.analyze(content, url=identifier if "http" in identifier else "", metadata=metadata)
        privacy_task = self.privacy_agent.analyze(content, service_name=metadata.get("company_name", identifier))
        contract_task = self.contract_agent.analyze(content, contract_type=metadata.get("contract_type", "Terms / Offer"))
        dark_pattern_task = self.dark_pattern_agent.analyze(content, url=identifier)
        credibility_task = self.credibility_agent.analyze(
            domain_or_text=identifier,
            company_name=metadata.get("company_name", ""),
            email=metadata.get("recruiter_email", "")
        )
        threat_task = self.threat_agent.analyze(target_url=identifier, content=content)

        (
            scam_res,
            privacy_res,
            contract_res,
            dark_pattern_res,
            credibility_res,
            threat_res
        ) = await asyncio.gather(
            scam_task, privacy_task, contract_task,
            dark_pattern_task, credibility_task, threat_task
        )

        # Synthesize with Chief Agent prompt via Gemini
        chief_prompt = f"""
TARGET: {identifier}
CATEGORY: {category}
METADATA: {metadata}

SPECIALIZED AGENT FINDINGS:
1. Scam Agent:
   - Risk Score: {scam_res.risk_score}
   - Verdict: {scam_res.verdict}
   - Reasons: {scam_res.reasons}
   - Scam Indicators: {scam_res.scam_indicators}

2. Privacy Agent:
   - Privacy Score: {privacy_res.privacy_score}
   - High Risk Areas: {privacy_res.high_risk_areas}
   - Third-Party Sharing: {privacy_res.third_party_sharing}

3. Contract Intelligence Agent:
   - Contract Risk Score: {contract_res.contract_risk_score}
   - Flagged Clauses: {[p.get('clause') for p in contract_res.predatory_clauses]}
   - Hidden Liabilities: {contract_res.hidden_liabilities}

4. Dark Pattern Agent:
   - Score: {dark_pattern_res.dark_pattern_score}
   - Detected Patterns: {dark_pattern_res.detected_patterns}
   - Evidence: {dark_pattern_res.evidence}

5. Credibility Agent:
   - Credibility Score: {credibility_res.credibility_score}
   - Registered Entity: {credibility_res.is_corporate_registered}
   - Findings: {credibility_res.findings}

6. Threat Intelligence Agent:
   - Threat Level: {threat_res.threat_level}
   - Matched Blacklist: {threat_res.matched_blacklist}
   - Phishing Indicators: {threat_res.phishing_indicators}
"""

        gemini_chief_verdict = await self.call_gemini(
            prompt=chief_prompt,
            schema_description="""{
                "trust_score": 0-100,
                "verdict": "SAFE" | "CAUTION" | "HIGH RISK" | "SCAM LIKELY",
                "confidence_percentage": 0-100,
                "executive_summary": "string",
                "key_concerns": ["string"],
                "immediate_actions": ["string"]
            }"""
        )

        if gemini_chief_verdict and "trust_score" in gemini_chief_verdict:
            trust_score = int(gemini_chief_verdict.get("trust_score", 50))
            verdict_str = gemini_chief_verdict.get("verdict", "CAUTION")
            confidence = int(gemini_chief_verdict.get("confidence_percentage", 88))
            summary = gemini_chief_verdict.get("executive_summary", "")
            key_concerns = gemini_chief_verdict.get("key_concerns", [])
            immediate_actions = gemini_chief_verdict.get("immediate_actions", [])
        else:
            # Deterministic algorithmic synthesis fallback
            (
                trust_score,
                verdict_str,
                confidence,
                summary,
                key_concerns,
                immediate_actions
            ) = self._synthesize_composite(
                scam_res, privacy_res, contract_res,
                dark_pattern_res, credibility_res, threat_res,
                category, metadata
            )

        badge_color_map = {
            "SAFE": "emerald",
            "CAUTION": "amber",
            "HIGH RISK": "orange",
            "SCAM LIKELY": "red"
        }

        return ChiefVerdict(
            scan_id=scan_id,
            target_identifier=identifier,
            category=category,
            trust_score=trust_score,
            verdict=verdict_str,
            verdict_badge_color=badge_color_map.get(verdict_str, "amber"),
            confidence_percentage=confidence,
            executive_summary=summary,
            key_concerns=key_concerns,
            immediate_actions=immediate_actions,
            created_at=now_iso,
            scam_risk=scam_res.risk_score,
            privacy_index=privacy_res.privacy_score,
            contract_fairness=100 - contract_res.contract_risk_score,
            dark_pattern_severity=dark_pattern_res.dark_pattern_score,
            credibility_index=credibility_res.credibility_score,
            scam_analysis=scam_res,
            privacy_analysis=privacy_res,
            contract_analysis=contract_res,
            dark_pattern_analysis=dark_pattern_res,
            credibility_analysis=credibility_res,
            threat_analysis=threat_res
        )

    def _synthesize_composite(
        self,
        scam: ScamAgentOutput,
        privacy: PrivacyAgentOutput,
        contract: ContractAgentOutput,
        dark_pattern: DarkPatternAgentOutput,
        credibility: CredibilityAgentOutput,
        threat: ThreatAgentOutput,
        category: str,
        metadata: Dict[str, Any]
    ):
        # Weighted Trust Calculation: higher is safer (0 to 100)
        # Invert scam risk (0->100), threat score (0->100), dark pattern (0->100), contract risk (0->100)
        scam_safety = 100 - scam.risk_score
        privacy_safety = privacy.privacy_score
        contract_safety = 100 - contract.contract_risk_score
        dark_pattern_safety = 100 - dark_pattern.dark_pattern_score
        credibility_safety = credibility.credibility_score
        threat_safety = 100 - threat.threat_score

        # Category-specific weighting
        if category == "internship":
            composite = (scam_safety * 0.40) + (credibility_safety * 0.35) + (contract_safety * 0.15) + (threat_safety * 0.10)
        elif category == "contract":
            composite = (contract_safety * 0.50) + (credibility_safety * 0.25) + (privacy_safety * 0.15) + (scam_safety * 0.10)
        elif category == "privacy":
            composite = (privacy_safety * 0.55) + (dark_pattern_safety * 0.25) + (credibility_safety * 0.20)
        else:
            composite = (
                (scam_safety * 0.25) +
                (threat_safety * 0.25) +
                (credibility_safety * 0.20) +
                (privacy_safety * 0.15) +
                (dark_pattern_safety * 0.15)
            )

        trust_score = int(round(min(max(composite, 0), 100)))

        # Determine verdict
        if threat.threat_level in ["PHISHING", "MALICIOUS"] or scam.risk_score >= 70 or metadata.get("deposit_required"):
            verdict = "SCAM LIKELY"
            confidence = 94
        elif trust_score < 45 or scam.risk_score >= 50 or contract.contract_risk_score >= 70:
            verdict = "HIGH RISK"
            confidence = 89
        elif trust_score < 75 or dark_pattern.dark_pattern_score >= 40:
            verdict = "CAUTION"
            confidence = 84
        else:
            verdict = "SAFE"
            confidence = 92

        # Combine concerns and deduplicate
        all_concerns = []
        all_concerns.extend(scam.reasons)
        all_concerns.extend(credibility.findings)
        all_concerns.extend(privacy.high_risk_areas)
        all_concerns.extend([c.get("risk", "") for c in contract.predatory_clauses if isinstance(c, dict)])
        all_concerns.extend(dark_pattern.detected_patterns)

        seen = set()
        deduped_concerns = []
        for c in all_concerns:
            if c and c.lower() not in seen:
                seen.add(c.lower())
                deduped_concerns.append(c)

        key_concerns = deduped_concerns[:4]

        # Immediate actions
        immediate_actions = []
        if verdict == "SCAM LIKELY":
            immediate_actions.append("Do NOT transfer any money, registration deposit, or share bank/identity papers.")
            immediate_actions.append("Report the recruiter or domain immediately and cease all communication.")
        elif verdict == "HIGH RISK":
            immediate_actions.append("Conduct direct out-of-band verification via official public corporate phone or registrar.")
            immediate_actions.append("Require redlining of flagged predatory terms prior to signing.")
        elif verdict == "CAUTION":
            immediate_actions.append("Proceed with awareness; review privacy disclosures and reject pre-checked marketing toggles.")
        else:
            immediate_actions.append("Entity exhibits standard safety markers. Safe to proceed following standard prudence.")

        summary = (
            f"TrustAI Multi-Agent consensus determined a Trust Score of {trust_score}/100 with a verdict of {verdict}. "
            + (f"Critical flags were raised by {', '.join([c for c in key_concerns[:2]])}." if key_concerns else "No critical security risks identified.")
        )

        return trust_score, verdict, confidence, summary, key_concerns, immediate_actions
