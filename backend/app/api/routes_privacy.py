from fastapi import APIRouter
from app.models.analysis_models import PrivacyAnalyzeRequest, ChiefVerdict
from app.agents.chief_orchestrator import ChiefDecisionOrchestrator
from app.database.firestore import db_client

router = APIRouter(prefix="/api/privacy", tags=["Privacy Policy Analysis"])
orchestrator = ChiefDecisionOrchestrator()

@router.post("/analyze", response_model=ChiefVerdict)
async def analyze_privacy_policy(request: PrivacyAnalyzeRequest):
    identifier = f"{request.service_name} Privacy Policy"
    
    metadata = {
        "service_name": request.service_name,
        "privacy_policy_url": request.privacy_policy_url or ""
    }

    content = request.privacy_policy_text or f"Privacy Policy URL: {request.privacy_policy_url}"

    verdict = await orchestrator.run_full_pipeline(
        identifier=identifier,
        content=content,
        category="privacy",
        metadata=metadata
    )

    await db_client.save_scan(verdict.model_dump())
    return verdict
