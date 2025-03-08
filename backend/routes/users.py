from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import schemas, models, auth
from database import SessionLocal
from database import get_db

router = APIRouter(prefix="/users", tags=["users"])

@router.post("/signup", response_model=schemas.UserOut)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = models.User(
        email=user.email,
        hashed_password=auth.get_password_hash(user.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@router.post("/token")
def login(form_data: schemas.UserCreate, db: Session = Depends(get_db)):
    user = auth.authenticate_user(db, form_data.email, form_data.password)
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect credentials")
    access_token = auth.create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@router.get("/me", response_model=schemas.UserOut)
def read_users_me(current_user: models.User = Depends(auth.get_current_user)):
    return current_user

@router.put("/me", response_model=schemas.UserOut)
def update_user_profile(
    user_update: schemas.UserUpdate, 
    current_user: models.User = Depends(auth.get_current_user), 
    db: Session = Depends(get_db)
):
    """
    Updates the user profile (bio, social_links) for the current user.
    """
    db_user = db.query(models.User).filter(models.User.id == current_user.id).first()
    
    if not db_user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    if user_update.bio:
        db_user.bio = user_update.bio
    if user_update.social_links:
        db_user.social_links = user_update.social_links
    
    db.commit()
    db.refresh(db_user)

    return db_user


@router.get("/dashboard")
def dashboard(current_user: models.User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    posts = db.query(models.Post).filter(models.Post.owner_id == current_user.id).all()
    comments = db.query(models.Comment).filter(models.Comment.owner_id == current_user.id).all()
    return {"user": current_user, "posts": posts, "comments": comments}
