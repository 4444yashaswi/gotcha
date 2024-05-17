from fastapi import APIRouter, Header, HTTPException, status, Request, File, Query
from fastapi.params import Depends
from typing import List
import logging
import random

from config.common_function import room_user_validation
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


def get_random_users(user_list: List[dict], count: int) -> List[dict]:
    # return random.sample(user_list, count)
    return random.sample([{"name": user["name"], "avatarColour": user["avatar_colour"]} for user in user_list], count) # Trivia associated users



@router.get("/getQuestion")
def get_question(request: Request, roomId: str, userName: str, db = Depends(get_db)):
    try:
        room_db = db["rooms"]

        # Validate room and user
        room = room_user_validation(room_id=roomId, user_name=userName, db=db)
        
        # Validate room status in Submit
        if room["room_status"] != Constants.ROOM_STATUS_SUBMIT:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Can not get question, not valid status for {roomId}")
        
        trivia = room["trivia_list"][room["current_round"] - 1]
        
        if not room["trivia_associated_users"]: # ToDo: Empty out trivia associated users while moving to next screens
            required_user_count = trivia["trivia"].count(Constants.USER_NAME_PLACEHOLDER)
            user_list = room["user_list"]

            if required_user_count > len(user_list):
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Not enough users in the room to assign to the trivia question")
            
            selected_users = get_random_users(user_list, required_user_count)

            room_db.update_one({"id": roomId}, {"$set": {"trivia_associated_users": selected_users}})
        
        else:
            # Retrieve the associated users for the current round
            selected_users = room["trivia_associated_users"]
            
        
        # Replace the <user_name> placeholders with the associated user names
        updated_trivia = trivia["trivia"]
        for user in selected_users:
            updated_trivia = updated_trivia.replace(Constants.USER_NAME_PLACEHOLDER, user["name"], 1)
        
        response = {
            "roomId": roomId,
            "round": room["current_round"],
            "trivia": updated_trivia,
            "associated_users": selected_users
        }

        return response


    except HTTPException as e:
        logger.error(f"Error while getting question: {str(e)}")
        raise HTTPException(status_code=e.status_code, detail=e.detail)
    
    except Exception as e:
        logger.error(f"Error while getting question: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Something went wrong!")




@router.post("/submitAnswer")
def submit_answer(request: Request, answer_data: schemas.AnswerData, db = Depends(get_db)):
    try:
        room_db = db["rooms"]

        # Validate room and user
        room = room_user_validation(room_id=answer_data.roomId, user_name=answer_data.userName, db=db)

        # Validate room status in Submit
        if room["room_status"] != Constants.ROOM_STATUS_SUBMIT:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Can not submit answer, not valid status for {answer_data.roomId}")

        answer_data.answer = answer_data.answer.lower()
        answer = models.Answer(
            response=answer_data.answer
        ).model_dump()

        user = next((user for user in room["user_list"] if user["name"] == answer_data.userName), None)

        if user["has_submitted"] == True:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Answer already submitted for {answer_data.userName}")
        
        # Check for duplicate answers
        for existing_user in room["user_list"]:
            if existing_user.get("answer") and existing_user["answer"] == answer:
                raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Duplicate answer found")

        # Update the answer for the specific user
        room_db.update_one(
            {"id": answer_data.roomId, "user_list.name": answer_data.userName},
            {"$set": {"user_list.$.answer": answer, "user_list.$.has_submitted": True}}
        )

        response = {
            "roomId": answer_data.roomId,
            "round": room["current_round"],
            "detail": "Answer submitted successfully!"
        }

        return response



    except HTTPException as e:
        logger.error(f"Error while submitting ansewer: {str(e)}")
        raise HTTPException(status_code=e.status_code, detail=e.detail)
    
    except Exception as e:
        logger.error(f"Error while submitting ansewer: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Something went wrong!")