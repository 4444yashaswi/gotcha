from pydantic import BaseModel
from pydantic_settings import BaseSettings

class DevelopmentSettings(BaseSettings):
    title: str = "FastAPI - gotcha (development)"
    description: str = "Backend for gotcha"
    version: str = "1.0.0"

settings = DevelopmentSettings()

class Constants:
    DEFAULT_PORT = 8000