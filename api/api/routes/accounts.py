from uuid import UUID
from typing import List

from fastapi import APIRouter, HTTPException, status, Depends

from api.dependencies.repositories import get_repository
from db.repositories.accounts import AccountRepository
from schemas.accounts import AccountCreate, AccountRead

router = APIRouter()


@router.get(
    "/",
    status_code=status.HTTP_200_OK,
    name="Accounts",
)
async def get_accounts(
    accounts_repository: AccountRepository = Depends(get_repository(AccountRepository)),
) -> List[AccountRead]:

    return await accounts_repository.list()


@router.get(
    "/{account_id}",
    status_code=status.HTTP_200_OK,
    name="Account",
)
async def get_account(
    account_id: UUID,
    accounts_repository: AccountRepository = Depends(get_repository(AccountRepository)),
):
    account = await accounts_repository.get(
        account_id=account_id
    )

    if not account:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Account not found")

    return account


@router.post(
    "/",
    status_code=status.HTTP_201_CREATED,
    name="Create Account",
)
async def create_account(
    account_create: AccountCreate,
    accounts_repository: AccountRepository = Depends(get_repository(AccountRepository)),
):
    return await accounts_repository.create(account_create=account_create)
