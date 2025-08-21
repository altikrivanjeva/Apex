// Header.tsx
import React from 'react';

const Header: React.FC = () => (
  <header className="w-full py-4 bg-gray-900 text-white flex items-center shadow">
    <h1 className="text-2xl font-regular ml-8">APEX</h1>

    <nav className="flex-1 flex justify-center gap-4 relative">
      <div className="group relative inline-block" tabIndex={0}>
        <button
          className="inline-flex min-w-[80px] justify-center gap-x-1.5 text-sm font-semibold text-white hover:text-red-600"
        >
          Products
          <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="-mr-1 w-5 h-5 text-gray-400">
            <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
          </svg>
        </button>
        <div className="absolute left-0 mt-2 w-56 origin-top-right rounded-md bg-gray-800 outline outline-1 -outline-offset-1 outline-white/10 transition-all duration-200 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible">
          <div className="py-1">
            <a href="/products/protein" className="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-none hover:bg-white/5 hover:text-red-600">Protein</a>
            <a href="/products/mass" className="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-none hover:bg-white/5 hover:text-red-600">Mass</a>
            <a href="/products/pre-workout" className="block px-4 py-2 text-sm text-gray-300 focus:bg-white/5 focus:text-white focus:outline-none hover:bg-white/5 hover:text-red-600">Pre Workout</a>
          </div>
        </div>
      </div>
      <button
        className="inline-flex min-w-[80px] justify-center gap-x-1.5 text-sm font-semibold text-white hover:text-red-600"
        onClick={() => window.location.href = ''}
      >
        Cart
      </button>
      <button
        className="inline-flex min-w-[80px] justify-center gap-x-1.5 text-sm font-semibold text-white hover:text-red-600"
        onClick={() => window.location.href = ''}
      >
        Profile
      </button>
    </nav>

  </header>
);

export default Header;
