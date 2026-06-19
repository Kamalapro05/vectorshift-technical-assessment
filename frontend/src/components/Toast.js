// src/components/Toast.js
import { useState, useEffect } from 'react';

export const useToast = () => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  return { toast, showToast };
};

export const ToastContainer = ({ toast }) => {
  if (!toast) return null;

  const styles = {
    success: { bg: '#10b981', icon: '✅' },
    error: { bg: '#ef4444', icon: '❌' },
    info: { bg: '#3b82f6', icon: '️' }
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