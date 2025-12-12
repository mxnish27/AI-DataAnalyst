from pydantic_settings import BaseSettings
from pathlib import Path

class Settings(BaseSettings):
    openai_api_key: str
    openai_model: str = "gpt-3.5-turbo"
    max_file_size_mb: int = 50
    upload_dir: str = "./uploads"
    
    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()

UPLOAD_DIR = Path(settings.upload_dir)
UPLOAD_DIR.mkdir(exist_ok=True)

ALLOWED_EXTENSIONS = {'.csv', '.xlsx', '.xls', '.json', '.parquet'}
MAX_FILE_SIZE = settings.max_file_size_mb * 1024 * 1024
