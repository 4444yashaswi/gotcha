from fastapi import APIRouter, Depends

from config.config import Constants
from . import room_management

router = APIRouter(
    prefix=f"/{Constants.ROOM_MANAGEMENT}",
    tags=[Constants.ROOM_MANAGEMENT],
    responses={404: {"description": "Not found"}}
)

router.include_router(room_management.router)