from uuid import UUID
from decimal import Decimal
from datetime import date

from sqlmodel import Field, SQLModel

from db.tables.base_class import TimestampModel, UUIDModel


class EntryBase(SQLModel):
    date_period: date = Field(nullable=False)
    description: str = Field(nullable=True)
    amount: Decimal = Field(nullable=False)
    account_id: UUID = Field(nullable=False)


class Entry(EntryBase, TimestampModel, UUIDModel, table=True):
    __tablename__ = 'entries'

    def __repr__(self):
        return f"<Entry {self.description}>"
