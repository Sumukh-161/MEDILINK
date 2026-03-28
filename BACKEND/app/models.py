from sqlalchemy import Column, Integer, String, ForeignKey, Date, Numeric, Text, Time
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    role = Column(String, nullable=False)  # doctor or patient


class Profile(Base):
    __tablename__ = "profile"

    patient_id = Column(String(20), primary_key=True, index=True)
    name = Column(String(100), nullable=True)
    email = Column(String(100), nullable=True, index=True)
    contact_number = Column(String(15), nullable=True)
    dob = Column(Date, nullable=True)
    blood_type = Column(String(5), nullable=True)
    allergies = Column(Text, nullable=True)
    sex = Column(String(10), nullable=True)
    age = Column(Integer, nullable=True)
    height = Column(Numeric(5, 2), nullable=True)
    weight = Column(Numeric(5, 2), nullable=True)

class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, index=True)
    user_gmail = Column(String, index=True, nullable=False)
    report_title = Column(String, nullable=False)
    date = Column(Date, nullable=False)
    drive_link = Column(String, nullable=False)
    doctor_name = Column(String, nullable=False)
    hospital_name = Column(String, nullable=False)


class Medication(Base):
    __tablename__ = "medication"

    id = Column(Integer, primary_key=True, index=True)
    user_gmail = Column(String(255), index=True, nullable=False)
    pill_name = Column(String(255), nullable=False)
    start_date = Column(Date, nullable=True)
    end_date = Column(Date, nullable=True)
    duration = Column(Integer, nullable=True)
    timing_in_day = Column(String(100), nullable=True)
    status = Column(String(50), nullable=True)
    medication_for = Column(String(255), nullable=True)


class Consultation(Base):
    __tablename__ = "consultation"

    id = Column(Integer, primary_key=True, index=True)
    user_gmail = Column(String(255), index=True, nullable=False)
    consult_reason = Column(Text, nullable=True)
    consultation_date = Column(Date, nullable=True)
    consultation_time = Column(Time, nullable=True)
    doctor = Column(String(255), nullable=True)
    hospital = Column(String(255), nullable=True)
    consultation_mode = Column(String(20), nullable=True)  # "online" or "offline"
    consultation_type = Column(String(100), nullable=True)

class ConsultationBooking(Base):
    __tablename__ = "consultation_booking"

    id = Column(Integer, primary_key=True, index=True)
    doctor_name = Column(String, nullable=False)
    specialization = Column(String, nullable=False)
    doctor_type = Column(String, nullable=False)
    experience_years = Column(Integer, nullable=False)
    rating = Column(Numeric, nullable=True)
    consultation_fee = Column(Integer, nullable=True)
    mode = Column(String, nullable=True)
    city = Column(String, nullable=True)
    country = Column(String, nullable=True)