import { Component, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    message: string;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, message: '' };
    }

    static getDerivedStateFromError(error: unknown): State {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred.';
        return { hasError: true, message };
    }

    override componentDidCatch(error: unknown, info: { componentStack: string }) {
        console.error('[ErrorBoundary] Uncaught error:', error, info.componentStack);
    }

    override render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center">
                    <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
                    <p className="text-gray-500 mb-6">{this.state.message}</p>
                    <button
                        className="px-6 py-3 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800"
                        onClick={() => this.setState({ hasError: false, message: '' })}
                    >
                        Try again
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
