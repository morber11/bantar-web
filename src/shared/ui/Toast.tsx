import React, { useEffect, useRef, useState } from 'react';
import { useAppSettings } from '../context/appSettingsContextImpl';

interface ToastProps {
  message: string;
  duration?: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);
  const onCloseRef = useRef(onClose);
  const { resolvedTheme } = useAppSettings();

  const FADE_OUT_DURATION = 300;

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onCloseRef.current(), FADE_OUT_DURATION);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  const fadeInKeyframes = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `;

  const bgColor = resolvedTheme === 'dark' ? 'bg-green-800' : 'bg-green-600';

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: fadeInKeyframes }} />
      <div className={`fixed bottom-4 right-4 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-in slide-in-from-bottom-2 animate-[fadeIn_0.3s_ease-in-out] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        {message}
      </div>
    </>
  );
};

export default Toast;