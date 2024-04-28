from fastapi import APIRouter, Header, HTTPException, status, Request, File, Query
from fastapi.params import Depends
import logging

from config.config import Constants
from config.config import settings
from config.database import db
from config import models
from . import schemas

router = APIRouter(
    # prefix = "/",
    responses={404: {"description": "Not found"}}
)

logger = logging.getLogger(__name__)

# API to join a room



# API to create & join a room
@router.post("/createRoom")
def create_room(request: Request, room_data: schemas.RoomData):
    try:
            rooms = db["rooms"]
            # Insert the room data into MongoDB
            room = models.Room(
                id=room_data.roomId,
                rounds=room_data.rounds,
                name=room_data.name,
                trivia_list=[]
            ).model_dump()
            result = rooms.insert_one(room)
            return {"id": str(result.inserted_id)}
    
    except HTTPException as e:
        logger.error(f"Error while  creating room: {str(e)}")
        raise HTTPException(status_code=e.status_code, detail=e.detail)
    
    except Exception as e:
        logger.error(f"Error while  creating room: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Something went wrong!")