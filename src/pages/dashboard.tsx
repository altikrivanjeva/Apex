// Kjo faqe është Dashboard-i i adminit për menaxhimin e përdoruesve, produkteve, porosive dhe mesazheve të kontaktit.

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession, signIn } from "next-auth/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ShopProductsCRUD from "@/components/ShopProductsCRUD";
import OrdersCRUD from '../components/OrdersCRUD'; // ose rruga e saktë sipas strukturës tënde

// Definimi i tipeve për përdoruesit, porositë dhe mesazhet e kontaktit
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

// Tipi për tab-in aktiv në dashboard
type ActiveTab = "users" | "shop-products" | "contact-messages" | "orders";

export default function Dashboard() {
  // State për të ruajtur të dhënat e përdoruesve, porosive, mesazheve dhe tab-in aktiv
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>([]);
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [activeTab, setActiveTab] = useState<ActiveTab>("users");

  // Shto state për formën e porosisë dhe editimin (pa fushën "payment" dhe "cart" për adminin)
  const [orderForm, setOrderForm] = useState({
    name: "",
    address: "",
    phone: "",
  });
  const [editOrderId, setEditOrderId] = useState<string | null>(null);

  // Shto state për produktin e thjeshtë që admini mund të shtojë vetëm kur krijon porosi të re
  const [simpleProduct, setSimpleProduct] = useState("");

  // Merr sesionin e përdoruesit për autentikim
  const { data: session, status } = useSession();
  const router = useRouter();

  // Nëse përdoruesi nuk është i loguar, ridrejtohet te login
  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  // Funksionet për të marrë të dhënat nga API-t
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

  // Merr të dhënat kur admini është i loguar
  useEffect(() => {
    if (session) {
      fetchUsers();
      fetchOrders();
      fetchContactMessages();
    }
  }, [session]);

  // Funksion për të përditësuar të dhënat e një përdoruesi
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

  // Funksion për të fshirë një përdorues
  const handleDelete = async (userId: string) => {
    await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type: "delete", userId }),
    });
    fetchUsers();
  };

  // Funksion për të shtuar/ndryshuar porosi (pa ndryshuar cart dhe payment)
  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let payload = { ...orderForm };
    if (!editOrderId && simpleProduct.trim()) {
      payload = {
        ...payload,
        cart: [{ name: simpleProduct, quantity: 1 }],
      };
    }
    await fetch("/api/orders", {
      method: editOrderId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editOrderId ? { _id: editOrderId, ...orderForm } : payload),
    });
    setOrderForm({ name: "", address: "", phone: "" });
    setEditOrderId(null);
    setSimpleProduct("");
    fetchOrders();
  };

  // Funksion për të fshirë porosi
  const handleOrderDelete = async (orderId: string) => {
    await fetch("/api/orders", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ _id: orderId }),
    });
    fetchOrders();
  };

  // Funksion për të mbushur formën për editim (vetëm fushat që admini mund të ndryshojë)
  const handleOrderEdit = (order: Order) => {
    setOrderForm({
      name: order.name,
      address: order.address,
      phone: order.phone,
    });
    setEditOrderId(order._id);
  };

  // Nëse sesioni është duke u ngarkuar, shfaqet loading
  if (status === "loading") return <p className="text-center mt-10">Loading...</p>;

  // Nëse nuk ka sesion, shfaqet forma për login
  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
        <h1 className="text-2xl mb-4">Please log in</h1>
        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          className="mb-4 w-full max-w-xs px-6 py-3 rounded-lg bg-red-500 text-white font-medium"
        >
          Login with Google
        </button>
        <button
          onClick={() => signIn("facebook", { callbackUrl: "/dashboard" })}
          className="w-full max-w-xs px-6 py-3 rounded-lg font-medium"
          style={{ backgroundColor: "#1877F2", color: "white" }}
        >
          Login with Facebook
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Header-i i faqes */}
      <Header />
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-4 md:p-6">
          {/* Titulli i dashboard-it */}
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-black">
            Admin Dashboard
          </h1>

          {/* Navigimi me tab-a për menaxhimin e të dhënave */}
          <div className="flex overflow-x-auto mb-6 border-b">
            <button
              onClick={() => setActiveTab("users")}
              className={`flex-shrink-0 px-4 md:px-6 py-2 md:py-3 font-semibold ${
                activeTab === "users"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Përdoruesit
            </button>
            <button
              onClick={() => setActiveTab("shop-products")}
              className={`flex-shrink-0 px-4 md:px-6 py-2 md:py-3 font-semibold ${
                activeTab === "shop-products"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Produktet
            </button>
            <button
              onClick={() => setActiveTab("contact-messages")}
              className={`flex-shrink-0 px-4 md:px-6 py-2 md:py-3 font-semibold ${
                activeTab === "contact-messages"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Mesazhet
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`flex-shrink-0 px-4 md:px-6 py-2 md:py-3 font-semibold ${
                activeTab === "orders"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Porositë
            </button>
          </div>

          {/* Përmbajtja e tab-it aktiv */}
          {activeTab === "users" && (
            <div className="overflow-x-auto">
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-black">
                Menaxhimi i Përdoruesve
              </h2>
              {/* Tabela me përdoruesit dhe opsionet për edit/delete */}
              <table className="w-full min-w-[500px] text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3 font-semibold text-gray-600">Username</th>
                    <th className="p-3 font-semibold text-gray-600">Password</th>
                    <th className="p-3 font-semibold text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id} className="border-b hover:bg-gray-50 text-black">
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
                            className="bg-green-500 text-white px-3 py-1 rounded"
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
                            className="bg-blue-500 text-white px-3 py-1 rounded"
                          >
                            Edit
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(u._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
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
          )}

          {/* Komponenti për menaxhimin e produkteve */}
          {activeTab === "shop-products" && <ShopProductsCRUD />}

          {/* Tabela me mesazhet e kontaktit */}
          {activeTab === "contact-messages" && (
            <div className="overflow-x-auto">
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-black">
                Mesazhet e Kontaktit
              </h2>
              <table className="w-full min-w-[600px] text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3">Emri</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Mesazhi</th>
                    <th className="p-3">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {contactMessages.map((msg) => (
                    <tr key={msg._id} className="border-b hover:bg-gray-50 text-black">
                      <td className="p-3">{msg.name}</td>
                      <td className="p-3">{msg.email}</td>
                      <td className="p-3">{msg.message}</td>
                      <td className="p-3">{new Date(msg.createdAt).toLocaleString()}</td>
                    </tr>
                  ))}
                  {contactMessages.length === 0 && (
                    <tr>
                      <td colSpan={4} className="text-center p-4 text-gray-500">
                        Nuk ka mesazhe.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Tabela me porositë */}
          {activeTab === "orders" && (
            <div className="overflow-x-auto text-black">
              <h2 className="text-xl md:text-2xl font-bold mb-4 text-black">Porositë</h2>
              {/* Forma për shtim/ndryshim të porosisë */}
              <form onSubmit={handleOrderSubmit} className="mb-6 flex flex-col gap-2 bg-gray-50 p-4 rounded">
                <input
                  type="text"
                  placeholder="Emri"
                  value={orderForm.name}
                  onChange={e => setOrderForm(f => ({ ...f, name: e.target.value }))}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Adresa"
                  value={orderForm.address}
                  onChange={e => setOrderForm(f => ({ ...f, address: e.target.value }))}
                  className="border p-2 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Telefoni"
                  value={orderForm.phone}
                  onChange={e => setOrderForm(f => ({ ...f, phone: e.target.value }))}
                  className="border p-2 rounded"
                  required
                />
                {/* Shfaq input për produkt vetëm kur shton porosi të re */}
                {!editOrderId && (
                  <input
                    type="text"
                    placeholder="Emri i produktit"
                    value={simpleProduct}
                    onChange={e => setSimpleProduct(e.target.value)}
                    className="border p-2 rounded"
                    required
                  />
                )}
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                  {editOrderId ? "Ruaj Ndryshimet" : "Shto Porosi"}
                </button>
                {editOrderId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditOrderId(null);
                      setOrderForm({ name: "", address: "", phone: "" });
                      setSimpleProduct("");
                    }}
                    className="text-gray-500 mt-2"
                  >
                    Anulo
                  </button>
                )}
              </form>
              <table className="w-full min-w-[700px] text-left border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-3">Emri</th>
                    <th className="p-3">Adresa</th>
                    <th className="p-3">Telefoni</th>
                    <th className="p-3">Produktet</th>
                    <th className="p-3">Data</th>
                    <th className="p-3">Veprime</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id} className="border-b hover:bg-gray-50 text-black">
                      <td className="p-3">{order.name}</td>
                      <td className="p-3">{order.address}</td>
                      <td className="p-3">{order.phone}</td>
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
                      <td className="p-3">
                        <button
                          onClick={() => handleOrderEdit(order)}
                          className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleOrderDelete(order._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center p-4 text-gray-500">
                        Nuk ka porosi.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
