from uuid import UUID

from sqlmodel import SQLModel, Field

from db.tables.base_class import TimestampModel, UUIDModel


class AccountBase(SQLModel):
    code: int = Field(nullable=True)
    name: str = Field(nullable=True)
    account_group_id: UUID = Field(nullable=True)


class Account(AccountBase, TimestampModel, UUIDModel, table=True):
    __tablename__ = 'accounts'

    def __repr__(self):
        return f"<Account {self.name}>"
