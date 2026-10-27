import json
import logging
import re
from typing import Dict, Any, Optional
import httpx
from app.config import settings

logger = logging.getLogger(__name__)

class BaseAgent:
    """
    Base class for TrustAI Gemini Agents.
    Executes prompts against Google Gemini API with robust JSON extraction
    and heuristic simulation fallback for offline demo resilience.
    """
    def __init__(self, agent_name: str, system_prompt: str):
        self.agent_name = agent_name
        self.system_prompt = system_prompt
        self.api_key = settings.GEMINI_API_KEY
        self.model = settings.GEMINI_MODEL

    async def call_gemini(self, prompt: str, schema_description: str = "") -> Optional[Dict[str, Any]]:
        """
        Calls Gemini API with system prompt and JSON expectation.
        """
        if not self.api_key or self.api_key == "your_gemini_api_key_here":
            logger.info(f"[{self.agent_name}] No Gemini API key provided. Using internal intelligence engine.")
            return None

        endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model}:generateContent?key={self.api_key}"
        
        full_prompt = f"""
{self.system_prompt}

TASK:
Analyze the input provided below and output ONLY a valid JSON object matching this schema:
{schema_description}

CRITICAL: Return raw JSON only, no markdown wrapping, no explanation before or after.

INPUT:
{prompt}
"""
        payload = {
            "contents": [
                {
                    "parts": [{"text": full_prompt}]
                }
            ],
            "generationConfig": {
                "temperature": 0.2,
                "topP": 0.95,
                "maxOutputTokens": 2048,
                "responseMimeType": "application/json"
            }
        }

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(endpoint, json=payload)
                if response.status_code == 200:
                    data = response.json()
                    candidates = data.get("candidates", [])
                    if candidates:
                        text = candidates[0].get("content", {}).get("parts", [{}])[0].get("text", "")
                        return self._clean_and_parse_json(text)
                else:
                    logger.warning(f"[{self.agent_name}] Gemini API error {response.status_code}: {response.text}")
        except Exception as e:
            logger.warning(f"[{self.agent_name}] Gemini invocation failed: {str(e)}")

        return None

    def _clean_and_parse_json(self, text: str) -> Optional[Dict[str, Any]]:
        try:
            # First direct attempt
            return json.loads(text.strip())
        except Exception:
            # Clean markdown codeblocks
            cleaned = re.sub(r"^```(?:json)?\s*", "", text.strip(), flags=re.MULTILINE)
            cleaned = re.sub(r"\s*```$", "", cleaned.strip(), flags=re.MULTILINE)
            try:
                return json.loads(cleaned.strip())
            except Exception:
                # Find outermost JSON object
                match = re.search(r"(\{.*\})", text, re.DOTALL)
                if match:
                    try:
                        return json.loads(match.group(1))
                    except Exception:
                        pass
        return None
