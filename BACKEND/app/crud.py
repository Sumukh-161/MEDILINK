from sqlalchemy.orm import Session
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