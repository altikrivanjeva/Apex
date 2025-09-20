import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';
import Header from '@/components/Header';

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

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
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

  // Fetch all orders
  useEffect(() => {
    if (isLoggedIn) {
      fetch('/api/orders')
        .then(res => res.json())
        .then(data => setOrders(data));
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      fetchUsers();
    }
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
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-black">User Dashboard</h1>

          {/* USERS TABLE */}
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

          {/* ORDERS TABLE */}
          <h2 className="text-2xl font-bold mt-12 mb-4 text-black">Orders</h2>
          <div className="overflow-x-auto">
            {orders.length === 0 ? (
              <div className="text-gray-500">No orders yet.</div>
            ) : (
              <table className="w-full text-left border">
                <thead>
                  <tr>
                    <th className="p-2 border">Name</th>
                    <th className="p-2 border">Phone</th>
                    <th className="p-2 border">Address</th>
                    <th className="p-2 border">Payment</th>
                    <th className="p-2 border">Products</th>
                    <th className="p-2 border">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td className="p-2 border">{order.name}</td>
                      <td className="p-2 border">{order.phone}</td>
                      <td className="p-2 border">{order.address}</td>
                      <td className="p-2 border">{order.payment}</td>
                      <td className="p-2 border">
                        <ul>
                          {order.cart?.map((item, i) => (
                            <li key={i}>
                              {item.name} x{item.quantity}
                            </li>
                          ))}
                        </ul>
                      </td>
                      <td className="p-2 border">
                        {order.createdAt ? new Date(order.createdAt).toLocaleString() : ''}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}