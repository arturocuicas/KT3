from datetime import datetime
from uuid import UUID, uuid4

from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from db.tables.accounts import Account
from db.tables.account_groups import AccountGroup
from schemas.accounts import AccountCreate, AccountRead


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

        account_group = await self.session.get(AccountGroup, db_account.account_group_id)

        return AccountRead(
            id=db_account.id,
            code=db_account.code,
            name=db_account.name,
            account_group_id=db_account.account_group_id,
            account_group_name=account_group.name,
            created_at=db_account.created_at,
            updated_at=db_account.updated_at,
        )

    async def get(self, account_id: UUID):
        db_account = await self._get_instance(account_id)

        if not db_account:
            return None

        account_group = await self.session.get(AccountGroup, db_account.account_group_id)

        return AccountRead(
            id=db_account.id,
            code=db_account.code,
            name=db_account.name,
            account_group_id=db_account.account_group_id,
            account_group_name=account_group.name,
            created_at=db_account.created_at,
            updated_at=db_account.updated_at,
        )

    async def list(self):
        statement = select(Account)
        results = await self.session.exec(statement)
        accounts_list = [account for account in results.all()]
        account_groups_ids = set([account.account_group_id for account in accounts_list])

        statement = select(AccountGroup).where(AccountGroup.id.in_(account_groups_ids))
        results = await self.session.exec(statement)
        account_groups = {account_group.id: account_group for account_group in results.all()}

        return [
            AccountRead(
                id=account.id,
                code=account.code,
                name=account.name,
                account_group_id=account.account_group_id,
                account_group_name=account_groups[account.account_group_id].name,
                created_at=account.created_at,
                updated_at=account.updated_at,
            )
            for account in accounts_list
        ]
