# Deployment Guide

This guide covers multiple deployment options for the AI Data Analyst application.

## Prerequisites

- OpenAI API Key (required)
- Docker and Docker Compose (for Docker deployment)
- Python 3.11+ and Node.js 18+ (for manual deployment)

## Option 1: Docker Deployment (Recommended)

### Quick Start

1. **Clone and navigate to the project**
```bash
cd ai-data-analyst
```

2. **Set up environment variables**
```bash
# Create .env file in the root directory
echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
```

3. **Build and run with Docker Compose**
```bash
docker-compose up -d
```

4. **Access the application**
- Frontend: http://localhost
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

### Stop the application
```bash
docker-compose down
```

## Option 2: Manual Deployment

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Create virtual environment**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies**
```bash
pip install -r requirements.txt
```

4. **Configure environment**
```bash
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY
```

5. **Run the backend**
```bash
python main.py
```

Backend will run on http://localhost:8000

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

Frontend will run on http://localhost:5173

4. **Build for production**
```bash
npm run build
```

## Option 3: Cloud Deployment

### Deploy to Railway

1. **Install Railway CLI**
```bash
npm install -g @railway/cli
```

2. **Login and initialize**
```bash
railway login
railway init
```

3. **Add environment variables**
```bash
railway variables set OPENAI_API_KEY=your_key_here
```

4. **Deploy**
```bash
railway up
```

### Deploy to Render

1. Create a new Web Service on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure:
   - **Backend**:
     - Build Command: `cd backend && pip install -r requirements.txt`
     - Start Command: `cd backend && uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Frontend**:
     - Build Command: `cd frontend && npm install && npm run build`
     - Publish Directory: `frontend/dist`
4. Add environment variable: `OPENAI_API_KEY`

### Deploy to Vercel (Frontend) + Railway (Backend)

**Backend on Railway:**
1. Push backend to Railway as described above

**Frontend on Vercel:**
1. Install Vercel CLI: `npm install -g vercel`
2. Navigate to frontend: `cd frontend`
3. Deploy: `vercel`
4. Update API endpoint in frontend to point to Railway backend URL

## Environment Variables

### Backend (.env)
```
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_MODEL=gpt-4-turbo-preview
MAX_FILE_SIZE_MB=50
UPLOAD_DIR=./uploads
```

### Frontend
If deploying separately, update the API endpoint in `vite.config.js`:
```javascript
proxy: {
  '/api': {
    target: 'https://your-backend-url.com',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '')
  }
}
```

## Security Considerations

1. **API Keys**: Never commit `.env` files. Use environment variables in production.
2. **CORS**: Update CORS settings in `backend/main.py` for production domains.
3. **File Upload**: Consider implementing file size limits and virus scanning.
4. **Rate Limiting**: Add rate limiting for API endpoints in production.
5. **HTTPS**: Always use HTTPS in production (handled by most cloud providers).

## Monitoring and Logs

### Docker Logs
```bash
docker-compose logs -f
docker-compose logs backend
docker-compose logs frontend
```

### Health Check
```bash
curl http://localhost:8000/health
```

## Troubleshooting

### Backend Issues
- **OpenAI API errors**: Verify API key is correct and has credits
- **File upload fails**: Check `MAX_FILE_SIZE_MB` and disk space
- **Module not found**: Reinstall dependencies

### Frontend Issues
- **API connection fails**: Verify backend is running and proxy is configured
- **Build fails**: Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`

### Docker Issues
- **Port conflicts**: Change ports in `docker-compose.yml`
- **Build fails**: Clear Docker cache: `docker-compose build --no-cache`

## Scaling

For production use:
1. Use a managed database for storing analysis history
2. Implement caching (Redis) for frequent queries
3. Use a CDN for frontend assets
4. Consider serverless functions for backend API
5. Implement queue system for long-running analyses

## Support

For issues and questions, please check:
- Backend API docs: http://localhost:8000/docs
- GitHub Issues
- OpenAI API documentation
