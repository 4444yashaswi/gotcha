from fastapi import HTTPException
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError
from config.config import settings
import logging

logger = logging.getLogger(__name__)
client = client = MongoClient(host=settings.db_uri, serverSelectionTimeoutMS=5000)
db = client[settings.db_name]

def get_db():
    return db