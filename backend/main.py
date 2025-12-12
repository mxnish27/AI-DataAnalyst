from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pathlib import Path
import shutil
import uuid
from typing import Optional
import uvicorn

from config import settings, UPLOAD_DIR, ALLOWED_EXTENSIONS, MAX_FILE_SIZE
from data_loader import DataLoader
from ai_analyst import AIDataAnalyst

app = FastAPI(title="AI Data Analyst API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

data_loader = DataLoader()
ai_analyst = AIDataAnalyst()

current_file_path: Optional[Path] = None
current_df = None
current_df_info = None

@app.get("/")
async def root():
    return {
        "message": "AI Data Analyst API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    global current_file_path, current_df, current_df_info
    
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")
    
    file_ext = Path(file.filename).suffix.lower()
    if file_ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file format. Allowed: {', '.join(ALLOWED_EXTENSIONS)}"
        )
    
    file_id = str(uuid.uuid4())
    file_path = UPLOAD_DIR / f"{file_id}{file_ext}"
    
    try:
        with file_path.open("wb") as buffer:
            content = await file.read()
            
            if len(content) > MAX_FILE_SIZE:
                raise HTTPException(
                    status_code=400,
                    detail=f"File too large. Max size: {settings.max_file_size_mb}MB"
                )
            
            buffer.write(content)
        
        df = data_loader.load_file(file_path)
        df_info = data_loader.get_dataframe_info(df)
        
        current_file_path = file_path
        current_df = df
        current_df_info = df_info
        
        ai_analyst.set_dataframe(df, df_info)
        
        return {
            "message": "File uploaded successfully",
            "file_id": file_id,
            "filename": file.filename,
            "info": df_info
        }
        
    except Exception as e:
        if file_path.exists():
            file_path.unlink()
        raise HTTPException(status_code=500, detail=f"Failed to process file: {str(e)}")

@app.post("/query")
async def query_data(query: str = Form(...)):
    if current_df is None:
        raise HTTPException(status_code=400, detail="No data loaded. Please upload a file first.")
    
    try:
        result = ai_analyst.analyze_query(query)
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Query failed: {str(e)}")

@app.get("/data/info")
async def get_data_info():
    if current_df_info is None:
        raise HTTPException(status_code=400, detail="No data loaded")
    return current_df_info

@app.delete("/data")
async def clear_data():
    global current_file_path, current_df, current_df_info
    
    if current_file_path and current_file_path.exists():
        current_file_path.unlink()
    
    current_file_path = None
    current_df = None
    current_df_info = None
    
    return {"message": "Data cleared successfully"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
