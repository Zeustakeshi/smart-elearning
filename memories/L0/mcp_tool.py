# mcp_tool.py – MCP-backed tool using Qdrant + Gemini embedding

from typing import List
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain.vectorstores import Qdrant
from langchain.schema import Document
from config import QDRANT_URL, QDRANT_COLLECTION, OPENAI_API_KEY
from qdrant_client import QdrantClient
from qdrant_client.models import Filter, FieldCondition, MatchValue
from pathlib import Path
import random

# Embedding + store
embedding = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=OPENAI_API_KEY)
qdrant_client = QdrantClient(url=QDRANT_URL)
qdrant_store = Qdrant(
    client=qdrant_client,
    collection_name=QDRANT_COLLECTION,
    embeddings=embedding
)

def query_by_text(query: str, top_k: int = 5) -> List[Document]:
    return qdrant_store.similarity_search(query, k=top_k)

def query_by_id(chunk_id: str) -> List[Document]:
    hits = qdrant_client.retrieve(collection_name=QDRANT_COLLECTION, ids=[chunk_id], with_payload=True)
    return [Document(page_content=h.payload.get("text"), metadata=h.payload.get("metadata", {})) for h in hits]

def query_by_metadata(field: str, value: str, top_k: int = 5) -> List[Document]:
    values = [v.strip() for v in value.split(",") if v.strip()]
    filters = [FieldCondition(key=f"metadata.{field}", match=MatchValue(value=v)) for v in values]
    f = Filter(any=filters)
    results = qdrant_store.similarity_search_with_score_by_vector([0.0]*768, filter=f, k=top_k)
    return [doc for doc, _ in results]

def query_chat_history(query: str, top_k: int = 5) -> List[Document]:
    f = Filter(must=[FieldCondition(key="metadata.namespace", match=MatchValue(value="chat"))])
    return qdrant_store.similarity_search(query, k=top_k, filter=f)

def query_audio(query: str, top_k: int = 5) -> List[Document]:
    f = Filter(must=[FieldCondition(key="metadata.namespace", match=MatchValue(value="audio"))])
    return qdrant_store.similarity_search(query, k=top_k, filter=f)

def query_file(query: str, top_k: int = 5) -> List[Document]:
    f = Filter(must=[FieldCondition(key="metadata.namespace", match=MatchValue(value="file"))])
    return qdrant_store.similarity_search(query, k=top_k, filter=f)

def query_random() -> Document:
    points, _ = qdrant_client.scroll(collection_name=QDRANT_COLLECTION, limit=50, with_payload=True)
    if not points:
        return Document(page_content="", metadata={})
    chosen = random.choice(points)
    return Document(page_content=chosen.payload.get("text", ""), metadata=chosen.payload.get("metadata", {}))

def tool_call(payload: dict) -> dict:
    return {
        "tool": payload.get("tool", "unknown"),
        "input": payload.get("input"),
        "output": f" Tool {payload.get('tool')} executed"
    }
