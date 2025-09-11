# app/schemas/user_schema.py
from sqlmodel import SQLModel
from typing import Optional
from datetime import datetime
from pydantic import EmailStr

class UserCreate(SQLModel):
    name: str
    email: str
    role: str

class UserResponse(SQLModel):
    employeeId: int
    name: str
    role: str
    message: Optional[str] = None
    access_token: Optional[str] = None

class UserLogin(SQLModel):
    email: str
    password: str
    role: str

class ResetPasswordRequest(SQLModel):
    email: EmailStr
    current_password: str
    new_password: str

class ForgotPasswordRequest(SQLModel):
    email: EmailStr