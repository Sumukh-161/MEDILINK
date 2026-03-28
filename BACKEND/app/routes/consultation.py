from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database import get_db
from app import crud

router = APIRouter(prefix="/consultations", tags=["Consultations"])


@router.get("/")
def get_user_consultations(gmail: str = Query(...), db: Session = Depends(get_db)):
    consultations = crud.get_consultations_by_gmail(db, gmail=gmail)
    return {
        "success": True,
        "message": "Consultations fetched successfully",
        "data": consultations
    }
