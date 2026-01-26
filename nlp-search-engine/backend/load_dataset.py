"""Script to load large dataset_news.json into backend data folder."""

import json
import sys
from pathlib import Path


def load_large_dataset(source_path: str, output_path: str, max_documents: int = None):
    """
    Load and process large news dataset file.
    
    Args:
        source_path: Path to source dataset_news.json
        output_path: Path to output documents.json
        max_documents: Maximum documents to include (None = all)
    """
    print(f"Loading dataset from: {source_path}")
    print("This may take a moment for large files...")
    
    try:
        with open(source_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        print(f"✓ File loaded successfully")
        
        # Handle different JSON structures
        if isinstance(data, list):
            raw_documents = data
        elif isinstance(data, dict):
            # Try common keys for news datasets
            raw_documents = (
                data.get('articles') or
                data.get('documents') or 
                data.get('news') or 
                data.get('data') or
                []
            )
        else:
            print("Error: Unexpected JSON structure")
            return
        
        total_docs = len(raw_documents)
        print(f"✓ Found {total_docs:,} documents in dataset")
        
        # Limit documents if specified
        if max_documents:
            raw_documents = raw_documents[:max_documents]
            print(f"✓ Processing first {max_documents:,} documents")
        
        # Normalize document structure for news articles
        normalized_docs = []
        skipped = 0
        
        for idx, doc in enumerate(raw_documents):
            # Map news article fields to our schema
            title = (
                doc.get("headline") or 
                doc.get("title") or 
                doc.get("heading") or
                f"Article {idx + 1}"
            )
            
            content = (
                doc.get("description") or 
                doc.get("content") or 
                doc.get("text") or 
                doc.get("body") or
                doc.get("summary") or
                ""
            )
            
            # Skip documents with no content
            if not content or not content.strip():
                skipped += 1
                continue
            
            # Combine headline and description for better search
            full_content = f"{title}. {content}".strip()
            
            normalized_doc = {
                "id": str(doc.get("id", idx + 1)),
                "title": title[:200],  # Limit title length
                "content": full_content[:2000],  # Limit content for performance
                "category": doc.get("category") or doc.get("topic") or doc.get("section") or "News"
            }
            normalized_docs.append(normalized_doc)
            
            # Progress indicator
            if (idx + 1) % 10000 == 0:
                print(f"  Processed {idx + 1:,} documents...")
        
        print(f"✓ Successfully normalized {len(normalized_docs):,} documents")
        if skipped > 0:
            print(f"  Skipped {skipped:,} documents with no content")
        
        # Save normalized documents
        output_data = {"documents": normalized_docs}
        
        Path(output_path).parent.mkdir(parents=True, exist_ok=True)
        
        print(f"Saving to: {output_path}")
        with open(output_path, 'w', encoding='utf-8') as f:
            json.dump(output_data, f, indent=2, ensure_ascii=False)
        
        print(f"\n{'='*60}")
        print(f"✓ SUCCESS! Processed {len(normalized_docs):,} documents")
        print(f"✓ Saved to: {output_path}")
        
        # Calculate file size
        file_size = Path(output_path).stat().st_size / (1024 * 1024)
        print(f"✓ File size: {file_size:.2f} MB")
        print(f"{'='*60}\n")
        
    except FileNotFoundError:
        print(f"❌ Error: File not found at {source_path}")
    except json.JSONDecodeError as e:
        print(f"❌ Error: Invalid JSON format - {e}")
    except MemoryError:
        print(f"❌ Error: File too large for memory. Try using max_documents parameter.")
        print(f"   Example: python load_dataset.py {source_path} {output_path} 50000")
    except Exception as e:
        print(f"❌ Error: {e}")


if __name__ == "__main__":
    # Default paths
    source = "../dataset_news.json"
    output = "data/documents.json"
    max_docs = None  # Process all by default
    
    # Command line arguments
    if len(sys.argv) > 1:
        source = sys.argv[1]
    if len(sys.argv) > 2:
        output = sys.argv[2]
    if len(sys.argv) > 3:
        max_docs = int(sys.argv[3])
    
    print("\n" + "=" * 60)
    print("📰 News Dataset Loader for NLP Search Engine")
    print("=" * 60 + "\n")
    
    load_large_dataset(source, output, max_docs)
    
    print("\n📋 Usage:")
    print("  python load_dataset.py [source] [output] [max_docs]")
    print("\n📝 Examples:")
    print("  # Load all articles:")
    print("  python load_dataset.py ../dataset_news.json data/documents.json")
    print("\n  # Load first 50,000 articles:")
    print("  python load_dataset.py ../dataset_news.json data/documents.json 50000")
    print("\n  # Recommended for 200k+ articles:")
    print("  python load_dataset.py ../dataset_news.json data/documents.json 100000")
    print()

