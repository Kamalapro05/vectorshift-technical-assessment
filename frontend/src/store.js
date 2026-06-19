// src/store.js
import { create } from "zustand";
import { addEdge, applyNodeChanges, applyEdgeChanges, MarkerType } from 'reactflow';

const UNDO_LIMIT = 50;

export const useStore = create((set, get) => ({
  nodes: [],
  edges: [],
  nodeIDs: {},
  past: [],
  future: [],

  getNodeID: (type) => {
    let newID;
    set((state) => {
      const newIDs = { ...state.nodeIDs };
      if (newIDs[type] === undefined) newIDs[type] = 0;
      newIDs[type] += 1;
      newID = `${type}-${newIDs[type]}`;
      return { nodeIDs: newIDs };
    });
    return newID;
  },

  // ✅ Single source of truth for snapshotting. Called BEFORE a mutation
  // is applied, using the state passed in (never get() inside set()).
  _saveHistory: (state) => ({
    past: [
      ...state.past.slice(-UNDO_LIMIT + 1),
      {
        nodes: state.nodes,
        edges: state.edges,
        nodeIDs: state.nodeIDs,
      },
    ],
    future: [],
  }),

  addNode: (node) => {
    set((state) => {
      const historyPatch = get()._saveHistory(state);
      return {
        ...historyPatch,
        nodes: [...state.nodes, node],
      };
    });
  },

  // ✅ Only meaningful node changes create an undo step:
  //   - add / remove always count
  //   - position changes only count once dragging has FINISHED (change.dragging === false)
  //   - select / dimensions changes never count
  onNodesChange: (changes) => {
    const hasStructuralChange = changes.some(
      (c) => c.type === 'add' || c.type === 'remove'
    );
    const hasFinishedDrag = changes.some(
      (c) => c.type === 'position' && c.dragging === false
    );

    set((state) => {
      const newNodes = applyNodeChanges(changes, state.nodes);

      if (hasStructuralChange || hasFinishedDrag) {
        const historyPatch = get()._saveHistory(state);
        return { ...historyPatch, nodes: newNodes };
      }

      // Selection-only / mid-drag changes: update nodes, don't touch history
      return { nodes: newNodes };
    });
  },

  onEdgesChange: (changes) => {
    const isMeaningful = changes.some(
      (c) => c.type === 'add' || c.type === 'remove'
    );

    set((state) => {
      const newEdges = applyEdgeChanges(changes, state.edges);

      if (isMeaningful) {
        const historyPatch = get()._saveHistory(state);
        return { ...historyPatch, edges: newEdges };
      }

      return { edges: newEdges };
    });
  },

  onConnect: (connection) => {
    set((state) => {
      const historyPatch = get()._saveHistory(state);
      return {
        ...historyPatch,
        edges: addEdge(
          {
            ...connection,
            type: 'smoothstep',
            animated: true,
            markerEnd: { type: MarkerType.Arrow, height: '20px', width: '20px' },
          },
          state.edges
        ),
      };
    });
  },

  updateNodeField: (nodeId, fieldName, fieldValue) => {
    set((state) => {
      const historyPatch = get()._saveHistory(state);
      return {
        ...historyPatch,
        nodes: state.nodes.map((node) => {
          if (node.id !== nodeId) return node;
          const updatedData = { ...node.data, [fieldName]: fieldValue };
          if (fieldName === 'height') {
            return {
              ...node,
              data: updatedData,
              style: { ...(node.style || {}), height: fieldValue },
            };
          }
          return { ...node, data: updatedData };
        }),
      };
    });
  },

  undo: () => {
    set((state) => {
      if (state.past.length === 0) return state;

      const previous = state.past[state.past.length - 1];
      const newPast = state.past.slice(0, -1);

      return {
        nodes: previous.nodes,
        edges: previous.edges,
        nodeIDs: previous.nodeIDs,
        past: newPast,
        future: [
          { nodes: state.nodes, edges: state.edges, nodeIDs: state.nodeIDs },
          ...state.future,
        ],
      };
    });
  },

  redo: () => {
    set((state) => {
      if (state.future.length === 0) return state;

      const next = state.future[0];
      const newFuture = state.future.slice(1);

      return {
        nodes: next.nodes,
        edges: next.edges,
        nodeIDs: next.nodeIDs,
        past: [
          ...state.past,
          { nodes: state.nodes, edges: state.edges, nodeIDs: state.nodeIDs },
        ],
        future: newFuture,
      };
    });
  },
}));