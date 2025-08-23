import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AuthPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!username || !password) {
      setError('Please fill all fields');
      return;
    }
    const res = await fetch('/api/auth-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, type: mode })
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess(data.message);
      setError('');
      if (mode === 'login') {
        // Redirect to home or dashboard after login
        window.location.href = '/';
      }
    } else {
      setError(data.error || 'Error');
      setSuccess('');
    }
  };

  return (
     <div className={`$ $font-sans min-h-screen flex flex-col`} style={{ background: '#dfdfdfff' }}>
      <Header />
      <div
    className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
     
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">{mode === 'login' ? 'Login' : 'Register'}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full mb-4 px-3 py-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-6 px-3 py-2 border rounded"
        />
        <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">{mode === 'login' ? 'Login' : 'Register'}</button>
        <div className="mt-4 text-center">
          <button type="button" className="text-blue-600 underline" onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
            {mode === 'login' ? 'Create an account' : 'Already have an account? Login'}
          </button>
        </div>
      </form>
    </div>
      <Footer />
    </div>
  );
}
