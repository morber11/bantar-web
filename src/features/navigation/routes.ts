export interface NavLink {
    to: string;
    label: string;
    tooltip: string | null;
}

export const navLinks: NavLink[] = [
    { to: '/', label: 'Home', tooltip: null },
    { to: '/icebreakers', label: 'Icebreakers', tooltip: 'Quick prompts to start a conversation' },
    { to: '/debates', label: 'Debates', tooltip: 'Arguments for the soul' },
    { to: '/toplists', label: 'Top Lists', tooltip: 'Top 10 best features' },
    { to: '/mindreader', label: 'Mind Reader', tooltip: 'How well do your friends know you?' },
    { to: '/events', label: 'Events', tooltip: null },
    { to: '/ai', label: 'AI Mode', tooltip: 'Use AI to generate icebreaker style questions' },
    { to: '/history', label: 'History', tooltip: 'Show past prompts' },
    { to: '/favourites', label: 'Favourites', tooltip: 'Save and view favourites' },
];
