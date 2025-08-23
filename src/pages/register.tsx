import { useState } from 'react';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill all fields');
      return;
    }
    // TODO: Connect to backend API to save user
    setSuccess('Registered successfully!');
    setError('');
    setUsername('');
    setPassword('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded shadow w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
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
        <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition">Register</button>
      </form>
    </div>
  );
}
