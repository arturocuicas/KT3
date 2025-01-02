from datetime import datetime
from uuid import UUID, uuid4

from sqlmodel import select, func
from sqlmodel.ext.asyncio.session import AsyncSession

from db.tables.accounts import Account
from db.tables.entries import Entry
from schemas.entries import EntryCreate, EntryRead


class EntryRepository:
    def __init__(self, session: AsyncSession):
        self.session = session

    async def _get_instance(self, entry_id: UUID):
        statement = select(Entry).where(Entry.id == entry_id)
        results = await self.session.exec(statement)

        return results.first()

    async def create(self, entry_create: EntryCreate):
        db_entry = Entry(
            id=uuid4(),
            date_period=entry_create.date_period,
            description=entry_create.description,
            amount=entry_create.amount,
            account_id=entry_create.account_id,
            created_at=datetime.now(),
            updated_at=datetime.now(),
        )
        self.session.add(db_entry)
        await self.session.commit()
        await self.session.refresh(db_entry)

        account = await self.session.get(Account, db_entry.account_id)

        return EntryRead(
            id=db_entry.id,
            description=db_entry.description,
            date_period=db_entry.date_period,
            amount=db_entry.amount,
            account_id=db_entry.account_id,
            account_name=account.name,
            created_at=db_entry.created_at,
            updated_at=db_entry.updated_at,
        )

    async def get(self, entry_id: UUID):
        db_entry = await self._get_instance(entry_id)

        if not db_entry:
            return None

        account = await self.session.get(Account, db_entry.account_id)

        return EntryRead(
            id=db_entry.id,
            description=db_entry.description,
            date_period=db_entry.date_period,
            amount=db_entry.amount,
            account_id=db_entry.account_id,
            account_name=account.name,
            created_at=db_entry.created_at,
            updated_at=db_entry.updated_at,
        )

    async def list(self):
        statement = select(Entry)
        results = await self.session.exec(statement)
        entries_list = [entry for entry in results.all()]
        account_ids = set([entry.account_id for entry in entries_list])

        statement = select(Account).where(Account.id.in_(account_ids))
        results = await self.session.exec(statement)
        accounts = {account.id: account for account in results.all()}

        return [
            EntryRead(
                id=entry.id,
                description=entry.description,
                date_period=entry.date_period,
                amount=entry.amount,
                account_id=entry.account_id,
                account_name=accounts[entry.account_id].name,
                created_at=entry.created_at,
                updated_at=entry.updated_at,
            )
            for entry in entries_list
        ]
