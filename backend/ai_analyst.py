import pandas as pd
import json
from typing import Dict, Any, Optional
from openai import OpenAI
from config import settings
import plotly.express as px
import plotly.graph_objects as go
import re
import httpx

class AIDataAnalyst:
    def __init__(self):
        # Create httpx client with SSL verification disabled (Windows SSL fix)
        http_client = httpx.Client(verify=False)
        self.client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=settings.openrouter_api_key,
            http_client=http_client
        )
        self.df: Optional[pd.DataFrame] = None
        self.df_info: Optional[Dict[str, Any]] = None
    
    def set_dataframe(self, df: pd.DataFrame, df_info: Dict[str, Any]):
        self.df = df
        self.df_info = df_info
    
    def analyze_query(self, query: str) -> Dict[str, Any]:
        if self.df is None:
            return {"error": "No data loaded. Please upload a file first."}
        
        system_prompt = self._build_system_prompt()
        
        try:
            model_to_use = settings.openrouter_model
            print(f"[DEBUG] Using OpenRouter model: {model_to_use}")
            
            # Combine system prompt with user query for models that don't support system messages
            combined_prompt = f"{system_prompt}\n\nUser Question: {query}"
            
            response = self.client.chat.completions.create(
                model=model_to_use,
                messages=[
                    {"role": "user", "content": combined_prompt}
                ],
                temperature=0.1,
                max_tokens=2000
            )
            
            ai_response = response.choices[0].message.content
            
            if not ai_response:
                return {
                    "query": query,
                    "analysis_type": "error",
                    "explanation": "AI returned empty response. Please try again.",
                    "data": None,
                    "visualization": None
                }
            
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
        columns_desc = "\n".join([
            f"- {col['name']} ({col['dtype']}): {col['non_null_count']} non-null values, {col['unique_count']} unique"
            for col in self.df_info["columns"]
        ])
        
        return f"""You are an expert data analyst. You have access to a dataset with the following structure:

Dataset Info:
- Rows: {self.df_info['shape']['rows']}
- Columns: {self.df_info['shape']['columns']}

Columns:
{columns_desc}

Sample Data (first 5 rows):
{json.dumps(self.df_info['sample_data'], indent=2)}

When the user asks a question, provide a response in the following JSON format:
{{
    "analysis_type": "statistical|aggregation|filtering|visualization|general",
    "code": "pandas code to execute (if needed)",
    "visualization": {{
        "type": "bar|line|scatter|pie|histogram|none",
        "x_column": "column name for x-axis",
        "y_column": "column name for y-axis",
        "title": "chart title"
    }},
    "explanation": "Clear explanation of the analysis and findings"
}}

Rules:
1. Use only pandas operations that work on the dataframe 'df'
2. Keep code concise and efficient
3. For aggregations, return results as a dictionary or simple structure
4. Suggest appropriate visualizations when relevant
5. Handle missing data appropriately
6. If the query is unclear, provide the best interpretation

Example queries and responses:
- "What are the top 5 products by sales?" -> aggregation with bar chart
- "Show me the trend over time" -> line chart
- "What's the average?" -> statistical analysis
- "How many unique customers?" -> simple count"""
    
    def _execute_analysis(self, ai_response: str, original_query: str) -> Dict[str, Any]:
        try:
            json_match = re.search(r'\{.*\}', ai_response, re.DOTALL)
            if json_match:
                try:
                    analysis = json.loads(json_match.group())
                except:
                    # If JSON parsing fails, use the full response as explanation
                    analysis = {
                        "analysis_type": "general",
                        "explanation": ai_response,
                        "visualization": {"type": "none"}
                    }
            else:
                # No JSON found, use full response as explanation
                analysis = {
                    "analysis_type": "general",
                    "explanation": ai_response,
                    "visualization": {"type": "none"}
                }
            
            # Ensure explanation is never empty
            explanation = analysis.get("explanation", "").strip()
            if not explanation:
                explanation = ai_response if ai_response else "Analysis completed but no explanation was provided."
            
            result = {
                "query": original_query,
                "analysis_type": analysis.get("analysis_type", "general"),
                "explanation": explanation,
                "data": None,
                "visualization": None
            }
            
            if "code" in analysis and analysis["code"]:
                try:
                    df = self.df
                    local_vars = {"df": df, "pd": pd}
                    exec(analysis["code"], {"pd": pd, "df": df}, local_vars)
                    
                    if "result" in local_vars:
                        result["data"] = self._serialize_result(local_vars["result"])
                    
                except Exception as e:
                    result["explanation"] += f"\n\nNote: Code execution encountered an issue: {str(e)}"
            
            viz_config = analysis.get("visualization", {})
            if viz_config and viz_config.get("type") != "none":
                result["visualization"] = self._create_visualization(viz_config)
            
            return result
            
        except Exception as e:
            return {
                "query": original_query,
                "analysis_type": "error",
                "explanation": f"Failed to process analysis: {str(e)}",
                "data": None,
                "visualization": None
            }
    
    def _create_visualization(self, viz_config: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        try:
            viz_type = viz_config.get("type")
            x_col = viz_config.get("x_column")
            y_col = viz_config.get("y_column")
            title = viz_config.get("title", "Data Visualization")
            
            if not viz_type or viz_type == "none":
                return None
            
            df_viz = self.df.copy()
            
            if viz_type == "bar":
                if x_col and y_col and x_col in df_viz.columns and y_col in df_viz.columns:
                    fig = px.bar(df_viz, x=x_col, y=y_col, title=title)
                else:
                    return None
            elif viz_type == "line":
                if x_col and y_col and x_col in df_viz.columns and y_col in df_viz.columns:
                    fig = px.line(df_viz, x=x_col, y=y_col, title=title)
                else:
                    return None
            elif viz_type == "scatter":
                if x_col and y_col and x_col in df_viz.columns and y_col in df_viz.columns:
                    fig = px.scatter(df_viz, x=x_col, y=y_col, title=title)
                else:
                    return None
            elif viz_type == "pie":
                if x_col and y_col and x_col in df_viz.columns and y_col in df_viz.columns:
                    fig = px.pie(df_viz, names=x_col, values=y_col, title=title)
                else:
                    return None
            elif viz_type == "histogram":
                if x_col and x_col in df_viz.columns:
                    fig = px.histogram(df_viz, x=x_col, title=title)
                else:
                    return None
            else:
                return None
            
            return json.loads(fig.to_json())
            
        except Exception as e:
            return None
    
    def _serialize_result(self, result: Any) -> Any:
        if isinstance(result, pd.DataFrame):
            # Use to_json which handles NaN properly (converts to null)
            return json.loads(result.to_json(orient='records'))
        elif isinstance(result, pd.Series):
            # Use to_json which handles NaN properly
            return json.loads(result.to_json())
        elif isinstance(result, (int, float, str, bool)):
            # Handle NaN float values
            if isinstance(result, float) and (pd.isna(result) or result != result):
                return None
            return result
        elif isinstance(result, dict):
            return {k: self._serialize_result(v) for k, v in result.items()}
        elif isinstance(result, list):
            return [self._serialize_result(item) for item in result]
        else:
            return str(result)
