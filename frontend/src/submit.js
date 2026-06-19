// src/submit.js
import { useState } from 'react';
import { useStore } from './store';
import { useToast } from './components/ToastContext'; // ← Now uses shared context

export const SubmitButton = () => {
  const { nodes, edges } = useStore();
  const { showToast } = useToast(); // ← Gets SAME showToast as ToastContainer
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (nodes.length === 0) {
      showToast('Add nodes before analyzing', 'error');
      return;
    }

    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) throw new Error('Backend error: ' + response.status);

      const data = await response.json();
      
      if (data.is_dag) {
        showToast(
          'Valid DAG • ' + data.num_nodes + ' nodes, ' + data.num_edges + ' edges', 
          'success'
        );
      } else {
        showToast('Cycle Detected! Fix connections.', 'error');
      }
    } catch (err) {
      console.error('Error:', err);
      showToast('Connection failed: ' + err.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handleSubmit} 
      disabled={loading}
      className='submit-btn' 
      type='button'
      style={{ 
        zIndex: 10000, position: 'relative',
        opacity: loading ? 0.7 : 1,
        cursor: loading ? 'not-allowed' : 'pointer'
      }}
    >
      {loading ? 'Analyzing...' : 'Analyze Pipeline'}
    </button>
  );
};