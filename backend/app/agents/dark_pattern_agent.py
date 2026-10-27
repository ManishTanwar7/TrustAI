from typing import Dict, Any, List
from app.agents.base_agent import BaseAgent
from app.models.agent_models import DarkPatternAgentOutput

DARK_PATTERN_SYSTEM_PROMPT = """You are a UX ethics and deceptive design auditor inside TrustAI.
Analyze website text, DOM elements, and user experience flows.
Detect:
- false urgency (fake countdown timers, "Only 1 item left in stock!", "Someone in Ohio just bought this")
- forced continuity (requiring credit card for free trials with zero-click billing traps)
- hidden cancellation (obscured unsubscribe buttons, multi-step cancellation mazes)
- misleading pricing (drip pricing, undisclosed service surcharges at checkout)
- confirmshaming ("No thanks, I prefer paying full price", "I don't care about security")
- sneaky basket / pre-selected add-ons

Return structured JSON:
{
  "dark_pattern_score": integer (0 to 100, where 100 = aggressive manipulative design),
  "detected_patterns": ["string"],
  "false_urgency": ["string"],
  "forced_continuity": ["string"],
  "hidden_cancellation": ["string"],
  "misleading_pricing": ["string"],
  "confirmshaming": ["string"],
  "evidence": ["string"],
  "explanation": "string"
}
"""

class DarkPatternAgent(BaseAgent):
    def __init__(self):
        super().__init__("Dark Pattern Agent", DARK_PATTERN_SYSTEM_PROMPT)

    async def analyze(self, dom_or_text: str, url: str = "") -> DarkPatternAgentOutput:
        gemini_result = await self.call_gemini(
            prompt=f"TARGET URL: {url}\nPAGE CONTENT / DOM SNIPPET:\n{dom_or_text}",
            schema_description="""{
                "dark_pattern_score": 0-100,
                "detected_patterns": [],
                "false_urgency": [], "forced_continuity": [],
                "hidden_cancellation": [], "misleading_pricing": [],
                "confirmshaming": [], "evidence": [], "explanation": ""
            }"""
        )

        if gemini_result and "dark_pattern_score" in gemini_result:
            return DarkPatternAgentOutput(
                agent_name=self.agent_name,
                dark_pattern_score=int(gemini_result.get("dark_pattern_score", 20)),
                detected_patterns=gemini_result.get("detected_patterns", []),
                false_urgency=gemini_result.get("false_urgency", []),
                forced_continuity=gemini_result.get("forced_continuity", []),
                hidden_cancellation=gemini_result.get("hidden_cancellation", []),
                misleading_pricing=gemini_result.get("misleading_pricing", []),
                confirmshaming=gemini_result.get("confirmshaming", []),
                evidence=gemini_result.get("evidence", []),
                explanation=gemini_result.get("explanation", "UX ethics audit completed.")
            )

        return self._heuristic_analysis(dom_or_text, url)

    def _heuristic_analysis(self, text: str, url: str) -> DarkPatternAgentOutput:
        text_lower = text.lower()
        score = 5
        detected = []
        urgency = []
        continuity = []
        cancellation = []
        pricing = []
        shaming = []
        evidence = []

        if any(w in text_lower for w in ["hurry! only", "seconds left", "deal expires in", "people are viewing this"]):
            score += 25
            detected.append("False Urgency / Social Proof Pressure")
            urgency.append("Manufactured artificial time limit or scarcity signal")
            evidence.append("Trigger text: 'Hurry / Deal expires soon / Only X remaining'")

        if any(w in text_lower for w in ["no, i like paying more", "no thanks, i hate discounts", "no, i do not want to save"]):
            score += 25
            detected.append("Confirmshaming")
            shaming.append("Emotional manipulation designed to induce guilt when declining")
            evidence.append("Guilt-inducing opt-out phrase")

        if any(w in text_lower for w in ["call us to cancel", "cancellation by written letter only", "cannot cancel online"]):
            score += 30
            detected.append("Roach Motel / Hidden Cancellation")
            cancellation.append("Easy sign-up but deliberate friction on account termination")
            evidence.append("Requires phone call or postal letter to cancel digital subscription")

        if any(w in text_lower for w in ["processing fee added at checkout", "mandatory handling fee", "drip pricing"]):
            score += 20
            detected.append("Hidden Fees / Drip Pricing")
            pricing.append("Additional compulsory surcharges not shown in base price")

        if any(w in text_lower for w in ["credit card required for free trial", "renews at standard rate of $"]):
            score += 15
            detected.append("Forced Continuity")
            continuity.append("Frictionless trial entry tied to automated billing")

        score = min(max(score, 5), 95)

        explanation = (
            f"UX audit detected {len(detected)} manipulative design pattern(s). "
            f"Overall manipulation score: {score}/100."
        ) if detected else "No prominent deceptive UX or manipulative patterns detected on page."

        return DarkPatternAgentOutput(
            agent_name=self.agent_name,
            dark_pattern_score=score,
            detected_patterns=detected,
            false_urgency=urgency,
            forced_continuity=continuity,
            hidden_cancellation=cancellation,
            misleading_pricing=pricing,
            confirmshaming=shaming,
            evidence=evidence if evidence else ["Standard interface review"],
            explanation=explanation
        )
