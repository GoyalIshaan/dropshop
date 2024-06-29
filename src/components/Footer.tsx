import React from 'react';
import {
  FaFacebook,
  FaTwitter,
  FaGithub,
  FaPhone,
  FaEnvelope,
} from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 w-full mt-[100px] bottom-0">
      <div className="container mx-auto flex flex-wrap justify-between px-10">
        <div className="flex-1 mb-8 md:mb-0">
          <h2 className="text-2xl font-bold mb-4">DropShop</h2>
          <p className="text-sm">
            Your one-stop shop for all your e-commerce needs.
          </p>
        </div>

        <div className="flex-1 mb-8 md:mb-0">
          <h3 className="text-lg font-bold mb-4">Contact Us</h3>
          <div className="flex items-center mb-2">
            <FaPhone className="mr-2" />
            <p className="text-sm">+1 (217)841-1368</p>
          </div>
          <div className="flex items-center">
            <FaEnvelope className="mr-2" />
            <p className="text-sm">info@dropshop.com</p>
          </div>
        </div>

        <div className="flex-1 mb-8 md:mb-0">
          <h3 className="text-lg font-bold mb-4">Follow Us</h3>
          <div className="flex items-center mb-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-4"
            >
              <FaFacebook className="text-3xl" />
            </a>
            <a
              href="https://github.com/GoyalIshaan"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-4"
            >
              <FaGithub className="text-3xl" />
            </a>
            <a
              href="https://twitter.com/IshaanGoyal05"
              target="_blank"
              rel="noopener noreferrer"
              className="mr-2"
            >
              <FaTwitter className="text-3xl" />
            </a>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-bold mb-4">Newsletter</h3>
          <p className="text-sm mb-4">
            Subscribe to our newsletter for the latest updates.
          </p>
          <form>
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-gray-800 text-white rounded py-2 px-4 w-full mb-2"
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white rounded py-2 px-4 w-full"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
