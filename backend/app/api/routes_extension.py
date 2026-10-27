from fastapi import APIRouter, Header, HTTPException, Query
from typing import Dict, Any, Optional
from app.models.analysis_models import DarkPatternScanRequest, ChiefVerdict
from app.agents.chief_orchestrator import ChiefDecisionOrchestrator
from app.agents.dark_pattern_agent import DarkPatternAgent
from app.database.firestore import db_client

router = APIRouter(prefix="/api/extension", tags=["Browser Extension Gateway"])
orchestrator = ChiefDecisionOrchestrator()
dark_pattern_agent = DarkPatternAgent()

@router.get("/check-domain")
async def check_domain_quick(url: str = Query(..., description="Active tab URL")):
    """
    Lightweight, ultra-fast pre-flight check for the browser extension badge.
    Checks existing threat DB cache first, then executes multi-agent check if new.
    """
    # Quick normalization
    clean_domain = url.replace("https://", "").replace("http://", "").split("/")[0].lower()
    
    # Check if we already have an audit
    scans = await db_client.list_scans(limit=100)
    for s in scans:
        if clean_domain in s.get("target_identifier", "").lower():
            return {
                "domain": clean_domain,
                "trust_score": s.get("trust_score", 50),
                "verdict": s.get("verdict", "CAUTION"),
                "badge_color": s.get("verdict_badge_color", "amber"),
                "key_concerns": s.get("key_concerns", []),
                "cached": True
            }

    # If new, run streamlined check
    verdict = await orchestrator.run_full_pipeline(
        identifier=url,
        content=f"Website Domain Check: {url}",
        category="website"
    )
    await db_client.save_scan(verdict.model_dump())

    return {
        "domain": clean_domain,
        "trust_score": verdict.trust_score,
        "verdict": verdict.verdict,
        "badge_color": verdict.verdict_badge_color,
        "key_concerns": verdict.key_concerns,
        "cached": False
    }

@router.post("/scan-dom")
async def scan_dom_for_dark_patterns(payload: DarkPatternScanRequest):
    """
    Called by the browser extension content script to detect manipulative UX on page.
    """
    result = await dark_pattern_agent.analyze(
        dom_or_text=payload.dom_text_snapshot or "",
        url=payload.url
    )
    return result
