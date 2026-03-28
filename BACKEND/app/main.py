from fastapi import FastAPI
import asyncio
from app.database import engine, Base
from app import models
from app.routes import user, report, medication, consultation, mouse_art, chat, emotion, consultation_booking
from fastapi.middleware.cors import CORSMiddleware
from app.mood_tracker import mood_aggregator_task

app = FastAPI()

@app.on_event("startup")
async def startup_event():
    asyncio.create_task(mood_aggregator_task())

# 🔥 This creates tables automatically
Base.metadata.create_all(bind=engine)

# 🔥 CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (for development only)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

app.include_router(user.router)
app.include_router(report.router)
app.include_router(medication.router)
app.include_router(consultation.router)
app.include_router(mouse_art.router)
app.include_router(chat.router)
app.include_router(emotion.router)
app.include_router(consultation_booking.router)