import { Link } from 'react-router-dom';
import { RiHome2Line } from 'react-icons/ri';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import CartIcon from './CartIcon';

export default function Header() {
  const { items } = useSelector((state: RootState) => state.cart);
  const qty = items.reduce((acc, item) => acc + item.qty, 0);

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
          <CartIcon qty={qty} />
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
