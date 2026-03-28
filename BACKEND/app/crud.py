from sqlalchemy.orm import Session
from sqlalchemy import text
from app import models
from passlib.context import CryptContext
from fastapi import HTTPException

print("THIS IS THE REAL CRUD FILE")

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password: str):
    return pwd_context.hash(password)

def create_user(db: Session, user):

    # 🔥 CHECK IF EMAIL EXISTS
    existing_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    hashed_password = get_password_hash(user.password)

    db_user = models.User(
        name=user.name,
        email=user.email,
        password=hashed_password,
        role=user.role
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user
def login_user(db: Session, user):

    # 🔎 Find user by email
    db_user = db.query(models.User).filter(
        models.User.email == user.email
    ).first()

    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    # 🔐 Check role
    if db_user.role != user.role:
        raise HTTPException(status_code=400, detail="Invalid role selected")

    # 🔐 Verify password
    if not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    return {
        "message": "Login successful",
        "user_id": db_user.id,
        "name": db_user.name,
        "role": db_user.role
    }


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_profile_by_gmail(db: Session, gmail: str):
    # Query profile directly by email
    profile = db.query(models.Profile).filter(
        models.Profile.email == gmail
    ).first()

    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    # Return profile data
    return {
        "patientId": profile.patient_id,
        "name": profile.name,
        "email": profile.email,
        "contactNumber": profile.contact_number,
        "dob": profile.dob,
        "bloodType": profile.blood_type,
        "allergies": profile.allergies,
        "sex": profile.sex,
        "age": profile.age,
        "height": profile.height,
    }

def create_report(db: Session, report_data: dict):
    db_report = models.Report(**report_data)
    db.add(db_report)
    db.commit()
    db.refresh(db_report)
    return db_report

def get_reports_by_gmail(db: Session, gmail: str):
    reports = db.query(models.Report).filter(
        models.Report.user_gmail == gmail
    ).all()
    return reports


def get_medications_by_gmail(db: Session, gmail: str):
    medications = db.query(models.Medication).filter(
        models.Medication.user_gmail == gmail
    ).all()
    return medications


def get_consultations_by_gmail(db: Session, gmail: str):
    result = db.execute(
        text("SELECT * FROM consultation WHERE user_gmail ILIKE :gmail"),
        {"gmail": gmail}
    )
    rows = result.mappings().all()
    print(f"[DEBUG] Consultation query for '{gmail}' → {len(rows)} row(s) found")
    return [dict(row) for row in rows]

def get_consultation_bookings(db: Session):
    return db.query(models.ConsultationBooking).all()

def seed_consultation_bookings(db: Session):
    pass

