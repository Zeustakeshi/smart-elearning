# config.py

import os

# ----------------------------
# CẤU HÌNH CHUNG CHO TOÀN DỰ ÁN
# ----------------------------

# 1. Qdrant (VectorDB Layer)
QDRANT_URL = os.getenv("QDRANT_URL", "http://localhost:6334")
QDRANT_COLLECTION = os.getenv("QDRANT_COLLECTION", "hoclieu")

# 2. Neo4j (Graph Layer)
NEO4J_URL = os.getenv("NEO4J_URL", "bolt://localhost:7687")
NEO4J_USER = os.getenv("NEO4J_USER", "neo4j")
NEO4J_PASS = os.getenv("NEO4J_PASS", "12345678")

# 3. Gemini or OpenAI (LLM Summary Layer)
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY", "AIzaSyAL1oOQHrbulU2SE3kvkahBaEzwYejQlq4")

# 4. Ollama local LLM
OLLAMA_HOST = os.getenv("OLLAMA_HOST", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "gemma3:1b")

# 5. Embedding model
EMBEDDING_MODEL_PATH = os.getenv("EMBEDDING_MODEL_PATH", "models/all-MiniLM-L6-v2")

# 6. Environment flags
ENVIRONMENT = os.getenv("ENVIRONMENT", "local")  
IS_DOCKER = os.getenv("IS_DOCKER", "false").lower() == "true"

# 7. Memory RAG API default
MEMORY_API_HOST = os.getenv("MEMORY_API_HOST", "http://localhost:8000")
