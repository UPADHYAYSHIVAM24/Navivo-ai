from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import os
import httpx
from dotenv import load_dotenv

load_dotenv()
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

app = FastAPI()

class Req(BaseModel):
    prompt: str

@app.post('/generate')
async def generate(req: Req):
    if not req.prompt:
        raise HTTPException(status_code=400, detail='Prompt required')
    if not OPENAI_API_KEY:
        raise HTTPException(status_code=500, detail='OpenAI API key not configured')
    headers = { 'Authorization': f'Bearer {OPENAI_API_KEY}', 'Content-Type': 'application/json' }
    payload = {
        'model': 'gpt-4o-mini',
        'messages': [
            {'role': 'system', 'content': 'You are a helpful assistant.'},
            {'role': 'user', 'content': req.prompt}
        ],
        'max_tokens': 800
    }
    async with httpx.AsyncClient(timeout=30) as client:
        r = await client.post('https://api.openai.com/v1/chat/completions', json=payload, headers=headers)
        if r.status_code != 200:
            raise HTTPException(status_code=502, detail='LLM provider error')
        data = r.json()
        text = data['choices'][0]['message']['content']
        return { 'text': text }
