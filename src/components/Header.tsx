import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { LogOut, Heart, ShoppingCart } from "lucide-react";
import logo1 from "../assets/logo1.png";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  // TODO: replace with your context/state (from DB, API, or local storage)
  const favoritesCount = 0; // <- replace with real count
  const cartCount = 0; // <- replace with real count

  return (
    <header className="w-full shadow sticky top-0 z-50 bg-white/90 backdrop-blur">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2 text-black">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img src={logo1.src} alt="Logo" className="h-10 w-auto" />
          <span className="font-bold text-xl">APEX</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          {isLoggedIn && <Link href="/dashboard">Dashboard</Link>}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex gap-4 items-center">
          {!isLoggedIn ? (
            <>
              <Link href="/register" className="px-3 py-1 rounded hover:bg-gray-100">
                Register
              </Link>
              <Link href="/login" className="px-3 py-1 rounded hover:bg-gray-100">
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="px-3 py-1 rounded hover:bg-gray-100 flex items-center"
            >
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </button>
          )}

          {/* Favorites */}
          <Link
            href="/favorites"
            className="relative flex items-center justify-center rounded-xl border px-3 py-2 text-sm hover:bg-red-600 hover:text-white transition"
          >
            <Heart className="h-5 w-5" />
            {favoritesCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                {favoritesCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            href="/orders"
            className="relative flex items-center justify-center rounded-xl border px-3 py-2 text-sm hover:bg-red-600 hover:text-white transition"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full px-1">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile button */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          Menu
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden flex flex-col gap-2 p-4 bg-white shadow">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          {isLoggedIn && <Link href="/dashboard">Dashboard</Link>}
          {!isLoggedIn ? (
            <>
              <Link href="/register">Register</Link>
              <Link href="/login">Login</Link>
            </>
          ) : (
            <button onClick={logout}>Logout</button>
          )}
        </div>
      )}
    </header>
  );
}
