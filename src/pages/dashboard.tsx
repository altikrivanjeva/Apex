import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Header from '@/components/Header';

interface User {
  _id: string;
  username: string;
  password: string;
}

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  // ✅ Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn) router.replace('/login');
  }, [isLoggedIn, router]);

  // ✅ Fetch all users
  const fetchUsers = async () => {
    const res = await fetch('/api/users');
    if (res.ok) {
      const data = await res.json();
      setUsers(data.users);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchUsers();
  }, [isLoggedIn]);

  // ✅ Update user
  const handleUpdate = async (userId: string) => {
    if (!newUsername || !newPassword) return;
    await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'update', userId, newUsername, newPassword }),
    });
    setEditUserId(null);
    setNewUsername('');
    setNewPassword('');
    fetchUsers();
  };

  // ✅ Delete user
  const handleDelete = async (userId: string) => {
    await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'delete', userId }),
    });
    fetchUsers();
  };

  return (
    <div><Header/>
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-black">User Dashboard</h1>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 font-semibold text-gray-600">Username</th>
                <th className="p-3 font-semibold text-gray-600">Password</th>
                <th className="p-3 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b hover:bg-gray-50 transition text-black">
                  <td className="p-3">
                    {editUserId === u._id ? (
                      <input
                        value={newUsername}
                        onChange={(e) => setNewUsername(e.target.value)}
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      u.username
                    )}
                  </td>

                  <td className="p-3">
                    {editUserId === u._id ? (
                      <input
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="border p-1 rounded w-full"
                      />
                    ) : (
                      '••••••••'
                    )}
                  </td>

                  <td className="p-3 space-x-2">
                    {editUserId === u._id ? (
                      <button
                        onClick={() => handleUpdate(u._id)}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setEditUserId(u._id);
                          setNewUsername(u.username);
                          setNewPassword(u.password);
                        }}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center p-4 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  );
}
