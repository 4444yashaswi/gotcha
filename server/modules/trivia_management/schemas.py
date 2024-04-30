from pydantic import BaseModel
from typing import List

class RoomData(BaseModel):
    roomId: str
    userName: str
    name: str
    rounds: int