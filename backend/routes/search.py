from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
import schemas, models
from database import SessionLocal, get_db
from typing import List

router = APIRouter(prefix="/search", tags=["search"])

@router.get("/", response_model=List[schemas.PostOut])
def search_posts(query: str, db: Session = Depends(get_db)):
    posts = db.query(models.Post).filter(models.Post.title.ilike(f"%{query}%")).all()
    return posts
