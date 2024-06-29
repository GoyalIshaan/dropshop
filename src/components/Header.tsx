import { Link } from 'react-router-dom';
import { RiHome2Line, RiShoppingCartLine } from 'react-icons/ri';

export default function Header() {
  return (
    <header className="bg-purple-600 text-white">
      <nav className="flex items-center justify-between px-4 py-6">
        <Link to="/" className="flex items-center h-full">
          <span className="text-2xl mr-2">
            <RiHome2Line />
          </span>
          <h1 className="text-xl font-bold">DropShop</h1>
        </Link>
        <div className="flex items-center h-full">
          <Link to="/cart" className="text-2xl ml-4">
            <RiShoppingCartLine />
          </Link>
          <ul className="mx-4">
            <li>
              <Link
                to="/signin"
                className="hover:text-gray-300 text-lg flex items-center h-full"
              >
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
