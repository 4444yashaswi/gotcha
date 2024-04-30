from pydantic import BaseModel
from pydantic_settings import BaseSettings, SettingsConfigDict

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