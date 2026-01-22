"""Pydantic models for API request/response schemas."""

from typing import List, Optional
from pydantic import BaseModel, Field


class SearchRequest(BaseModel):
    """Search request model."""
    
    query: str = Field(..., min_length=1, description="Search query text")
    max_results: Optional[int] = Field(10, ge=1, le=100, description="Maximum number of results")


class SearchResultItem(BaseModel):
    """Single search result item."""
    
    id: str = Field(..., description="Document ID")
    title: str = Field(..., description="Document title")
    content: str = Field(..., description="Document content")
    score: float = Field(..., ge=0.0, le=1.0, description="Relevance score (0-1)")
    category: Optional[str] = Field(None, description="Document category")


class SearchResponse(BaseModel):
    """Search response model."""
    
    query: str = Field(..., description="Original search query")
    results: List[SearchResultItem] = Field(default_factory=list, description="List of search results")
    total_results: int = Field(..., ge=0, description="Total number of results")
    execution_time: float = Field(..., ge=0.0, description="Query execution time in seconds")


class HealthResponse(BaseModel):
    """Health check response."""
    
    status: str = Field(..., description="Service status")
    message: str = Field(..., description="Status message")
