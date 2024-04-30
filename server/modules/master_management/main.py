from fastapi import APIRouter, Depends

from config.config import Constants
from . import master_management

router = APIRouter(
    prefix=f"/{Constants.MASTER_MANAGEMENT}",
    tags=[Constants.MASTER_MANAGEMENT],
    responses={404: {"description": "Not found"}}
)

router.include_router(master_management.router)