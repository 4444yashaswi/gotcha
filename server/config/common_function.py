from fastapi import HTTPException, status
from config.config import Constants
from config.config import SocketModel

import logging

logger = logging.getLogger(__name__)

# Room and user validation function
async def room_user_validation(room_id, user_name, db):
    rooms_db = db["rooms"]

    room = rooms_db.find_one({"id": room_id})
    
    if room is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Room not found with id: {room_id}")
    
    if user_name and not any(user["name"] == user_name for user in room["user_list"]):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"User {user_name} not found in room with id: {room_id}")
    
    return room

async def room_admin_validation(room_id, user_name, db):
    rooms_db = db["rooms"]

    room = rooms_db.find_one({"id": room_id})
    
    if room is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Room not found with id: {room_id}")
    
    if user_name:
        if user_name != room["admin"]:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"User {user_name} not admin for room with id: {room_id}")
    
    return room


async def get_user(room_id, user_name, db):
    room = await room_user_validation(room_id= room_id, user_name= user_name, db= db)
    for user in room["user_list"]:
        if user["name"] == user_name:
            user_obj = {
                "name": user["name"],
                "avatarColour": user["avatar_colour"],
                "isReady": user["is_ready"]
            }
    return user_obj

# Function to delete user from room if disconnected
async def remove_user(room_id, user_name, db):
    room_db = db["rooms"]

    # Remove the user from the room
    result = room_db.update_one(
        {"id": room_id},
        {"$pull": {"user_list": {"name": user_name}}}
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Room not found")
    logger.info(f"Removed User: {user_name} from Room: {room_id}")

    # Check if the room has any users left
    room = room_db.find_one({"id": room_id})
    if room and len(room["user_list"]) == 0:
        # No players left, delete the room
        room_db.delete_one({"id": room_id})
        logger.info(f"Removed Room: {room_id}")
    

# Function update flag and check all users in the game to update room status
async def update_user_room_status(user_data: SocketModel, room, db):
    room_db = db["rooms"]
    
    # check room flag for relevant info
    if room["room_status"] != user_data.flag.capitalize():
        if not (room["room_status"] == "Lobby" and user_data.flag.capitalize() == "Ready"):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Not valid status for {user_data.userName}")
    
    status_count = 0

    for user in room["user_list"]:
        if user["name"] == user_data.userName:
            room_db.update_one(
                {"id": user_data.roomId, "user_list.name": user["name"]},
                {"$set": {f"user_list.$.{Constants.USER_STATUS_FLAG_MAPPING[user_data.flag.capitalize()]}": True}}
            )
            status_count += 1        
        
        elif user[Constants.USER_STATUS_FLAG_MAPPING[user_data.flag.capitalize()]]:
            status_count += 1
    
    if status_count == len(room["user_list"]):        
        # Lobby -> Submit -> Select -> Ready -> Submit -> Select
        if room["room_status"] == Constants.ROOM_STATUS_SELECT:
             room_db.update_one(
                {"id": user_data.roomId},
                {"$set": {"current_round": room["current_round"] + 1, 
                          "trivia_associated_users": []}} # Removing all trivia associated users
            )
        room_db.update_one(
            {"id": user_data.roomId},
            {"$set": {"room_status": Constants.NEXT_ROOM_STATUS_MAPPING[room["room_status"]]}}
        )
        user_data.isAll = True
        # Set all users' flag to False
        status_flag = Constants.USER_STATUS_FLAG_MAPPING[user_data.flag.capitalize()]
        room_db.update_one(
            {"id": user_data.roomId},
            {"$set": {f"user_list.$[].{status_flag}": False}}
        )
        
    return user_data