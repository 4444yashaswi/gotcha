from fastapi import APIRouter, Header, HTTPException, status, Request, File, Query
from fastapi.params import Depends
import logging

from config.config import Constants
from config.config import settings
from config.database import get_db
from config import models
from . import schemas

router = APIRouter(
    # prefix = "/",
    responses={404: {"description": "Not found"}}
)

logger = logging.getLogger(__name__)

# Dummy API
@router.get("/hit")
def dummy_api(request: Request, name: str):
     try:
          response = {"detail": f"Hello {name}", "roomId": "code chef"}
          return response
     
     except Exception as e:
          logger.error(f"Error while dummy API hit: {str(e)}")
          raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Something went wrong!")

# API to join a room



# API to create & join a room
# 1. create user -> helper function
# 2. get unique room name
# 3. create room
# 4. get/set list of TriviaListElement based on number of rounds -> helper function -> API
@router.post("/createRoom")
def create_room(request: Request, room_data: schemas.RoomData, db = Depends(get_db)):
    try:
            rooms_db = db["rooms"]
            # Insert the room data into MongoDB
            room = models.Room(
                id=room_data.roomId,
                rounds=room_data.rounds,
                name=room_data.name,
                trivia_list=[]
            ).model_dump()
            result = rooms_db.insert_one(room)
            return {"id": str(result.inserted_id)}
    
    except HTTPException as e:
        logger.error(f"Error while  creating room: {str(e)}")
        raise HTTPException(status_code=e.status_code, detail=e.detail)
    
    except Exception as e:
        logger.error(f"Error while  creating room: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Something went wrong!")