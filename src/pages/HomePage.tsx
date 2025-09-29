import { Link } from 'react-router-dom';

export default function HomePage() {
    return (
        <div className="p-4 text-center">
            <h1 className="text-2xl font-bold mb-6">Welcome to Bantar</h1>
            <Link to="/icebreakers">
                <button className="mb-2">Icebreakers</button>
            </Link>
        </div>
    );
}
