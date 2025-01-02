from datetime import datetime, date
from decimal import Decimal
from uuid import UUID

from pydantic import BaseModel


class EntryCreate(BaseModel):
    description: str
    date_period: date
    amount: Decimal
    account_id: UUID


class EntryUpdate(BaseModel):
    description: str | None = None
    date_period: date | None = None
    amount: Decimal | None = None
    account_id: UUID | None = None


class EntryRead(BaseModel):
    id: UUID
    description: str
    date_period: date
    amount: Decimal
    account_id: UUID
    account_name: str
    created_at: datetime
    updated_at: datetime