import random
from fastapi import WebSocket, APIRouter, Header, HTTPException, status, Request, File, Query
from fastapi.params import Depends
import logging
from typing import List, Dict

from config.config import Constants
from config.config import settings
from config.database import get_db
from config.common_function import room_user_validation, room_admin_validation
from config import models
from . import schemas

router = APIRouter(
    # prefix = "/",
    responses={404: {"description": "Not found"}}
)

logger = logging.getLogger(__name__)

rooms: Dict[str, List[WebSocket]] = {}
db = get_db()

# WebSocket route for listening to events
@router.websocket("/listen")
async def websocket_listen(room_id: str, user_name: str, websocket: WebSocket):
    # Cleaning
    rooms_to_delete = [room for room in rooms if not rooms[room]]
    for room in rooms_to_delete:
        del rooms[room]

    # Joining
    if room_id in rooms:
        room_validation = await room_user_validation(room_id=room_id, user_name=user_name, db= db)
    else:
        room_validation = await room_admin_validation(room_id=room_id, user_name=user_name, db= db)
        rooms[room_id] = []
    await websocket.accept()
    rooms[room_id].append(websocket)
    try:
        while True:
            message = await websocket.receive_text()
            print(f"Received nessage from client: {message}")
    except Exception as e:
        logger.error(f"Error in web socket: {str(e)}")
        rooms[room_id].remove(websocket)

# Function to publish message to listeners of an event
async def publish_message(event: str, message: dict):
    print("publish")
    if event in rooms:
        for room in rooms[event]:
            try:
                await room.send_json(message)
            except Exception as e:
                logger.error(f"Error in web socket: {str(e)}")
                rooms[event].remove()

@router.get("/trigger/{event}")
async def trigger_events(event: str, message: dict):
    if event in rooms:
        await publish_message(event=event, message=message)
        return {"detail":f"Message published to {event} listeners"}
    else:
        logger.error(f"Event {event} not found")
        raise HTTPException(status_code=404, detail=f"Event {event} not supported")
        