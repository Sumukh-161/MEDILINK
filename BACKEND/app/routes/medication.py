from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app import crud

router = APIRouter(prefix="/medications", tags=["Medications"])


@router.get("/")
def get_user_medications(gmail: str, db: Session = Depends(get_db)):
    """
    Fetch all medication entries for a given user.

    Query param:
        gmail (str): The user's Gmail address (e.g. ?gmail=user@gmail.com)
    """
    medications = crud.get_medications_by_gmail(db, gmail=gmail)

    if not medications:
        raise HTTPException(
            status_code=404,
            detail=f"No medications found for {gmail}"
        )

    return {
        "success": True,
        "message": "Medications fetched successfully",
        "data": [
            {
                "id": med.id,
                "user_gmail": med.user_gmail,
                "pill_name": med.pill_name,
                "start_date": med.start_date,
                "end_date": med.end_date,
                "duration": med.duration,
                "timing_in_day": med.timing_in_day,
                "status": med.status,
                "medication_for": med.medication_for,
            }
            for med in medications
        ]
    }
