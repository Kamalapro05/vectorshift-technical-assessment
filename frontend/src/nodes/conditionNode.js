import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const ConditionNode = ({ id, data }) => {
  const [operator, setOperator] = useState(data?.operator || 'equals');

  return (
    <BaseNode 
      id={id} 
      data={data} 
      label="Condition" 
      icon="⚡"
      targetHandles={[{ id: `${id}-input` }]}
      sourceHandles={[
        { id: `${id}-true`, style: { top: '35%' } },
        { id: `${id}-false`, style: { top: '65%' } }
      ]}
    >
      <div className="vs-field-group">
        <label>Operator</label>
        <select value={operator} onChange={(e) => setOperator(e.target.value)} className="vs-select">
          <option value="equals">Equals</option>
          <option value="not_equals">Not Equals</option>
          <option value="contains">Contains</option>
        </select>
      </div>
    </BaseNode>
  );
};