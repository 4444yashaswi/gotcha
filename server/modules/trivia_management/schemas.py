from pydantic import BaseModel
from typing import List

class RoomData(BaseModel):
    userName: str
    avatarColour: str
    rounds: int