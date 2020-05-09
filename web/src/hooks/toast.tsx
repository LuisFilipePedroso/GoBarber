import React, { createContext, useCallback, useContext, useState } from 'react';
import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastContainer';

export interface ToastMessage {
  id: string;
  type?: 'success' | 'error' | 'info';
  title: string;
  description?: string;
}

export interface RemoveToastProps {
  id: string;
}

interface ToastContextState {
  addToast(message: Omit<ToastMessage, 'id'>): void;
  removeToast(removeToastProps: RemoveToastProps): void;
}

const ToastContext = createContext<ToastContextState>({} as ToastContextState);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    ({ type, title, description }: Omit<ToastMessage, 'id'>) => {
      const id = uuid();

      const toast = {
        id,
        type,
        title,
        description,
      };

      setMessages((state) => [...state, toast]);
    },
    [],
  );
  const removeToast = useCallback(({ id }: RemoveToastProps) => {
    setMessages((state) => state.filter((message) => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

const useToast = (): ToastContextState => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast hook must be used inside ToastProvider');
  }

  return context;
};

export { ToastProvider, useToast };
