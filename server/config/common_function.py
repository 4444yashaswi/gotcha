from fastapi import HTTPException, status
from config.config import Constants
from config.config import SocketModel


# Room and user validation function
def room_user_validation(room_id, user_name, db):
    rooms_db = db["rooms"]

    room = rooms_db.find_one({"id": room_id})
    
    if room is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Room not found with id: {room_id}")
    
    if user_name:
        user_list = [user["name"] for user in room["user_list"]]
        if user_name not in user_list:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"User {user_name} not found in room with id: {room_id}")
    
    return room



# Function update flag and check all users in the game to update room status
def update_user_room_status(user_data: SocketModel, room, db):
    rooms_db = db["rooms"]
    
    # check room flag for relevant info
    if room["room_status"] != user_data.status:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=f"Not valid status for {user_data.userName}")
    
    status_count = 0

    for user in room["user_list"]:
        if user["name"] == user_data.userName:
            # ToDo: write mongodb query to Update user status
            status_count += 1        
        
        elif user[Constants.USER_STATUS_FLAG_MAPPING[user_data.status]]:
            status_count += 1
    
    if status_count == len(room["user_list"]):
        # ToDo: 1. Update room status to next status. 2. Send Appropriate response to caller
        # Lobby -> Submit -> Select -> Ready -> Submit
        return "State change response"
    
    else:
        # ToDo: 1. Send appropriate response to caller
        return "No state change response"