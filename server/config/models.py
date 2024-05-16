from pydantic import BaseModel, Field
from typing import List, Literal

# Model for NameGenerator
class nameGenerator(BaseModel):
    name: str   # pre-defined in database as project setup


# Model for Trivias
class Trivia(BaseModel):
    question_template: str   # pre-defined in database as project setup


# Model for Rooms
class Answer(BaseModel):
    response: str   # from frontend
    picked: str     # from frontend - whose answer pucked by user for this round
    picked_by: List[str]    # from frontend - who all picked this user's ans for this round
    round_score: int    # computed based on picked_by for this round


class User(BaseModel):
    name: str   # from frontend
    avatar_colour: str  # required fields from frontend
    score: int = 0  # update after every round
    is_ready: bool = False  # flag at the start of game
    has_submitted: bool = False # flag for every round's answer submission
    has_selected: bool = False  # flag for every round's vote


class TriviaListElement(BaseModel):
    round_number: int   # generated as per ranking in round in room
    trivia: str         # template picked from Trivia table and filled with user names in given room


class Room(BaseModel):
    id: str     # from name generator
    admin: str  # user name
    rounds: int # from frontend
    current_round: int = 1  # increment after every round
    room_status: Literal["Lobby", "Submit", "Select", "Score"] = "Lobby" # To allow specific APIs to be triggered at specific time only
    user_list: List[User] = []  # addition allowed before starting game
    trivia_list: List[TriviaListElement] = []   # Retrieve based on number of rounds before starting game
    trivia_associated_users: List[str] = [] # with every round, send list of people who the question is associated to
    is_running: bool = False    # flag for initial room settlement

