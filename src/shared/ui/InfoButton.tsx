import React from 'react';
import Icon from './Icon';

interface InfoButtonProps {
  text: string;
  onClick?: (e: React.MouseEvent) => void;
}

const InfoButton = ({ text, onClick }: InfoButtonProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClick?.(e);
  };

  return (
    <button
      type="button"
      aria-label={`About ${text}`}
      onClick={handleClick}
      className="ml-2 inline-flex items-center justify-center text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
    >
      <Icon name="info" className="w-5 h-5" aria-hidden />
    </button>
  );
};

export default InfoButton;
