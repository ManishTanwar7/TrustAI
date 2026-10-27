import pytest
import asyncio
from app.agents.scam_agent import ScamDetectionAgent
from app.agents.privacy_agent import PrivacyAnalysisAgent
from app.agents.contract_agent import ContractAnalysisAgent
from app.agents.dark_pattern_agent import DarkPatternAgent
from app.agents.credibility_agent import CredibilityAgent
from app.agents.threat_agent import ThreatIntelligenceAgent
from app.agents.chief_orchestrator import ChiefDecisionOrchestrator
from app.agents.aria_assistant import AriaSecurityConsultant
from app.models.chat_models import ChatRequest

@pytest.mark.asyncio
async def test_scam_detection_deposit_flag():
    agent = ScamDetectionAgent()
    result = await agent.analyze("URGENT: Please pay a refundable security deposit of $150 via USDT for your laptop.")
    assert result.risk_score >= 50
    assert result.verdict in ["HIGH RISK", "SCAM LIKELY"]
    assert any("deposit" in r.lower() for r in result.reasons)

@pytest.mark.asyncio
async def test_privacy_agent_data_sale():
    agent = PrivacyAnalysisAgent()
    result = await agent.analyze("We may sell your personal information and geolocation to third-party data brokers.")
    assert result.privacy_score <= 55
    assert result.risk_level in ["HIGH", "CRITICAL"]

@pytest.mark.asyncio
async def test_contract_agent_arbitration():
    agent = ContractAnalysisAgent()
    result = await agent.analyze("All disputes must be settled through binding arbitration and you waive all rights to a jury trial.")
    assert result.arbitration_lockin is True

@pytest.mark.asyncio
async def test_chief_orchestrator_synthesis():
    orchestrator = ChiefDecisionOrchestrator()
    verdict = await orchestrator.run_full_pipeline(
        identifier="Apex Fake Internships",
        content="Congratulations! Pay $200 security deposit on Telegram to begin work tomorrow.",
        category="internship",
        metadata={"deposit_required": True}
    )
    assert verdict.verdict == "SCAM LIKELY"
    assert verdict.trust_score < 40
    assert len(verdict.key_concerns) > 0

@pytest.mark.asyncio
async def test_aria_consultant_tone_and_recommendation():
    aria = AriaSecurityConsultant()
    req = ChatRequest(message="Should I accept this internship offer? They asked for a $100 laptop deposit.")
    res = await aria.chat(req)
    assert res.structured_advice is not None
    assert "deposit" in " ".join(res.structured_advice.key_concerns).lower()
    assert res.structured_advice.risk_level in ["HIGH RISK", "SCAM LIKELY"]
    assert res.structured_advice.confidence_percentage >= 80
