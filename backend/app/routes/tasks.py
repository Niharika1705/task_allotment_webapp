from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.dependencies import get_db
from app.models.task import Task
from app.schemas.schemas import (
    TaskCreate,
    TaskResponse,
    TaskUpdate
)

router = APIRouter()


@router.post("/tasks", response_model=TaskResponse)
def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db)
):

    new_task = Task(
        title=task.title,
        description=task.description,
        assigned_to=task.assigned_to,
        status="Not Started"
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task


@router.get("/tasks",
            response_model=list[TaskResponse])
def get_tasks(
    db: Session = Depends(get_db)
):

    tasks = db.query(Task).all()

    return tasks


# NEW ROUTE
@router.get("/tasks/user/{user_id}",
            response_model=list[TaskResponse])
def get_user_tasks(
    user_id: int,
    db: Session = Depends(get_db)
):

    tasks = db.query(Task).filter(
        Task.assigned_to == user_id
    ).all()

    return tasks


@router.get("/tasks/{task_id}",
            response_model=TaskResponse)
def get_task(
    task_id: int,
    db: Session = Depends(get_db)
):

    task = db.query(Task).filter(
        Task.id == task_id
    ).first()

    if not task:
        return {"message": "Task not found"}

    return task


@router.put("/tasks/{task_id}",
            response_model=TaskResponse)
def update_task(
    task_id: int,
    updated_task: TaskUpdate,
    db: Session = Depends(get_db)
):

    task = db.query(Task).filter(
        Task.id == task_id
    ).first()

    if not task:
        return {"message": "Task not found"}

    task.status = updated_task.status

    db.commit()
    db.refresh(task)

    return task