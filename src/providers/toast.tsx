// src/providers/ToastProvider.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Toast, ToastVariant, ToastPosition } from '@/components/Toast';

interface ToastOptions {
  title?: string;
  message?: string;
  variant?: ToastVariant;
  position?: ToastPosition;
  duration?: number;
}

interface ToastContextType {
  showToast: (options?: ToastOptions) => void;
  hideToast: () => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toastState, setToastState] = useState({
    visible: false,
    message: '',
    title: '',
    variant: 'success' as ToastVariant,
    position: 'bottom' as ToastPosition,
    duration: 5000,
  });

  const showToast = (options?: ToastOptions) => {
    setToastState({
      visible: true,
      message: options?.message || '',
      title: options?.title || '',
      variant: options?.variant || 'success',
      position: options?.position || 'bottom',
      duration: options?.duration || 5000,
    });
  };

  const hideToast = () => {
    setToastState((prev) => ({ ...prev, visible: false }));
  };

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      {children}
      <Toast
        visible={toastState.visible}
        message={toastState.message}
        title={toastState.title}
        variant={toastState.variant}
        position={toastState.position}
        duration={toastState.duration}
        onClose={hideToast}
      />
    </ToastContext.Provider>
  );
};

// Hook para usar o Toast em qualquer componente
export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};