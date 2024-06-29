import { Link } from 'react-router-dom';
import { RiErrorWarningLine } from 'react-icons/ri';

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <RiErrorWarningLine className="text-6xl text-red-500 mb-4" />
      <h1 className="text-4xl font-bold mb-2">404 - Page Not Found</h1>
      <p className="text-lg text-gray-500 mb-4">
        Oops! The page you are looking for does not exist.
      </p>
      <Link to="/" className="text-blue-500 underline">
        Go back to home
      </Link>
    </div>
  );
};

export default NotFound;
