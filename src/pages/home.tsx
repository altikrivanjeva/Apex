import ProductsCRUD from '../components/ProductsCRUD';
import logo from '../assets/logo.png';
import banner1 from '../assets/banner1.jpg';
import { Geist, Geist_Mono } from "next/font/google";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useRouter } from 'next/router';
import { signIn, signOut, useSession } from "next-auth/react"; // <-- import next-auth

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  const router = useRouter();
  const { data: session } = useSession(); // <-- get session

  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} font-sans min-h-screen flex flex-col`}
      style={{ background: '#dfdfdfff' }}
    >
      <Header />
      <div
        className="w-full h-[300px] relative flex items-center justify-center mb-8"
        style={{
          backgroundImage: `url(${banner1.src})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/40 z-0" />
        <h1
          className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl z-10 relative"
          style={{ color: '#fff', fontFamily: 'Geist, Arial, Helvetica, sans-serif', letterSpacing: '0.03em' }}
        >
          Welcome to APEX
        </h1>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center">
        <img
          src={logo.src}
          alt="APEX Logo"
          width={200}
          height={200}
          className="mb-8"
        />
        <p className="text-lg text-gray-600 mb-8">
          Your next-generation web store.
        </p>

        <button
          className="mb-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() => router.push('/contact')}
        >
          Contact Us
        </button>

        {!session ? (
          <button
            className="mb-8 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            onClick={() => signIn("google")}
          >
            Login with Google
          </button>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <p className="text-gray-800">Welcome, {session.user?.name}</p>
            <button
              className="mb-8 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              onClick={() => signOut()}
            >
              Logout
            </button>
          </div>
        )}

        <ProductsCRUD />
      </main>
      <Footer />
    </div>
  );
}
