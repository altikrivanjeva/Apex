import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Heart, ShoppingCart } from 'lucide-react';
import logo1 from '../assets/logo1.png';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoggedIn } = useAuth();
  const favoritesCount = 0; // replace with your state if needed
  const cartCount = 0; // optional

  return (
    <header className="w-full shadow sticky top-0 z-50 bg-white/90 backdrop-blur text-black">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src={logo1.src} alt="Logo" className="h-10 w-auto" />
          <span className="font-bold text-xl">APEX</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          {isLoggedIn && <Link href="/dashboard">Dashboard</Link>}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex gap-4 items-center">
          {/* Favorites */}
          <Link href="/favorites" className="relative flex items-center">
            <Heart className="h-5 w-5 mr-1" />
            {favoritesCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                {favoritesCount}
              </span>
            )}
          </Link>

          {/* Orders */}
          <Link href="/orders" className="relative flex items-center">
            <ShoppingCart className="h-5 w-5 mr-1" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {!isLoggedIn ? (
            <>
              <Link href="/register" className="px-3 py-1 rounded hover:bg-gray-100">Register</Link>
              <Link href="/login" className="px-3 py-1 rounded hover:bg-gray-100">Login</Link>
            </>
          ) : (
            <Link href="/logout" className="px-3 py-1 rounded hover:bg-gray-100 flex items-center">
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>Menu</button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden flex flex-col gap-2 p-4 bg-white shadow">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          {isLoggedIn && <Link href="/dashboard">Dashboard</Link>}
          <Link href="/favorites">Favorites</Link>
          <Link href="/orders">Orders</Link>
          {!isLoggedIn ? (
            <>
              <Link href="/register">Register</Link>
              <Link href="/login">Login</Link>
            </>
          ) : (
            <Link href="/logout">Logout</Link>
          )}
        </div>
      )}
    </header>
  );
}
