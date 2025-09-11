from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session, select
from models.user_model import User
from schemas.user_schema import UserCreate, UserResponse, UserLogin, ResetPasswordRequest, ForgotPasswordRequest
from utils.email import send_login_email
from auth import get_current_user, create_access_token, verify_password, role_required, hash_password
from database import get_session
from sqlalchemy.sql import text

router = APIRouter(prefix="/users", tags=["Users"])


# ----------------------------
# Create Employee (HR only)
# ----------------------------
@router.post("/hr/create_employee", response_model=UserResponse)
async def create_employee(
    user: UserCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(role_required("HR"))
):
    # Check if email exists
    db_user = session.exec(select(User).where(User.email == user.email)).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Call stored procedure correctly
    query = text("SELECT add_employee(:name, :email, :role)")\
        .bindparams(name=user.name, email=user.email, role=user.role)
    temp_password = session.exec(query).scalar()

    session.commit() 

    if not temp_password:
        raise HTTPException(status_code=500, detail="Failed to create employee")

    # Fetch new user
    new_user = session.exec(select(User).where(User.email == user.email)).first()
    if not new_user:
        raise HTTPException(status_code=500, detail="Failed to retrieve created employee")

    # Send login email
    await send_login_email(user.email, temp_password)

    return UserResponse(
        employeeId=new_user.id,
        name=new_user.name,
        role=new_user.role,
        message=f"Employee created successfully with ID: {new_user.id}"
    )

@router.post("/login", response_model=UserResponse)
async def login(user: UserLogin, session: Session = Depends(get_session)):
    email = user.email.strip().lower()
    password = user.password.strip()

    # Get user by email
    db_user = session.exec(select(User).where(User.email == email)).first()

    if not db_user or not verify_password(password, db_user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # Create JWT token
    access_token = create_access_token(
        data={"sub": db_user.email},
        extra_claims={"role": db_user.role}
    )

    return UserResponse(
        employeeId=db_user.id,
        name=db_user.name,
        role=db_user.role,
        access_token=access_token,
        message=f"Welcome, {db_user.name}!"
    )

# ----------------------------
# Reset Password
# ----------------------------
@router.post("/reset_password")
async def reset_password(req: ResetPasswordRequest, session: Session = Depends(get_session)):
    email = req.email.strip().lower()
    old_password = req.current_password.strip()
    new_password = req.new_password.strip()

    # 1️⃣ Check if the email exists
    statement = select(User).where(User.email == email)
    db_user = session.exec(statement).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="Email not found")

    # 2️⃣ Verify old password
    if not verify_password(old_password, db_user.password_hash):
        raise HTTPException(status_code=401, detail="Current password is incorrect")

    # 3️⃣ Hash the new password and update
    db_user.password_hash = hash_password(new_password)
    session.add(db_user)
    session.commit()

    return {"status": "success", "message": "Password updated successfully"}
    

# ----------------------------
# Forgot Password
# ----------------------------
@router.post("/forgot_password")
async def forgot_password(req: ForgotPasswordRequest, session: Session = Depends(get_session)):
    try:
        # Bind email parameter correctly
        query = text("SELECT forgot_password(:email)").bindparams(email=req.email.lower())
        temp_password = session.exec(query).first()

        if not temp_password:
            raise HTTPException(status_code=404, detail="Email not found")

        email_sent = await send_login_email(req.email, temp_password[0] if isinstance(temp_password, tuple) else temp_password)
        if not email_sent:
            raise HTTPException(status_code=500, detail="Failed to send email")

        session.commit()
        return {"status": "success", "message": f"Temporary password sent to {req.email}"}
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    

    # ----------------------------
# Get all managers
# ----------------------------
@router.get("/managers")
async def display_managers(session: Session = Depends(get_session)):
    statement = select(User.id, User.name).where(User.role == "Manager")
    managers = session.exec(statement).all()
    manager_list = [{"id": m[0], "name": m[1]} for m in managers]
    return {"managers": manager_list}

# ----------------------------
# Get all HRs
# ----------------------------
@router.get("/hrs")
async def display_hrs(session: Session = Depends(get_session)):
    statement = select(User.id, User.name).where(User.role == "HR")
    hrs = session.exec(statement).all()
    hr_list = [{"id": h[0], "name": h[1]} for h in hrs]
    return {"HRs": hr_list}

# ----------------------------
# Get all employees with their assigned HRs and Managers
# ----------------------------
