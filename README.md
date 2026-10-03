# AI-Powered Placement Prediction & Career Guidance Platform

An enterprise-grade full-stack platform providing real machine-learning placement prediction, automated resume analysis (NLP), dynamic career guidance, learning roadmap generation, coding assessments, and company candidate recruitment workflows.

## Quick Start Run Instructions

### Option A: Run All at Once
From the project root (`d:\Aa SGP sem5`):
```bash
# Terminal 1: Frontend + Backend concurrently
npm run dev

# Terminal 2: Python ML Engine
cd ml_service
.\venv\Scripts\activate
python main.py
```

### Option B: Run in Separate Terminals

#### Terminal 1: Python FastAPI ML Service (Port 8000)
```bash
cd "d:\Aa SGP sem5\ml_service"
.\venv\Scripts\activate
python main.py
```

#### Terminal 2: Express Backend API (Port 5000)
```bash
cd "d:\Aa SGP sem5\backend"
npm run dev
```

#### Terminal 3: React + Vite Frontend (Port 5173)
```bash
cd "d:\Aa SGP sem5\frontend"
npm run dev
```

---

## Project Structure

```
d:/Aa SGP sem5/
├── frontend/             # React + Vite application (Port 5173)
├── backend/              # Express REST API (Port 5000)
├── ml_service/           # Python FastAPI ML & NLP Service (Port 8000)
├── supabase/             # PostgreSQL migrations, RLS policies, seeds
├── docs/                 # Project documentation
├── package.json          # Root concurrently orchestration
└── README.md
```

## Quick Start Setup

### 1. Frontend Setup
```bash
cd frontend
npm install
cp ../.env.example .env
# Configure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env
npm run dev
```

### 2. Supabase Setup
- Initialize Supabase CLI or create a project at [supabase.com](https://supabase.com).
- Apply migration scripts from `supabase/migrations/`.
- Deploy Edge Functions from `supabase/functions/`.

### 3. Python ML Service Setup
```bash
cd ml_service
python -m venv venv
# On Windows: venv\Scripts\activate
# On Unix: source venv/bin/activate
pip install -r requirements.txt
python main.py
```

## Architectural Security Rules
- **No Fake AI Data:** Numerical ML placement prediction is generated strictly by trained models. LLMs are used solely for natural language career guidance and qualitative support.
- **Row Level Security:** Database permissions are strictly controlled at the PostgreSQL layer using Supabase RLS.
- **Secret Hygiene:** All API keys are isolated on backend servers or Supabase Edge Secrets. Never expose secret keys to the browser context.
