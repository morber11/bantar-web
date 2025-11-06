import React, { useState, useEffect, useRef, type ReactElement } from 'react';
import { Link } from 'react-router-dom';
import StyledButton from '../../../shared/ui/StyledButton';
import Icon from '../../../shared/ui/Icon';

interface SidebarProps {
  children?: ReactElement;
  childProps?: Record<string, unknown>;
}

const links = [
  { to: '/', label: 'Home' },
  { to: '/icebreakers', label: 'Icebreakers' },
  { to: '/debates', label: 'Debates' },
];

// we need all the useEffects here for the swipe/focus management
const Sidebar = ({ children, childProps }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX.current = e.changedTouches[0].clientX;
      const diff = touchStartX.current - touchEndX.current;

      if (Math.abs(diff) > 50) {
        setIsOpen((prev) => {
          if (diff > 0) {
            return false;
          }
          if (diff < 0) {
            return true;
          }
          return prev;
        });
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setIsOpen((prev) => {
          if (!prev) return prev;
          return false;
        });
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      previouslyFocused.current = document.activeElement as HTMLElement | null;
      setTimeout(() => {
        const focusable = sidebarRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable && focusable.length > 0) {
          focusable[0].focus();
        } else {
          sidebarRef.current?.focus();
        }
      }, 0);
    } else {
      previouslyFocused.current?.focus?.();
      previouslyFocused.current = null;
    }
  }, [isOpen]);

  return (
    <>
      <StyledButton
        onClick={() => setIsOpen(true)}
        className="hidden md:flex fixed top-4 left-4 z-30 items-center justify-center w-10 h-10 rounded-lg"
        aria-label="Open sidebar"
        aria-expanded={isOpen}
      >
        <div className="space-y-2">
          <span className="block h-0.5 w-5 bg-white"></span>
          <span className="block h-0.5 w-5 bg-white"></span>
          <span className="block h-0.5 w-5 bg-white"></span>
        </div>
      </StyledButton>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={() => setIsOpen(false)} />
      )}

      <aside
        ref={sidebarRef}
        aria-hidden={!isOpen}
        tabIndex={-1}
        className={`sidebar fixed top-0 left-0 h-full w-64 bg-slate-800 text-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        onKeyDown={(e) => {
          if (!isOpen) return;
          const focusable = sidebarRef.current?.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
          );
          if (!focusable || focusable.length === 0) return;

          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.key === 'Tab') {
            if (e.shiftKey && document.activeElement === first) {
              e.preventDefault();
              last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          } else if (e.key === 'Escape') {
            setIsOpen(false);
          }
        }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-slate-700">
            <h2 className="text-2xl font-semibold">Menu</h2>
            <StyledButton
              onClick={() => setIsOpen(false)}
              className="no-select inline-flex items-center justify-center !p-0 w-10 h-10 rounded-lg"
              aria-label="Close sidebar"
            >
              <Icon name="close" className="w-8 h-8" />
            </StyledButton>
          </div>

          <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 scrollbar-track-slate-300">
            <ul className="space-y-2">
              {links.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="flex items-center px-4 py-3 text-slate-200 hover:bg-slate-700 hover:text-white rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="text-xl">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {children && React.cloneElement(children, childProps)}
          </nav>

          <div className="absolute top-0 right-0 w-1 h-full bg-slate-600 shadow-lg" />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
