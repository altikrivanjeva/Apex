// Header.tsx
import React, { useState } from 'react';
import Link from 'next/link';
import logo1 from '../assets/logo1.png';
import { Menu, ShoppingCart, Heart, User, LogIn, LogOut, Search } from 'lucide-react';

<<<<<<< HEAD
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
        <nav className="hidden md:flex items-center gap-2">
          {/* Dropdown for Products */}
          <div className="relative group">
            <button
              type="button"
              tabIndex={0}
              className="flex items-center px-4 py-2 text-base font-medium text-gray-700 hover:bg-red-600 hover:text-white rounded-xl transition"
            >
              Produkte
              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="ml-2 w-5 h-5 text-gray-600 group-hover:text-white">
                <path d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" fillRule="evenodd" />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-56 rounded bg-gray-900 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-lg">
              <div className="py-1">
                <Link href="/products/protein" className="block px-4 py-2 text-base text-gray-200 hover:text-red-500">Proteina</Link>
                <Link href="/products/mass" className="block px-4 py-2 text-base text-gray-200 hover:text-red-500">Mass Gainer</Link>
                <Link href="/products/pre-workout" className="block px-4 py-2 text-base text-gray-200 hover:text-red-500">Pre Workout</Link>
              </div>
            </div>
          </div>
          <Link href="/about" className="px-4 py-2 text-base font-medium text-gray-700 hover:bg-red-600 hover:text-white rounded-xl transition">Rreth Nesh</Link>
          <Link href="/contact" className="px-4 py-2 text-base font-medium text-gray-700 hover:bg-red-600 hover:text-white rounded-xl transition">Kontakt</Link>
          <Link href="/dashboard" className="px-4 py-2 text-base font-medium text-gray-700 hover:bg-red-600 hover:text-white rounded-xl transition">Dashboard</Link>
          <Link href="/admin" className="px-4 py-2 text-base font-medium text-gray-700 hover:bg-red-600 hover:text-white rounded-xl transition">Admin Panel</Link>
        </nav>

        {/* Search Bar */}
        <form
          className="hidden md:flex items-center bg-gray-100 rounded-xl px-2 py-1 ml-4"
          onSubmit={e => {
            e.preventDefault();
            if (search.trim()) window.location.href = `/search?q=${encodeURIComponent(search)}`;
          }}
        >
          <Search className="h-5 w-5 text-gray-500 mr-1" />
          <input
            type="text"
            placeholder="Kërko produkte..."
            className="bg-transparent outline-none px-1 py-1 text-sm w-36"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </form>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-2">
          <Link href="/favorites" className="relative flex items-center justify-center rounded-xl border px-3 py-2 text-sm hover:bg-red-600 hover:text-white transition">
            <Heart className="h-5 w-5" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">{favoritesCount}</span>
            )}
          </Link>
          <Link href="/cart" className="relative flex items-center justify-center rounded-xl border px-3 py-2 text-sm hover:bg-red-600 hover:text-white transition">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">{cartCount}</span>
            )}
          </Link>
          {/* Profile Dropdown */}
          <div className="relative group">
            <button type="button" tabIndex={0} className="flex items-center px-3 py-2 rounded-xl hover:bg-gray-100 transition">
              <User className="h-5 w-5 mr-1" />
              <span className="hidden md:inline text-base">Profili</span>
            </button>
            <div className="absolute right-0 mt-2 w-44 rounded bg-white shadow-lg z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Shiko Profilin</Link>
              <Link href="/orders" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Porositë</Link>
              <hr className="my-1" />
              <Link href="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"><LogIn className="h-4 w-4 mr-2" /> Hyr</Link>
              <Link href="/logout" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center"><LogOut className="h-4 w-4 mr-2" /> Dil</Link>
=======
const Header: React.FC = () => (
  <header className="w-full flex items-stretch shadow" style={{ background: '#e6e6e6ff', minHeight: '64px' }}>
    
    <a href="http://localhost:3000">
     <img
      src={logo1.src}
      alt="APEX Logo"
      className="h-25 w-auto object-contain mx-10 -my-2"
    />
    </a>
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
>>>>>>> bcfa4c81a4890bf4655e40c1e2e58c3439e7c868
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
          <Link href="/products" className="block py-2 text-base font-medium text-gray-700 hover:text-red-600" onClick={() => setMobileOpen(false)}>Produktet</Link>
          <Link href="/about" className="block py-2 text-base font-medium text-gray-700 hover:text-red-600" onClick={() => setMobileOpen(false)}>Rreth Nesh</Link>
          <Link href="/contact" className="block py-2 text-base font-medium text-gray-700 hover:text-red-600" onClick={() => setMobileOpen(false)}>Kontakt</Link>
          <Link href="/dashboard" className="block py-2 text-base font-medium text-gray-700 hover:text-red-600" onClick={() => setMobileOpen(false)}>Dashboard</Link>
          <Link href="/admin" className="block py-2 text-base font-medium text-gray-700 hover:text-red-600" onClick={() => setMobileOpen(false)}>Admin Panel</Link>
          <Link href="/favorites" className="block py-2 text-base font-medium text-gray-700 hover:text-red-600" onClick={() => setMobileOpen(false)}>Favorites</Link>
          <Link href="/cart" className="block py-2 text-base font-medium text-gray-700 hover:text-red-600" onClick={() => setMobileOpen(false)}>Shporta</Link>
          <Link href="/profile" className="block py-2 text-base font-medium text-gray-700 hover:text-red-600" onClick={() => setMobileOpen(false)}>Profili</Link>
          <Link href="/login" className="block py-2 text-base font-medium text-gray-700 hover:text-red-600" onClick={() => setMobileOpen(false)}>Hyr</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
