from fastapi import FastAPI

app = FastAPI()  # Creates your FastAPI “app” object

@app.get("/")
def read_root():
    """
    This function runs when someone visits GET /
    It returns a simple greeting as JSON.
    """
    return {"message": "Hello, FastAPI is up and running!"}

