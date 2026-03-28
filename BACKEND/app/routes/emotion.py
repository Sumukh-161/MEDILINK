import os
import subprocess
import sys
from datetime import datetime
from fastapi import APIRouter
from pydantic import BaseModel
import time

router = APIRouter(prefix="/emotion", tags=["Emotion Tracking"])

from app.mood_tracker import OUTPUT_DIR, get_most_recent_log
import json

@router.get("/mood")
async def get_current_mood():
    """
    Fetches the most recently aggregated mood from the backend.
    """
    try:
        latest_file = get_most_recent_log(OUTPUT_DIR)
        if not latest_file or not os.path.exists(latest_file):
            return {"mood": "neutral", "message": "No mood data available"}
        
        with open(latest_file, "r", encoding="utf-8") as f:
            data = json.load(f)
            return {"mood": data.get("aggregated_dominant_mood", "neutral")}
    except Exception as e:
        return {"mood": "neutral", "error": str(e)}

class EmotionTriggerData(BaseModel):
    email: str

_last_scan_time = 0

def run_face_final(email: str):
    global _last_scan_time
    
    # Lock for 130 seconds (Script takes 120s to run). Rejects concurrent overlapping triggers.
    if time.time() - _last_scan_time < 130:
        return {"started": False, "error": "An emotion scan is already actively using the camera."}
        
    """
    Subprocess execution of face_Final.py.
    This runs synchronously for 2 minutes, blocking only the background thread.
    """
    script_path = os.path.join(
        os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 
        "MODELS", 
        "face_Final.py"
    )
    
    # Start the script in a detached process so server shutdown does not kill it.
    try:
        backend_dir = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
        logs_dir = os.path.join(backend_dir, "emotion_logs")
        os.makedirs(logs_dir, exist_ok=True)

        kwargs = {
            "args": [sys.executable, script_path, email],
            "cwd": os.path.dirname(script_path),
            "stdout": subprocess.DEVNULL,
            "stderr": subprocess.DEVNULL,
            "close_fds": True,
        }

        if os.name == "nt":
            kwargs["creationflags"] = subprocess.CREATE_NEW_PROCESS_GROUP | subprocess.DETACHED_PROCESS

        process = subprocess.Popen(**kwargs)
        _last_scan_time = time.time()
        return {"started": True, "pid": process.pid}
    except Exception as e:
        print(f"Error starting face tracking script: {e}")
        return {"started": False, "error": str(e)}

@router.post("/trigger")
async def trigger_emotion_scan(data: EmotionTriggerData):
    """
    Triggers the 2-minute webcam emotion tracking script in the background.
    """
    result = run_face_final(data.email)
    if result.get("started"):
        return {
            "message": "Emotion scan started in the background. It will run for 2 minutes.",
            "pid": result.get("pid")
        }

    return {
        "message": "Failed to start emotion scan.",
        "error": result.get("error", "Unknown error"),
    }
