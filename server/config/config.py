from pydantic import BaseModel
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import List, Dict
from fastapi import WebSocket

class DevelopmentSettings(BaseSettings):
    title: str = "FastAPI - gotcha (development)"
    description: str = "Backend for gotcha"
    version: str = "1.0.0"

    db_uri: str
    db_name: str
    model_config = SettingsConfigDict(env_file='.env') # .env file in server root folder

settings = DevelopmentSettings()

class Constants:
    DEFAULT_PORT = 8000
    TRIVIA_MANAGEMENT = "triviaManagement"
    MASTER_MANAGEMENT = "masterManagement"
    WEBSOCKET = "websocket"

    FOUR_LETTER_WORDS = [
        "also", "star", "sock", "ball", "tree", "boat", "fish", "lamb", "fork", "bird",
        "lion", "bear", "blue", "redo", "cats", "dogs", "gold", "hill", "jump", "king",
        "lamp", "mark", "moon", "nest", "pink", "quit", "rush", "seed", "tall", "vase",
        "wall", "yard", "zero", "bolt", "cake", "dove", "echo", "farm", "gaze", "hike",
        "joke", "lush", "mate", "nuts", "pave", "quiz", "rake", "sled", "tack", "wink",
        "yoga", "zest", "ache", "bell", "club", "dime", "earl", "fuel", "grit", "hail",
        "idea", "jail", "kiss", "lure", "mute", "nerd", "oath", "puff", "rule", "sand",
        "tent", "undo", "vent", "wisp", "avid", "buck", "clip", "drum", "exit", "fizz",
        "gawk", "hush", "inch", "jack", "lava", "muck", "note", "pulp", "rust", "seed",
        "tint", "veto", "whiz", "axle", "bump", "clog", "dusk", "epic", "fast", "glow"
    ]

    ROOM_STATUS_LOBBY = "Lobby"
    ROOM_STATUS_SUBMIT = "Submit"
    ROOM_STATUS_SELECT = "Select"
    ROOM_STATUS_SCORE = "Score"