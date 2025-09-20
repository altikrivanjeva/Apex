import Link from "next/link";
import logo1 from "../assets/logo1.png";
import { useAuth } from "../context/AuthContext";
import { LogOut, Heart, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateFavorites = () => {
      if (typeof window !== "undefined") {
        const favs = JSON.parse(localStorage.getItem("apex_favorites") || "[]");
        setFavoritesCount(favs.length);
      }
    };
    updateFavorites();
    window.addEventListener("favorites-updated", updateFavorites);
    return () => window.removeEventListener("favorites-updated", updateFavorites);
  }, []);

  useEffect(() => {
    const updateCart = () => {
      if (typeof window !== "undefined") {
        const cart = JSON.parse(localStorage.getItem("apex_cart") || "[]");
        setCartCount(cart.reduce((acc, item) => acc + (item.quantity || 1), 0));
      }
    };
    updateCart();
    window.addEventListener("cart-updated", updateCart);
    return () => window.removeEventListener("cart-updated", updateCart);
  }, []);

  return (
    <header className="w-full shadow sticky top-0 z-50 bg-white/90 backdrop-blur">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2 text-black">
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
