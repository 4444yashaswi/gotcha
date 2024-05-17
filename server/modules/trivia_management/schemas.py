from pydantic import BaseModel
from typing import List


class AnswerData(BaseModel):
    roomId: str
    userName: str
    answer: str