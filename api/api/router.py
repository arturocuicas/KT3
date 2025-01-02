from fastapi import APIRouter

from api.routes.account_groups import router as account_groups_router
from api.routes.accounts import router as accounts_router
from api.routes.entries import router as entries_router
from api.routes.analytics import router as analytics_router

router = APIRouter()

router.include_router(account_groups_router, tags=["Account Groups"], prefix="/account_groups")
router.include_router(accounts_router, tags=["Accounts"], prefix="/accounts")
router.include_router(entries_router, tags=["Entries"], prefix="/entries")
router.include_router(analytics_router, tags=["Analytics"], prefix="/analytics")
