import React from 'react';

interface StyledButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
 	classOverride?: string;
}

const StyledButton: React.FC<StyledButtonProps> = ({ children, className = '', classOverride, ...rest }) => {
	const base = `bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 disabled:hover:bg-slate-900 font-bold text-base px-6 py-3 rounded-full md:text-sm md:px-4 md:py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-300`; 
	const appliedBase = classOverride ?? base;
	const disabledClass = rest.disabled ? 'opacity-60 cursor-not-allowed' : '';

	return (
		<button
			className={`${appliedBase} ${disabledClass} ${className}`.trim()}
			{...rest}
		>
			{children}
		</button>
	);
};

export default StyledButton;
