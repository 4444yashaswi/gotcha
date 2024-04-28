from pydantic import BaseModel, Field
from typing import List

class User(BaseModel):
    id: str
    name: str
    room_id: str
    score: int


class Trivia(BaseModel):
    id: str
    name: str


class Room(BaseModel):
    id: str
    name: str
    rounds: int
    trivia_list: List[Trivia] = []

