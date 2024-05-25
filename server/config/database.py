from fastapi import HTTPException
from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError
from config.config import settings

client = None

def get_db():
    global client
    if client is None:
        try:
            client = MongoClient(host=settings.db_uri, serverSelectionTimeoutMS=5000)
        except ServerSelectionTimeoutError:
            print("Error: Unable to connect to the MongoDB server.")
            raise HTTPException(status_code=500, detail="Unable to connect to the MongoDB server")
        except Exception as e:
            print(f"Error in db connection: {e}")
            raise HTTPException(status_code=500, detail="Database connection error")

    db = client[settings.db_name]
    try:
        yield db
    except Exception as e:
        print("Error in db part")
        raise e
    finally:
        print("finally")
        client.close()
        client = None
