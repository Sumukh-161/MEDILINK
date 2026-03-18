import io
from fastapi import APIRouter, Depends, Form, File, UploadFile, HTTPException
from sqlalchemy.orm import Session
from datetime import date as dt_date
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseUpload
from google_auth_oauthlib.flow import InstalledAppFlow

from app.database import get_db
from app import crud

router = APIRouter(prefix="/reports", tags=["Reports"])

SCOPES = ["https://www.googleapis.com/auth/drive"]

def get_drive_service():
    try:
        flow = InstalledAppFlow.from_client_secrets_file(
            "client_secret.json", SCOPES
        )
        creds = flow.run_local_server(port=0)
        service = build("drive", "v3", credentials=creds)
        return service
    except Exception as e:
        print(f"Error authenticating with Google Drive: {e}")
        return None

@router.post("/resource_library")
async def upload_resource(
    title: str = Form(...),
    username: str = Form(...),  # Maps to user_gmail
    doctor_name: str = Form(...),
    hospital_name: str = Form(...),
    date: dt_date = Form(...),
    subject: str = Form(None), # Optional, keeping from original
    type: str = Form(None), # Optional, keeping from original
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    
    service = get_drive_service()
    if not service:
        raise HTTPException(status_code=500, detail="Google Drive authentication failed. Ensure client_secret.json is configured.")

    contents = await file.read()

    file_metadata = {
        "name": title,
        "parents": ["1UkRuPlzxH13QYYPolnvunS80qoKy2n08"]
    }

    media = MediaIoBaseUpload(
        io.BytesIO(contents),
        mimetype=file.content_type
    )

    try:
        uploaded = service.files().create(
            body=file_metadata,
            media_body=media,
            fields="id"
        ).execute()
        
        file_id = uploaded.get("id")
        drive_link = f"https://drive.google.com/file/d/{file_id}/view"

        # Create the dictionary to save to the database
        report_data = {
            "user_gmail": username,
            "report_title": title,
            "date": date,
            "drive_link": drive_link,
            "doctor_name": doctor_name,
            "hospital_name": hospital_name
        }

        # Save to database
        db_report = crud.create_report(db=db, report_data=report_data)

        return {
            "success": True,
            "message": "Resource uploaded and report created successfully",
            "data": {
                "report_id": db_report.id,
                "subject": subject,
                "title": title,
                "type": type,
                "username": username,
                "drive_link": drive_link,
                "doctor_name": doctor_name,
                "hospital_name": hospital_name,
                "date": date
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload to Drive or save to database: {str(e)}")


@router.get("/")
def get_user_reports(gmail: str, db: Session = Depends(get_db)):
    reports = crud.get_reports_by_gmail(db, gmail=gmail)
    
    return {
        "success": True,
        "message": "Reports fetched successfully",
        "data": reports
    }
