from fastapi import FastAPI
from dotenv import load_dotenv
import os

load_dotenv()

SECRET_KEY = os.getenv("API_SECRET_KEY")
DB_URL = os.getenv("DATABASE_URL")

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello from Aryaman's FastAPI backend!"}

@app.get("/ping")
def ping_server():
    return {"status": "Backend is alive!"}

@app.post("/send")
def send_message():
    """
    Placeholder for receiving user prompts.
    Currently returns a static confirmation.
    """
    return {"message": "Received your prompt!"}

@app.get("/config")
def read_config():
    return {
        "api_secret_key": SECRET_KEY,
        "database_url": DB_URL
    }