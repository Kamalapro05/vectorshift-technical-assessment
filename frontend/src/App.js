// src/App.js
import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import { ToastProvider, useToast } from './components/ToastContext';
// ❌ UndoRedoControls removed from here — it's rendered once, inside PipelineUI (ui.js).
// Rendering it here too created a second mounted instance with its own keydown
// listener, so a single Ctrl+Z triggered undo() twice and skipped a history step.

const ToastContainer = ({ toast }) => {
  if (!toast) return null;
  const styles = {
    success: { bg: '#10b981', icon: '✅' },
    error: { bg: '#ef4444', icon: '❌' },
    info: { bg: '#3b82f6', icon: 'ℹ️' }
  };
  const style = styles[toast.type] || styles.success;

  return (
    <div style={{
      position: 'fixed', top: '24px', right: '24px', zIndex: 99999,
      background: style.bg, color: 'white', padding: '14px 24px',
      borderRadius: '10px', boxShadow: '0 8px 24px rgba(0,0,0,0.4)',
      fontSize: '14px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '10px',
      animation: 'slideIn 0.3s ease-out', backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255,255,255,0.1)'
    }}>
      <span style={{ fontSize: '18px' }}>{style.icon}</span>
      <span>{toast.message}</span>
    </div>
  );
};

function AppContent() {
  const { toast } = useToast();
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <ToastContainer toast={toast} />
      <div className='toolbar-container'>
        <PipelineToolbar />
      </div>

      {/* PipelineUI (ui.js) owns the canvas AND the floating UndoRedoControls */}
      <div style={{ flex: 1, position: 'relative' }}>
        <PipelineUI />
      </div>

      <div style={{ padding: '20px', display: 'flex', justifyContent: 'center', zIndex: 9999 }}>
        <SubmitButton />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}