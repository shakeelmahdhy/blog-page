from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import schemas, models, auth
from database import SessionLocal, get_db
from typing import List

router = APIRouter(prefix="/posts", tags=["posts"])

@router.post("/", response_model=schemas.PostOut)
def create_post(post: schemas.PostCreate, db: Session = Depends(get_db),
                current_user: models.User = Depends(auth.get_current_user)):
    new_post = models.Post(title=post.title, content=post.content, owner_id=current_user.id)
    db.add(new_post)
    db.commit()
    db.refresh(new_post)
    return new_post

@router.get("/", response_model=List[schemas.PostOut])
def get_posts(db: Session = Depends(get_db)):
    return db.query(models.Post).all()

@router.get("/{post_id}", response_model=schemas.PostOut)
def get_post(post_id: int, db: Session = Depends(get_db)):
    post = db.query(models.Post).filter(models.Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@router.put("/{post_id}", response_model=schemas.PostOut)
def update_post(post_id: int, post: schemas.PostCreate, db: Session = Depends(get_db),
                current_user: models.User = Depends(auth.get_current_user)):
    db_post = db.query(models.Post).filter(models.Post.id == post_id, models.Post.owner_id == current_user.id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found or unauthorized")
    db_post.title = post.title
    db_post.content = post.content
    db.commit()
    db.refresh(db_post)
    return db_post

@router.delete("/{post_id}")
def delete_post(post_id: int, db: Session = Depends(get_db),
                current_user: models.User = Depends(auth.get_current_user)):
    db_post = db.query(models.Post).filter(models.Post.id == post_id, models.Post.owner_id == current_user.id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found or unauthorized")
    db.delete(db_post)
    db.commit()
    return {"message": "Post deleted successfully"}
