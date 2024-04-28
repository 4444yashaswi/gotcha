from fastapi import APIRouter, Depends

from config.config import Constants
from . import trivia_management

router = APIRouter(
    prefix=f"/{Constants.TRIVIA_MANAGEMENT}",
    tags=[Constants.TRIVIA_MANAGEMENT],
    responses={404: {"description": "Not found"}}
)

router.include_router(trivia_management.router)