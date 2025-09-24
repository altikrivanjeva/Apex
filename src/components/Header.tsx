import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { Heart, ShoppingCart } from "lucide-react";
import logo1 from "../assets/logo1.png";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: session } = useSession();
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateFavorites = () => {
      const favs = JSON.parse(localStorage.getItem("apex_favorites") || "[]");
      setFavoritesCount(favs.length);
    };
    updateFavorites();
    window.addEventListener("favorites-updated", updateFavorites);
    return () => window.removeEventListener("favorites-updated", updateFavorites);
  }, []);

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem("apex_cart") || "[]");
      setCartCount(cart.reduce((acc, item) => acc + (item.quantity || 1), 0));
    };
    updateCart();
    window.addEventListener("cart-updated", updateCart);
    return () => window.removeEventListener("cart-updated", updateCart);
  }, []);

  return (
    <header className="w-full shadow sticky top-0 z-50 bg-white/90 backdrop-blur text-black">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo1} alt="Logo" className="h-10 w-auto" />
          <span className="font-bold text-xl">APEX</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          {session && <Link href="/dashboard">Dashboard</Link>}
        </nav>

        {/* Actions (Desktop) */}
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

          {/* Cart */}
          <Link href="/orders" className="relative flex items-center">
            <ShoppingCart className="h-5 w-5 mr-1" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                {cartCount}
              </span>
            )}
          </Link>

          {!session ? (
            <>
              <Link href="/register" className="px-3 py-1 rounded hover:bg-gray-100">Register</Link>
              <Link href="/login" className="px-3 py-1 rounded hover:bg-gray-100">Login</Link>
            </>
          ) : (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-3 py-1 rounded hover:bg-gray-100"
            >
              Logout
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden px-3 py-2 rounded border" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? "Close" : "Menu"}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden bg-white shadow-lg border-t px-4 py-3 space-y-3 space-x-5 text-center">
          <Link href="/" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link href="/products" onClick={() => setMobileOpen(false)}>Products</Link>
          <Link href="/about" onClick={() => setMobileOpen(false)}>About</Link>
          <Link href="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
          {session && <Link href="/dashboard" onClick={() => setMobileOpen(false)}>Dashboard</Link>}

          <div className="flex gap-4 items-center pt-3 border-t justify-center">
            <Link href="/favorites" className="relative flex items-center" onClick={() => setMobileOpen(false)}>
              <Heart className="h-5 w-5 mr-1" />
              {favoritesCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                  {favoritesCount}
                </span>
              )}
            </Link>

            <Link href="/orders" className="relative flex items-center" onClick={() => setMobileOpen(false)}>
              <ShoppingCart className="h-5 w-5 mr-1" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {!session ? (
            <div className="flex gap-2 pt-3 border-t">
              <Link href="/register" className="flex-1 text-center px-3 py-2 rounded bg-gray-100" onClick={() => setMobileOpen(false)}>Register</Link>
              <Link href="/login" className="flex-1 text-center px-3 py-2 rounded bg-gray-100" onClick={() => setMobileOpen(false)}>Login</Link>
            </div>
          ) : (
            <button
              onClick={() => {
                setMobileOpen(false);
                signOut({ callbackUrl: "/" });
              }}
              className="w-full text-center px-3 py-2 rounded bg-gray-100 mt-3"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
