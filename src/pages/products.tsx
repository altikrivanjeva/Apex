import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Heart } from 'lucide-react';
import { ShopProduct } from '../models/ShopProduct';

const fontMontserrat = { fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' };
const fontOpenSans = { fontFamily: 'Open Sans, Arial, Helvetica, sans-serif' };

// Define a type for your cart items
interface CartProduct extends ShopProduct {
  quantity: number;
}

export default function Products() {
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [cart, setCart] = useState<CartProduct[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const router = useRouter();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/shop-products');
      if (res.ok) {
        const dbProducts = await res.json();
        // Corrected: Only set products with data from the database
        setProducts(dbProducts.reverse());
      } else {
        // Corrected: Set to an empty array or handle the error
        setProducts([]); 
        console.error('Failed to fetch products from the database.');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      // Corrected: Set to an empty array on a network error
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('apex_cart');
      if (stored) {
        const parsedCart: CartProduct[] = JSON.parse(stored);
        setCart(parsedCart);
      }
      const fav = localStorage.getItem('apex_favorites');
      if (fav) setFavorites(JSON.parse(fav));
    }
  }, []);

  const syncCart = (newCart: CartProduct[]) => {
    setCart(newCart);
    if (typeof window !== 'undefined') {
      localStorage.setItem('apex_cart', JSON.stringify(newCart));
      window.dispatchEvent(new CustomEvent('cart-updated'));
    }
  };

  const syncFavorites = (newFavs: number[]) => {
    setFavorites(newFavs);
    if (typeof window !== 'undefined') {
      localStorage.setItem('apex_favorites', JSON.stringify(newFavs));
      window.dispatchEvent(new CustomEvent('favorites-updated'));
    }
  };

  const addToCart = (product: ShopProduct) => {
    const exists = cart.find((p) => p.id === product.id);
    let newCart: CartProduct[];
    if (exists) {
      newCart = cart.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }
    syncCart(newCart);
    setMessage('Produkti u shtua në shportë!');
    setTimeout(() => setMessage(null), 1500);
  };

  const removeFromCart = (id: number) => {
    const newCart = cart.filter((p) => p.id !== id);
    syncCart(newCart);
  };

  const updateQuantity = (id: number, qty: number) => {
    const newCart = cart.map((p) =>
      p.id === id ? { ...p, quantity: qty > 0 ? qty : 1 } : p
    );
    syncCart(newCart);
  };

  const toggleFavorite = (id: number) => {
    let newFavs: number[];
    if (favorites.includes(id)) {
      newFavs = favorites.filter(favId => favId !== id);
    } else {
      newFavs = [...favorites, id];
    }
    syncFavorites(newFavs);
  };

  // Llogarit kategoritë unike
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  // Filtro produktet bazuar ne kategorine e zgjedhur
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #f5f5f5 0%, #eaf0fa 100%)' }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css?family=Montserrat:800,700,400&display=swap');
        @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,500,600&display=swap');
      `}</style>
      <Header />
      <main className="flex-1 flex flex-col items-center py-16">
        {/* Hero Banner */}
        <section className="w-full max-w-5xl mx-auto mb-12 px-4 py-10 bg-gradient-to-r from-orange-100 via-blue-50 to-blue-100 rounded-2xl shadow-lg flex flex-col items-center">
          <h1 className="text-5xl font-extrabold uppercase text-blue-900 mb-4 text-center" style={fontMontserrat}>
            Apex Products
          </h1>
          <p className="text-xl text-blue-700 text-center mb-2" style={fontOpenSans}>
            The best supplements for performance, muscle, and health. Choose, add to cart, and buy with one click!
          </p>
        </section>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="text-xl text-blue-900 font-bold" style={fontMontserrat}>
              Duke ngarkuar produktet...
            </div>
          </div>
        )}
        {/* Mesazhi për shtimin në shportë */}
        {message && (
          <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg font-bold z-50" style={fontMontserrat}>
            {message}
          </div>
        )}

        {/* Filter Section */}
        <div className="w-full max-w-7xl px-4 flex justify-end mb-6">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-700" style={fontMontserrat}>Filtro sipas kategorisë:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border rounded-xl shadow-sm text-gray-800"
              style={fontOpenSans}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'all' ? 'Të gjitha' : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="w-full max-w-3xl mb-12">
          {cart.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100 mb-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-4 uppercase" style={fontMontserrat}>
                Cart
              </h2>
              <ul>
                {cart.map((item) => (
                  <li key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center gap-4">
                      <img src={item.img} alt={item.name} className="w-12 h-12 object-contain rounded" />
                      <span className="font-bold" style={fontMontserrat}>{item.name}</span>
                      <span className="text-orange-500 font-bold" style={fontMontserrat}>{item.price}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                        className="w-12 px-2 py-1 border border-gray-300 rounded text-center"
                        style={fontOpenSans}
                      />
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="px-3 py-1 bg-red-500 text-white rounded font-bold hover:bg-red-600"
                        style={fontMontserrat}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-right font-bold text-blue-900" style={fontMontserrat}>
                Total: {cart.reduce((acc, item) => {
                  let price = item.price;
                  if (typeof price === "string") {
                    price = price.replace('€', '').replace(',', '.').trim();
                  }
                  const priceNum = parseFloat(price as string);
                  return acc + item.quantity * (isNaN(priceNum) ? 0 : priceNum);
                }, 0).toFixed(2)} €
              </div>
              <button
                className="mt-4 px-6 py-2 bg-orange-500 text-white font-bold uppercase rounded shadow hover:bg-orange-600 transition"
                style={fontMontserrat}
                onClick={() => router.push('/orders')}
              >
                Go to Checkout
              </button>
            </div>
          )}
        </div>

        {/* Produktet e filtruara */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 w-full max-w-7xl px-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-blue-100 relative">
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 p-1 rounded-full bg-white shadow hover:bg-pink-100 transition"
                  aria-label="Add to favorites"
                  type="button"
                >
                  <Heart
                    className={`w-6 h-6 ${favorites.includes(product.id) ? 'fill-pink-500 text-pink-500' : 'text-gray-400'}`}
                    fill={favorites.includes(product.id) ? '#ec4899' : 'none'}
                  />
                </button>
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-32 h-32 object-contain rounded-xl mb-4"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMjgiIGhlaWdodD0iMTI4IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik02NCA0OEM4OC44MzY1IDQ4IDEwOCA2Ny4xNjM1IDEwOCA5MkMxMDggMTE2LjgzNiA4OC44MzY1IDEzNiA2NCAxMzZDMzkuMTYzNSAxMzYgMjAgMTE2LjgzNiAyMCA5MkMyMCA2Ny4xNjM1IDM5LjE2MzUgNDggNjQgNDhaIiBmaWxsPSIjRTVFN0VCIi8+Cjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0iY2VudHJhbCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iIzlDQTNBRiIgZm9udC1zaXplPSIxNnB4Ij5ObyBJbWFnZTwvdGV4dD4KICA8L3N2Zz4K';
                  }}
                />
                <h2
                  className="text-xl font-extrabold uppercase text-blue-900 mb-2 text-center"
                  style={fontMontserrat}
                >
                  {product.name}
                </h2>
                <div
                  className="text-base font-bold text-gray-500 mb-1"
                  style={fontOpenSans}
                >
                  {product.category}
                </div>
                <div
                  className="text-lg font-bold text-orange-500 mb-2"
                  style={fontMontserrat}
                >
                  {product.price}
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="px-6 py-2 bg-orange-500 text-white font-bold uppercase rounded shadow hover:bg-orange-600 transition mb-2"
                  style={fontMontserrat}
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <div className="text-2xl text-blue-900 font-bold mb-4" style={fontMontserrat}>
              Nuk ka produkte të disponueshme për këtë kategori.
            </div>
            <p className="text-gray-600" style={fontOpenSans}>
              Provo të zgjedhësh një kategori tjetër.
            </p>
          </div>
        )}
        {/* Motivational message */}
        <div className="mt-16 text-center text-blue-900 text-xl font-bold" style={fontMontserrat}>
          Choose the supplement that fits you and start your journey to success!
        </div>
      </main>
      <Footer />
    </div>
  );
}