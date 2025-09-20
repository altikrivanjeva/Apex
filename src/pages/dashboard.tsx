import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Header from '@/components/Header';
import ShopProductsCRUD from '@/components/ShopProductsCRUD';

interface User {
  _id: string;
  username: string;
  password: string;
}

interface Order {
  _id: string;
  name: string;
  address: string;
  phone: string;
  payment: string;
  cart: any[];
  createdAt: string;
}

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

type ActiveTab = 'users' | 'shop-products' | 'contact-messages';

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [activeTab, setActiveTab] = useState<ActiveTab>('users');
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoggedIn) router.replace('/login');
  }, [isLoggedIn, router]);

  // Fetch all users
  const fetchUsers = async () => {
    const res = await fetch('/api/users');
    if (res.ok) {
      const data = await res.json();
      setUsers(data.users);
    }
  };

  // Fetch all orders
  const fetchOrders = async () => {
    const res = await fetch('/api/orders');
    if (res.ok) {
      const data = await res.json();
      setOrders(data);
    }
  };

  // Fetch contact messages
  const fetchContactMessages = async () => {
    const res = await fetch('/api/contact');
    if (res.ok) {
      const data = await res.json();
      setContactMessages(data);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchUsers();
      fetchOrders();
      fetchContactMessages();
    }
  }, [isLoggedIn]);

  // Update user
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

  // Delete user
  const handleDelete = async (userId: string) => {
    await fetch('/api/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'delete', userId }),
    });
    fetchUsers();
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-black">Admin Dashboard</h1>

          {/* Tab Navigation */}
          <div className="flex mb-6 border-b">
            <button
              onClick={() => setActiveTab('users')}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === 'users'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Menaxhimi i Përdoruesve
            </button>
            <button
              onClick={() => setActiveTab('shop-products')}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === 'shop-products'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Produktet e Dyqanit
            </button>
            <button
              onClick={() => setActiveTab('contact-messages')}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === 'contact-messages'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Mesazhet e Kontaktit
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'users' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-black">Menaxhimi i Përdoruesve</h2>
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
          )}

          {activeTab === 'shop-products' && (
            <ShopProductsCRUD />
          )}

          {activeTab === 'contact-messages' && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-black">Mesazhet e Kontaktit</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 font-semibold text-gray-600">Emri</th>
                      <th className="p-3 font-semibold text-gray-600">Email</th>
                      <th className="p-3 font-semibold text-gray-600">Mesazhi</th>
                      <th className="p-3 font-semibold text-gray-600">Data e Dërgimit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contactMessages.map((msg) => (
                      <tr key={msg._id} className="border-b hover:bg-gray-50 transition text-black">
                        <td className="p-3">{msg.name}</td>
                        <td className="p-3">{msg.email}</td>
                        <td className="p-3">{msg.message}</td>
                        <td className="p-3">{new Date(msg.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                    {contactMessages.length === 0 && (
                      <tr>
                        <td colSpan={4} className="text-center p-4 text-gray-500">
                          Nuk ka mesazhe të dërguara.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}