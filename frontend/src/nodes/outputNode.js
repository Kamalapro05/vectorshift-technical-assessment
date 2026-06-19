import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const OutputNode = ({ id, data }) => {
  const [name, setName] = useState(data?.outputName || 'Output_1');
  const [type, setType] = useState(data?.outputType || 'Text');

  return (
    <BaseNode 
      id={id} 
      data={data} 
      label="Output" 
      icon="📤"
      targetHandles={[{ id: `${id}-value` }]}
    >
      <div className="vs-field-group">
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="vs-input" />
      </div>
      <div className="vs-field-group">
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)} className="vs-select">
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </div>
    </BaseNode>
  );
};