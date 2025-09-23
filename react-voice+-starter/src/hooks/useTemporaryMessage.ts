import { useState, useEffect, useCallback } from 'react';

const MESSAGE_DISPLAY_DURATION = 3000;

export const useTemporaryMessage = () => {
  const [message, setMessage] = useState('');

  const showMessage = useCallback((newMessage: string) => {
    setMessage(newMessage);
  }, []);

  const clearMessage = useCallback(() => {
    setMessage('');
  }, []);

  useEffect(() => {
    if (!message) return;

    const timeoutId = setTimeout(clearMessage, MESSAGE_DISPLAY_DURATION);
    
    return () => clearTimeout(timeoutId);
  }, [message, clearMessage]);

  return {
    message,
    showMessage,
    clearMessage
  };
};
