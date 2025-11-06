import React from 'react';

const StyledButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, className = '', disabled, ...rest }) => {
	const base = `bg-slate-800 hover:bg-slate-700 text-white font-bold text-base px-6 py-3 rounded-full md:text-sm md:px-4 md:py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-300`;
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
