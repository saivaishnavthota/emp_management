# app/models/document_model.py
from sqlmodel import SQLModel, Field
from typing import Optional

class Document(SQLModel, table=True):
    __tablename__ = "documents"
    id: Optional[int] = Field(default=None, primary_key=True)
    employee_id: int = Field(foreign_key="employees.id")
    file_name: str = Field(max_length=255)
    file_type: Optional[str] = Field(max_length=100)
    file_data: Optional[bytes]