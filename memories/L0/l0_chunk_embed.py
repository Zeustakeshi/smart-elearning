# l0_chunk_embed.py (text + chat history + audio + Gemini embedding)

import os
from pathlib import Path
from config import QDRANT_URL, QDRANT_COLLECTION, OPENAI_API_KEY
from langchain_community.document_loaders import TextLoader
from langchain_community.document_loaders import ChatMessageHistoryLoader
from langchain_community.document_loaders import AudioLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import Qdrant
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from qdrant_client import QdrantClient
from qdrant_client.http.models import Distance, VectorParams

# ------------------ CONFIG ------------------
CHUNK_SIZE = 300
CHUNK_OVERLAP = 30
BASE_DIR = Path("data_raw")
CHAT_HISTORY_DIR = Path("data_chat")
AUDIO_DIR = Path("data_audio")

embeddings = GoogleGenerativeAIEmbeddings(model="models/embedding-001", google_api_key=OPENAI_API_KEY)

print(f"[L0] Kết nối đến Qdrant: {QDRANT_URL}")
qdrant_client = QdrantClient(url=QDRANT_URL)

# Check or create collection
existing = [c.name for c in qdrant_client.get_collections().collections]
if QDRANT_COLLECTION not in existing:
    print(f"[L0] Collection '{QDRANT_COLLECTION}' chưa tồn tại, tạo mới …")
    qdrant_client.recreate_collection(
        collection_name=QDRANT_COLLECTION,
        vectors_config={
            "default": VectorParams(
                size=768,
                distance=Distance.COSINE
            )
        }
    )

# ------------------ LOAD TEXT FILES ------------------
all_documents = []
print("[L0] Đang quét file .txt trong:", BASE_DIR)

for path in BASE_DIR.glob("Cap_*/Lop_*/**/*.txt"):
    try:
        loader = TextLoader(str(path), encoding="utf-8")
        docs = loader.load()
        for doc in docs:
            parts = path.parts
            doc.metadata = {
                "source": path.name,
                "track": parts[1],
                "grade": parts[2],
                "subject": parts[3],
                "topic": path.stem,
                "source_type": "text",
                "namespace": "text"
            }
            all_documents.append(doc)
    except Exception as e:
        print(f"[L0] Lỗi khi load {path}: {e}")

# ------------------ LOAD CHAT HISTORY ------------------
if CHAT_HISTORY_DIR.exists():
    print("[L0] Đang quét chat logs trong:", CHAT_HISTORY_DIR)
    for path in CHAT_HISTORY_DIR.glob("*.json"):
        try:
            loader = ChatMessageHistoryLoader(str(path))
            docs = loader.load()
            for doc in docs:
                doc.metadata = {
                    "source": path.name,
                    "source_type": "chat",
                    "namespace": "chat"
                }
                all_documents.append(doc)
        except Exception as e:
            print(f"[L0] Lỗi khi load chat {path}: {e}")

# ------------------ LOAD AUDIO ------------------
if AUDIO_DIR.exists():
    print("[L0] Đang quét audio trong:", AUDIO_DIR)
    for path in AUDIO_DIR.glob("*.wav"):
        try:
            loader = AudioLoader(str(path))
            docs = loader.load()
            for doc in docs:
                doc.metadata = {
                    "source": path.name,
                    "source_type": "audio",
                    "namespace": "audio"
                }
                all_documents.append(doc)
        except Exception as e:
            print(f"[L0] Lỗi khi load audio {path}: {e}")

print(f"[L0] Tổng số documents (text/chat/audio): {len(all_documents)}")

# ------------------ CHUNK ------------------
splitter = RecursiveCharacterTextSplitter(chunk_size=CHUNK_SIZE, chunk_overlap=CHUNK_OVERLAP)
all_chunks = []
for doc in all_documents:
    chunked = splitter.split_documents([doc])
    for c in chunked:
        c.metadata["content"] = c.page_content
        c.metadata["text"] = c.page_content
    all_chunks.extend(chunked)

print(f"[L0] Tổng chunks sau khi chia: {len(all_chunks)}")

# ------------------ EMBED & UPLOAD ------------------
qdrant_store = Qdrant.from_documents(
    documents=all_chunks,
    embedding=embeddings,
    url=QDRANT_URL,
    collection_name=QDRANT_COLLECTION
)

print("[L0] Đã đẩy xong chunks vào Qdrant.")
