import logging
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
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
    logger.info("Initializing TrustAI Multi-Agent Security Platform...")
    logger.info(f"Loaded Gemini Model: {settings.GEMINI_MODEL}")
    logger.info(f"API Environment: {settings.APP_ENV}")
    yield
    logger.info("Shutting down TrustAI Platform...")

app = FastAPI(
    title="TrustAI API",
    description="Multi-Agent AI Defense Platform protecting users from scams, deceptive websites, fraudulent internships, and privacy abuse.",
    version="1.0.0",
    lifespan=lifespan
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Production config can restrict or use settings.cors_origins_list
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

@app.get("/", tags=["Health"])
async def root():
    return {
        "status": "online",
        "service": "TrustAI Multi-Agent Defense Engine",
        "version": "1.0.0",
        "gemini_brain": "Active",
        "consultant": "Aria AI Security Consultant",
        "docs_url": "/docs"
    }

@app.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
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

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global exception occurred: {str(exc)}", exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal error occurred within the TrustAI security analysis pipeline.", "error": str(exc)}
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=settings.HOST, port=settings.PORT, reload=settings.APP_DEBUG)
