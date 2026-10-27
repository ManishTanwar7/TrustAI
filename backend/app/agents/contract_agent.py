from typing import Dict, Any, List
from app.agents.base_agent import BaseAgent
from app.models.agent_models import ContractAgentOutput

CONTRACT_AGENT_SYSTEM_PROMPT = """You are a legal intelligence and contract auditor inside TrustAI.
Review agreements, employment offers, freelance statements of work, NDAs, and consumer service terms.
Detect:
- Unilateral alteration rights ("We may alter these terms without notice")
- Mandatory binding arbitration and class-action waivers
- Hidden automatic renewal fees and difficult cancellation procedures
- Over-broad non-compete covenants and total personal assignment of intellectual property
- Asymmetrical indemnification clauses placing total liability onto the user

Return structured JSON:
{
  "contract_risk_score": integer (0 to 100, where 100 is highly predatory),
  "verdict": "BALANCED" | "MINOR CONCERNS" | "UNFAVORABLE" | "PREDATORY",
  "predatory_clauses": [{"clause": "string", "risk": "string", "plain_english": "string"}],
  "hidden_liabilities": ["string"],
  "cancellation_traps": ["string"],
  "arbitration_lockin": boolean,
  "favorable_clauses": ["string"],
  "summary": "string"
}
"""

class ContractAnalysisAgent(BaseAgent):
    def __init__(self):
        super().__init__("Contract Intelligence Agent", CONTRACT_AGENT_SYSTEM_PROMPT)

    async def analyze(self, contract_text: str, contract_type: str = "Agreement", user_role: str = "Signer") -> ContractAgentOutput:
        gemini_result = await self.call_gemini(
            prompt=f"CONTRACT TYPE: {contract_type}\nUSER ROLE: {user_role}\nTEXT:\n{contract_text}",
            schema_description="""{
                "contract_risk_score": 0-100,
                "verdict": "BALANCED"|"MINOR CONCERNS"|"UNFAVORABLE"|"PREDATORY",
                "predatory_clauses": [{"clause":"", "risk":"", "plain_english":""}],
                "hidden_liabilities": [], "cancellation_traps": [],
                "arbitration_lockin": true/false, "favorable_clauses": [],
                "summary": ""
            }"""
        )

        if gemini_result and "contract_risk_score" in gemini_result:
            return ContractAgentOutput(
                agent_name=self.agent_name,
                contract_risk_score=int(gemini_result.get("contract_risk_score", 40)),
                verdict=gemini_result.get("verdict", "MINOR CONCERNS"),
                predatory_clauses=gemini_result.get("predatory_clauses", []),
                hidden_liabilities=gemini_result.get("hidden_liabilities", []),
                cancellation_traps=gemini_result.get("cancellation_traps", []),
                arbitration_lockin=bool(gemini_result.get("arbitration_lockin", False)),
                favorable_clauses=gemini_result.get("favorable_clauses", []),
                summary=gemini_result.get("summary", "Contract assessment completed.")
            )

        return self._heuristic_analysis(contract_text, contract_type, user_role)

    def _heuristic_analysis(self, text: str, ctype: str, role: str) -> ContractAgentOutput:
        text_lower = text.lower()
        risk_score = 20
        predatory = []
        liabilities = []
        traps = []
        favorable = []
        has_arbitration = False

        if any(w in text_lower for w in ["binding arbitration", "class action waiver", "waive all rights to jury trial"]):
            has_arbitration = True
            risk_score += 20
            predatory.append({
                "clause": "Mandatory Arbitration & Class Action Waiver",
                "risk": "Removes your constitutional right to court litigation and group recourse.",
                "plain_english": "If the company wrongs you, you cannot join a class action lawsuit or go to open court; disputes are locked in private arbitration."
            })

        if any(w in text_lower for w in ["indemnify and hold harmless", "defend and hold harmless", "unlimited liability"]):
            risk_score += 25
            liabilities.append("One-way indemnification obligation holding user responsible for company legal expenses")

        if any(w in text_lower for w in ["auto-renew", "automatically renew", "30 days prior written notice to cancel"]):
            risk_score += 15
            traps.append("Subscription/contract auto-renews unless written notice is received inside narrow window")

        if any(w in text_lower for w in ["non-compete", "shall not engage in any competing", "for a period of 2 years"]):
            risk_score += 25
            predatory.append({
                "clause": "Broad Non-Compete Restriction",
                "risk": "Limits your ability to work for other clients or employers in your industry.",
                "plain_english": "Barring you from working in your own field for months or years after departure."
            })

        if any(w in text_lower for w in ["net 30 payment", "prompt payment", "mutual non-disclosure", "limited to fees paid"]):
            risk_score -= 10
            favorable.append("Contains standard mutual protections or limited liability caps")

        risk_score = min(max(risk_score, 10), 95)

        if risk_score >= 70:
            verdict = "PREDATORY"
        elif risk_score >= 50:
            verdict = "UNFAVORABLE"
        elif risk_score >= 30:
            verdict = "MINOR CONCERNS"
        else:
            verdict = "BALANCED"

        summary = f"Assessment of {ctype}: Risk score {risk_score}/100. Verdict: {verdict}. Contains {len(predatory)} flagged clauses."

        return ContractAgentOutput(
            agent_name=self.agent_name,
            contract_risk_score=risk_score,
            verdict=verdict,
            predatory_clauses=predatory,
            hidden_liabilities=liabilities,
            cancellation_traps=traps,
            arbitration_lockin=has_arbitration,
            favorable_clauses=favorable,
            summary=summary
        )
