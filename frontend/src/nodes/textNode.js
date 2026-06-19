// src/nodes/textNode.js
import { useState, useMemo, useRef, useEffect } from 'react';
import { BaseNode } from './BaseNode';
import { useStore } from '../store';

export const TextNode = ({ id, data }) => {
  const [text, setText] = useState(data?.text || '{{input}}');
  const textareaRef = useRef(null);
  const updateNodeField = useStore((s) => s.updateNodeField);

  // Extract unique valid JS variable names from {{...}} patterns
  const variables = useMemo(() => {
    if (!text) return [];
    const regex = /\{\{([a-zA-Z_$][a-zA-Z0-9_$]*)\}\}/g;
    const matches = [...text.matchAll(regex)];
    return [...new Set(matches.map(m => m[1]))];
  }, [text]);

  // Auto-resize textarea AND update node dimensions in store
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${newHeight}px`;
      updateNodeField(id, 'height', newHeight + 60);
    }
  }, [text, id, updateNodeField]);

  // Generate dynamic target handles based on extracted variables
  const targetHandles = variables.map((v, i) => ({
    id: `${id}-${v}`,
    style: { top: `${25 + (i * 22)}%` }
  }));

  return (
    <BaseNode 
      id={id} 
      data={data} 
      label="Text" 
      icon="📝"
      targetHandles={targetHandles}
      sourceHandles={[{ id: `${id}-output` }]}
      className={variables.length > 0 ? 'vs-node-active' : ''}
    >
      <div className="vs-field-group">
        <label>Content (use {'{{variable}}'} for inputs)</label>
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="vs-textarea"
          rows={2}
          placeholder="Type text here..."
          spellCheck={false}
        />
      </div>
      {variables.length > 0 && (
        <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '4px' }}>
          Detected: {variables.join(', ')}
        </div>
      )}
    </BaseNode>
  );
};