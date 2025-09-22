// pages/dashboard.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
import Header from "@/components/Header";
import ShopProductsCRUD from "@/components/ShopProductsCRUD";

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

type ActiveTab = "users" | "shop-products" | "contact-messages" | "orders";

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [activeTab, setActiveTab] = useState<ActiveTab>("users");

  const { data: session, status } = useSession(); // NextAuth session
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  // Fetch functions
  const fetchUsers = async () => {
    const res = await fetch("/api/users");
    if (res.ok) {
      const data = await res.json();
      setUsers(data.users);
    }
  };

  const fetchOrders = async () => {
    const res = await fetch("/api/orders");
    if (res.ok) {
      const data = await res.json();
      setOrders(data);
    }
  };

  const fetchContactMessages = async () => {
    const res = await fetch("/api/contact");
    if (res.ok) {
      const data = await res.json();
      setContactMessages(data);
    }
  };

  useEffect(() => {
    if (session) {
      fetchUsers();
      fetchOrders();
      fetchContactMessages();
    }
  }, [session]);

  // Update user
  const handleUpdate = async (userId: string) => {
    if (!newUsername || !newPassword) return;
    await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "update", userId, newUsername, newPassword }),
    });
    setEditUserId(null);
    setNewUsername("");
    setNewPassword("");
    fetchUsers();
  };

  // Delete user
  const handleDelete = async (userId: string) => {
    await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "delete", userId }),
    });
    fetchUsers();
  };

  // Loading state
  if (status === "loading") return <p className="text-center mt-10">Loading...</p>;

  // Not logged in (show Google/Facebook login)
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl mb-4">Please log in</h1>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="mb-4 px-6 py-3 rounded-lg bg-red-500 text-white font-medium"
        >
          Login with Google
        </button>

        <button
          onClick={() => signIn("facebook", { callbackUrl: "/dashboard" })}
          className="px-6 py-3 rounded-lg font-medium"
          style={{
            backgroundColor: "#1877F2",
            color: "white",
            backgroundImage:
              "url('data:image/svg+xml;base64,PHN2ZyBmaWxsPSJ3aGl0ZSIgdmlld0JveD0iMCAwIDM2IDM2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0yMi4wMTEgMThsLjAwMS01LjI5NmgzLjYzNmwtLjQ4OS0zLjYzN2gtMy4xNDN2LTItMS45MzVjMC0uNDI1LjExMi0uNzE1LjcwMi0uNzE1aDEuNTIxdjIuNjI3aC0xLjAwNWMtLjk1OCAwLTEuMTkyLjQ1Ny0xLjE5MiAxLjE3MnYxLjQxOEgyMi4wMXYzLjYzN2gtMi40MTl2My42MzdIMjIuMDF6Ii8+PC9zdmc+')",
            backgroundPosition: "12px 11px",
            backgroundRepeat: "no-repeat",
            backgroundSize: "18px 18px",
          }}
        >
          Login with Facebook
        </button>
      </div>
    );
  }

  // Dashboard UI
  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-center text-black">
            Admin Dashboard
          </h1>

          {/* Tab navigation */}
          <div className="flex mb-6 border-b">
            <button
              onClick={() => setActiveTab("users")}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === "users"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Menaxhimi i Përdoruesve
            </button>
            <button
              onClick={() => setActiveTab("shop-products")}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === "shop-products"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Produktet e Dyqanit
            </button>
            <button
              onClick={() => setActiveTab("contact-messages")}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === "contact-messages"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Mesazhet e Kontaktit
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-6 py-3 font-semibold transition-colors ${
                activeTab === "orders"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Porositë
            </button>
          </div>

          {/* Tab Content (unchanged) */}
          {activeTab === "users" && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-black">
                Menaxhimi i Përdoruesve
              </h2>
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
                      <tr
                        key={u._id}
                        className="border-b hover:bg-gray-50 transition text-black"
                      >
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
                            "••••••••"
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
                        <td colSpan={
                        3} className="text-center p-4 text-gray-500">
                          No users found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "shop-products" && <ShopProductsCRUD />}

          {activeTab === "contact-messages" && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-black">
                Mesazhet e Kontaktit
              </h2>
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
                      <tr
                        key={msg._id}
                        className="border-b hover:bg-gray-50 transition text-black"
                      >
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

          {activeTab === "orders" && (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-black">Porositë</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 font-semibold text-gray-600">Emri</th>
                      <th className="p-3 font-semibold text-gray-600">Adresa</th>
                      <th className="p-3 font-semibold text-gray-600">Telefoni</th>
                      <th className="p-3 font-semibold text-gray-600">Pagesa</th>
                      <th className="p-3 font-semibold text-gray-600">Produktet</th>
                      <th className="p-3 font-semibold text-gray-600">Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr
                        key={order._id}
                        className="border-b hover:bg-gray-50 transition text-black"
                      >
                        <td className="p-3">{order.name}</td>
                        <td className="p-3">{order.address}</td>
                        <td className="p-3">{order.phone}</td>
                        <td className="p-3">{order.payment}</td>
                        <td className="p-3">
                          <ul>
                            {order.cart.map((item, idx) => (
                              <li key={idx}>
                                {item.name} x{item.quantity}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="p-3">{new Date(order.createdAt).toLocaleString()}</td>
                      </tr>
                    ))}
                    {orders.length === 0 && (
                      <tr>
                        <td colSpan={6} className="text-center p-4 text-gray-500">
                          Nuk ka porosi të bëra.
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
