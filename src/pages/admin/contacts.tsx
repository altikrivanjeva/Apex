import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const fontMontserrat = { fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' };

export default function ContactList() {
  const [messages, setMessages] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);

  useEffect(() => {
    fetch('/api/contact')
      .then(res => res.json())
      .then(setMessages);
  }, []);

  const handleDelete = async (id: number) => {
    await fetch('/api/contact', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    setMessages(messages.filter(m => m.id !== id));
  };

  const handleEdit = (msg: any) => setEditing(msg);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/contact', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editing),
    });
    setMessages(messages.map(m => m.id === editing.id ? editing : m));
    setEditing(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <Header />
      <main className="flex-1 flex flex-col items-center py-16 px-4">
        <h1 className="text-3xl font-extrabold uppercase mb-8 text-blue-900" style={fontMontserrat}>
          Contact Messages
        </h1>
        <table className="w-full max-w-3xl bg-white rounded-xl shadow border border-blue-100">
          <thead>
            <tr className="bg-blue-50">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Message</th>
              <th className="p-3">Date</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id} className="border-t">
                <td className="p-3">{msg.name}</td>
                <td className="p-3">{msg.email}</td>
                <td className="p-3">{msg.message}</td>
                <td className="p-3">{new Date(msg.createdAt).toLocaleDateString()}</td>
                <td className="p-3">
                  <button className="text-blue-600 font-bold hover:underline mr-2" onClick={() => handleEdit(msg)}>Edit</button>
                  <button className="text-red-600 font-bold hover:underline" onClick={() => handleDelete(msg.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {editing && (
          <form onSubmit={handleUpdate} className="bg-white rounded-xl shadow p-6 mt-8 w-full max-w-md flex flex-col gap-3 border border-blue-100">
            <h2 className="text-xl font-bold mb-2" style={fontMontserrat}>Edit Message</h2>
            <input
              type="text"
              name="name"
              value={editing.name}
              onChange={e => setEditing({ ...editing, name: e.target.value })}
              className="border rounded px-4 py-2"
              style={fontMontserrat}
            />
            <input
              type="email"
              name="email"
              value={editing.email}
              onChange={e => setEditing({ ...editing, email: e.target.value })}
              className="border rounded px-4 py-2"
              style={fontMontserrat}
            />
            <textarea
              name="message"
              value={editing.message}
              onChange={e => setEditing({ ...editing, message: e.target.value })}
              className="border rounded px-4 py-2 min-h-[80px]"
              style={fontMontserrat}
            />
            <div className="flex gap-2 mt-2">
              <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition" style={fontMontserrat}>Save</button>
              <button type="button" className="bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded" style={fontMontserrat} onClick={() => setEditing(null)}>Cancel</button>
            </div>
          </form>
        )}
      </main>
      <Footer />
    </div>
  );
}