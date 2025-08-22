// Header.tsx
import React from 'react';
import logo1 from '../assets/logo1.png';

const Header: React.FC = () => (
  <header className="w-full flex items-stretch shadow" style={{ background: '#e6e6e6ff', minHeight: '64px' }}>
    <img
      src={logo1.src}
      alt="APEX Logo"
      className="h-25 w-auto object-contain mx-10 -my-2"
    />
  <nav className="flex items-stretch justify-center ">
        <div className="relative inline-block group " tabIndex={0}>
          <button
            className="text-[17px] flex items-center justify-center text-base font-regular text-black px-4 py-2 hover:bg-red-600 transition w-50 h-full group"
          >
            Products
            <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="ml-2 w-5 h-5 text-gray-400">
              <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
            </svg>
          </button>
          <div className="absolute left-0 mt-2 w-56 rounded bg-gray-800 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200">
            <div className="py-1">
              <a href="/products/protein" className="block px-4 py-2 text-base text-gray-300 hover:text-red-600">Protein</a>
              <a href="/products/mass" className="block px-4 py-2 text-base text-gray-300 hover:text-red-600">Mass</a>
              <a href="/products/pre-workout" className="block px-4 py-2 text-base text-gray-300 hover:text-red-600">Pre Workout</a>
            </div>
          </div>
        </div>
      <button
        className="text-[17px] min-w-[80px] flex items-center justify-center text-base font-reglar text-black px-4 py-2 hover:bg-red-600 transition w-50"
        onClick={() => window.location.href = ''}
      >
        Cart
      </button>
      <button
        className="text-[17px] min-w-[80px] flex items-center justify-center text-base font-regular text-black px-4 py-2 hover:bg-red-600 transition w-50"
        onClick={() => window.location.href = ''}
      >
        Profile
      </button>
    </nav>
  </header>
);

export default Header;
