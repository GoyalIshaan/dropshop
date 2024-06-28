import React from 'react';
import { RiHome2Line, RiShoppingCartLine } from 'react-icons/ri';

const Header: React.FC = () => {
  return (
    <header className="bg-purple-600 text-white">
      <nav className="flex items-center justify-between px-4 py-6">
        {' '}
        {/* Updated py-3 */}
        <div className="flex items-center h-full">
          <span className="text-2xl mr-2">
            <RiHome2Line />
          </span>
          <h1 className="text-xl font-bold">DropShop</h1>
        </div>
        <div className="flex items-center h-full">
          <ul className="flex space-x-4">
            <li>
              <a
                href="#"
                className="hover:text-gray-300 text-lg flex items-center h-full"
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-300 text-lg flex items-center h-full"
              >
                Categories
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-300 text-lg flex items-center h-full"
              >
                About
              </a>
            </li>
          </ul>
          <a href="#" className="text-xl ml-4">
            <RiShoppingCartLine />
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
