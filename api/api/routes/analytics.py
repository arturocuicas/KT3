from fastapi import APIRouter, HTTPException, status, Depends

from api.dependencies.repositories import get_db
from business_logic.analytics import AnalyticLogic

router = APIRouter()


@router.get(
    "/account_groups_total",
    status_code=status.HTTP_200_OK,
    name="Get account groups totals",
)
async def get_account_groups_totals(
    session = Depends(get_db),
):
    analytics = AnalyticLogic(session)

    return await analytics.get_account_groups_totals()


@router.get(
    "/accounts_total",
    status_code=status.HTTP_200_OK,
    name="Get accounts totals",
)
async def get_accounts_totals(
    session = Depends(get_db),
):
    analytics = AnalyticLogic(session)

    return await analytics.get_accounts_totals()
