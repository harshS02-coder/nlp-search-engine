# NLP Search Engine Backend

A FastAPI-based backend for semantic document search using TF-IDF and Word2Vec.

## Features

- 🔍 Hybrid search using TF-IDF and Word2Vec
- 🚀 Fast API with automatic documentation
- 📊 Cosine similarity scoring
- 🎯 Semantic understanding with pre-trained word embeddings
- ⚡ Real-time search with sub-second response times

## Setup

### 1. Create Virtual Environment

```powershell
# Windows PowerShell
cd backend
python -m venv venv
.\venv\Scripts\Activate.ps1
```

### 2. Install Dependencies

```powershell
pip install -r requirements.txt
```

### 3. Configure Environment

```powershell
# Copy example environment file
Copy-Item .env.example .env

# Edit .env with your settings (optional)
```

### 4. Prepare Data

The backend includes sample documents in `data/documents.json`. To use your own dataset:

- Place your JSON file in the `data/` folder
- Update `DOCUMENTS_PATH` in `.env` or `app/core/config.py`

Expected JSON format:
```json
{
  "documents": [
    {
      "id": "1",
      "title": "Document Title",
      "content": "Document content text...",
      "category": "Category Name"
    }
  ]
}
```

## Running the Server

### Development Mode

```powershell
# From the backend directory
python -m app.main

# Or using uvicorn directly
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The server will start at: `http://localhost:8000`

## API Endpoints

### Search Documents
- **POST** `/api/search`
- Request body:
  ```json
  {
    "query": "machine learning algorithms",
    "max_results": 10
  }
  ```

### Health Check
- **GET** `/api/health`

### API Documentation
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Project Structure

```
backend/
├── app/
│   ├── main.py              # FastAPI application
│   ├── api/
│   │   └── search.py        # Search endpoints
│   ├── services/
│   │   └── search_engine.py # NLP search logic
│   ├── models/
│   │   └── schemas.py       # Pydantic models
│   └── core/
│       └── config.py        # Configuration
├── data/
│   └── documents.json       # Document dataset
├── requirements.txt         # Python dependencies
└── .env.example            # Environment template
```

## NLP Components

### TF-IDF (Term Frequency-Inverse Document Frequency)
- Measures word importance in documents
- 70% weight in final scoring
- Uses scikit-learn's TfidfVectorizer

### Word2Vec (Semantic Embeddings)
- Understands word meaning and context
- 30% weight in final scoring
- Uses pre-trained GloVe embeddings (50-dimensional)

### Hybrid Scoring
Final score = (0.7 × TF-IDF score) + (0.3 × Word2Vec score)

## Testing the API

Using PowerShell:
```powershell
# Search request
$body = @{
    query = "machine learning"
    max_results = 5
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:8000/api/search" -Method Post -Body $body -ContentType "application/json"
```

Using curl:
```bash
curl -X POST "http://localhost:8000/api/search" \
  -H "Content-Type: application/json" \
  -d '{"query": "machine learning", "max_results": 5}'
```

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `APP_NAME` | NLP Search Engine | Application name |
| `DEBUG` | True | Debug mode |
| `DOCUMENTS_PATH` | data/documents.json | Path to documents |
| `MAX_RESULTS` | 10 | Max search results |
| `MIN_SIMILARITY_THRESHOLD` | 0.1 | Minimum relevance score |

## Troubleshooting

### Word2Vec Model Download
The first run downloads the GloVe model (~65MB). If it fails:
- Check internet connection
- The app will still work with TF-IDF only

### Port Already in Use
```powershell
# Change port in command
uvicorn app.main:app --reload --port 8001
```

### CORS Issues
Add your frontend URL to `ALLOWED_ORIGINS` in `app/core/config.py`

## Performance

- Initial model loading: ~5-10 seconds
- Search query: <100ms (typical)
- Concurrent requests: Supported via FastAPI's async

## License

MIT
