from pymongo import MongoClient
from config.config import settings

client = MongoClient(host=settings.db_uri) #, port=settings.port)
db = client[settings.db_name]