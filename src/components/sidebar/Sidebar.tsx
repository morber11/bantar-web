import React, { useState, useEffect, useRef, type ReactElement } from 'react';
import { Link } from 'react-router-dom';
import StyledButton from '../ui/StyledButton';

interface SidebarProps {
    children?: ReactElement;
    childProps?: Record<string, unknown>;
}

const links = [
    { to: '/', label: 'Home' },
    { to: '/icebreakers', label: 'Icebreakers' },
];

const Sidebar = ({ children, childProps }: SidebarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef<HTMLElement>(null);
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
                if (diff > 0 && isOpen) {
                    setIsOpen(false);
                } else if (diff < 0 && !isOpen) {
                    setIsOpen(true);
                }
            }
        };

        document.addEventListener('touchstart', handleTouchStart, { passive: true });
        document.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
            document.removeEventListener('touchstart', handleTouchStart);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && isOpen) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <>
            <StyledButton
                onClick={() => setIsOpen(true)}
                className="hidden md:flex fixed top-4 left-4 z-30 items-center justify-center p-2 w-10 h-10 rounded-lg"
                aria-label="Open sidebar"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </StyledButton>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside
                ref={sidebarRef}
                className={`sidebar fixed top-0 left-0 h-full w-64 bg-slate-800 text-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-4 border-b border-slate-700">
                        <h2 className="text-2xl font-semibold">Menu</h2>
                        <StyledButton
                            onClick={() => setIsOpen(false)}
                            className="p-2 w-10 h-10 rounded-lg"
                            aria-label="Close sidebar"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
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