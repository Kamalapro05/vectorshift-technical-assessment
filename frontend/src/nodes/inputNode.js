import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const InputNode = ({ id, data }) => {
  const [name, setName] = useState(data?.inputName || 'Input_1');
  const [type, setType] = useState(data?.inputType || 'Text');

  return (
    <BaseNode 
      id={id} 
      data={data} 
      label="Input" 
      icon="📥"
      sourceHandles={[{ id: `${id}-value` }]}
    >
      <div className="vs-field-group">
        <label>Name</label>
        <input value={name} onChange={(e) => setName(e.target.value)} className="vs-input" />
      </div>
      <div className="vs-field-group">
        <label>Type</label>
        <select value={type} onChange={(e) => setType(e.target.value)} className="vs-select">
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
};