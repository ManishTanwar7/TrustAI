from fastapi import APIRouter
from app.models.analysis_models import InternshipVerifyRequest, ChiefVerdict
from app.agents.chief_orchestrator import ChiefDecisionOrchestrator
from app.database.firestore import db_client

router = APIRouter(prefix="/api/internship", tags=["Internship Verification"])
orchestrator = ChiefDecisionOrchestrator()

@router.post("/verify", response_model=ChiefVerdict)
async def verify_internship_offer(request: InternshipVerifyRequest):
    identifier = f"{request.company_name} - {request.job_title}"
    
    metadata = {
        "company_name": request.company_name,
        "job_title": request.job_title,
        "recruiter_email": request.recruiter_email or "",
        "recruiter_channel": request.recruiter_channel or "Unspecified",
        "stipend_claimed": request.stipend_claimed or "Unspecified",
        "deposit_required": request.deposit_required or False,
        "deposit_amount": request.deposit_amount or "0",
        "website_url": request.website_url or ""
    }

    full_text = f"""
COMPANY: {request.company_name}
ROLE: {request.job_title}
WEBSITE: {request.website_url}
RECRUITER EMAIL: {request.recruiter_email}
CHANNEL: {request.recruiter_channel}
STIPEND: {request.stipend_claimed}
SECURITY DEPOSIT REQUIRED: {'YES - ' + str(request.deposit_amount) if request.deposit_required else 'NO'}

OFFER LETTER / COMMUNICATIONS:
{request.offer_letter_text or 'No raw text provided.'}
"""

    verdict = await orchestrator.run_full_pipeline(
        identifier=identifier,
        content=full_text,
        category="internship",
        metadata=metadata
    )

    await db_client.save_scan(verdict.model_dump())
    return verdict
