from app.memory import save_message_to_neo4j
from app.models import Message
from fastapi import FastAPI
from dotenv import load_dotenv
import os
import random

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
def send_message(payload: Message):
    user_prompt = payload.message

    # 1️⃣ Save the incoming message to Neo4j
    save_message_to_neo4j(user_prompt)

    # 2️⃣ Choose a random reply prefix
    responses = [
        "Let me look that up for you...",
        "Here's something you might find useful for:",
        "Interesting! Give me a second to process that.",
        "Sure! Here's what I found for:"
    ]
    chosen = random.choice(responses)
    fake_response = f"💬 {chosen} '{user_prompt}'"

    return {
        "input": user_prompt,
        "response": fake_response
    }

@app.get("/config")
def read_config():
    return {
        "api_secret_key": SECRET_KEY,
        "database_url": DB_URL
    }