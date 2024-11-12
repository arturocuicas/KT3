from sqlmodel import JSON, Column, Field, SQLModel

from db.tables.base_class import TimestampModel, UUIDModel


class AccountGroupBase(SQLModel):
    name: str = Field(nullable=True)


class AccountGroup(AccountGroupBase, TimestampModel, UUIDModel, table=True):
    __tablename__ = 'account_groups'

    def __repr__(self):
        return f"<AccountGroup {self.name}>"
