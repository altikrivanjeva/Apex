import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';
import logo1 from '../assets/logo1.png';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  return (
    <header className="w-full shadow sticky top-0 z-50 bg-white/90 backdrop-blur">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-2">
        <Link href="/" className="flex items-center gap-2">
          <img src={logo1.src} alt="Logo" className="h-10 w-auto" />
          <span className="font-bold text-xl">APEX</span>
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          {isLoggedIn && <Link href="/dashboard">Dashboard</Link>}
        </nav>

        <div className="hidden md:flex gap-4 items-center">
          {!isLoggedIn ? (
            <>
              <Link href="/register" className="px-3 py-1 rounded hover:bg-gray-100">Register</Link>
              <Link href="/login" className="px-3 py-1 rounded hover:bg-gray-100">Login</Link>
            </>
          ) : (
            <Link href="/logout" className="px-3 py-1 rounded hover:bg-gray-100 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 mr-3">
        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>

              <LogOut className="h-4 w-4 mr-1" /> Logout
            </Link>
          )}
        </div>

        {/* Mobile button */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>Menu</button>
      </div>

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
            <Link href="/logout">Logout</Link>
          )}
        </div>
      )}
    </header>
  );
}
