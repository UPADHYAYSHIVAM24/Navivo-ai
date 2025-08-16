Navivo.ai — Minimal Starter (Next.js + FastAPI)
===============================================

What's included:
- frontend/ : Next.js simple UI (index page with prompt box)
- backend/  : FastAPI app that proxies to OpenAI
- basic README files for running locally

Quickstart (local):
1. Backend:
   cd backend
   python -m venv venv
   source venv/bin/activate   # or venv\Scripts\activate on Windows
   pip install -r requirements.txt
   copy .env.example to .env and add OPENAI_API_KEY
   uvicorn main:app --reload --port 8000

2. Frontend:
   cd frontend
   npm install
   npm run dev
   open http://localhost:3000

Deploy:
- Push project to GitHub.
- Connect frontend repo to Vercel and set NEXT_PUBLIC_API_URL to your backend URL.
- Deploy backend on Railway/Render/Heroku and set OPENAI_API_KEY in its environment.

Notes:
- This is a minimal starter to get you live quickly. For production you'll need:
  authentication, billing (Stripe/Razorpay), database for users/usage, rate-limits, and security.
