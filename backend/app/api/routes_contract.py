from fastapi import APIRouter
from app.models.analysis_models import ContractAnalyzeRequest, ChiefVerdict
from app.agents.chief_orchestrator import ChiefDecisionOrchestrator
from app.database.firestore import db_client

router = APIRouter(prefix="/api/contract", tags=["Contract Intelligence"])
orchestrator = ChiefDecisionOrchestrator()

@router.post("/analyze", response_model=ChiefVerdict)
async def analyze_contract(request: ContractAnalyzeRequest):
    identifier = f"{request.contract_title} ({request.contract_type})"
    
    metadata = {
        "contract_title": request.contract_title,
        "contract_type": request.contract_type,
        "user_role": request.user_role
    }

    verdict = await orchestrator.run_full_pipeline(
        identifier=identifier,
        content=request.contract_text,
        category="contract",
        metadata=metadata
    )

    await db_client.save_scan(verdict.model_dump())
    return verdict
