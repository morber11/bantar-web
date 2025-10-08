import React from 'react';

const StyledButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className = '', disabled, ...rest }) => {
  const base = `bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-full`;
  const disabledClass = disabled ? 'opacity-60 cursor-not-allowed' : '';

  return (
    <button
      className={`${base} ${disabledClass} ${className}`.trim()}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default StyledButton;
