from fastapi import HTTPException, status
from config.config import Constants
from config.config import SocketModel


# Room and user validation function
async def room_user_validation(room_id, user_name, db):
    rooms_db = db["rooms"]

    room = rooms_db.find_one({"id": room_id})
    
    if room is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Room not found with id: {room_id}")
    
    if user_name:
        user_list = [user["name"] for user in room["user_list"]]
        if user_name not in user_list:
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
                "avatarColor": user["avatar_colour"],
                "isReady": user["is_ready"]
            }
    return user_obj

async def remove_user(room_id, user_name, db):
    # ToDo: Complete code including room delete if no players left
    pass

# Function update flag and check all users in the game to update room status
async def update_user_room_status(user_data: SocketModel, room, db):
    room_db = db["rooms"]
    
    # check room flag for relevant info
    if room["room_status"] != user_data.status:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Not valid status for {user_data.userName}")
    
    status_count = 0

    for user in room["user_list"]:
        if user["name"] == user_data.userName:
            room_db.update_one(
                {"id": user_data.roomId, "user_list.name": user["name"]},
                {"$set": {f"user_list.$.{Constants.USER_STATUS_FLAG_MAPPING[user_data.status]}": True}}
            )
            status_count += 1        
        
        elif user[Constants.USER_STATUS_FLAG_MAPPING[user_data.status]]:
            status_count += 1
    
    if status_count == len(room["user_list"]):
        # ToDo: Send Appropriate response to caller
        # Lobby -> Submit -> Select -> Ready -> Submit
        if room["status"] == Constants.ROOM_STATUS_SCORE:
             room_db.update_one(
                {"id": user_data.roomId},
                {"$set": {"current_round": room["current_round"] + 1}}
            )
        room_db.update_one(
            {"id": user_data.roomId},
            {"$set": {"room_status": Constants.NEXT_ROOM_STATUS_MAPPING[room["status"]]}}
        )
        return "State change response"
    
    else:
        # ToDo: Send appropriate response to caller
        return "No state change response"