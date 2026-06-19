import { BaseNode } from './BaseNode';

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode 
      id={id} 
      data={data} 
      label="LLM" 
      icon="🤖"
      targetHandles={[
        { id: `${id}-system`, style: { top: '30%' } },
        { id: `${id}-prompt`, style: { top: '60%' } }
      ]}
      sourceHandles={[{ id: `${id}-response` }]}
    >
      <p className="vs-node-desc">This is an LLM node.</p>
    </BaseNode>
  );
};