# VectorShift Pipeline Builder Assessment
**Candidate:** Kamalakanta Rout  
**Assessment:** Technical Assessment - AI Pipeline Visualizer  

A professional-grade, interactive AI pipeline builder featuring 9 node types, real-time DAG validation, dynamic variable detection, and full undo/redo history management. Built with ReactFlow, Zustand, and FastAPI.

![Pipeline Demo](https://img.shields.io/badge/Status-Complete-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Latest-green)

## ✨ Key Features
- **9 Draggable Node Types:** Input, LLM, Output, Text, Condition, API, Code, Delay, Merge with unique color-coded accents
- **Dynamic Text Node:** Auto-resizing textarea with real-time `{{variable}}` handle detection
- **Professional UX:** Non-blocking toast notifications, loading states, and disabled button feedback
- **Full Undo/Redo:** Immutable state history with Ctrl+Z / Ctrl+Shift+Z keyboard shortcuts (50-step limit)
- **Backend Validation:** Kahn's Algorithm for DAG cycle detection via FastAPI
- **Unified Dark Theme:** Consistent design language across all components

  🎯 Assessment Highlights
BaseNode Abstraction: Single reusable component for all 9 node types
Immutable State Management: Functional updates prevent race conditions in undo/redo
Context API Pattern: Shared toast state across deeply nested components
Algorithmic Correctness: Kahn's Topological Sort for O(V+E) cycle detection
Production UX Patterns: Loading states, disabled buttons, non-blocking feedback
📹 Demo Video
[Link to your screen recording if hosted externally, or note: "See included demo.mp4"]
📬 Contact
Kamalakanta Rout | kamalapro05@gmail.com 

## 🛠️ Prerequisites
Ensure these are installed **before** starting:
- [Node.js v18+](https://nodejs.org/) (includes npm)
- [Python 3.10+](https://www.python.org/downloads/) 
- Git (for cloning)

> ⚠️ **Windows Users:** Always use **PowerShell** or **Git Bash**. Avoid Command Prompt for Python commands.

## 🚀 Installation & Setup

### 1. Clone Repository
```powershell
git clone https://github.com/kamalapro05/vectorshift-technical-assessment.git
cd vectorshift-technical-assessment


# Navigate to backend folder
cd backend

# Create virtual environment (recommended to avoid permission errors)
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install fastapi uvicorn pydantic

# Start server
python -m uvicorn main:app --reload


# Navigate to backend folder
cd backend

# Create virtual environment (recommended to avoid permission errors)
python -m venv venv

# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install fastapi uvicorn pydantic

# Start server
python -m uvicorn main:app --reload



vectorshift-technical-assessment/
├── backend/
│   ├── main.py              # FastAPI server + DAG validation
│   ── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── nodes/           # 9 custom node components
│   │   ├── components/      # Toast, UndoRedo controls
│   │   ├── store.js         # Zustand state + history management
│   │   ├── ui.js            # ReactFlow canvas
│   │   ── App.js           # Root layout
│   └── package.json
└── README.md

