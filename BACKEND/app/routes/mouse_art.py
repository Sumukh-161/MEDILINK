import base64
import os
import subprocess
import sys
from datetime import datetime
from fastapi import APIRouter, BackgroundTasks
from pydantic import BaseModel

router = APIRouter()

class MouseArtData(BaseModel):
    email: str
    image_data: str

# Directory to store images
IMAGE_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "mouse_arts")
os.makedirs(IMAGE_DIR, exist_ok=True)

def run_mouse_analyzer(file_path: str, email: str, timestamp: str):
    script_path = os.path.join(
        os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 
        "MODELS", 
        "mouseF.py"
    )
    try:
        log_path = os.path.join(os.path.dirname(script_path), "mouse_error.log")
        with open(log_path, "a") as f:
            subprocess.run([sys.executable, script_path, file_path, email, timestamp], stdout=f, stderr=f)
    except Exception as e:
        print(f"Failed to launch mouse tracking pipeline: {e}")

@router.post("/mouse_art/upload")
async def save_mouse_art(data: MouseArtData, background_tasks: BackgroundTasks):
    """
    Receives base64-encoded mouse art from frontend and saves it as PNG.
    """
    # The image_data usually looks like "data:image/png;base64,iVBORw0KGgo..."
    if "," in data.image_data:
        base64_img = data.image_data.split(",")[1]
    else:
        base64_img = data.image_data

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    clean_email = data.email.replace("@", "_at_").replace(".", "_")
    file_name = f"mouse_art_{clean_email}_{timestamp}.png"
    file_path = os.path.join(IMAGE_DIR, file_name)
    
    with open(file_path, "wb") as f:
        f.write(base64.b64decode(base64_img))
        
    # 🔥 Push image to ML model via BackgroundTasks
    background_tasks.add_task(run_mouse_analyzer, file_path, data.email, timestamp)
        
    return {"message": "Image successfully saved on the backend and tracing started!", "file_path": file_path}
