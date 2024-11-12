from uuid import UUID
from typing import List

from fastapi import APIRouter, HTTPException, status, Depends

from api.dependencies.repositories import get_repository
from db.repositories.entries import EntryRepository
from schemas.entries import EntryCreate, EntryRead

router = APIRouter()


@router.get(
    "/",
    status_code=status.HTTP_200_OK,
    name="Entries",
)
async def get_entries(
    entries_repository: EntryRepository = Depends(get_repository(EntryRepository)),
) -> List[EntryRead]:

    return await entries_repository.list()


@router.get(
    "/{entry_id}",
    status_code=status.HTTP_200_OK,
    name="Entry",
)
async def get_entry(
    entry_id: UUID,
    entries_repository: EntryRepository = Depends(get_repository(EntryRepository)),
):
    entry = await entries_repository.get(
        entry_id=entry_id
    )

    if not entry:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Entry not found")

    return entry


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    name="Create Entry",
)
async def create_entry(
    entry_create: EntryCreate,
    entries_repository: EntryRepository = Depends(get_repository(EntryRepository)),
) -> EntryRead:

    return await entries_repository.create(entry_create=entry_create)
