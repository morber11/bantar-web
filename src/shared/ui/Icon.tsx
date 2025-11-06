export type IconName = 'close' | 'check' | 'menu';

interface IconProps {
  name: IconName;
  className?: string;
  'aria-hidden'?: boolean;
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
};

const Icon = ({ name, className = 'w-6 h-6', 'aria-hidden': ariaHidden = true }: IconProps) => {
  return (
    <svg
      className={className}
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
