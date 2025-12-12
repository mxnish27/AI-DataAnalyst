# AI Data Analyst - Complete Project Guide

A comprehensive guide for beginner developers to understand, build, and deploy this AI-powered data analysis application.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Architecture](#2-architecture)
3. [Technology Stack](#3-technology-stack)
4. [Project Structure](#4-project-structure)
5. [Backend Code Explanation](#5-backend-code-explanation)
6. [Frontend Code Explanation](#6-frontend-code-explanation)
7. [How It Works (Flow)](#7-how-it-works-flow)
8. [Step-by-Step Build Guide](#8-step-by-step-build-guide)
9. [API Reference](#9-api-reference)
10. [Deployment Guide](#10-deployment-guide)
11. [Troubleshooting](#11-troubleshooting)

---

## 1. Project Overview

### What is this project?

This is an **AI-powered Data Analyst** application that allows users to:
- Upload data files (CSV, Excel, JSON, Parquet)
- Ask questions about their data in plain English
- Get AI-generated insights, analysis, and visualizations

### Why build this?

Traditional data analysis requires:
- Knowledge of SQL, Python, or Excel formulas
- Understanding of statistics
- Time to write queries and create charts

This application **democratizes data analysis** by letting anyone ask questions in natural language and get instant answers.

### Example Use Cases

| User Question | AI Response |
|---------------|-------------|
| "What are the total sales?" | Calculates sum of sales column |
| "Show me sales by region" | Creates a bar chart visualization |
| "What's the average order value?" | Computes statistical mean |
| "Which product sells the most?" | Finds top performer with ranking |

---

## 2. Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         USER INTERFACE                          │
│                    (React Frontend - Port 5173)                 │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │ File Upload │  │  Data Info  │  │    Chat Interface       │  │
│  │  Component  │  │  Component  │  │      Component          │  │
│  └──────┬──────┘  └──────┬──────┘  └───────────┬─────────────┘  │
└─────────┼────────────────┼─────────────────────┼────────────────┘
          │                │                     │
          ▼                ▼                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                      REST API (HTTP)                            │
│                 POST /upload, POST /query, GET /data            │
└─────────────────────────────────────────────────────────────────┘
          │                │                     │
          ▼                ▼                     ▼
┌─────────────────────────────────────────────────────────────────┐
│                    BACKEND SERVER                               │
│                 (FastAPI - Port 8000)                           │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │ DataLoader  │  │   Config    │  │     AIDataAnalyst       │  │
│  │   Module    │  │   Module    │  │        Module           │  │
│  └──────┬──────┘  └──────┬──────┘  └───────────┬─────────────┘  │
└─────────┼────────────────┼─────────────────────┼────────────────┘
          │                │                     │
          ▼                ▼                     ▼
┌─────────────────┐ ┌─────────────┐ ┌─────────────────────────────┐
│   File System   │ │ Environment │ │      OpenRouter API         │
│   (uploads/)    │ │  Variables  │ │  (google/gemma-3-12b-it)    │
└─────────────────┘ └─────────────┘ └─────────────────────────────┘
```

### Component Interaction Flow

```
User uploads file → DataLoader parses → DataFrame stored in memory
                                              ↓
User asks question → AIDataAnalyst builds prompt → Sends to LLM API
                                              ↓
                    LLM returns analysis ← Response parsed
                                              ↓
                    Frontend displays ← JSON response with data/charts
```

---

## 3. Technology Stack

### Backend Technologies

| Technology | Purpose | Why We Chose It |
|------------|---------|-----------------|
| **Python 3.11+** | Programming language | Easy to learn, great for data science |
| **FastAPI** | Web framework | Fast, modern, automatic API docs |
| **Pandas** | Data manipulation | Industry standard for data analysis |
| **OpenAI SDK** | LLM API client | Works with OpenRouter (compatible API) |
| **Plotly** | Visualizations | Interactive charts, JSON-exportable |
| **Pydantic** | Data validation | Type safety, automatic parsing |
| **Uvicorn** | ASGI server | Fast async server for FastAPI |

### Frontend Technologies

| Technology | Purpose | Why We Chose It |
|------------|---------|-----------------|
| **React 18** | UI framework | Component-based, large ecosystem |
| **Vite** | Build tool | Fast development, hot reload |
| **TailwindCSS** | Styling | Utility-first, rapid development |
| **Axios** | HTTP client | Promise-based, easy API calls |
| **Plotly.js** | Chart rendering | Matches backend Plotly output |
| **Lucide React** | Icons | Modern, lightweight icons |

### External Services

| Service | Purpose | Cost |
|---------|---------|------|
| **OpenRouter** | LLM API Gateway | Free tier available |
| **Gemma 3 12B** | AI Model | Free on OpenRouter |

---

## 4. Project Structure

```
ai-data-analyst/
│
├── backend/                    # Python FastAPI Backend
│   ├── main.py                # Entry point - API endpoints
│   ├── config.py              # Configuration & environment variables
│   ├── data_loader.py         # File parsing (CSV, Excel, JSON)
│   ├── ai_analyst.py          # AI/LLM integration logic
│   ├── requirements.txt       # Python dependencies
│   ├── .env                   # Environment variables (API keys)
│   ├── .env.example           # Example environment file
│   └── uploads/               # Uploaded files directory
│
├── frontend/                   # React Frontend
│   ├── src/
│   │   ├── main.jsx           # React entry point
│   │   ├── App.jsx            # Main application component
│   │   ├── index.css          # Global styles
│   │   └── components/
│   │       ├── FileUpload.jsx     # File upload with drag-drop
│   │       ├── DataInfo.jsx       # Dataset information display
│   │       └── ChatInterface.jsx  # Chat UI for queries
│   ├── index.html             # HTML template
│   ├── package.json           # Node.js dependencies
│   ├── vite.config.js         # Vite configuration
│   ├── tailwind.config.js     # TailwindCSS configuration
│   └── postcss.config.js      # PostCSS configuration
│
├── docker-compose.yml         # Docker orchestration
├── README.md                  # Project overview
├── HOW_TO_START.md           # Quick start guide
├── DEPLOYMENT.md             # Deployment instructions
├── EXAMPLES.md               # Usage examples
└── PROJECT_GUIDE.md          # This file - comprehensive guide
```

---

## 5. Backend Code Explanation

### 5.1 Configuration (`config.py`)

This file manages all application settings using environment variables.

```python
from pydantic_settings import BaseSettings
from pathlib import Path

class Settings(BaseSettings):
    # API key for OpenRouter (free LLM API)
    openrouter_api_key: str
    
    # Which AI model to use
    openrouter_model: str = "google/gemma-3-12b-it:free"
    
    # Maximum file size for uploads (50MB)
    max_file_size_mb: int = 50
    
    # Directory to store uploaded files
    upload_dir: str = "./uploads"
    
    class Config:
        env_file = ".env"        # Load from .env file
        case_sensitive = False   # ENV vars are case-insensitive

# Create global settings instance
settings = Settings()

# Create Path object for upload directory
UPLOAD_DIR = Path(settings.upload_dir)
```

**Key Concepts:**
- **Pydantic Settings**: Automatically loads environment variables
- **Type Hints**: `str`, `int` define expected types
- **Default Values**: Fallback if env var not set
- **`.env` file**: Keeps secrets out of code

### 5.2 Data Loader (`data_loader.py`)

Handles parsing different file formats into pandas DataFrames.

```python
import pandas as pd
from pathlib import Path
from typing import Optional, Dict, Any
import json

class DataLoader:
    @staticmethod
    def load_file(file_path: Path) -> pd.DataFrame:
        """Load a data file and return a pandas DataFrame."""
        
        # Get file extension (e.g., '.csv', '.xlsx')
        suffix = file_path.suffix.lower()
        
        # Route to appropriate parser based on file type
        if suffix == '.csv':
            return pd.read_csv(file_path)
        elif suffix in ['.xlsx', '.xls']:
            return pd.read_excel(file_path)
        elif suffix == '.json':
            return pd.read_json(file_path)
        elif suffix == '.parquet':
            return pd.read_parquet(file_path)
        else:
            raise ValueError(f"Unsupported file format: {suffix}")
    
    @staticmethod
    def get_dataframe_info(df: pd.DataFrame) -> Dict[str, Any]:
        """Extract metadata about the DataFrame for the AI."""
        
        info = {
            # Basic shape information
            "shape": {
                "rows": int(df.shape[0]),
                "columns": int(df.shape[1])
            },
            "columns": [],
            
            # Memory usage
            "memory_usage": f"{df.memory_usage(deep=True).sum() / 1024 / 1024:.2f} MB",
            
            # Sample data for AI context (first 5 rows)
            "sample_data": json.loads(df.head(5).to_json(orient='records'))
        }
        
        # Analyze each column
        for col in df.columns:
            col_info = {
                "name": col,
                "dtype": str(df[col].dtype),           # Data type
                "non_null_count": int(df[col].count()), # Valid values
                "null_count": int(df[col].isna().sum()), # Missing values
                "unique_count": int(df[col].nunique())   # Unique values
            }
            
            # Add statistics for numeric columns
            if pd.api.types.is_numeric_dtype(df[col]):
                col_info["stats"] = {
                    "mean": float(df[col].mean()) if not pd.isna(df[col].mean()) else None,
                    "min": float(df[col].min()) if not pd.isna(df[col].min()) else None,
                    "max": float(df[col].max()) if not pd.isna(df[col].max()) else None,
                }
            
            info["columns"].append(col_info)
        
        return info
```

**Key Concepts:**
- **Static Methods**: Don't need class instance, just utility functions
- **Type Hints**: `Path`, `pd.DataFrame`, `Dict[str, Any]`
- **Pandas Operations**: `read_csv()`, `shape`, `dtype`, `mean()`
- **JSON Serialization**: Converting DataFrame to JSON-safe format

### 5.3 AI Analyst (`ai_analyst.py`)

The core AI integration that processes natural language queries.

```python
import pandas as pd
import json
from typing import Dict, Any, Optional
from openai import OpenAI
from config import settings
import plotly.express as px
import re
import httpx

class AIDataAnalyst:
    def __init__(self):
        """Initialize the AI client with OpenRouter API."""
        
        # Create HTTP client with SSL fix for Windows
        http_client = httpx.Client(verify=False)
        
        # Initialize OpenAI-compatible client pointing to OpenRouter
        self.client = OpenAI(
            base_url="https://openrouter.ai/api/v1",  # OpenRouter endpoint
            api_key=settings.openrouter_api_key,
            http_client=http_client
        )
        
        # Storage for the current dataset
        self.df: Optional[pd.DataFrame] = None
        self.df_info: Optional[Dict[str, Any]] = None
    
    def set_dataframe(self, df: pd.DataFrame, df_info: Dict[str, Any]):
        """Store the uploaded dataset for analysis."""
        self.df = df
        self.df_info = df_info
    
    def analyze_query(self, query: str) -> Dict[str, Any]:
        """Process a natural language query and return analysis."""
        
        # Check if data is loaded
        if self.df is None:
            return {"error": "No data loaded. Please upload a file first."}
        
        # Build the prompt with dataset context
        system_prompt = self._build_system_prompt()
        
        try:
            model_to_use = settings.openrouter_model
            print(f"[DEBUG] Using OpenRouter model: {model_to_use}")
            
            # Combine prompts (some models don't support system messages)
            combined_prompt = f"{system_prompt}\n\nUser Question: {query}"
            
            # Call the LLM API
            response = self.client.chat.completions.create(
                model=model_to_use,
                messages=[
                    {"role": "user", "content": combined_prompt}
                ],
                temperature=0.1,  # Low temperature = more deterministic
                max_tokens=2000   # Limit response length
            )
            
            # Extract the AI's response
            ai_response = response.choices[0].message.content
            
            # Parse and execute the analysis
            result = self._execute_analysis(ai_response, query)
            return result
            
        except Exception as e:
            return {
                "query": query,
                "analysis_type": "error",
                "explanation": f"AI analysis failed: {str(e)}",
                "data": None,
                "visualization": None
            }
    
    def _build_system_prompt(self) -> str:
        """Create a detailed prompt with dataset information."""
        
        # Format column descriptions
        columns_desc = "\n".join([
            f"- {col['name']} ({col['dtype']}): {col['non_null_count']} values"
            for col in self.df_info["columns"]
        ])
        
        return f"""You are an expert data analyst. You have access to a dataset:

Dataset Info:
- Rows: {self.df_info['shape']['rows']}
- Columns: {self.df_info['shape']['columns']}

Columns:
{columns_desc}

Sample Data:
{json.dumps(self.df_info['sample_data'], indent=2)}

Respond in JSON format:
{{
    "analysis_type": "statistical|aggregation|visualization|general",
    "code": "pandas code using 'df' variable",
    "visualization": {{
        "type": "bar|line|scatter|pie|none",
        "x_column": "column name",
        "y_column": "column name",
        "title": "chart title"
    }},
    "explanation": "Clear explanation of findings"
}}"""
    
    def _execute_analysis(self, ai_response: str, original_query: str) -> Dict[str, Any]:
        """Parse AI response and execute any code."""
        
        try:
            # Try to extract JSON from the response
            json_match = re.search(r'\{.*\}', ai_response, re.DOTALL)
            
            if json_match:
                analysis = json.loads(json_match.group())
            else:
                # No JSON found, use response as explanation
                analysis = {
                    "analysis_type": "general",
                    "explanation": ai_response
                }
            
            result = {
                "query": original_query,
                "analysis_type": analysis.get("analysis_type", "general"),
                "explanation": analysis.get("explanation", ai_response),
                "data": None,
                "visualization": None
            }
            
            # Execute pandas code if provided
            if "code" in analysis and analysis["code"]:
                try:
                    df = self.df
                    local_vars = {"df": df, "pd": pd}
                    exec(analysis["code"], {"pd": pd, "df": df}, local_vars)
                    
                    if "result" in local_vars:
                        result["data"] = self._serialize_result(local_vars["result"])
                except Exception as e:
                    result["explanation"] += f"\n\nCode error: {str(e)}"
            
            # Create visualization if specified
            viz_config = analysis.get("visualization", {})
            if viz_config and viz_config.get("type") != "none":
                result["visualization"] = self._create_visualization(viz_config)
            
            return result
            
        except Exception as e:
            return {
                "query": original_query,
                "analysis_type": "error",
                "explanation": f"Failed to process: {str(e)}",
                "data": None,
                "visualization": None
            }
```

**Key Concepts:**
- **OpenAI SDK**: Used with custom `base_url` for OpenRouter
- **Prompt Engineering**: Structured prompt with dataset context
- **JSON Parsing**: Extract structured response from AI
- **Dynamic Code Execution**: `exec()` runs pandas code safely
- **Error Handling**: Try-except blocks for robustness

### 5.4 Main API (`main.py`)

The FastAPI application with HTTP endpoints.

```python
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
import shutil

from config import settings, UPLOAD_DIR
from data_loader import DataLoader
from ai_analyst import AIDataAnalyst

# Create FastAPI application
app = FastAPI(
    title="AI Data Analyst API",
    description="Upload data and ask questions in natural language",
    version="1.0.0"
)

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],          # Allow all origins (dev mode)
    allow_credentials=True,
    allow_methods=["*"],          # Allow all HTTP methods
    allow_headers=["*"],          # Allow all headers
)

# Initialize components
data_loader = DataLoader()
ai_analyst = AIDataAnalyst()

# Ensure upload directory exists
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

@app.get("/")
async def root():
    """Health check endpoint."""
    return {
        "message": "AI Data Analyst API",
        "version": "1.0.0",
        "status": "running"
    }

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """
    Upload a data file for analysis.
    
    Supported formats: CSV, Excel (.xlsx, .xls), JSON, Parquet
    """
    # Validate file extension
    allowed_extensions = {'.csv', '.xlsx', '.xls', '.json', '.parquet'}
    file_ext = Path(file.filename).suffix.lower()
    
    if file_ext not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type. Allowed: {allowed_extensions}"
        )
    
    # Save uploaded file
    file_path = UPLOAD_DIR / file.filename
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    try:
        # Load and parse the file
        df = data_loader.load_file(file_path)
        df_info = data_loader.get_dataframe_info(df)
        
        # Store in AI analyst for querying
        ai_analyst.set_dataframe(df, df_info)
        
        return {
            "message": "File uploaded successfully",
            "filename": file.filename,
            "info": df_info
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process file: {str(e)}")

@app.post("/query")
async def query_data(query: str = Form(...)):
    """
    Ask a question about the uploaded data.
    
    Example: "What are the total sales by region?"
    """
    result = ai_analyst.analyze_query(query)
    
    if "error" in result:
        raise HTTPException(status_code=400, detail=result["error"])
    
    return result

@app.get("/data/info")
async def get_data_info():
    """Get information about the currently loaded dataset."""
    if ai_analyst.df_info is None:
        raise HTTPException(status_code=404, detail="No data loaded")
    return ai_analyst.df_info

@app.delete("/data")
async def clear_data():
    """Clear the currently loaded dataset."""
    ai_analyst.df = None
    ai_analyst.df_info = None
    return {"message": "Data cleared successfully"}
```

**Key Concepts:**
- **FastAPI Decorators**: `@app.get("/")`, `@app.post("/upload")`
- **Dependency Injection**: `File(...)`, `Form(...)`
- **CORS Middleware**: Allows frontend to call backend
- **HTTPException**: Return proper error codes
- **Async/Await**: Non-blocking request handling

---

## 6. Frontend Code Explanation

### 6.1 Main App (`App.jsx`)

The root React component that manages application state.

```jsx
import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import DataInfo from './components/DataInfo';
import ChatInterface from './components/ChatInterface';
import { Database, MessageSquare, Upload } from 'lucide-react';

function App() {
  // State: information about uploaded data
  const [dataInfo, setDataInfo] = useState(null);

  // Called when file upload succeeds
  const handleUploadSuccess = (info) => {
    setDataInfo(info);
  };

  // Called when user clears data
  const handleClearData = () => {
    setDataInfo(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-3">
            <Database className="w-8 h-8 text-primary-600" />
            <h1 className="text-2xl font-bold text-gray-900">
              AI Data Analyst
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {!dataInfo ? (
          // Show upload interface when no data loaded
          <FileUpload onUploadSuccess={handleUploadSuccess} />
        ) : (
          // Show analysis interface when data is loaded
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left sidebar: Data info */}
            <div className="lg:col-span-1">
              <DataInfo 
                info={dataInfo} 
                onClearData={handleClearData} 
              />
            </div>
            
            {/* Main area: Chat interface */}
            <div className="lg:col-span-2">
              <ChatInterface />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
```

**Key Concepts:**
- **useState Hook**: React state management
- **Conditional Rendering**: `{!dataInfo ? ... : ...}`
- **Props**: Passing data and callbacks to child components
- **CSS Grid**: `grid-cols-1 lg:grid-cols-3` responsive layout

### 6.2 File Upload Component (`FileUpload.jsx`)

Handles drag-and-drop file uploads.

```jsx
import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { Upload, FileSpreadsheet, AlertCircle, CheckCircle } from 'lucide-react';

function FileUpload({ onUploadSuccess }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  // Handle file selection
  const handleFile = async (file) => {
    setUploading(true);
    setError(null);

    // Create form data for upload
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Send to backend
      const response = await axios.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      // Notify parent component of success
      onUploadSuccess(response.data.info);
    } catch (err) {
      setError(err.response?.data?.detail || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  // Drag and drop handlers
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, []);

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-12 text-center
        ${isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300'}
        ${uploading ? 'opacity-50' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <Upload className="w-16 h-16 mx-auto text-gray-400 mb-4" />
      
      <h3 className="text-xl font-semibold mb-2">
        {uploading ? 'Uploading...' : 'Drop your file here'}
      </h3>
      
      <p className="text-gray-500 mb-4">
        Supports CSV, Excel, JSON, and Parquet files
      </p>
      
      {/* Hidden file input */}
      <input
        type="file"
        className="hidden"
        id="file-upload"
        accept=".csv,.xlsx,.xls,.json,.parquet"
        onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
      />
      
      <label
        htmlFor="file-upload"
        className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg cursor-pointer hover:bg-primary-700"
      >
        Browse Files
      </label>
      
      {error && (
        <div className="mt-4 p-4 bg-red-50 text-red-800 rounded-lg">
          <AlertCircle className="inline w-5 h-5 mr-2" />
          {error}
        </div>
      )}
    </div>
  );
}

export default FileUpload;
```

**Key Concepts:**
- **FormData API**: For file uploads
- **Axios**: HTTP client for API calls
- **Drag & Drop Events**: `onDragOver`, `onDrop`
- **useCallback**: Memoize event handlers
- **Conditional Styling**: Dynamic class names

### 6.3 Chat Interface (`ChatInterface.jsx`)

The main chat UI for asking questions.

```jsx
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, User, Bot, Loader } from 'lucide-react';
import Plot from 'react-plotly.js';

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send a query to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Create form data
      const formData = new FormData();
      formData.append('query', input);

      // Send to backend
      const response = await axios.post('/api/query', formData);
      
      // Add AI response to messages
      const aiMessage = {
        role: 'assistant',
        content: response.data.explanation,
        data: response.data.data,
        visualization: response.data.visualization
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Error: ${err.response?.data?.detail || 'Something went wrong'}`,
        isError: true
      }]);
    } finally {
      setLoading(false);
    }
  };

  // Suggested queries for users
  const suggestions = [
    "What are the total sales?",
    "Show me the data summary",
    "What's the average value?",
    "Create a chart of the data"
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg h-[600px] flex flex-col">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <Bot className="w-12 h-12 mx-auto mb-4" />
            <p>Ask me anything about your data!</p>
            
            {/* Suggestion buttons */}
            <div className="flex flex-wrap justify-center gap-2 mt-4">
              {suggestions.map((suggestion, i) => (
                <button
                  key={i}
                  onClick={() => setInput(suggestion)}
                  className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Render messages */}
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] p-4 rounded-lg ${
              msg.role === 'user'
                ? 'bg-primary-600 text-white'
                : msg.isError
                  ? 'bg-red-100 text-red-800'
                  : 'bg-gray-100 text-gray-800'
            }`}>
              {/* Message content */}
              <p className="whitespace-pre-wrap">{msg.content}</p>
              
              {/* Render visualization if present */}
              {msg.visualization && (
                <div className="mt-4">
                  <Plot
                    data={msg.visualization.data}
                    layout={{
                      ...msg.visualization.layout,
                      autosize: true,
                      height: 300
                    }}
                    config={{ responsive: true }}
                  />
                </div>
              )}
              
              {/* Render data table if present */}
              {msg.data && Array.isArray(msg.data) && (
                <div className="mt-4 overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr>
                        {Object.keys(msg.data[0] || {}).map(key => (
                          <th key={key} className="px-2 py-1 bg-gray-200">{key}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {msg.data.slice(0, 10).map((row, i) => (
                        <tr key={i}>
                          {Object.values(row).map((val, j) => (
                            <td key={j} className="px-2 py-1 border">{String(val)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-4 rounded-lg">
              <Loader className="w-5 h-5 animate-spin" />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question about your data..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatInterface;
```

**Key Concepts:**
- **useRef**: Reference to DOM element for scrolling
- **useEffect**: Side effect for auto-scroll
- **Form Handling**: `onSubmit`, `e.preventDefault()`
- **Plotly Integration**: Rendering interactive charts
- **Conditional Rendering**: Different styles for user/AI messages

---

## 7. How It Works (Flow)

### Complete Request Flow

```
1. USER UPLOADS FILE
   └─→ Frontend: FileUpload.jsx
       └─→ POST /api/upload (FormData with file)
           └─→ Backend: main.py upload_file()
               └─→ Save file to uploads/
               └─→ DataLoader.load_file() → pandas DataFrame
               └─→ DataLoader.get_dataframe_info() → metadata
               └─→ AIDataAnalyst.set_dataframe() → store in memory
           └─→ Return: { info: { shape, columns, sample_data } }
       └─→ Update state: setDataInfo(info)
   └─→ UI switches to analysis view

2. USER ASKS QUESTION
   └─→ Frontend: ChatInterface.jsx
       └─→ POST /api/query (FormData with query string)
           └─→ Backend: main.py query_data()
               └─→ AIDataAnalyst.analyze_query(query)
                   └─→ _build_system_prompt() → context + instructions
                   └─→ OpenRouter API call → LLM generates response
                   └─→ _execute_analysis() → parse JSON, run pandas code
                   └─→ _create_visualization() → Plotly chart (optional)
               └─→ Return: { explanation, data, visualization }
       └─→ Add response to messages array
   └─→ UI renders explanation, data table, and chart
```

---

## 8. Step-by-Step Build Guide

### Prerequisites

- Python 3.11 or higher
- Node.js 18 or higher
- Git
- Code editor (VS Code recommended)

### Step 1: Create Project Structure

```bash
mkdir ai-data-analyst
cd ai-data-analyst
mkdir backend frontend
```

### Step 2: Set Up Backend

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install fastapi uvicorn python-multipart pandas openpyxl openai python-dotenv plotly pydantic pydantic-settings httpx aiofiles
```

### Step 3: Create Backend Files

Create each file as shown in Section 5:
1. `config.py` - Configuration
2. `data_loader.py` - File parsing
3. `ai_analyst.py` - AI logic
4. `main.py` - API endpoints

### Step 4: Set Up Environment Variables

```bash
# Create .env file
echo "OPENROUTER_API_KEY=your_api_key_here" > .env
echo "OPENROUTER_MODEL=google/gemma-3-12b-it:free" >> .env
```

### Step 5: Get OpenRouter API Key (FREE)

1. Go to https://openrouter.ai/
2. Sign up with Google or GitHub
3. Go to https://openrouter.ai/keys
4. Create new API key
5. Copy and paste into `.env` file

### Step 6: Set Up Frontend

```bash
cd ../frontend

# Create React project with Vite
npm create vite@latest . -- --template react

# Install dependencies
npm install axios react-plotly.js plotly.js lucide-react

# Install dev dependencies
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Step 7: Configure Frontend

Update these files as shown in Section 6:
1. `tailwind.config.js` - TailwindCSS config
2. `vite.config.js` - Add API proxy
3. `src/index.css` - Import Tailwind
4. `src/App.jsx` - Main component
5. `src/components/` - UI components

### Step 8: Run the Application

Terminal 1 (Backend):
```bash
cd backend
python -m uvicorn main:app --reload --port 8000
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

### Step 9: Test the Application

1. Open http://localhost:5173
2. Upload a CSV file
3. Ask: "What is the total of [column_name]?"
4. See the AI response!

---

## 9. API Reference

### Endpoints

| Method | Endpoint | Description | Request | Response |
|--------|----------|-------------|---------|----------|
| GET | `/` | Health check | - | `{ message, version, status }` |
| POST | `/upload` | Upload file | `multipart/form-data` | `{ message, filename, info }` |
| POST | `/query` | Ask question | `form-data: query` | `{ query, analysis_type, explanation, data, visualization }` |
| GET | `/data/info` | Get dataset info | - | `{ shape, columns, sample_data }` |
| DELETE | `/data` | Clear dataset | - | `{ message }` |

### Example API Calls

```bash
# Health check
curl http://localhost:8000/

# Upload file
curl -X POST -F "file=@data.csv" http://localhost:8000/upload

# Query data
curl -X POST -F "query=What are the total sales?" http://localhost:8000/query

# Get data info
curl http://localhost:8000/data/info

# Clear data
curl -X DELETE http://localhost:8000/data
```

---

## 10. Deployment Guide

### Option 1: Docker (Recommended)

```bash
# Build and run
docker-compose up -d

# Access
# Frontend: http://localhost
# Backend: http://localhost:8000
```

### Option 2: Manual Deployment

See `DEPLOYMENT.md` for detailed instructions on deploying to:
- Railway
- Render
- Vercel
- AWS/GCP/Azure

---

## 11. Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| SSL Certificate Error | Already fixed in code with `httpx.Client(verify=False)` |
| Model not found | Check model name in `.env` matches OpenRouter |
| CORS Error | Ensure backend CORS middleware is configured |
| File upload fails | Check file size < 50MB and correct format |
| Empty AI response | Check OpenRouter API key is valid |
| Rate limit error | Wait and retry, or use different free model |

### Debug Tips

1. Check backend logs: Look for `[DEBUG]` messages
2. Check browser console: Network tab for API errors
3. Test API directly: Use curl or Postman
4. Verify .env: Ensure API key is set correctly

---

## Summary

You've learned how to build a complete AI-powered data analysis application:

1. **Backend**: FastAPI + Pandas + OpenRouter/LLM
2. **Frontend**: React + TailwindCSS + Plotly
3. **Architecture**: REST API connecting frontend to AI
4. **Deployment**: Docker or manual deployment

This project demonstrates:
- Modern web development practices
- AI/LLM integration
- Full-stack development
- API design patterns

**Happy coding!** 🚀

---

*Created for the AI Data Analyst project - https://github.com/mxnish27/AI-DataAnalyst*
