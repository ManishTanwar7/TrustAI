import os
import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles

from app.config import settings
from app.api.routes_analyze import router as analyze_router
from app.api.routes_internship import router as internship_router
from app.api.routes_contract import router as contract_router
from app.api.routes_privacy import router as privacy_router
from app.api.routes_chat import router as chat_router
from app.api.routes_threats import router as threats_router
from app.api.routes_extension import router as extension_router

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger("TrustAI")

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Initializing TrustAI Unified Security Platform...")
    logger.info(f"Loaded Gemini Model: {settings.GEMINI_MODEL}")
    logger.info(f"API Environment: {settings.APP_ENV}")
    yield
    logger.info("Shutting down TrustAI Platform...")

app = FastAPI(
    title="TrustAI - AI Security & Scam Defense",
    description="Unified Multi-Agent AI Defense Platform protecting users from scams, deceptive websites, fraudulent internships, and privacy abuse.",
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API routes
app.include_router(analyze_router)
app.include_router(internship_router)
app.include_router(contract_router)
app.include_router(privacy_router)
app.include_router(chat_router)
app.include_router(threats_router)
app.include_router(extension_router)

@app.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "service": "TrustAI Unified Multi-Agent Engine",
        "multi_agent_fleet": {
            "chief_orchestrator": "online",
            "scam_agent": "online",
            "privacy_agent": "online",
            "contract_agent": "online",
            "dark_pattern_agent": "online",
            "credibility_agent": "online",
            "threat_agent": "online",
            "aria_assistant": "online"
        }
    }

# Locate frontend dist directory (supports local, container, and Render paths)
possible_dist_dirs = [
    os.path.join(os.path.dirname(__file__), "..", "..", "frontend", "dist"),
    os.path.join(os.path.dirname(__file__), "..", "frontend", "dist"),
    os.path.join(os.path.dirname(__file__), "dist"),
    os.path.join(os.getcwd(), "frontend", "dist"),
    os.path.join(os.getcwd(), "..", "frontend", "dist"),
    "/app/frontend/dist"
]

frontend_dist = None
for d in possible_dist_dirs:
    if os.path.exists(d) and os.path.exists(os.path.join(d, "index.html")):
        frontend_dist = os.path.abspath(d)
        break

if frontend_dist:
    logger.info(f"Mounted Unified Frontend UI from: {frontend_dist}")
    assets_dir = os.path.join(frontend_dist, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")

    # Serve static index.html on root
    @app.get("/", include_in_schema=False)
    async def serve_root():
        return FileResponse(os.path.join(frontend_dist, "index.html"))

    # SPA Catch-all: redirect all non-API paths to index.html for React Router
    @app.get("/{full_path:path}", include_in_schema=False)
    async def serve_spa(full_path: str):
        # Ignore API and docs routes
        if full_path.startswith("api/") or full_path.startswith("docs") or full_path == "openapi.json":
            return JSONResponse(status_code=404, content={"detail": "Not found"})
        
        file_path = os.path.join(frontend_dist, full_path)
        if os.path.exists(file_path) and os.path.isfile(file_path):
            return FileResponse(file_path)
        
        return FileResponse(os.path.join(frontend_dist, "index.html"))
else:
    logger.warning("Frontend dist directory not found. Serving default JSON status on root.")
    @app.get("/", tags=["Health"])
    async def root_fallback():
        return {
            "status": "online",
            "service": "TrustAI Multi-Agent Defense Engine",
            "version": "1.0.0",
            "docs_url": "/docs"
        }

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global exception occurred: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal error occurred within TrustAI.", "error": str(exc)}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=settings.APP_DEBUG)
