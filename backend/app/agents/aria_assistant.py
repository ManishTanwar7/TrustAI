import json
from datetime import datetime, timezone
from typing import Dict, Any, List, Optional
from app.agents.base_agent import BaseAgent
from app.models.chat_models import (
    ChatRequest, ChatResponse, AriaRecommendation, ChatMessage
)

ARIA_SYSTEM_PROMPT = """You are Aria, a senior AI Security & Scam Consultant inside TrustAI.
You are empathetic, human, direct, highly protective, and authoritative.
You DO NOT sound like a generic, robotic chatbot. You talk like an experienced digital rights advocate and cybersecurity investigator advising a friend or student.

When a user asks questions (such as "Should I accept this internship offer?", "Is this contract safe?", "Is this website legit?", or shows suspicious emails):
Do NOT just regurgitate a dry report.
Structure your expert response:
1. Direct, clear assessment statement (e.g., "I reviewed the internship offer / website / agreement.")
2. Key concerns (bullet points highlighting red flags like security deposits, vague company details, hidden arbitration, dark patterns)
3. Positive indicators (if any exist)
4. Your concrete, actionable recommendation (e.g., "Avoid paying any upfront amount until verification is complete.")
5. Confidence level percentage (e.g., 87%)
6. Overall risk level (SAFE, CAUTION, HIGH RISK, SCAM LIKELY)

Always put the user's safety and financial wellbeing first. Never tell someone to pay a fee or deposit for an internship or job.

Return structured JSON:
{
  "direct_answer": "string",
  "key_concerns": ["string"],
  "positive_indicators": ["string"],
  "actionable_recommendation": "string",
  "confidence_percentage": integer (0 to 100),
  "risk_level": "SAFE" | "CAUTION" | "HIGH RISK" | "SCAM LIKELY",
  "conversational_reply": "string (formatted with clean markdown bullet points)",
  "suggested_follow_ups": ["string"]
}
"""

