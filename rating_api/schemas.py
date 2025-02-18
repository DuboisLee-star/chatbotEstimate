from pydantic import BaseModel
from typing import List

class RatingRequest(BaseModel):
    bot_name: str
    user: str
    conversation: List[str]
    rating: int
