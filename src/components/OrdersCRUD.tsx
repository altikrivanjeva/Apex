import { useEffect, useState } from 'react';

export default function OrdersCRUD() {
  const [orders, setOrders] = useState<any[]>([]);
  const [form, setForm] = useState({ name: '', address: '', phone: '', cart: '' });
  const [editId, setEditId] = useState<string | null>(null);

  // Merr të gjitha porositë nga API
  const fetchOrders = async () => {
    const res = await fetch('/api/orders');
    const data = await res.json();
    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Shto ose ndrysho porosi
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: editId, ...form }),
      });
    } else {
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
    }
    setForm({ name: '', address: '', phone: '', cart: '' });
    setEditId(null);
    fetchOrders();
  };

  // Fshi porosi
  const handleDelete = async (id: string) => {
    await fetch('/api/orders', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: id }),
    });
    fetchOrders();
  };

  // Vendos të dhënat në formë për editim
  const handleEdit = (order: any) => {
    setForm({
      name: order.name,
      address: order.address,
      phone: order.phone,
      cart: JSON.stringify(order.cart),
    });
    setEditId(order._id);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Menaxho Porositë</h2>
      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-2 bg-gray-50 p-4 rounded">
        <input
          type="text"
          placeholder="Emri"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Adresa"
          value={form.address}
          onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
          className="border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Telefoni"
          value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          className="border p-2 rounded"
          required
        />
        <textarea
          placeholder="Cart (JSON array)"
          value={form.cart}
          onChange={e => setForm(f => ({ ...f, cart: e.target.value }))}
          className="border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editId ? 'Ruaj Ndryshimet' : 'Shto Porosi'}
        </button>
        {editId && (
          <button type="button" onClick={() => { setEditId(null); setForm({ name: '', address: '', phone: '', cart: '' }); }} className="text-gray-500 mt-2">
            Anulo
          </button>
        )}
      </form>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Emri</th>
            <th className="p-2">Adresa</th>
            <th className="p-2">Telefoni</th>
            <th className="p-2">Cart</th>
            <th className="p-2">Veprime</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order._id} className="border-t">
              <td className="p-2">{order.name}</td>
              <td className="p-2">{order.address}</td>
              <td className="p-2">{order.phone}</td>
              <td className="p-2 text-xs">{JSON.stringify(order.cart)}</td>
              <td className="p-2">
                <button onClick={() => handleEdit(order)} className="text-yellow-600 mr-2">Edit</button>
                <button onClick={() => handleDelete(order._id)} className="text-red-600">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}