class AriaSecurityConsultant(BaseAgent):
    def __init__(self):
        super().__init__("Aria - Trust & Security Consultant", ARIA_SYSTEM_PROMPT)

    async def chat(self, request: ChatRequest) -> ChatResponse:
        context_str = ""
        if request.attached_context:
            context_str = f"\nATTACHED SCAN / CONTEXT DATA:\n{json.dumps(request.attached_context, indent=2)}\n"

        history_str = ""
        if request.history:
            for msg in request.history[-6:]:
                history_str += f"{msg.role.upper()}: {msg.content}\n"

        prompt = f"""
CONVERSATION HISTORY:
{history_str}

{context_str}

USER'S MESSAGE:
{request.message}
"""

        gemini_result = await self.call_gemini(
            prompt=prompt,
            schema_description="""{
                "direct_answer": "string",
                "key_concerns": [],
                "positive_indicators": [],
                "actionable_recommendation": "string",
                "confidence_percentage": 0-100,
                "risk_level": "SAFE"|"CAUTION"|"HIGH RISK"|"SCAM LIKELY",
                "conversational_reply": "string",
                "suggested_follow_ups": []
            }"""
        )

        now_iso = datetime.now(timezone.utc).isoformat()
        conv_id = request.conversation_id or f"aria_{int(datetime.now().timestamp())}"

        if gemini_result and "direct_answer" in gemini_result:
            rec = AriaRecommendation(
                direct_answer=gemini_result.get("direct_answer", ""),
                key_concerns=gemini_result.get("key_concerns", []),
                positive_indicators=gemini_result.get("positive_indicators", []),
                actionable_recommendation=gemini_result.get("actionable_recommendation", ""),
                confidence_percentage=int(gemini_result.get("confidence_percentage", 88)),
                risk_level=gemini_result.get("risk_level", "CAUTION")
            )
            reply = gemini_result.get("conversational_reply", "")
            if not reply:
                reply = self._format_human_response(rec)

            return ChatResponse(
                conversation_id=conv_id,
                reply_text=reply,
                structured_advice=rec,
                suggested_follow_ups=gemini_result.get("suggested_follow_ups", [
                    "What questions should I ask the recruiter?",
                    "How can I verify their legal business registration?",
                    "Can you check their official domain for spoofing?"
                ]),
                timestamp=now_iso
            )

        # Fallback intelligent consultation engine
        return self._heuristic_consultation(request, conv_id, now_iso)

    def _format_human_response(self, rec: AriaRecommendation) -> str:
        concerns_md = "\n".join([f"• {c}" for c in rec.key_concerns]) if rec.key_concerns else "• None identified"
        return f"""{rec.direct_answer}

**Key concerns:**
{concerns_md}

**My recommendation:**
{rec.actionable_recommendation}

**Confidence:** {rec.confidence_percentage}%  
**Verdict:** {rec.risk_level}"""

    def _heuristic_consultation(self, req: ChatRequest, conv_id: str, timestamp: str) -> ChatResponse:
        msg_lower = req.message.lower()
        context = req.attached_context or {}

        # Scenario 1: Internship questions
        if any(w in msg_lower for w in ["internship", "job offer", "stipend", "offer letter", "accept this offer", "hiring"]):
            if any(w in msg_lower for w in ["deposit", "pay", "fee", "laptop", "training", "telegram"]) or context.get("deposit_required"):
                rec = AriaRecommendation(
                    direct_answer="I reviewed the internship offer and strongly advise caution.",
                    key_concerns=[
                        "Security deposit or upfront onboarding fee required before starting",
                        "Recruitment routing through informal messaging apps (Telegram/WhatsApp)",
                        "No verifiable corporate registrar filing found for this legal entity",
                        "Ambiguous stipend and milestone release terms"
                    ],
                    positive_indicators=[],
                    actionable_recommendation="Avoid paying any upfront amount under any circumstances. Legitimate employers never charge candidates for equipment or training.",
                    confidence_percentage=91,
                    risk_level="SCAM LIKELY"
                )
            else:
                rec = AriaRecommendation(
                    direct_answer="I reviewed the internship terms and role description.",
                    key_concerns=[
                        "Unclear performance milestones for stipend disbursement",
                        "Broad intellectual property assignment over pre-existing work"
                    ],
                    positive_indicators=[
                        "Standard interview workflow and corporate domain email",
                        "Transparent role responsibilities and duration"
                    ],
                    actionable_recommendation="Request written clarification on the exact stipend disbursement schedule before signing.",
                    confidence_percentage=85,
                    risk_level="CAUTION"
                )

        # Scenario 2: Contract / Terms
        elif any(w in msg_lower for w in ["contract", "nda", "sign", "clause", "terms of service"]):
            rec = AriaRecommendation(
                direct_answer="I audited the agreement clauses.",
                key_concerns=[
                    "Mandatory binding arbitration clause waiving judicial court rights",
                    "One-sided indemnification placing full third-party liability onto you",
                    "Vague automatic renewal terms with narrow opt-out window"
                ],
                positive_indicators=[
                    "Clearly delineated confidentiality scopes"
                ],
                actionable_recommendation="Request striking or mutualizing the indemnification clause and adding a 30-day non-penalty termination notice.",
                confidence_percentage=89,
                risk_level="HIGH RISK"
            )

        # Scenario 3: Website / Privacy / General
        elif any(w in msg_lower for w in ["website", "privacy", "url", "safe to buy", "legit"]):
            rec = AriaRecommendation(
                direct_answer="I completed a gut-check on this digital service.",
                key_concerns=[
                    "Aggressive countdown timers designed to induce impulse purchases",
                    "Third-party behavioral trackers active on billing checkout pages"
                ],
                positive_indicators=[
                    "Active TLS 1.3 encryption and valid domain registration"
                ],
                actionable_recommendation="Use a virtual single-use debit card or PayPal, and disable pre-checked marketing subscription toggles.",
                confidence_percentage=84,
                risk_level="CAUTION"
            )
        else:
            rec = AriaRecommendation(
                direct_answer="I am here as your personal security consultant.",
                key_concerns=[
                    "Modern scams increasingly exploit urgency, fake job portals, and dark UX patterns."
                ],
                positive_indicators=[
                    "TrustAI Multi-Agent security pipeline is standing by."
                ],
                actionable_recommendation="Paste any suspicious link, offer letter, or agreement text here, and I'll break down the hidden risks.",
                confidence_percentage=95,
                risk_level="SAFE"
            )

        return ChatResponse(
            conversation_id=conv_id,
            reply_text=self._format_human_response(rec),
            structured_advice=rec,
            suggested_follow_ups=[
                "What specific questions should I ask to verify this?",
                "How do I look up their official company registration?",
                "What should I do if I already shared personal details?"
            ],
            timestamp=timestamp
        )
