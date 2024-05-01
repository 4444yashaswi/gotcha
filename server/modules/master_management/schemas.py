from pydantic import BaseModel


class Trivia(BaseModel):
    question_template: str