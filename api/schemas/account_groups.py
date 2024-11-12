from uuid import UUID
from datetime import datetime

from pydantic import BaseModel


class AccountGroupCreate(BaseModel):
    name: str


class AccountGroupUpdate(BaseModel):
    name: str


class AccountGroupRead(BaseModel):
    id: UUID
    name: str
    created_at: datetime
    updated_at: datetime
