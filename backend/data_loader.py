import pandas as pd
from pathlib import Path
from typing import Optional, Dict, Any
import json

class DataLoader:
    @staticmethod
    def load_file(file_path: Path) -> pd.DataFrame:
        suffix = file_path.suffix.lower()
        
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
        info = {
            "shape": {"rows": int(df.shape[0]), "columns": int(df.shape[1])},
            "columns": [],
            "memory_usage": f"{df.memory_usage(deep=True).sum() / 1024 / 1024:.2f} MB",
            "sample_data": df.head(5).to_dict(orient='records')
        }
        
        for col in df.columns:
            col_info = {
                "name": col,
                "dtype": str(df[col].dtype),
                "non_null_count": int(df[col].count()),
                "null_count": int(df[col].isna().sum()),
                "unique_count": int(df[col].nunique())
            }
            
            if pd.api.types.is_numeric_dtype(df[col]):
                col_info["stats"] = {
                    "mean": float(df[col].mean()) if not df[col].isna().all() else None,
                    "min": float(df[col].min()) if not df[col].isna().all() else None,
                    "max": float(df[col].max()) if not df[col].isna().all() else None,
                    "std": float(df[col].std()) if not df[col].isna().all() else None
                }
            elif pd.api.types.is_string_dtype(df[col]) or pd.api.types.is_object_dtype(df[col]):
                value_counts = df[col].value_counts().head(5)
                col_info["top_values"] = value_counts.to_dict()
            
            info["columns"].append(col_info)
        
        return info
