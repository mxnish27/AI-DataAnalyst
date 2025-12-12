#!/bin/bash

echo "========================================"
echo "  AI Data Analyst - Quick Start"
echo "========================================"
echo ""

# Check if .env exists
if [ ! -f "backend/.env" ]; then
    echo "[ERROR] backend/.env file not found!"
    echo ""
    echo "Please create backend/.env file with your OpenAI API key:"
    echo "  cd backend"
    echo "  cp .env.example .env"
    echo "  Then edit .env and add your OPENAI_API_KEY"
    echo ""
    exit 1
fi

echo "[1/4] Starting Backend Server..."
cd backend
python main.py &
BACKEND_PID=$!
cd ..
sleep 3

echo "[2/4] Installing Frontend Dependencies (if needed)..."
cd frontend
if [ ! -d "node_modules" ]; then
    echo "Installing npm packages..."
    npm install
fi

echo "[3/4] Starting Frontend Server..."
npm run dev &
FRONTEND_PID=$!
cd ..

echo "[4/4] Done!"
echo ""
echo "========================================"
echo "  Application is running!"
echo "========================================"
echo ""
echo "Backend:  http://localhost:8000"
echo "Frontend: http://localhost:5173"
echo "API Docs: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop all servers"
echo ""

# Wait for Ctrl+C
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
