from fastapi import APIRouter
from models import SignupRequest
from database import users
import uuid

router = APIRouter()

@router.post("/signup")
def signup(data: SignupRequest):
    user_id = str(uuid.uuid4())
    users[user_id] = {
        "email": data.email,
        "password": data.password,
        "role": data.role
    }
    return {"user_id": user_id}

@router.post("/login")
def login(data: dict):
    for uid, user in users.items():
        if user["email"] == data["email"] and user["password"] == data["password"]:
            return {"user_id": uid}
    return {"error": "Invalid credentials"}
