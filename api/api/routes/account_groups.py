from uuid import UUID
from typing import List

from fastapi import APIRouter, HTTPException, status, Depends

from api.dependencies.repositories import get_repository
from db.repositories.account_groups import AccountGroupRepository
from schemas.account_groups import AccountGroupCreate, AccountGroupRead

router = APIRouter()


@router.get(
    "/",
    status_code=status.HTTP_200_OK,
    name="Account Groups",
)
async def get_account_groups(
    account_group_repository: AccountGroupRepository = Depends(get_repository(AccountGroupRepository)),
) -> List[AccountGroupRead]:

    return await account_group_repository.list()


@router.get(
    "/{account_group_id}",
    status_code=status.HTTP_200_OK,
    name="Account Group",
)
async def get_account_group(
    account_group_id: UUID,
    account_group_repository: AccountGroupRepository = Depends(get_repository(AccountGroupRepository)),
):
    account_group = await account_group_repository.get(
        account_group_id=account_group_id
    )

    if not account_group:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Account Group not found")

    return account_group


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    name="Create Account Group",
)
async def create_account_group(
    account_group_create: AccountGroupCreate,
    account_group_repository: AccountGroupRepository = Depends(get_repository(AccountGroupRepository)),
):
    return await account_group_repository.create(account_group_create=account_group_create)
