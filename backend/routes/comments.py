from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import schemas, models, auth
from database import SessionLocal, get_db
from typing import List

router = APIRouter(prefix="/comments", tags=["comments"])

@router.post("/", response_model=schemas.CommentOut)
def add_comment(comment: schemas.CommentCreate, db: Session = Depends(get_db),
                current_user: models.User = Depends(auth.get_current_user)):
    new_comment = models.Comment(
        text=comment.text,
        post_id=comment.post_id,
        owner_id=current_user.id,
        parent_id=comment.parent_id
    )
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    return new_comment

@router.get("/{post_id}", response_model=List[schemas.CommentOut])
def get_comments(post_id: int, db: Session = Depends(get_db)):
    return db.query(models.Comment).filter(models.Comment.post_id == post_id).all()

@router.delete("/{comment_id}")
def delete_comment(comment_id: int, db: Session = Depends(get_db),
                   current_user: models.User = Depends(auth.get_current_user)):
    comment = db.query(models.Comment).filter(models.Comment.id == comment_id, models.Comment.owner_id == current_user.id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found or unauthorized")
    db.delete(comment)
    db.commit()
    return {"message": "Comment deleted successfully"}
