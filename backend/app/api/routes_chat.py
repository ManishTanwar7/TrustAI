from fastapi import APIRouter
from app.models.chat_models import ChatRequest, ChatResponse
from app.agents.aria_assistant import AriaSecurityConsultant
from app.database.firestore import db_client

router = APIRouter(prefix="/api/chat", tags=["Aria AI Security Consultant"])
aria = AriaSecurityConsultant()

@router.post("", response_model=ChatResponse)
async def chat_with_aria(request: ChatRequest):
    # If a context_scan_id is provided, enrich with actual scan findings from DB
    if request.context_scan_id and not request.attached_context:
        scan_data = await db_client.get_scan(request.context_scan_id)
        if scan_data:
            request.attached_context = scan_data

    response = await aria.chat(request)

    # Persist in DB
    await db_client.save_chat_message(
        conversation_id=response.conversation_id,
        message={
            "user_prompt": request.message,
            "assistant_reply": response.reply_text,
            "structured_advice": response.structured_advice.model_dump() if response.structured_advice else None,
            "timestamp": response.timestamp
        }
    )

    return response
