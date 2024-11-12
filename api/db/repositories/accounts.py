from datetime import datetime
from uuid import UUID, uuid4

from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from db.tables.accounts import Account
from schemas.accounts import AccountCreate, AccountRead, AccountUpdate


class AccountRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def _get_instance(self, account_id: UUID):
        statement = select(Account).where(Account.id == account_id)
        results = await self.session.exec(statement)

        return results.first()

    async def create(self, account_create: AccountCreate):
        db_account = Account(
            id=uuid4(),
            code=account_create.code,
            name=account_create.name,
            account_group_id=account_create.account_group_id,
            created_at=datetime.now(),
            updated_at=datetime.now(),
        )
        self.session.add(db_account)
        await self.session.commit()
        await self.session.refresh(db_account)

        return AccountRead(**db_account.dict())

    async def get(self, account_id: UUID):
        db_account = await self._get_instance(account_id)

        if not db_account:
            return None

        return AccountRead(**db_account.dict())

    async def list(self):
        statement = select(Account)
        results = await self.session.exec(statement)
        accounts_list = [AccountRead(**account.dict()) for account in results.all()]

        return accounts_list
