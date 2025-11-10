import { Link } from 'react-router-dom';
import Sidebar from '../../navigation/components/Sidebar';
import StyledButton from '../../../shared/ui/StyledButton';

export default function HomePage() {
  return (
    <>
      <Sidebar />
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full max-w-5xl p-4 py-20">
          <div>
            <h1 className="text-4xl font-bold mb-8 text-center">Welcome to Bantar</h1>
          </div>

          <ul className="flex flex-col items-center justify-center space-y-4">
            <li className="w-full max-w-xs">
              <Link to="/icebreakers" className="block w-full">
                <StyledButton className="w-full">Icebreakers</StyledButton>
              </Link>
            </li>

            <li className="w-full max-w-xs">
              <Link to="/debates" className="block w-full">
                <StyledButton className="w-full">Debates</StyledButton>
              </Link>
            </li>
            <li className="w-full max-w-xs">
              <Link to="/mindreader" className="block w-full">
                <StyledButton className="w-full">Mind Reader</StyledButton>
              </Link>
            </li>
            <li className="w-full max-w-xs">
              <Link to="/ai" className="block w-full">
                <StyledButton className="w-full">AI Mode</StyledButton>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
