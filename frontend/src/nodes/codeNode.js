import { useState } from 'react';
import { BaseNode } from './BaseNode';

export const CodeNode = ({ id, data }) => {
  const [code, setCode] = useState(data?.code || '// Write your code here\nreturn input;');

  return (
    <BaseNode 
      id={id} 
      data={data} 
      label="Code" 
      icon="💻"
      targetHandles={[{ id: `${id}-input` }]}
      sourceHandles={[{ id: `${id}-output` }]}
    >
      <textarea 
        value={code} 
        onChange={(e) => setCode(e.target.value)} 
        className="vs-textarea vs-code-editor"
        rows={4}
        spellCheck={false}
      />
    </BaseNode>
  );
};