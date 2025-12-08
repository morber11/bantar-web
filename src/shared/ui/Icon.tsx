import type React from 'react';

export type IconName = 'close' | 'check' | 'menu' | 'info' | 'star-outline' | 'star-filled';

interface IconProps {
  name: IconName;
  className?: string;
  'aria-hidden'?: boolean;
  onTransitionEnd?: React.TransitionEventHandler<SVGElement>;
}

const iconPaths: Record<IconName, React.ReactNode> = {
  close: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  ),
  check: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
  ),
  menu: (
    <>
      <line x1="3" y1="6" x2="21" y2="6" strokeWidth={2} strokeLinecap="round" />
      <line x1="3" y1="12" x2="21" y2="12" strokeWidth={2} strokeLinecap="round" />
      <line x1="3" y1="18" x2="21" y2="18" strokeWidth={2} strokeLinecap="round" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" strokeWidth={2} />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16v-4" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8h.01" />
    </>
  ),
  'star-outline': (
    <g transform="scale(0.025)">
      <path fill="none" stroke="currentColor" strokeWidth={40} d="M283.84 867.84 512 747.776l228.16 119.936a6.4 6.4 0 0 0 9.28-6.72l-43.52-254.08 184.512-179.904a6.4 6.4 0 0 0-3.52-10.88l-255.104-37.12L517.76 147.904a6.4 6.4 0 0 0-11.52 0L392.192 379.072l-255.104 37.12a6.4 6.4 0 0 0-3.52 10.88L318.08 606.976l-43.584 254.08a6.4 6.4 0 0 0 9.28 6.72z" />
    </g>
  ),
  'star-filled': (
    <g transform="scale(0.025)">
      <path fill="currentColor" d="M283.84 867.84 512 747.776l228.16 119.936a6.4 6.4 0 0 0 9.28-6.72l-43.52-254.08 184.512-179.904a6.4 6.4 0 0 0-3.52-10.88l-255.104-37.12L517.76 147.904a6.4 6.4 0 0 0-11.52 0L392.192 379.072l-255.104 37.12a6.4 6.4 0 0 0-3.52 10.88L318.08 606.976l-43.584 254.08a6.4 6.4 0 0 0 9.28 6.72z" />
    </g>
  ),
};

const Icon = ({ name, className = 'w-6 h-6', 'aria-hidden': ariaHidden, onTransitionEnd }: IconProps) => {
  return (
    <svg
      className={className}
      onTransitionEnd={onTransitionEnd}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden={ariaHidden}
    >
      {iconPaths[name]}
    </svg>
  );
};

export default Icon;
