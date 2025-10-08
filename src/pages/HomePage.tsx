import { Link } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import StyledButton from '../components/ui/StyledButton';

export default function HomePage() {
    return (
        <>
            <Sidebar />
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-full max-w-5xl p-4 py-20">
                    <div>
                        <h1 className="text-4xl font-bold mb-8 text-center">
                            Welcome to Bantar
                        </h1>
                    </div>

                    <div className="flex items-center justify-center">
                        <Link to="/icebreakers">
                            <StyledButton>
                                Icebreakers
                            </StyledButton>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}