from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from auth import router as auth_router
from profile import router as profile_router
from skills import router as skills_router
from admin import router as admin_router

app = FastAPI(
    title="Healthcare Skill Intelligence Platform API",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth")
app.include_router(profile_router, prefix="/profile")
app.include_router(skills_router)
app.include_router(admin_router, prefix="/admin")

@app.get("/")
def root():
    return {"status": "Healthcare Skill Intelligence Platform Backend Running"}
