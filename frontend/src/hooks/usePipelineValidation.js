import { useMemo } from 'react';

export const usePipelineValidation = (nodes, edges) => {
  return useMemo(() => {
    if (nodes.length === 0) return { isValid: false, message: 'Add nodes to start' };
    if (edges.length === 0) return { isValid: false, message: 'Connect your nodes' };
    
    // Simple cycle check (reuse backend logic client-side for instant feedback)
    const inDegree = {};
    nodes.forEach(n => inDegree[n.id] = 0);
    edges.forEach(e => { if (inDegree[e.target] !== undefined) inDegree[e.target]++; });
    
    const hasCycle = Object.values(inDegree).some(deg => deg > nodes.length);
    
    return {
      isValid: !hasCycle,
      message: hasCycle ? '⚠️ Cycle detected!' : '✅ Pipeline valid',
      nodeCount: nodes.length,
      edgeCount: edges.length
    };
  }, [nodes, edges]);
};