from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from fastapi.responses import JSONResponse
from sqlmodel import Session, select
from typing import List
from models.document_model import Document
from dependencies import get_session
from auth import get_current_user  # your JWT dependency

router = APIRouter(prefix="/documents", tags=["Documents"])

# Upload single document (employee_id comes from JWT)
@router.post("/upload")
async def upload_document(
    file: UploadFile = File(...),
    session: Session = Depends(get_session),
    current_user: dict = Depends(get_current_user),  # returns dict with employee info
):
    try:
        employee_id = current_user["id"]  # dynamically get employee_id
        file_data = await file.read()

        doc = Document(
            employee_id=employee_id,
            file_name=file.filename,
            file_type=file.content_type,
            file_data=file_data,
        )
        session.add(doc)
        session.commit()
        session.refresh(doc)

        return JSONResponse(
            status_code=201,
            content={"status": "success", "message": "Document uploaded", "document_id": doc.id},
        )
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))


# Optional: Get all documents for the logged-in employee
@router.get("/my_documents", response_model=List[Document])
async def get_my_documents(
    session: Session = Depends(get_session),
    current_user: dict = Depends(get_current_user),
):
    employee_id = current_user["id"]
    docs = session.exec(select(Document).where(Document.employee_id == employee_id)).all()
    return docs
