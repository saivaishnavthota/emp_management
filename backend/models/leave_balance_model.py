# app/models/leave_balance_model.py
from sqlmodel import SQLModel, Field
from typing import Optional
from datetime import datetime

class LeaveBalance(SQLModel, table=True):
    __tablename__ = "leave_balance"
    id: Optional[int] = Field(default=None, primary_key=True)
    employee_id: int = Field(foreign_key="employees.id")
    sick_leaves: int = Field(default=0)
    casual_leaves: int = Field(default=0)
    paid_leaves: int = Field(default=0)
    created_at: Optional[datetime] = Field(default_factory=datetime.now)
    updated_at: Optional[datetime] = Field(default_factory=datetime.now)