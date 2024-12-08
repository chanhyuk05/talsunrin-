from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from motor.motor_asyncio import AsyncIOMotorClient
from typing import List
from bson import ObjectId

# MongoDB 설정
MONGO_DETAILS = "mongodb://root:rlakswkxmrrjagkfk@s8ck4wck888sgw40w04sggco:27017/?directConnection=true"
DATABASE_NAME = "talsunrin"
COLLECTION_NAME = "records"

client = AsyncIOMotorClient(MONGO_DETAILS)
db = client[DATABASE_NAME]
collection = db[COLLECTION_NAME]

app = FastAPI()

# CORS 설정
origins = [
    "http://localhost",
    "http://localhost:5173",
    "https://tal-sunrin.eungyolee.kr"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Record(BaseModel):
    name: str
    time: int


@app.post("/record")
async def add_record(record: Record):
    new_record = record.dict()
    result = await collection.insert_one(new_record)
    if result.inserted_id:
        return {"message": "Record added successfully", "id": str(result.inserted_id)}
    raise HTTPException(status_code=500, detail="Failed to add record")


@app.get("/records")
async def get_top_records():
    top_records = await collection.find().sort("time", 1).limit(5).to_list(5)
    if not top_records:
        return {"message": "No records found"}

    result = [{"id": str(record["_id"]), "name": record["name"], "time": record["time"]} for record in top_records]
    return result


@app.delete("/records")
async def delete_all_records():
    await collection.delete_many({})
    return {"message": "All records deleted successfully"}

@app.delete("/record/{record_id}")
async def delete_record(record_id: str):
    result = await collection.delete_one({"_id": ObjectId(record_id)})
    if result.deleted_count == 1:
        return {"message": "Record deleted successfully"}
    raise HTTPException(status_code=404, detail="Record not found")
