from pydantic import BaseModel


class UserCreate(BaseModel):
    name: str
    email: str
    password: str
    role: str


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
class TaskCreate(BaseModel):
    title: str
    description: str
    assigned_to: int


class TaskResponse(BaseModel):
    id: int
    title: str
    description: str
    status: str
    assigned_to: int

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