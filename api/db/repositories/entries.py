from datetime import datetime
from uuid import UUID, uuid4

from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

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

        return EntryRead(**db_entry.dict())

    async def get(self, entry_id: UUID):
        db_entry = await self._get_instance(entry_id)

        if not db_entry:
            return None

        return EntryRead(**db_entry.dict())

    async def list(self):
        statement = select(Entry)
        results = await self.session.exec(statement)
        entries_list = [EntryRead(**entry.dict()) for entry in results.all()]

        return entries_list
