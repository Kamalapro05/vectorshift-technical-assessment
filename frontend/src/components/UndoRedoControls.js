// src/components/UndoRedoControls.js
import { useEffect, useRef } from 'react';
import { useStore } from '../store';

export const UndoRedoControls = () => {
  const { undo, redo, past, future } = useStore();
  
  const undoRef = useRef(undo);
  const redoRef = useRef(redo);
  
  useEffect(() => {
    undoRef.current = undo;
    redoRef.current = redo;
  }, [undo, redo]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        undoRef.current();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
        e.preventDefault();
        redoRef.current();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const canUndo = past.length > 0;
  const canRedo = future.length > 0;

  const btnStyle = (enabled) => ({
    width: '36px', height: '36px', borderRadius: '8px',
    background: enabled ? '#1e293b' : '#0f172a',
    border: '1px solid #334155', 
    color: enabled ? '#f1f5f9' : '#475569',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    cursor: enabled ? 'pointer' : 'not-allowed', 
    fontSize: '18px', marginBottom: '6px',
    transition: 'all 0.2s ease',
    boxShadow: enabled ? '0 2px 8px rgba(0,0,0,0.3)' : 'none'
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <button onClick={undo} disabled={!canUndo} style={btnStyle(canUndo)} title="Undo (Ctrl+Z)">
        ↩
      </button>
      <button onClick={redo} disabled={!canRedo} style={btnStyle(canRedo)} title="Redo (Ctrl+Shift+Z)">
        ↪
      </button>
    </div>
  );
};