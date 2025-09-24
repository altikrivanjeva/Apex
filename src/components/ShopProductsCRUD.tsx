import React, { useState, useEffect } from 'react';
import { ShopProduct } from '../models//models/ShopPorduct';

export default function ShopProductsCRUD() {
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [form, setForm] = useState({ name: '', img: '', price: '', category: '' });
  const [message, setMessage] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Predefined categories
  const categories = ['Protein', 'Kreatinë', 'Amino Acidet', 'Vitamina', 'Pre Workout'];

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    try {
      const res = await fetch('/api/shop-products');
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.img || !form.price || !form.category) {
      setMessage('Plotëso të gjitha fushat!');
      return;
    }

    try {
      if (editId) {
        // Update
        const res = await fetch('/api/shop-products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ _id: editId, ...form })
        });
        if (res.ok) {
          setMessage('Produkti u ndryshua!');
          setEditId(null);
        }
      } else {
        // Create
        const res = await fetch('/api/shop-products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        if (res.ok) {
          setMessage('Produkti u shtua!');
          setIsAddingNew(false);
        }
      }
      setForm({ name: '', img: '', price: '', category: '' });
      fetchProducts();
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setMessage('Ka ndodhur një gabim');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Jeni të sigurt që doni ta fshini këtë produkt?')) return;
    
    try {
      const res = await fetch('/api/shop-products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: id })
      });
      if (res.ok) {
        setMessage('Produkti u fshi!');
        fetchProducts();
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }

  function handleEdit(prod: ShopProduct) {
    setForm({ name: prod.name, img: prod.img, price: prod.price, category: prod.category });
    setEditId(prod._id || null);
    setIsAddingNew(false);
  }

  function cancelEdit() {
    setForm({ name: '', img: '', price: '', category: '' });
    setEditId(null);
    setIsAddingNew(false);
    setMessage('');
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-black">Menaxhimi i Produkteve të Dyqanit</h2>
        <button
          onClick={() => setIsAddingNew(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          disabled={isAddingNew || editId !== null}
        >
          Shto Produkt të Ri
        </button>
      </div>

      {/* Success/Error Message */}
      {message && (
        <div className={`p-3 rounded mb-4 ${message.includes('u shtua') || message.includes('u ndryshua') || message.includes('u fshi') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message}
        </div>
      )}

      {/* Add/Edit Product Form */}
      {(isAddingNew || editId) && (
        <div className="bg-blue-50 p-6 rounded-lg mb-6 border">
          <h3 className="text-lg font-semibold mb-4 text-black">
            {editId ? 'Ndrysho Produktin' : 'Shto Produkt të Ri'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Emri i Produktit"
                className="border p-3 rounded w-full text-black"
                value={form.name}
                onChange={(e) => setForm(f => ({ ...f, name: e.target.value }))}
                required
              />
              <input
                type="text"
                placeholder="URL e Fotografisë"
                className="border p-3 rounded w-full text-black"
                value={form.img}
                onChange={(e) => setForm(f => ({ ...f, img: e.target.value }))}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Çmimi (p.sh. €29.99)"
                className="border p-3 rounded w-full text-black"
                value={form.price}
                onChange={(e) => setForm(f => ({ ...f, price: e.target.value }))}
                required
              />
              <select
                className="border p-3 rounded w-full text-black"
                value={form.category}
                onChange={(e) => setForm(f => ({ ...f, category: e.target.value }))}
                required
              >
                <option value="">Zgjidh Kategorinë</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            {/* Image Preview */}
            {form.img && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-2">Pamja paraprak:</p>
                <img 
                  src={form.img} 
                  alt="Preview" 
                  className="w-32 h-32 object-contain border rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600 transition font-semibold"
              >
                {editId ? 'Ruaj Ndryshimet' : 'Shto Produktin'}
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-500 text-white px-6 py-3 rounded hover:bg-gray-600 transition font-semibold"
              >
                Anulo
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 font-semibold text-gray-600">Fotografia</th>
              <th className="p-3 font-semibold text-gray-600">Emri</th>
              <th className="p-3 font-semibold text-gray-600">Çmimi</th>
              <th className="p-3 font-semibold text-gray-600">Kategoria</th>
              <th className="p-3 font-semibold text-gray-600">ID</th>
              <th className="p-3 font-semibold text-gray-600">Veprimet</th>
            </tr>
          </thead>
          <tbody>
            {products.map((prod) => (
              <tr key={prod._id} className="border-b hover:bg-gray-50 transition text-black">
                <td className="p-3">
                  <img 
                    src={prod.img} 
                    alt={prod.name} 
                    className="w-16 h-16 object-contain rounded"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0zMiAyNEM0NC40MTgzIDI0IDU0IDMzLjU4MTcgNTQgNDZDNTQgNTguNDE4MyA0NC40MTgzIDY4IDMyIDY4QzE5LjU4MTcgNjggMTAgNTguNDE4MyAxMCA0NkMxMCAzMy41ODE3IDE5LjU4MTcgMjQgMzIgMjRaIiBmaWxsPSIjRTVFN0VCIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzlDQTNBRiIgZm9udC1zaXplPSIxMnB4Ij5ObyBJbWFnZTwvdGV4dD4KICA8L3N2Zz4K';
                    }}
                  />
                </td>
                <td className="p-3 font-medium">{prod.name}</td>
                <td className="p-3 text-green-600 font-semibold">{prod.price}</td>
                <td className="p-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {prod.category}
                  </span>
                </td>
                <td className="p-3 text-gray-500">#{prod.id}</td>
                <td className="p-3 space-x-2">
                  <button
                    onClick={() => handleEdit(prod)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition text-sm"
                    disabled={isAddingNew || editId !== null}
                  >
                    Ndrysho
                  </button>
                  <button
                    onClick={() => handleDelete(prod._id!)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                    disabled={isAddingNew || editId !== null}
                  >
                    Fshi
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center p-8 text-gray-500">
                  Nuk ka produkte. Shto produktin e parë!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}