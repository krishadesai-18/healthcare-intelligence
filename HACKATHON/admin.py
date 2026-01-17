from fastapi import APIRouter
from database import profiles

router = APIRouter()

@router.get("/analytics")
def analytics():
    total_users = len(profiles)
    skill_count = {}

    for profile in profiles.values():
        for skill in profile["skills"]:
            skill_count[skill] = skill_count.get(skill, 0) + 1

    return {
        "total_users": total_users,
        "popular_skills": skill_count
    }
