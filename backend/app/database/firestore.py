import logging
import os
from typing import Dict, Any, List, Optional
from app.config import settings
from app.database.mock_data import SEED_THREATS

logger = logging.getLogger(__name__)

class DatabaseClient:
    """
    Manages Firebase Firestore operations with automatic fallback
    to high-performance in-memory persistence when Firebase credentials are omitted.
    """
    def __init__(self):
        self.firestore_db = None
        self.in_memory_scans: Dict[str, Dict[str, Any]] = {}
        self.in_memory_chats: Dict[str, List[Dict[str, Any]]] = {}
        self._initialize_client()

    def _initialize_client(self):
        # Pre-seed in-memory store
        for item in SEED_THREATS:
            self.in_memory_scans[item["scan_id"]] = item

        # Attempt Firebase Firestore initialization
        cred_path = settings.FIREBASE_CREDENTIALS_PATH
        if cred_path and os.path.exists(cred_path):
            try:
                import firebase_admin
                from firebase_admin import credentials, firestore
                if not firebase_admin._apps:
                    cred = credentials.Certificate(cred_path)
                    firebase_admin.initialize_app(cred, {"projectId": settings.FIREBASE_PROJECT_ID})
                self.firestore_db = firestore.client()
                logger.info("Successfully connected to live Firebase Firestore.")
                return
            except Exception as e:
                logger.warning(f"Could not connect to Firebase Firestore: {e}. Falling back to in-memory store.")
        else:
            logger.info("Running with TrustAI in-memory security database (pre-seeded with threat intelligence records).")

    async def save_scan(self, scan_data: Dict[str, Any]) -> str:
        scan_id = scan_data.get("scan_id", f"scan_{len(self.in_memory_scans) + 1}")
        self.in_memory_scans[scan_id] = scan_data

        if self.firestore_db:
            try:
                self.firestore_db.collection(settings.FIREBASE_COLLECTION_SCANS).document(scan_id).set(scan_data)
            except Exception as e:
                logger.error(f"Firestore save error: {e}")

        return scan_id

    async def get_scan(self, scan_id: str) -> Optional[Dict[str, Any]]:
        if self.firestore_db:
            try:
                doc = self.firestore_db.collection(settings.FIREBASE_COLLECTION_SCANS).document(scan_id).get()
                if doc.exists:
                    return doc.to_dict()
            except Exception as e:
                logger.warning(f"Firestore fetch failed: {e}")

        return self.in_memory_scans.get(scan_id)

    async def list_scans(self, limit: int = 50, category: Optional[str] = None) -> List[Dict[str, Any]]:
        if self.firestore_db:
            try:
                coll = self.firestore_db.collection(settings.FIREBASE_COLLECTION_SCANS)
                if category:
                    coll = coll.where("category", "==", category)
                docs = coll.order_by("created_at", direction="DESCENDING").limit(limit).stream()
                results = [d.to_dict() for d in docs]
                if results:
                    return results
            except Exception as e:
                logger.warning(f"Firestore query error: {e}")

        scans = list(self.in_memory_scans.values())
        if category:
            scans = [s for s in scans if s.get("category") == category]
        scans.sort(key=lambda s: s.get("created_at", ""), reverse=True)
        return scans[:limit]

    async def save_chat_message(self, conversation_id: str, message: Dict[str, Any]):
        if conversation_id not in self.in_memory_chats:
            self.in_memory_chats[conversation_id] = []
        self.in_memory_chats[conversation_id].append(message)

        if self.firestore_db:
            try:
                self.firestore_db.collection(settings.FIREBASE_COLLECTION_CHATS).document(conversation_id).collection("messages").add(message)
            except Exception as e:
                logger.warning(f"Firestore chat save failed: {e}")

db_client = DatabaseClient()
