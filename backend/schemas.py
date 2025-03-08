# schemas.py
from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# User schemas
class UserBase(BaseModel):
    email: EmailStr

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    bio: Optional[str] = None
    social_links: Optional[str] = None

    class Config:
        orm_mode = True

class UserOut(UserBase):
    id: int
    avatar: Optional[str] = None
    bio: Optional[str] = None
    social_links: Optional[str] = None

    class Config:
        orm_mode = True

# Post schemas
class PostBase(BaseModel):
    title: str
    content: str

class PostCreate(PostBase):
    pass

class PostOut(PostBase):
    id: int
    created_at: datetime
    updated_at: datetime
    owner: UserOut

    class Config:
        orm_mode = True

# Comment schemas
class CommentBase(BaseModel):
    text: str

class CommentCreate(CommentBase):
    post_id: int
    parent_id: Optional[int] = None

class CommentOut(CommentBase):
    id: int
    created_at: datetime
    updated_at: datetime
    owner: UserOut
    parent_id: Optional[int]
    replies: Optional[List['CommentOut']] = []

    class Config:
        orm_mode = True

# Reaction schemas
class ReactionBase(BaseModel):
    type: str

class ReactionCreate(ReactionBase):
    post_id: Optional[int] = None
    comment_id: Optional[int] = None

class ReactionOut(ReactionBase):
    id: int
    user: UserOut

    class Config:
        orm_mode = True

CommentOut.update_forward_refs()
