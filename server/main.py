import asyncio
from fastapi import FastAPI
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

from modules.room_management import main as main_room_management
from modules.trivia_management import main as main_trivia_management
from modules.master_management import main as main_master_management
from modules.websocket import main as main_websocket

from config.config import Constants
from config.config import settings

app = FastAPI(
    title=settings.title,
    description=settings.description,
    version=settings.version
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    # allow_origins=["https://frontend-deployment.io", "http://localhost"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

@app.get("/")
async def amialive():
    return "gotcha-backend is up and running"

app.include_router(main_room_management.router)
app.include_router(main_trivia_management.router)
app.include_router(main_master_management.router)
app.include_router(main_websocket.router)

if __name__ == "__main__":
    print(settings.title)
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True, log_config="logger.conf")