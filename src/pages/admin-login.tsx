import { useState } from 'react';

const fontMontserrat = { fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' };

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Shembull kontrolli statik (ndrysho me kontroll real ose API)
    if (form.username === 'admin' && form.password === 'admin123') {
      localStorage.setItem('apex_admin', 'true');
      window.location.href = '/dashboard';
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f5]">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm flex flex-col gap-4 border border-blue-100">
        <h1 className="text-2xl font-extrabold text-blue-900 mb-2 text-center" style={fontMontserrat}>Admin Login</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          className="border rounded px-4 py-2"
          style={fontMontserrat}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="border rounded px-4 py-2"
          style={fontMontserrat}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition"
          style={fontMontserrat}
        >
          Log In
        </button>
        {error && <div className="text-red-600 text-center font-bold">{error}</div>}
      </form>
    </div>
  );
}