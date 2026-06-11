from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.db import engine, Base

from app.models.user import User
from app.models.task import Task
from app.models.approval import ApprovalRequest

from app.routes.auth import router as auth_router
from app.routes.tasks import router as task_router
from app.routes.approvals import router as approval_router

# Create database tables
Base.metadata.create_all(bind=engine)

# Create FastAPI app
app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(auth_router)
app.include_router(task_router)
app.include_router(approval_router)

# Home route
@app.get("/")
def home():
    return {"message": "Backend Working u da real art"}