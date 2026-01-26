"""Search API endpoint."""

from fastapi import APIRouter, HTTPException
from app.models.schemas import SearchRequest, SearchResponse
from app.services.search_engine import get_search_engine

router = APIRouter()


@router.post("/search", response_model=SearchResponse)
async def search_documents(request: SearchRequest):
    """
    Search documents using NLP-based semantic search.
    
    Args:
        request: SearchRequest with query and optional max_results
        
    Returns:
        SearchResponse with matching documents and relevance scores
    """
    try:
        engine = get_search_engine()
        results = engine.search(
            query=request.query,
            max_results=request.max_results
        )
        return SearchResponse(**results)
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Search failed: {str(e)}"
        )


@router.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "message": "Search service is running"
    }
