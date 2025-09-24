
import React, { useState, useEffect } from 'react';

type Product = {
  _id?: string;
  name: string;
  quantity: number;
  price: number;
};

export default function ProductsCRUD() {
 
  const [products, setProducts] = useState<Product[]>([]);
  
  const [form, setForm] = useState({ name: '', quantity: '', price: '' });
  
  const [message, setMessage] = useState('');
  
  const [editId, setEditId] = useState<string | null>(null);

  
  useEffect(() => {
    fetchProducts();
  }, []);

  
  async function fetchProducts() {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  }

  
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.quantity || !form.price) return setMessage('Plotëso të gjitha fushat!');
    if (editId) {
      
      await fetch('/api/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: editId, ...form })
      });
      setMessage('U ndryshua!');
      setEditId(null);
    } else {
      
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      setMessage('U shtua!');
    }
    setForm({ name: '', quantity: '', price: '' });
    fetchProducts();
  }


  async function handleDelete(id: string) {
    await fetch('/api/products', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id: id })
    });
    setMessage('U fshi!');
    fetchProducts();
  }

  
  function handleEdit(prod: Product) {
    setForm({ name: prod.name, quantity: String(prod.quantity), price: String(prod.price) });
    setEditId(prod._id || null);
  }

  return (
    <div className="w-full max-w-md mx-auto">
      
      <div className="rounded-2xl shadow-lg p-8 mb-8" style={{ background: '#23272f' }}>
        <h2 className="text-2xl font-bold mb-6 text-white">Shto/Ndrysho Produkt (Protein)</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Emri"
            className="border-none rounded-lg px-4 py-3 bg-[#2c313a] text-white focus:text-white focus:bg-[#353a45] focus:outline-none text-base font-medium placeholder-gray-400"
            value={form.name}
            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
            required
            style={{ color: 'white' }}
          />
          <input
            type="number"
            name="quantity"
            placeholder="Sasia"
            className="border-none rounded-lg px-4 py-3 bg-[#2c313a] text-black focus:text-black focus:bg-[#353a45] focus:outline-none text-base font-medium placeholder-gray-400"
            value={form.quantity}
            onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))}
            required
            style={{ color: 'white' }}
          />
          <input
            type="number"
            name="price"
            placeholder="Çmimi"
            className="border-none rounded-lg px-4 py-3 bg-[#2c313a] text-black focus:text-black focus:bg-[#353a45] focus:outline-none text-base font-medium placeholder-gray-400"
            value={form.price}
            onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
            required
            style={{ color: 'white' }}
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg px-4 py-3 mt-2 font-semibold shadow">{editId ? 'Ruaj Ndryshimet' : 'Shto'}</button>
        </form>
        
        <div className="text-sm mt-3 text-green-400 font-medium min-h-[24px]">{message}</div>
      </div>
      
      <div className="rounded-2xl shadow-lg p-8" style={{ background: '#23272f' }}>
        <h2 className="text-2xl font-bold mb-6 text-white">Produktet</h2>
        <ul className="flex flex-col gap-3">
          {products.map(prod => (
            <li key={prod._id} className="flex justify-between items-center border border-[#2c313a] rounded-lg px-4 py-3 bg-[#2c313a]">
              <span className="text-white"><b>{prod.name}</b> - Sasia: {prod.quantity} - Çmimi: {prod.price}€</span>
              <span>
                
                <button onClick={() => handleEdit(prod)} className="text-yellow-400 hover:text-yellow-300 font-semibold mr-2">Edit</button>
               
                <button onClick={() => handleDelete(prod._id!)} className="text-red-400 hover:text-red-300 font-semibold">Delete</button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
