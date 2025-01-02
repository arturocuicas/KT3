from datetime import datetime
from uuid import UUID, uuid4

from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from db.tables.account_groups import AccountGroup
from schemas.account_groups import AccountGroupCreate, AccountGroupRead


class AccountGroupRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def _get_instance(self, account_group_id: UUID):
        statement = select(AccountGroup).where(AccountGroup.id == account_group_id)
        results = await self.session.exec(statement)

        return results.first()

    async def create(self, account_group_create: AccountGroupCreate):
        db_account_groups = AccountGroup(
            id=uuid4(),
            name=account_group_create.name,
            created_at=datetime.now(),
            updated_at=datetime.now(),
        )
        self.session.add(db_account_groups)
        await self.session.commit()
        await self.session.refresh(db_account_groups)

        return AccountGroupRead(**db_account_groups.dict())

    async def get(self, account_group_id: UUID):
        db_account_groups = await self._get_instance(account_group_id)

        if not db_account_groups:
            return None

        return AccountGroupRead(**db_account_groups.dict())

    async def list(self):
        statement = select(AccountGroup)
        results = await self.session.exec(statement)

        return [
            AccountGroupRead(**account_groups.dict())
            for account_groups in results.all()
        ]
