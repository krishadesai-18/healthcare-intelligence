from fastapi import APIRouter
from models import ProfileRequest
from database import profiles

router = APIRouter()

@router.post("/{user_id}")
def save_profile(user_id: str, data: ProfileRequest):
    profiles[user_id] = data.dict()
    return {"status": "Profile saved"}

@router.get("/{user_id}")
def get_profile(user_id: str):
    return profiles.get(user_id, {})
