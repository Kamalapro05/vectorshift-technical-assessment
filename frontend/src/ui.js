// src/ui.js
import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

// Original nodes
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';

// NEW 5 nodes
import { ConditionNode } from './nodes/conditionNode';
import { APINode } from './nodes/apiNode';
import { CodeNode } from './nodes/codeNode';
import { DelayNode } from './nodes/delayNode';
import { MergeNode } from './nodes/mergeNode';

// ✅ UNDO/REDO CONTROLS IMPORT
import { UndoRedoControls } from './components/UndoRedoControls';

import 'reactflow/dist/style.css';

const gridSize = 20;
const proOptions = { hideAttribution: true };

const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  condition: ConditionNode,
  api: APINode,
  code: CodeNode,
  delay: DelayNode,
  merge: MergeNode,
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export const PipelineUI = () => {
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const {
    nodes, edges, getNodeID, addNode,
    onNodesChange, onEdgesChange, onConnect
  } = useStore(selector, shallow);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
    const appData = JSON.parse(event.dataTransfer.getData('application/reactflow') || '{}');
    const type = appData?.nodeType;
    if (!type) return;

    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    const nodeID = getNodeID(type);
    
    addNode({
      id: nodeID,
      type,
      position,
      data: { id: nodeID, nodeType: type },
      style: { width: 240, height: 120 }, 
    });
  }, [reactFlowInstance]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  return (
    // ✅ CRITICAL FIX: overflow visible + relative positioning
    <div ref={reactFlowWrapper} style={{ width: '100vw', height: '70vh', position: 'relative', overflow: 'visible' }}>
      
      {/* ✅ Buttons placed HERE with high z-index */}
      <div style={{ position: 'absolute', left: '16px', top: '16px', zIndex: 99999, pointerEvents: 'auto' }}>
        <UndoRedoControls />
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onInit={setReactFlowInstance}
        nodeTypes={nodeTypes}
        proOptions={proOptions}
        snapGrid={[gridSize, gridSize]}
        connectionLineType="smoothstep"
        style={{ overflow: 'visible' }} // ✅ Ensure ReactFlow doesn't clip
      >
        <Background color="#aaa" gap={gridSize} />
        <Controls />
        <MiniMap />
      </ReactFlow>
    </div>
  );
};