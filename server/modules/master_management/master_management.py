from typing import List, Optional
from fastapi import APIRouter, Header, HTTPException, status, Request, File, Query
from fastapi.params import Depends
import logging

from config.config import Constants
from config.config import settings
from config.database import get_db
from config import models
from . import schemas
from . import trivia_entries

router = APIRouter(
    # prefix = "/",
    responses={404: {"description": "Not found"}}
)

logger = logging.getLogger(__name__)
db = get_db()


@router.post("/addTrivia")
async def create_trivia(request: Request, addDummy: Optional[bool], triviaData: Optional[schemas.Trivia] = None):
    try:
        trivias_db = db["trivias"]
        
        if triviaData:
            trivia_data = triviaData.model_dump()
            if trivias_db.find_one(trivia_data):
                raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Entry already exists")
            
            trivias_db.insert_one(trivia_data)

            response = {
                "detail": "Added Trivia question"
            }

        else:
            if addDummy is None:
                raise HTTPException(status_code=409, detail="Empty trivia with no addDummy flag can not be processed")
            
            trivias_data = []
            entry_data = trivia_entries.test_trivia if addDummy else trivia_entries.final_trivia
            for trivia_data in entry_data:
                duplicate_data = trivias_db.find_one({"question_template": trivia_data})
                if duplicate_data is None:
                    print(f"Duplicate: {str(duplicate_data)}")
                    trivia = models.Trivia(
                        question_template=trivia_data
                    ).model_dump()
                    
                    trivias_data.append(trivia)

            if trivias_data:
                trivias_db.insert_many(trivias_data)

            response = {
                "detail": "Added dump entries"
            }
        
        return response
    
    except HTTPException as e:
        logger.error(f"Error while  adding Trivia: {str(e)}")
        raise HTTPException(status_code=e.status_code, detail=e.detail)
    
    except Exception as e:
        logger.error(f"Error while  adding Trivia: {str(e)}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Something went wrong!")