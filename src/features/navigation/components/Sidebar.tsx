import { useState, useEffect, useRef, type ReactElement } from 'react';
import { Link, useLocation } from 'react-router-dom';
import StyledButton from '../../../shared/ui/StyledButton';
import Icon from '../../../shared/ui/Icon';
import InfoButton from '../../../shared/ui/InfoButton';
import InfoDialog from '../../../shared/ui/InfoDialog';
import { useAppSettings } from '../../../shared/context/appSettingsContextImpl';
import { navLinks } from '../routes';
import { fetchAllEvents } from '../../events/api';

import { ThemeToggle } from '../../../shared/ui';


interface SidebarProps {
    children?: ReactElement;
}

// we need all the useEffects here for the swipe/focus management
const Sidebar = ({ children }: SidebarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState<string | null>(null);
    const [showEvents, setShowEvents] = useState(false);
    const [eventsLabel, setEventsLabel] = useState('Events');
    const sidebarRef = useRef<HTMLElement>(null);
    const previouslyFocused = useRef<HTMLElement | null>(null);
    const touchStartX = useRef<number>(0);
    const touchEndX = useRef<number>(0);

    const { showCategoryDetails, setShowCategoryDetails } = useAppSettings();

    const location = useLocation();
    const hideCategoryDetails =
        location.pathname === '/' ||
        location.pathname.startsWith('/ai') ||
        location.pathname.startsWith('/mindreader') ||
        location.pathname.startsWith('/toplists') ||
        location.pathname.startsWith('/events');

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
            const target = event.target as Node;

            // we don't want to close the sidebar if the tooltip dialog is open
            const isInsideSidebar = sidebarRef.current && sidebarRef.current.contains(target);
            const isInsideDialog = (target as Element).closest?.('[role="dialog"], .fixed.inset-0.z-60');

            if (!isInsideSidebar && !isInsideDialog) {
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

    const activeDialogLink = navLinks.find((l) => l.to === openDialog) ?? null;

    useEffect(() => {
        let mounted = true;
        void (async () => {
            try {
                // only show events if events are available
                const events = await fetchAllEvents();
                if (!mounted) return;

                const hasEvents = Array.isArray(events) && events.length > 0;
                setShowEvents(hasEvents);

                if (hasEvents) setEventsLabel(events[0].friendlyName ?? 'Events');
            } catch {
                if (mounted) setShowEvents(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, []);

    return (
        <>
            <StyledButton
                onClick={() => setIsOpen(true)}
                className="hidden md:flex fixed top-4 left-4 z-30 items-center justify-center w-10 h-10 rounded-lg"
                classOverride="bg-slate-900 hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg"
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
                <div
                    className="fixed inset-0 bg-black/50 z-40 transition-opacity"
                    onClick={() => {
                        setIsOpen(false);
                        setOpenDialog(null);
                    }}
                />
            )}

            <aside
                ref={sidebarRef}
                aria-hidden={!isOpen}
                tabIndex={-1}
                className={`sidebar fixed top-0 left-0 h-full w-64 bg-white text-slate-900 dark:bg-slate-800 dark:text-white z-50 transform transition-transform duration-300 ease-in-out shadow-2xl ${isOpen ? 'translate-x-0' : '-translate-x-full'
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
                    <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
                        <h2 className="text-2xl font-semibold">Menu</h2>
                        <StyledButton
                            onClick={() => {
                                setIsOpen(false);
                                setOpenDialog(null);
                            }}
                            className="no-select inline-flex items-center justify-center !p-0 w-10 h-10 rounded-lg"
                            aria-label="Close sidebar"
                        >
                            <Icon name="close" className="w-8 h-8" aria-hidden />
                        </StyledButton>
                    </div>

                    <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600 dark:scrollbar-thumb-slate-600 scrollbar-track-slate-300 dark:scrollbar-track-slate-700">
                        <ul className="space-y-2">
                            {navLinks.map(({ to, label, tooltip }) => {
                                if (to === '/events' && !showEvents) return null;
                                const displayLabel = to === '/events' ? eventsLabel : label;
                                return (
                                    <li key={to}>
                                        <div className="relative flex items-center justify-between px-4 py-3 rounded-lg transition-colors hover:bg-slate-100 dark:hover:bg-slate-700">
                                            <Link
                                                to={to}
                                                className="flex-1 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white"
                                                onClick={() => {
                                                    setIsOpen(false);
                                                    setOpenDialog(null);
                                                }}
                                            >
                                                <span className="text-xl">{displayLabel}</span>
                                            </Link>
                                            {tooltip !== null && (
                                                <InfoButton
                                                    text={displayLabel}
                                                    onClick={() => {
                                                        setOpenDialog(to);
                                                    }}
                                                />
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                        {!hideCategoryDetails && (
                            <>
                                <div className="mt-4 border-t border-slate-200 dark:border-slate-700" />
                                <div className="mt-3 px-4">
                                    <label className="flex items-center space-x-2 text-slate-700 dark:text-slate-200 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={showCategoryDetails}
                                            onChange={(e) => setShowCategoryDetails(e.target.checked)}
                                            className="w-4 h-4"
                                        />
                                        <span>Show category details</span>
                                    </label>
                                </div>
                                <div className="mt-4 border-t border-slate-200 dark:border-slate-700" />
                            </>
                        )}
                        {children}
                        <div className="mt-4 border-t border-slate-200 dark:border-slate-700" />
                        <div className="mt-3 px-4">
                            <ThemeToggle />
                        </div>
                        <div className="mt-4 border-t border-slate-200 dark:border-slate-700" />
                    </nav>
                    {activeDialogLink && (
                        <InfoDialog
                            open={true}
                            title={activeDialogLink.label}
                            text={activeDialogLink.tooltip ?? ''}
                            onClose={() => setOpenDialog(null)}
                        />
                    )}

                    <div className="absolute top-0 right-0 w-1 h-full bg-slate-200 dark:bg-slate-600 shadow-lg" />
                </div>
            </aside>
        </>
    );
};

export default Sidebar;