"""Application configuration."""

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    """Application settings."""
    
    # Application
    APP_NAME: str = "NLP Search Engine"
    VERSION: str = "1.0.0"
    DEBUG: bool = True
    
    # CORS
    ALLOWED_ORIGINS: list = [
        "http://localhost:5173",
        "http://localhost:5174",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:5174",
        "http://127.0.0.1:3000"
    ]
    
    # Data paths
    DOCUMENTS_PATH: str = "data/dataset_news.json"
    
    # NLP Configuration
    MAX_RESULTS: int = 10
    MIN_SIMILARITY_THRESHOLD: float = 0.05  # Lower threshold for news articles
    TFIDF_MAX_FEATURES: int = 5000  # Increased for larger dataset
    USE_WORD2VEC: bool = True  # Can disable for faster startup
    
    class Config:
        env_file = ".env"
        case_sensitive = True


# Global settings instance
settings = Settings()
