import Header from '@/components/Header';
import Link from "next/link";
import logo1 from "../assets/logo1.png";
import { useAuth } from "../context/AuthContext";
import { LogOut, Heart, ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
// File: your-project/components/Header.tsx

import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, Heart, ShoppingCart } from 'lucide-react';
import Image from 'next/image'; // Import Next.js Image component
import logo1 from '../assets/logo1.png';

// Define the type for the props this component expects
interface HeaderProps {
  favoritesCount: number;
  cartCount: number;
}

// Update the component to accept the defined props
export default function Header({ favoritesCount, cartCount }: HeaderProps) {
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
  return (
    <header className="w-full shadow sticky top-0 z-50 bg-white/90 backdrop-blur text-black">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {/* Use Next.js Image component for better performance and to handle import correctly */}
          <Image src={logo1} alt="Logo" className="h-10 w-auto" />
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

          {/* Cart */}
          <Link href="/cart" className="relative flex items-center">
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
            <button onClick={logout} className="px-3 py-1 rounded hover:bg-gray-100 flex items-center">
              <LogOut className="h-4 w-4 mr-1" /> Logout
            </button>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>Menu</button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden flex flex-col gap-2 p-4 bg-white shadow">
          <Link href="/" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link href="/products" onClick={() => setMobileOpen(false)}>Products</Link>
          <Link href="/about" onClick={() => setMobileOpen(false)}>About</Link>
          <Link href="/contact" onClick={() => setMobileOpen(false)}>Contact</Link>
          {isLoggedIn && <Link href="/dashboard" onClick={() => setMobileOpen(false)}>Dashboard</Link>}
          <Link href="/favorites" onClick={() => setMobileOpen(false)}>Favorites</Link>
          <Link href="/cart" onClick={() => setMobileOpen(false)}>Cart</Link>
          {!isLoggedIn ? (
            <>
              <Link href="/register" onClick={() => setMobileOpen(false)}>Register</Link>
              <Link href="/login" onClick={() => setMobileOpen(false)}>Login</Link>
            </>
          ) : (
            <button onClick={logout}>Logout</button>
          )}
        </div>
      )}
    </header>
  );
}