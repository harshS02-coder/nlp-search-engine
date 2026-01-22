"""NLP-based search engine with TF-IDF and Word2Vec."""

import json
import re
import time
from pathlib import Path
from typing import List, Dict, Any
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import gensim.downloader as api
from app.core.config import settings


class SearchEngine:
    """NLP search engine using TF-IDF and Word2Vec for semantic search."""
    
    def __init__(self, documents_path: str = None):
        """Initialize the search engine."""
        self.documents_path = documents_path or settings.DOCUMENTS_PATH
        self.documents = []
        self.tfidf_vectorizer = None
        self.tfidf_matrix = None
        self.word2vec_model = None
        self._load_documents()
        self._initialize_models()
    
    def _load_documents(self) -> None:
        """Load documents from JSON or JSONL file."""
        try:
            file_path = Path(self.documents_path)
            if not file_path.exists():
                print(f"Warning: Documents file not found at {self.documents_path}")
                self.documents = self._get_sample_documents()
                return
            
            # Try loading as JSONL first (one JSON object per line)
            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    self.documents = [json.loads(line.strip()) for line in f if line.strip()]
                print(f"Loaded {len(self.documents)} documents from JSONL format")
                
                # Normalize news article structure
                normalized = []
                for idx, doc in enumerate(self.documents):
                    normalized.append({
                        "id": str(idx + 1),
                        "title": doc.get("headline", doc.get("title", f"Article {idx+1}"))[:200],
                        "content": doc.get("short_description", doc.get("description", doc.get("content", "")))[:2000],
                        "category": doc.get("category", "General")
                    })
                self.documents = normalized
                return
            except json.JSONDecodeError:
                # If JSONL fails, try regular JSON
                pass
            
            # Try loading as regular JSON
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
                
            # Handle different JSON structures
            if isinstance(data, list):
                self.documents = data
            elif isinstance(data, dict):
                self.documents = data.get('documents', [])
            else:
                self.documents = []
            
            print(f"Loaded {len(self.documents)} documents from JSON format")
            
        except Exception as e:
            print(f"Error loading documents: {e}")
            self.documents = self._get_sample_documents()
    
    def _get_sample_documents(self) -> List[Dict[str, Any]]:
        """Return sample documents if main file is missing."""
        return [
            {
                "id": "1",
                "title": "Introduction to Machine Learning",
                "content": "Machine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed.",
                "category": "Technology"
            },
            {
                "id": "2",
                "title": "Natural Language Processing Basics",
                "content": "Natural language processing (NLP) is a branch of AI that helps computers understand, interpret and manipulate human language.",
                "category": "Technology"
            },
            {
                "id": "3",
                "title": "Deep Learning Neural Networks",
                "content": "Deep learning uses neural networks with multiple layers to progressively extract higher-level features from raw input data.",
                "category": "Technology"
            }
        ]
    
    def _preprocess_text(self, text: str) -> str:
        """Preprocess text for NLP analysis."""
        # Convert to lowercase
        text = text.lower()
        # Remove special characters but keep spaces
        text = re.sub(r'[^a-z0-9\s]', '', text)
        # Remove extra whitespace
        text = ' '.join(text.split())
        return text
    
    def _initialize_models(self) -> None:
        """Initialize TF-IDF vectorizer and Word2Vec model."""
        if not self.documents:
            print("No documents to initialize models")
            return
        
        # Prepare corpus
        corpus = [
            self._preprocess_text(f"{doc.get('title', '')} {doc.get('content', '')}")
            for doc in self.documents
        ]
        
        print(f"Initializing TF-IDF with {len(corpus)} documents...")
        
        # Initialize TF-IDF
        self.tfidf_vectorizer = TfidfVectorizer(
            max_features=settings.TFIDF_MAX_FEATURES,
            stop_words='english',
            ngram_range=(1, 2),
            min_df=2,  # Ignore terms that appear in less than 2 documents
            max_df=0.8  # Ignore terms that appear in more than 80% of documents
        )
        self.tfidf_matrix = self.tfidf_vectorizer.fit_transform(corpus)
        print(f"✓ TF-IDF initialized: {self.tfidf_matrix.shape}")
        
        # Load pre-trained Word2Vec model (using GloVe)
        if settings.USE_WORD2VEC:
            try:
                print("Loading Word2Vec model (this may take a moment)...")
                self.word2vec_model = api.load('glove-wiki-gigaword-50')
                print("Word2Vec model loaded successfully")
            except Exception as e:
                print(f"Warning: Could not load Word2Vec model: {e}")
                print("Continuing with TF-IDF only...")
                self.word2vec_model = None
        else:
            print("Word2Vec disabled - using TF-IDF only")
            self.word2vec_model = None
    
    def _get_word2vec_similarity(self, query: str, document: str) -> float:
        """Calculate semantic similarity using Word2Vec."""
        if not self.word2vec_model:
            return 0.0
        
        try:
            query_words = query.split()
            doc_words = document.split()
            
            # Get word vectors
            query_vectors = [
                self.word2vec_model[word]
                for word in query_words
                if word in self.word2vec_model
            ]
            doc_vectors = [
                self.word2vec_model[word]
                for word in doc_words
                if word in self.word2vec_model
            ]
            
            if not query_vectors or not doc_vectors:
                return 0.0
            
            # Calculate average vectors
            query_vec = np.mean(query_vectors, axis=0).reshape(1, -1)
            doc_vec = np.mean(doc_vectors, axis=0).reshape(1, -1)
            
            # Calculate cosine similarity
            similarity = cosine_similarity(query_vec, doc_vec)[0][0]
            return max(0.0, similarity)
            
        except Exception as e:
            print(f"Word2Vec similarity error: {e}")
            return 0.0
    
    def search(self, query: str, max_results: int = None) -> Dict[str, Any]:
        """
        Search documents using hybrid TF-IDF and Word2Vec approach.
        
        Args:
            query: Search query string
            max_results: Maximum number of results to return
            
        Returns:
            Dictionary with search results and metadata
        """
        start_time = time.time()
        
        if not query or not query.strip():
            return {
                "query": query,
                "results": [],
                "total_results": 0,
                "execution_time": 0.0
            }
        
        max_results = max_results or settings.MAX_RESULTS
        processed_query = self._preprocess_text(query)
        
        # TF-IDF similarity (fast vectorized operation)
        query_vector = self.tfidf_vectorizer.transform([processed_query])
        tfidf_scores = cosine_similarity(query_vector, self.tfidf_matrix)[0]
        
        # Get top candidates from TF-IDF (limit to top 100 for Word2Vec processing)
        top_candidate_count = min(100, len(self.documents))
        top_indices = np.argsort(tfidf_scores)[-top_candidate_count:][::-1]
        
        # Only calculate Word2Vec for top TF-IDF candidates
        results = []
        for idx in top_indices:
            doc = self.documents[idx]
            tfidf_score = float(tfidf_scores[idx])
            
            # Skip very low TF-IDF scores
            if tfidf_score < settings.MIN_SIMILARITY_THRESHOLD:
                break
            
            # Word2Vec semantic similarity (only for top candidates)
            word2vec_score = 0.0
            if self.word2vec_model and settings.USE_WORD2VEC:
                doc_text = self._preprocess_text(
                    f"{doc.get('title', '')} {doc.get('content', '')}"
                )
                word2vec_score = self._get_word2vec_similarity(processed_query, doc_text)
            
            # Hybrid scoring (70% TF-IDF, 30% Word2Vec)
            combined_score = (0.7 * tfidf_score) + (0.3 * word2vec_score)
            
            results.append({
                "id": doc.get("id", str(idx)),
                "title": doc.get("title", "Untitled"),
                "content": doc.get("content", ""),
                "category": doc.get("category"),
                "score": float(combined_score)
            })
        
        # Sort by combined score and limit results
        results.sort(key=lambda x: x["score"], reverse=True)
        results = results[:max_results]
        
        execution_time = time.time() - start_time
        
        return {
            "query": query,
            "results": results,
            "total_results": len(results),
            "execution_time": round(execution_time, 4)
        }


# Global search engine instance
search_engine = None


def get_search_engine() -> SearchEngine:
    """Get or create the search engine instance."""
    global search_engine
    if search_engine is None:
        search_engine = SearchEngine()
    return search_engine
