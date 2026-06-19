import { BaseNode } from './BaseNode';

export const MergeNode = ({ id, data }) => {
  return (
    <BaseNode 
      id={id} 
      data={data} 
      label="Merge" 
      icon="🔀"
      targetHandles={[
        { id: `${id}-a`, style: { top: '25%' } },
        { id: `${id}-b`, style: { top: '50%' } },
        { id: `${id}-c`, style: { top: '75%' } }
      ]}
      sourceHandles={[{ id: `${id}-merged` }]}
    >
      <p className="vs-node-desc">Combines multiple inputs into one output.</p>
    </BaseNode>
  );
};