from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import socketio
import whisper
import torch
from pathlib import Path
import tempfile
import asyncio
import os

app = FastAPI()
sio = socketio.AsyncServer(async_mode='asgi', cors_allowed_origins='*')
socket_app = socketio.ASGIApp(sio)
app.mount('/socket.io', socket_app)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load Whisper model
model = whisper.load_model("base")

@app.post("/upload")
async def upload_video(
    video: UploadFile = File(...),
    language: str = Form(...)
):
    # Create temporary file
    with tempfile.NamedTemporaryFile(delete=False, suffix='.mp4') as temp_file:
        content = await video.read()
        temp_file.write(content)
        temp_path = temp_file.name

    try:
        # Process video in chunks
        async def process_chunks():
            result = model.transcribe(
                temp_path,
                language=language,
                task="translate" if language != "en" else "transcribe"
            )

            # Send subtitles through WebSocket
            for segment in result["segments"]:
                await sio.emit('subtitle', {
                    'text': segment['text'],
                    'confidence': segment.get('confidence', 0.0)
                })
                await asyncio.sleep(segment['end'] - segment['start'])

            await sio.emit('processing_complete')

        # Start processing in background
        asyncio.create_task(process_chunks())
        
        return {"message": "Processing started"}

    finally:
        # Clean up temporary file
        os.unlink(temp_path)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)