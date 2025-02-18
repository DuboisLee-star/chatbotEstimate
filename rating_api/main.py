from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from models import create_db, get_ratings, save_rating, get_rating_by_id, update_rating, delete_rating, get_filtered_ratings

app = FastAPI()

# Create database if not exists
create_db()

class RatingRequest(BaseModel):
    bot_name: str
    user: str
    conversation: list
    rating: int

class RatingUpdateRequest(BaseModel):
    rating: int
    conversation: str

@app.post("/saveRating/")
async def save_rating_record(rating: RatingRequest):
    result = save_rating(rating)
    if result:
        return {"message": "Rating saved successfully"}
    else:
        raise HTTPException(status_code=500, detail="Failed to save rating")

@app.get("/getRatings/{bot_name}")
async def get_bot_ratings(bot_name: str):
    ratings = get_ratings(bot_name)
    if ratings:
        return ratings
    else:
        raise HTTPException(status_code=404, detail="No ratings found for this bot")

@app.get("/getRatingById/{record_id}")
async def get_rating_by_id_endpoint(record_id: int):
    rating = get_rating_by_id(record_id)
    if rating:
        return rating
    else:
        raise HTTPException(status_code=404, detail="Rating not found")

@app.put("/updateRating/{record_id}")
async def update_rating_endpoint(record_id: int, rating: RatingUpdateRequest):
    result = update_rating(record_id, rating.rating, rating.conversation)
    if result:
        return {"message": "Rating updated successfully"}
    else:
        raise HTTPException(status_code=404, detail="Rating not found or failed to update")

@app.delete("/deleteRating/{record_id}")
async def delete_rating_endpoint(record_id: int):
    result = delete_rating(record_id)
    if result:
        return {"message": "Rating deleted successfully"}
    else:
        raise HTTPException(status_code=404, detail="Rating not found")

@app.get("/getFilteredRatings/")
async def get_filtered_ratings_endpoint(rating: int = None, start_time: str = None, end_time: str = None):
    filtered_ratings = get_filtered_ratings(rating, start_time, end_time)
    if filtered_ratings:
        return filtered_ratings
    else:
        raise HTTPException(status_code=404, detail="No ratings found with specified filters")
