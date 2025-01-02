from datetime import datetime
from uuid import UUID

from pydantic import BaseModel


class AccountCreate(BaseModel):
    code: int
    name: str
    account_group_id: UUID


class AccountUpdate(BaseModel):
    code: int | None = None
    name: str | None = None
    account_group_id: UUID | None = None


class AccountRead(BaseModel):
    id: UUID
    code: int
    name: str
    account_group_id: UUID
    account_group_name: str
    created_at: datetime
    updated_at: datetime