from fastapi import HTTPException, status


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