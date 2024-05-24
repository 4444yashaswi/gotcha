from fastapi import APIRouter, Depends

from config.config import Constants
from . import websocket

router = APIRouter(
    prefix=f"/{Constants.WEBSOCKET}",
    tags=[Constants.WEBSOCKET],
    responses={404: {"description": "Not found"}}
)

router.include_router(websocket.router)