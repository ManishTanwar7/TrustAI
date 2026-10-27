from fastapi import APIRouter, HTTPException
from app.models.analysis_models import UniversalAnalyzeRequest, ChiefVerdict
from app.agents.chief_orchestrator import ChiefDecisionOrchestrator
from app.database.firestore import db_client

router = APIRouter(prefix="/api/analyze", tags=["Analyze"])
orchestrator = ChiefDecisionOrchestrator()

@router.post("", response_model=ChiefVerdict)
async def analyze_target(request: UniversalAnalyzeRequest):
    identifier = request.url or (request.text_content[:60] if request.text_content else "Generic Input")
    content = request.text_content or f"Target URL: {request.url}"
    
    verdict = await orchestrator.run_full_pipeline(
        identifier=identifier,
        content=content,
        category=request.category,
        metadata=request.metadata or {}
    )

    await db_client.save_scan(verdict.model_dump())
    return verdict

@router.get("/{scan_id}", response_model=ChiefVerdict)
async def get_scan_by_id(scan_id: str):
    scan_data = await db_client.get_scan(scan_id)
    if not scan_data:
        raise HTTPException(status_code=404, detail="Scan result not found")
    return scan_data
