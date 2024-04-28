from pydantic import BaseModel
from typing import List

class RoomData(BaseModel):
    roomId: str
    userId: str
    name: str
    rounds: int