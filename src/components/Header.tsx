// Header.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import logo1 from '../assets/logo1.png';
import { Menu, ShoppingCart, Heart, User, LogIn, LogOut, Search } from 'lucide-react';

const fontMontserrat = { fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' };

interface HeaderProps {
  cartCount?: number;
  favoritesCount?: number;
}

const Header: React.FC<HeaderProps> = ({ cartCount = 0, favoritesCount = 0 }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');

  return (
    <header className="w-full shadow sticky top-0 z-50 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src={logo1.src} alt="APEX Logo" className="h-10 w-auto object-contain" />
          <span className="hidden md:inline text-xl font-extrabold tracking-tight text-gray-900">APEX</span>
        </Link>

        {/* Desktop Navigation */}
        <nav>
          <ul className="flex gap-8 items-center font-extrabold uppercase"
              style={{
                fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
                letterSpacing: '2px',
              }}>
            <li>
              <a href="/" className="hover:text-blue-600">Home</a>
            </li>
            <li className="relative group">
              <a href="/products" className="hover:text-blue-600">Products</a>
              <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded hidden group-hover:block min-w-[180px] z-10 font-normal"
                  style={{
                    fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
                    letterSpacing: '1px',
                  }}>
                <li>
                  <a href="/products/whey" className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-700">Whey Protein</a>
                </li>
                <li>
                  <a href="/products/preworkout" className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-700">Pre Workout</a>
                </li>
                <li>
                  <a href="/products/aminoacids" className="block px-4 py-2 hover:bg-blue-50 hover:text-blue-700">Amino Acids</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="/about" className="hover:text-blue-600">About Us</a>
            </li>
            <li>
              <a href="/dashboard" className="hover:text-blue-600">Dashboard</a>
            </li>
            <li>
              <a href="/contact" className="hover:text-blue-600">Contact</a>
            </li>
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-2">
          <Link href="/favorites" className="relative flex items-center">
            <span className="mr-1">❤️</span>
            {favoritesCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full px-2 py-0.5 font-bold" style={fontMontserrat}>
                {favoritesCount}
              </span>
            )}
          </Link>
          <Link href="/orders" className="relative flex items-center">
            <ShoppingCart className="h-7 w-7 text-blue-900 hover:text-orange-500 transition" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-2 py-0.5 font-bold" style={fontMontserrat}>
                {cartCount}
              </span>
            )}
          </Link>
          {/* Profile Dropdown */}
          <div className="relative group">
            <button type="button" tabIndex={0} className="flex items-center px-3 py-2 rounded-xl hover:bg-gray-100 transition">
              <User className="h-5 w-5 mr-1" />
              <span className="hidden md:inline text-base">Profile</span>
            </button>
            <div className="absolute right-0 mt-2 w-44 rounded bg-white shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">View Profile</Link>
              <Link href="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Orders</Link>
              <hr className="my-1" />
              <Link href="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"><LogIn className="h-4 w-4 mr-2" /> Login</Link>
              <Link href="/logout" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"><LogOut className="h-4 w-4 mr-2" /> Logout</Link>
            </div>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden ml-2 p-2 rounded-xl hover:bg-gray-100 transition"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t shadow-lg px-4 py-4 space-y-2">
          <Link href="/products" className="block py-2 text-base font-medium text-gray-700 hover:text-red-600" onClick={() => setMobileOpen(false)}>Products</Link>
          <Link href="/about" className="block py-2 text-base font-medium text-gray-700 hover:text-red-600" onClick={() => setMobileOpen(false)}>About Us</Link>
          <Link href="/contact" className="block py-2 text-base font-medium text-gray-700 hover:text-red-600" onClick={() => setMobileOpen(false)}>Contact</Link>
          <Link href="/dashboard" className="block py-2 text-base font-medium text-gray-700 hover:text-red-600" onClick={() => setMobileOpen(false)}>Dashboard</Link>
          <Link href="/admin" className="block py-2 text-base font-medium text-gray-700 hover:text-red-600" onClick={() => setMobileOpen(false)}>Admin Panel</Link>
          <Link href="/favorites" className="block py-2 text-base font-medium text-gray-700 hover:text-red-600" onClick={() => setMobileOpen(false)}>Favorites</Link>
          <Link href="/cart" className="block py-2 text-base font-medium text-gray-700 hover:text-red-600" onClick={() => setMobileOpen(false)}>Cart</Link>
          <Link href="/profile" className="block py-2 text-base font-medium text-gray-700 hover:text-red-600" onClick={() => setMobileOpen(false)}>Profile</Link>
          <Link href="/login" className="block py-2 text-base font-medium text-gray-700 hover:text-red-600" onClick={() => setMobileOpen(false)}>Login</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
