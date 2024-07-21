import random
from fastapi import WebSocket, APIRouter, Header, HTTPException, status, Request, File, Query
from fastapi.params import Depends
import logging
from typing import List, Dict

from config.config import Constants
from config.config import settings
from config.database import get_db
from config.common_function import room_user_validation, room_admin_validation, get_user, remove_user
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
    # Validations
    if room_id in rooms:
        room_validation = await room_user_validation(room_id=room_id, user_name=user_name, db= db)
    else:
        room_validation = await room_admin_validation(room_id=room_id, user_name=user_name, db= db)
        rooms[room_id] = []
    if room_validation["room_status"] != Constants.ROOM_STATUS_LOBBY:
        raise HTTPException(status_code=403, detail="Can not join game already in progress")
    
    # Joining
    await websocket.accept()

    # Inform all existing room users
    user = await get_user(room_id=room_id, user_name=user_name, db=db)
    response = {
        "flag": "JOIN",
        "userName": user["name"],
        "avatarColour": user["avatarColor"],
        "isAll": False
    }
    await publish_message(event=room_id, message=response)

    rooms[room_id].append(websocket)
    try:
        while True:
            message = await websocket.receive_json()
            print(f"Received message from client: {message}")
            await publish_message(event=room_id, message=message)
    except Exception as e:
        logger.error(f"Error in web socket: {str(e)}")
        # removing user
        rooms[room_id].remove(websocket)
        await remove_user(room_id= room_id, user_name= user_name, db= db)
        # Inform all existing room users
        response["flag"] = "LEAVE"
        await publish_message(event=room_id, message=response)
        # Cleaning
        await clean_rooms()

# Function to clean dead rooms
async def clean_rooms():
    rooms_to_delete = [room for room in rooms if not rooms[room]]
    for room in rooms_to_delete:
        del rooms[room]

# Function to publish message to listeners of an event
async def publish_message(event: str, message: dict):
    logger.info(f"publishing for {event}: {message}")
    if event in rooms:
        for room in rooms[event]:
            try:
                await room.send_json(message)
            except Exception as e:
                logger.error(f"Error in web socket: {str(e)}")
                rooms[event].remove()

@router.post("/trigger/{event}")
async def trigger_events(event: str, message: dict):
    if event in rooms:
        await publish_message(event=event, message=message)
        return {"detail":f"Message published to {event} listeners"}
    else:
        logger.error(f"Event {event} not found")
        raise HTTPException(status_code=404, detail=f"Event {event} not supported")
        