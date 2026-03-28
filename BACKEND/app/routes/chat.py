import os
import json
import subprocess
import sys
from datetime import datetime
from fastapi import APIRouter, Request, BackgroundTasks
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field, ValidationError
from typing import List, Dict, Any, Optional

router = APIRouter(prefix="/chat", tags=["Chat"])

class ChatChunkData(BaseModel):
    consultation_id: Optional[str] = Field(default="unknown")
    doctor_name: Optional[str] = Field(default="Unknown Doctor")
    email: Optional[str] = Field(default="anonymous")
    timestamp: Optional[str] = Field(default=None)
    messages: Optional[List[Dict[str, Any]]] = Field(default_factory=list)

# Directory to store chat logs
CHAT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "chat_logs")
os.makedirs(CHAT_DIR, exist_ok=True)

def run_text_analyzer(file_path: str):
    """
    Subprocess execution of text_01.py acting securely to transcribe emotional logs without blocking.
    """
    script_path = os.path.join(
        os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 
        "MODELS", 
        "text_01.py"
    )
    try:
        subprocess.run([sys.executable, script_path, file_path], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    except Exception as e:
        print(f"Failed to launch text tracking pipeline: {e}")

@router.post("/save_chunk")
async def save_chat_chunk(request: Request, background_tasks: BackgroundTasks):
    """
    Receives an array of messages sent during a 10-minute window
    and saves them to a structured JSON file.
    """
    try:
        raw_data = await request.json()
        print(f"DEBUG: Raw request data: {raw_data}")
        print(f"DEBUG: Data types: {type(raw_data)}")
        
        data = ChatChunkData(**raw_data)
        print(f"DEBUG: Parsed ChatChunkData: {data.dict()}")
        
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        clean_email = data.email.replace("@", "_at_").replace(".", "_")
        
        file_name = f"chat_{clean_email}_consult_{data.consultation_id}_{timestamp}.json"
        file_path = os.path.join(CHAT_DIR, file_name)
        
        chat_data = {
            "consultation_id": data.consultation_id,
            "doctor_name": data.doctor_name,
            "patient_email": data.email,
            "frontend_timestamp": data.timestamp,
            "saved_at": timestamp,
            "message_count": len(data.messages),
            "messages": data.messages
        }
        
        with open(file_path, "w", encoding="utf-8") as f:
            json.dump(chat_data, f, indent=4)
            
        # 🔥 Push file to NLP model via BackgroundTasks
        background_tasks.add_task(run_text_analyzer, file_path)
            
        return {"message": "Chat chunk successfully saved and NLP extraction started!", "file_path": file_path}
    
    except ValidationError as e:
        print(f"ERROR: Validation error: {e.errors()}")
        return JSONResponse(
            status_code=422,
            content={"detail": e.errors(), "raw_data": raw_data}
        )
    except Exception as e:
        print(f"ERROR: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={"detail": str(e)}
        )
