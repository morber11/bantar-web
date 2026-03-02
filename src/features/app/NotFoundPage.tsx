import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../navigation/components/Sidebar';
import bantarLogo from '../../assets/bantar-logo.png';

const REDIRECT_SECONDS = 5;

export default function NotFoundPage() {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(REDIRECT_SECONDS);

    // needed for on mount
    useEffect(() => {
        if (countdown <= 0) {
            void navigate('/');
            return;
        }
        const timer = setTimeout(() => setCountdown(prev => prev - 1), 1000);
        return () => clearTimeout(timer);
    }, [countdown, navigate]);

    return (
        <>
            <Sidebar />
            <div className="w-full h-full flex items-center justify-center">
                <div className="text-center p-8">
                    <img src={bantarLogo} alt="Bantar" className="mx-auto mb-6 w-32 h-32 object-contain" />
                    <h1 className="text-6xl font-bold mb-4">404</h1>
                    <p className="text-xl text-gray-500 mb-4">Page not found</p>
                    <p className="text-sm text-gray-400 mb-8">Redirecting to home in {countdown}s…</p>
                    <Link
                        to="/"
                        className="px-6 py-3 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 dark:bg-slate-700 dark:hover:bg-slate-600"
                    >
                        Go Home
                    </Link>
                </div>
            </div>
        </>
    );
}
