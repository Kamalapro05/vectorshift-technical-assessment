// src/toolbar.js
import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      <DraggableNode type='customInput' label='📥 Input' />
      <DraggableNode type='llm' label='🤖 LLM' />
      <DraggableNode type='customOutput' label=' Output' />
      <DraggableNode type='text' label='📝 Text' />
      <DraggableNode type='condition' label=' Condition' />
      <DraggableNode type='api' label='🌐 API' />
      <DraggableNode type='code' label='💻 Code' />
      <DraggableNode type='delay' label='⏱️ Delay' />
      <DraggableNode type='merge' label=' Merge' />
    </div>
  );
};