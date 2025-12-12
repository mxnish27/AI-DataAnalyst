# Quick Start Guide

Get your AI Data Analyst up and running in 5 minutes!

## Step 1: Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key (you'll need it in Step 3)

## Step 2: Install Dependencies

### Backend
```bash
cd backend
pip install -r requirements.txt
```

### Frontend
```bash
cd frontend
npm install
```

## Step 3: Configure Environment

Create a `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:
```
OPENAI_API_KEY=sk-your-actual-api-key-here
OPENAI_MODEL=gpt-4-turbo-preview
MAX_FILE_SIZE_MB=50
UPLOAD_DIR=./uploads
```

## Step 4: Start the Application

### Start Backend (Terminal 1)
```bash
cd backend
python main.py
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

### Start Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

## Step 5: Use the Application

1. Open your browser to http://localhost:5173
2. Upload a data file (CSV, Excel, JSON, or Parquet)
3. Wait for the AI to analyze the data structure
4. Start asking questions!

## Example Questions to Try

Once you've uploaded your data, try these questions:

### Basic Statistics
- "What's the average of [column name]?"
- "How many rows are in the dataset?"
- "Show me summary statistics"

### Data Exploration
- "What are the top 5 values in [column]?"
- "Show me the distribution of [column]"
- "Are there any missing values?"

### Visualizations
- "Create a bar chart of [column]"
- "Show me a trend over time"
- "Make a pie chart of [category column]"

### Analysis
- "What are the correlations between columns?"
- "Find outliers in [column]"
- "Compare [column1] vs [column2]"

## Sample Data

If you don't have data handy, create a sample CSV:

**sales_data.csv**
```csv
date,product,sales,region
2024-01-01,Widget A,1200,North
2024-01-01,Widget B,800,South
2024-01-02,Widget A,1500,North
2024-01-02,Widget B,950,South
2024-01-03,Widget A,1100,North
2024-01-03,Widget B,1200,South
```

Then try questions like:
- "What are the total sales by product?"
- "Show me sales trends over time"
- "Which region has higher sales?"

## Troubleshooting

### "Module not found" error
```bash
pip install -r requirements.txt
```

### "OpenAI API error"
- Check your API key in `.env`
- Verify you have credits in your OpenAI account
- Make sure the key starts with `sk-`

### "Port already in use"
- Backend: Change port in `main.py` (default: 8000)
- Frontend: Change port in `vite.config.js` (default: 5173)

### Frontend can't connect to backend
- Verify backend is running on http://localhost:8000
- Check the proxy configuration in `vite.config.js`

## Next Steps

- Read [README.md](./README.md) for full documentation
- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment
- Explore the API docs at http://localhost:8000/docs

## Tips for Best Results

1. **Clear column names**: Rename columns to be descriptive
2. **Clean data**: Remove or handle missing values before uploading
3. **Specific questions**: Be specific in your queries for better results
4. **Iterate**: Refine your questions based on the AI's responses
5. **Visualizations**: Ask for charts when exploring patterns

Enjoy analyzing your data! 🚀
