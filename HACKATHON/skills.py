from fastapi import APIRouter
from database import profiles

router = APIRouter()

ROLE_SKILLS = {
    "health_informatics_analyst": [
        "SQL", "EHR", "FHIR", "HL7", "Data Analytics", "Healthcare Compliance"
    ],
    "healthcare_data_analyst": [
        "Python", "SQL", "Data Visualization", "Healthcare Data", "Statistics"
    ],
    "medical_ai_engineer": [
        "Python", "Machine Learning", "Medical Imaging", "AI Ethics", "HIPAA"
    ]
}

@router.get("/analyze/{user_id}/{role}")
def analyze_skills(user_id: str, role: str):
    user_skills = set(profiles.get(user_id, {}).get("skills", []))
    required_skills = set(ROLE_SKILLS.get(role, []))

    matched = user_skills & required_skills
    missing = list(required_skills - user_skills)

    readiness = int((len(matched) / len(required_skills)) * 100) if required_skills else 0

    return {
        "matched": list(matched),
        "missing": missing,
        "readiness": readiness
    }
