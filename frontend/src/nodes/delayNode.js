import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const DelayNode = ({ id, data }) => {
  const [duration, setDuration] = useState(data?.duration || 1000);

  return (
    <BaseNode 
      id={id} 
      data={data} 
      label="Delay" 
      icon="⏱️"
      targetHandles={[{ id: `${id}-trigger` }]}
      sourceHandles={[{ id: `${id}-done` }]}
    >
      <div className="vs-field-group">
        <label>Duration: {duration}ms</label>
        <input 
          type="range" 
          min="100" 
          max="10000" 
          step="100"
          value={duration} 
          onChange={(e) => setDuration(Number(e.target.value))} 
          className="vs-range"
        />
      </div>
    </BaseNode>
  );
};