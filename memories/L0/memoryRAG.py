# memory_api.py – Model Context Protocol (MCP Server) – Dùng cho L2 RAG Layer

from fastapi import FastAPI, Query, Request
from typing import List, Optional
from pydantic import BaseModel
from fastapi.responses import StreamingResponse, JSONResponse

# Ensure tool implementations are defined
from mcp_tool import (
    query_by_text,
    query_by_id,
    query_by_metadata,
    query_random,
    query_chat_history,
    query_audio,
    query_file,
    tool_call
)
import json

app = FastAPI(title="Model Context Protocol (MCP Server)", version="2.0")

# ======= RESPONSE MODEL =======
class ChunkResult(BaseModel):
    id: str
    text: str
    metadata: dict

@app.get("/search", response_model=List[ChunkResult])
def search_chunks(q: str = Query(...), k: int = 5, stream: bool = False):
    chunks = query_by_text(q, top_k=k)
    if stream:
        def event_stream():
            for c in chunks:
                payload = {
                    "id": getattr(c, "id", "unknown"),
                    "text": c.page_content,
                    "metadata": c.metadata
                }
                yield f"data: {json.dumps(payload, ensure_ascii=False)}\n\n"
        return StreamingResponse(event_stream(), media_type="text/event-stream")
    return [ChunkResult(id=getattr(c, "id", "unknown"), text=c.page_content, metadata=c.metadata) for c in chunks]

@app.get("/search/stream")
def stream_search_chunks(q: str, k: int = 5):
    def event_stream():
        chunks = query_by_text(q, top_k=k)
        for c in chunks:
            payload = {
                "id": getattr(c, "id", "unknown"),
                "text": c.page_content,
                "metadata": c.metadata
            }
            yield f"data: {json.dumps(payload, ensure_ascii=False)}\n\n"
    return StreamingResponse(event_stream(), media_type="text/event-stream")

@app.get("/chunk/{chunk_id}", response_model=ChunkResult)
def get_chunk(chunk_id: str):
    found = query_by_id(chunk_id)
    if not found:
        return ChunkResult(id=chunk_id, text="Not found", metadata={})
    chunk = found[0]
    return ChunkResult(id=str(chunk.id), text=chunk.payload.get("text") or chunk.payload.get("page_content"), metadata=chunk.payload.get("metadata", {}))

@app.get("/chunk")
def get_chunks_by_ids(ids: str = Query(...)):
    id_list = ids.split(",")
    results = []
    for i in id_list:
        found = query_by_id(i.strip())
        if found:
            chunk = found[0]
            results.append({"id": str(chunk.id), "text": chunk.payload.get("text") or chunk.payload.get("page_content"), "metadata": chunk.payload.get("metadata", {})})
    return results

@app.get("/metadata", response_model=List[ChunkResult])
def search_by_metadata(field: str, value: str = Query(..., description="Comma-separated values, e.g., Lop 1,Lop 2"), k: int = 10):
    values = [v.strip() for v in value.split(",")]
    results = []
    for v in values:
        res = query_by_metadata(field, v, top_k=k)
        results.extend(res)
    return [ChunkResult(id=str(p.id), text=p.payload.get("text") or p.payload.get("page_content"), metadata=p.payload.get("metadata", {})) for p in results]

@app.get("/random", response_model=ChunkResult)
def random_chunk():
    chunk = query_random()
    return ChunkResult(id=str(chunk.id), text=chunk.payload.get("text") or chunk.payload.get("page_content"), metadata=chunk.payload.get("metadata", {}))

@app.get("/chat_history", response_model=List[ChunkResult])
def get_chat_history(q: str = Query(""), k: int = 5):
    chunks = query_chat_history(q, top_k=k)
    return [ChunkResult(id=str(c.id), text=c.payload.get("text") or c.payload.get("page_content"), metadata=c.payload.get("metadata", {})) for c in chunks]

@app.get("/audio", response_model=List[ChunkResult])
def get_audio_chunks(q: str = Query(""), k: int = 5):
    chunks = query_audio(q, top_k=k)
    return [ChunkResult(id=str(c.id), text=c.payload.get("text") or c.payload.get("page_content"), metadata=c.payload.get("metadata", {})) for c in chunks]

@app.get("/file", response_model=List[ChunkResult])
def get_file_chunks(q: str = Query(""), k: int = 5):
    chunks = query_file(q, top_k=k)
    return [ChunkResult(id=str(c.id), text=c.payload.get("text") or c.payload.get("page_content"), metadata=c.payload.get("metadata", {})) for c in chunks]

@app.post("/tool-call")
async def call_tool(req: Request):
    payload = await req.json()
    result = tool_call(payload)
    return JSONResponse(content=result)

@app.get("/health")
def health():
    return {"status": "ok", "message": "MCP server is live"}

@app.get("/info")
def info():
    return {
        "server": "MCP Python",
        "version": "2.0",
        "routes": [
            "/search", "/chunk/{id}", "/metadata", "/random",
            "/health", "/search/stream", "/chunk?ids=a,b",
            "/chat_history", "/audio", "/file", "/tool-call"
        ]
    }
