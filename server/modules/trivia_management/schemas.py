from pydantic import BaseModel
from typing import List

class CreateRoomData(BaseModel):
    userName: str
    avatarColour: str
    rounds: int


class JoinRoomData(BaseModel):
    roomId: str
    userName: str
    avatarColour: str