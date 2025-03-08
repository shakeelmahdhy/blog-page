from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import schemas, models, auth
from database import SessionLocal, get_db

router = APIRouter(prefix="/reactions", tags=["reactions"])

@router.post("/", response_model=schemas.ReactionOut)
def add_reaction(reaction: schemas.ReactionCreate, db: Session = Depends(get_db),
                 current_user: models.User = Depends(auth.get_current_user)):
    if not reaction.post_id and not reaction.comment_id:
        raise HTTPException(status_code=400, detail="Must provide post_id or comment_id")
    new_reaction = models.Reaction(
        type=reaction.type,
        user_id=current_user.id,
        post_id=reaction.post_id,
        comment_id=reaction.comment_id
    )
    db.add(new_reaction)
    db.commit()
    db.refresh(new_reaction)
    return new_reaction
