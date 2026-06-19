import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const APINode = ({ id, data }) => {
  const [url, setUrl] = useState(data?.url || 'https://api.example.com');
  const [method, setMethod] = useState(data?.method || 'GET');

  return (
    <BaseNode 
      id={id} 
      data={data} 
      label="API Request" 
      icon="🌐"
      targetHandles={[{ id: `${id}-trigger` }]}
      sourceHandles={[{ id: `${id}-response` }]}
    >
      <div className="vs-field-group">
        <label>URL</label>
        <input value={url} onChange={(e) => setUrl(e.target.value)} className="vs-input" />
      </div>
      <div className="vs-field-group">
        <label>Method</label>
        <select value={method} onChange={(e) => setMethod(e.target.value)} className="vs-select">
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
        </select>
      </div>
    </BaseNode>
  );
};