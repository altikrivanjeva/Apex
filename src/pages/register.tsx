import { useState } from 'react';
import { useRouter } from 'next/router';
import { Link } from 'lucide-react';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const res = await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, type: 'register' }),
    });

    if (res.ok) {
      router.push('/login');
    } else {
      const data = await res.json();
      setError(data.error || 'Something went wrong');
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100 text-black">
      <form
        onSubmit={handleRegister}
        className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-6 border rounded-lg focus:outline-none focus:ring"
        />
        <button
          type="submit"
          className="w-full bg-orange-100 text-orange-700 font-bold px-6 py-3 rounded-full text-lg
          hover:bg-orange-500 hover:text-white hover:scale-105 transition duration-200 shadow-md active:scale-95"
        >
          Register
        </button>
        <a className="mt-4 text-sm text-gray-600 hover:underline flex justify-center" href="/login">
          Already have an account? <span className="ml-1 text-blue-500">Login</span>
        </a>
      
      </form>
    </div>
  );
}
