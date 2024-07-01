import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  RiHome2Line,
  RiArrowDropDownLine,
  RiProfileLine,
  RiLogoutCircleRLine,
} from 'react-icons/ri';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import CartIcon from './CartIcon';
import { useLogoutMutation } from '../slices/userAPISlice';
import { logout } from '../slices/authSlice';
import { toast } from 'react-toastify';

export default function Header() {
  const { items } = useSelector((state: RootState) => state.cart);
  const { userInfo } = useSelector((state: RootState) => state.auth);
  const qty = items.reduce((acc, item) => acc + item.qty, 0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutAPI, { isLoading }] = useLogoutMutation();

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await logoutAPI().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      toast.error('An unexpected error occurred');
    }
  };

  return (
    <header className="bg-purple-600 text-white">
      <nav className="flex items-center justify-between px-4 py-6">
        <Link to="/" className="flex items-center h-full">
          <span className="text-2xl mr-2">
            <RiHome2Line />
          </span>
          <h1 className="text-xl font-bold">DropShop</h1>
        </Link>
        <div className="flex items-center space-x-4">
          <CartIcon qty={qty} />
          {userInfo ? (
            <div className="relative">
              <button
                onClick={handleToggleDropdown}
                className="flex items-center hover:text-gray-300 text-lg"
              >
                {userInfo.name} <RiArrowDropDownLine className="ml-2" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl py-2 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <RiProfileLine className="inline mr-2" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    disabled={isLoading}
                  >
                    <RiLogoutCircleRLine className="inline mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="hover:text-gray-300 text-lg">
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
