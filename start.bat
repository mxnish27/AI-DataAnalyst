@echo off
echo ========================================
echo   AI Data Analyst - Quick Start
echo ========================================
echo.

REM Check if .env exists
if not exist "backend\.env" (
    echo [ERROR] backend\.env file not found!
    echo.
    echo Please create backend\.env file with your OpenAI API key:
    echo   cd backend
    echo   copy .env.example .env
    echo   Then edit .env and add your OPENAI_API_KEY
    echo.
    pause
    exit /b 1
)

echo [1/4] Starting Backend Server...
start "AI Data Analyst - Backend" cmd /k "cd backend && python main.py"
timeout /t 3 /nobreak >nul

echo [2/4] Installing Frontend Dependencies (if needed)...
cd frontend
if not exist "node_modules" (
    echo Installing npm packages...
    call npm install
)

echo [3/4] Starting Frontend Server...
start "AI Data Analyst - Frontend" cmd /k "npm run dev"

echo [4/4] Done!
echo.
echo ========================================
echo   Application is starting...
echo ========================================
echo.
echo Backend:  http://localhost:8000
echo Frontend: http://localhost:5173
echo API Docs: http://localhost:8000/docs
echo.
echo Press any key to open the application in your browser...
pause >nul

start http://localhost:5173

echo.
echo To stop the application, close both terminal windows.
echo.
