import random
from fastapi import WebSocket, APIRouter, Header, HTTPException, status, Request, File, Query
from fastapi.params import Depends
import logging
from typing import List, Dict

from config.config import Constants
from config.config import settings
from config.database import get_db
from config import models
from . import schemas

router = APIRouter(
    # prefix = "/",
    responses={404: {"description": "Not found"}}
)

logger = logging.getLogger(__name__)


# WebSocket route for listening to events
@router.websocket("/listen/{event}")
async def websocket_listen(event: str, websocket: WebSocket):
    # if event in listeners:
        print("here")
        await websocket.accept()
        # listeners[event].append(websocket)
        try:
            while True:
                message = await websocket.receive_text()
                print(f"Received nessage from client: {message}")
        except Exception as e:
            logger.error(f"Error in web socket: {str(e)}")
            # listeners[event].remove(websocket)
    # else:
    #     await websocket.close(code=4000, reason=f"Event '{event}' not supported")

# Function to publish message to listeners of an event
async def publish_message(event: str, message: str):
      print("publish")
    # if event in listeners:
        # for listener in listeners[event]:
            # try:
                # await listener.send_text("message")
            # except Exception as e:
                # logger.error(f"Error in web socket: {str(e)}")
                # listeners[event].remove(listener)

@router.get("/trigger/{event},{message}")
async def trigger_events(event: str, message: str):
    # if event in listeners:
        await publish_message(event=event, message=message)
        return {"detail":f"Message published to {event} listeners"}
    # else:
        # logger.error(f"Event {event} not found")
        # raise HTTPException(status_code=404, detail=f"Event {event} not supported")
        