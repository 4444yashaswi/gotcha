from pymongo import MongoClient
from config.config import settings

def get_db():
    try:
        client = MongoClient(host=settings.db_uri)
        db = client[settings.db_name]

        yield db
    finally:
        client.close()