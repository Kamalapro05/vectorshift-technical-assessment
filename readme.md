# VectorShift Technical Assessment

Submission by **Kamalakanta** for the VectorShift Frontend Technical Assessment.

This project implements a node-based pipeline builder (frontend) and a FastAPI
backend that validates whether a submitted pipeline forms a Directed Acyclic
Graph (DAG).

---

## Project Structure

```
VectorShift_Assessment/
├── frontend/        # React app (pipeline builder UI)
├── backend/         # FastAPI app (pipeline parsing / DAG check)
└── README.md
```

---

## How to Run

### Frontend

```bash
cd frontend
npm i
npm start
```

Runs on `http://localhost:3000`.

### Backend

```bash
cd backend
pip install fastapi uvicorn pydantic
uvicorn main:app --reload
```

Runs on `http://localhost:8000`.

> Start the backend before clicking Submit on the frontend, otherwise the
> request to `/pipelines/parse` will fail.

---

## What Was Implemented

### Part 1 — Node Abstraction

All nodes (`InputNode`, `OutputNode`, `LLMNode`, `TextNode`, and 5 new nodes)
are built on top of a shared base node component. Instead of duplicating
markup/styles/handle logic per node, each node type passes its specific
config (title, fields, handles) into the shared abstraction, which renders
the consistent shell, styling, and handle positioning. This made adding new
node types fast — each new node is just a small config object.

**New nodes added to demonstrate the abstraction:**
1. **Condition Node** — branches pipeline flow based on a condition
2. **API Node** — represents an external API call
3. **Code Node** — represents a code execution step
4. **Delay Node** — adds a timed delay step
5. **Merge Node** — merges multiple inputs into one

### Part 2 — Styling

Unified visual design applied across the toolbar, canvas, and all nodes
(consistent color palette, spacing, typography, hover/active states).

### Part 3 — Text Node Logic

- The Text node's textarea auto-resizes (width/height) as the user types,
  so longer text stays fully visible.
- The node parses the text for `{{ variableName }}` patterns. For every
  valid JS variable name found, a corresponding input Handle is dynamically
  added to the left side of the node.

### Part 4 — Backend Integration

- `frontend/src/submit.js` sends the current pipeline's `nodes` and `edges`
  to the backend's `POST /pipelines/parse` endpoint when the Submit button
  is clicked.
- `backend/main.py`'s `/pipelines/parse` endpoint computes:
  - `num_nodes` — total node count
  - `num_edges` — total edge count
  - `is_dag` — whether the graph is a valid DAG (via Kahn's algorithm /
    topological sort)
- On response, the frontend shows an alert/toast summarizing these three
  values in a user-friendly way.

---

## Notes

- State management uses Zustand (`src/store.js`), including undo/redo
  history tracking for node/edge changes.
- CORS is enabled on the backend (`allow_origins=["*"]`) so the frontend
  (`localhost:3000`) can call the backend (`localhost:8000`) during local
  development.