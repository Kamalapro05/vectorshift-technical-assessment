// src/nodes/BaseNode.js
import { Handle, Position } from 'reactflow';

export const BaseNode = ({ 
  id, data, label, icon, children, 
  targetHandles = [], sourceHandles = [],
  accentColor = '#3b82f6' // ← Default blue
}) => {
  return (
    <div style={{ 
      background: '#1e293b', 
      border: '1px solid #334155', 
      borderRadius: '12px', 
      minWidth: '220px',
      boxShadow: '0 4px 6px -1px rgba(0,0,0,0.3)',
      overflow: 'visible'
    }}>
      {/* Header with colored left border */}
      <div style={{ 
        padding: '10px 14px', 
        background: 'rgba(59, 130, 246, 0.05)',
        borderBottom: '1px solid #334155',
        display: 'flex', alignItems: 'center', gap: '8px',
        fontWeight: '600', fontSize: '14px', color: '#f1f5f9',
        borderRadius: '12px 12px 0 0',
        borderLeft: `4px solid ${accentColor}` // ← KEY VISUAL CUE
      }}>
        <span style={{ fontSize: '16px' }}>{icon}</span>
        <span>{label}</span>
      </div>
      
      {/* Target Handles */}
      {targetHandles.map((h, i) => (
        <Handle key={`t-${i}`} type="target" position={Position.Left} 
          id={h.id} style={h.style} 
          className="vs-handle vs-handle-target" />
      ))}

      <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {children}
      </div>

      {/* Source Handles */}
      {sourceHandles.map((h, i) => (
        <Handle key={`s-${i}`} type="source" position={Position.Right} 
          id={h.id} style={h.style} 
          className="vs-handle vs-handle-source" />
      ))}
    </div>
  );
};