# app/database.py
from sqlmodel import SQLModel, create_engine, Session
from contextlib import contextmanager

DATABASE_URL = "postgresql://postgres:root@localhost:5432/boarding"

engine = create_engine(DATABASE_URL, echo=True)

def create_tables_database():
    SQLModel.metadata.create_all(engine)

def get_session():
    with Session(engine) as session:
        yield session
