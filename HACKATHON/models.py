from pydantic import BaseModel
from typing import List

class SignupRequest(BaseModel):
    email: str
    password: str
    role: str = "student"

class ProfileRequest(BaseModel):
    education: str
    courses: str
    certifications: str
    skills: List[str]
