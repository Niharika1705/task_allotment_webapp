import re
from pydantic import BaseModel, field_validator


class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str

    @field_validator('email')
    @classmethod
    def validate_email(cls, v: str) -> str:
        trimmed = v.strip()
        if not trimmed:
            raise ValueError('Email address cannot be empty')
        email_regex = r"^[^\s@]+@[^\s@]+\.[^\s@]+$"
        if not re.match(email_regex, trimmed):
            raise ValueError('Invalid email format')
        return trimmed


class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    role: str

    class Config:
        from_attributes = True
class LoginRequest(BaseModel):
    email: str
    password: str

    @field_validator('email')
    @classmethod
    def validate_email(cls, v: str) -> str:
        trimmed = v.strip()
        if not trimmed:
            raise ValueError('Email address cannot be empty')
        email_regex = r"^[^\s@]+@[^\s@]+\.[^\s@]+$"
        if not re.match(email_regex, trimmed):
            raise ValueError('Invalid email format')
        return trimmed
class TaskCreate(BaseModel):
    title: str
    description: str
    assigned_to: int
    priority: str = "Medium"
    eta: str | None = None
    update_url: str | None = None


class TaskResponse(BaseModel):
    id: int
    title: str
    description: str
    status: str
    assigned_to: int
    priority: str
    eta: str | None = None
    update_url: str | None = None

    class Config:
        from_attributes = True
class TaskUpdate(BaseModel):
    status: str
class ApprovalRequestCreate(BaseModel):
    task_id: int
    requested_by: int
    requested_status: str


class ApprovalResponse(BaseModel):
    id: int
    task_id: int
    requested_by: int
    requested_status: str
    approval_status: str

    class Config:
        from_attributes = True