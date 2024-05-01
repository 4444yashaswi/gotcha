import random
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




# API to create & join a room
def generate_user_object(user_name, avatar_colour):
    user_object = models.User(
        name=user_name,
        avatar_colour=avatar_colour
    )
    return user_object



# API to join a room
@router.post("/joinRoom")
def join_room(request: Request, room_data: schemas.JoinRoomData, db = Depends(get_db)):
    try:
        rooms_db = db["rooms"]

        room = rooms_db.find_one({"id": room_data.roomId})
        
        if room is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Room not found with id: {room_data.roomId}")
        
        
        user_list = [{
            "name": user["name"],
            "avatarColor": user["avatar_colour"],
            "isReady": user["is_ready"]
        } for user in room["user_list"]]

        for user in user_list:
            if user["name"] == room_data.userName:
                raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Duplicate name")

        response = {
            "detail": "Room details fetched successfully",
            "roomId": room_data.roomId,
            "playersList": user_list
        }
        
        user = generate_user_object(user_name=room_data.userName, avatar_colour=room_data.avatarColour).model_dump()
        
        new_user_list = room["user_list"]
        new_user_list.append(user)
        
        rooms_db.update_one({"id": room["id"]}, {"$set": {"user_list": new_user_list}})
        
        return response
    
    except HTTPException as e:
        logger.error(f"Error while  creating room: {str(e)}")
        raise HTTPException(status_code=e.status_code, detail=e.detail)
    
    except Exception as e:
        logger.error(f"Error while  creating room: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Something went wrong!")



def generate_random_trivia_questions_list(rounds, db):
    trivias_db = db["trivias"]
    
    # Create an aggregation pipeline with the $sample stage
    pipeline = [{"$sample": {"size": rounds}}]

    # Execute the aggregation pipeline
    random_trivia = list(trivias_db.aggregate(pipeline))

    trivia_list = [models.TriviaListElement(
        round_number= i+1,
        trivia=trivia["question_template"]
    ) for i, trivia in enumerate(random_trivia)]

    return trivia_list


@router.post("/createRoom")
def create_room(request: Request, room_data: schemas.CreateRoomData, db = Depends(get_db)):
    try:
            rooms_db = db["rooms"]
            
            # get unique room name
            random_name = f"{random.choice(Constants.FOUR_LETTER_WORDS)} {random.choice(Constants.FOUR_LETTER_WORDS)}"
            while rooms_db.find_one({"id": random_name}) is not None: 
                random_name = f"{random.choice(Constants.FOUR_LETTER_WORDS)} {random.choice(Constants.FOUR_LETTER_WORDS)}"
            
            user = generate_user_object(user_name=room_data.userName, avatar_colour=room_data.avatarColour)
            trivia_list = generate_random_trivia_questions_list(rounds=room_data.rounds, db=db)

            room = models.Room(
                id=random_name,
                admin=room_data.userName,
                rounds=room_data.rounds,
                user_list=[user],
                trivia_list=trivia_list,
                trivia_associated_users=[]
            ).model_dump()

            
            # result = rooms_db.insert_one(room)
            # return {"id": str(result.inserted_id)}
            result = rooms_db.insert_one(room)
            
            response = {
                "detail": "Room created",
                "roomId": random_name
            }

            return response

    
    except HTTPException as e:
        logger.error(f"Error while  creating room: {str(e)}")
        raise HTTPException(status_code=e.status_code, detail=e.detail)
    
    except Exception as e:
        logger.error(f"Error while  creating room: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Something went wrong!")