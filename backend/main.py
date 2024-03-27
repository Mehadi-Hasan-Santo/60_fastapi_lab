from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from pydantic import BaseModel

app = FastAPI()

# MongoDB connection string (replace it with your actual connection string)
mongo_connection_string = "mongodb+srv://Shanto:4ksevLo6nugM8l0p@cluster0.n4gky.mongodb.net/mydatabase?retryWrites=true&w=majority"

# Establish a connection to MongoDB Atlas
client = MongoClient(mongo_connection_string)

# Select the database
db = client.users  # Replace "mydatabase" with your actual database name

# Select the collection
collection = db["users"]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Adjust this based on your frontend's domain
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

# Pydantic model for User
class User(BaseModel):
    username: str
    password: str
    confirm_password: str  # Add confirm_password field
    email: str
    phone_number: str

# Endpoint to register a new user
@app.post("/register")
async def register_user(user: User):
    # Check if username already exists
    if collection.find_one({"username": user.username}):
        raise HTTPException(status_code=400, detail="Username already exists")

    # Check if email already exists
    if collection.find_one({"email": user.email}):
        raise HTTPException(status_code=400, detail="Email already exists")

    # Check if phone number already exists
    if collection.find_one({"phone_number": user.phone_number}):
        raise HTTPException(status_code=400, detail="Phone number already exists")

    # Check if password matches confirm password
    if user.password != user.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    # Insert user data into MongoDB
    user_data = user.dict()
    del user_data["confirm_password"]  # Remove confirm_password before inserting into MongoDB
    result = collection.insert_one(user_data)
    return {"message": "User registered successfully"}