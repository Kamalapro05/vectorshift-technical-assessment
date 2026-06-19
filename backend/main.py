# backend/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import deque, defaultdict

app = FastAPI()

# CRITICAL: Allow frontend (localhost:3000) to call this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class PipelineData(BaseModel):
    nodes: List[Dict[str, Any]]
    edges: List[Dict[str, Any]]

def check_dag(nodes: list, edges: list) -> bool:
    """Validates if the pipeline is a Directed Acyclic Graph using Kahn's Algorithm."""
    if not nodes:
        return True

    graph = defaultdict(list)
    in_degree = defaultdict(int)
    node_ids = {n['id'] for n in nodes}
    
    # Initialize all nodes with 0 in-degree
    for node_id in node_ids:
        in_degree[node_id] = 0
        
    # Build graph from edges
    for e in edges:
        source = e.get('source')
        target = e.get('target')
        if source and target:
            graph[source].append(target)
            in_degree[target] += 1
            
    # BFS Topological Sort
    queue = deque([n for n in node_ids if in_degree[n] == 0])
    visited_count = 0
    
    while queue:
        node = queue.popleft()
        visited_count += 1
        for neighbor in graph[node]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)
                
    # Valid DAG only if all nodes were visited
    return visited_count == len(node_ids)

@app.post("/pipelines/parse")  # MUST BE POST, NOT GET
async def parse_pipeline(data: PipelineData):
    num_nodes = len(data.nodes)
    num_edges = len(data.edges)
    is_dag = check_dag(data.nodes, data.edges)
    
    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }

@app.get("/")
def read_root():
    return {"status": "VectorShift Backend Running"}