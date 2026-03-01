from app.schemas import UserCreate
from app.database import get_db
from app import crud
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.schemas import UserLogin

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/register")
def create_user(user: UserCreate, db: Session = Depends(get_db)):
    return crud.create_user(db=db, user=user)



@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    return crud.login_user(db=db, user=user)