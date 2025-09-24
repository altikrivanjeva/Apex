import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

const fontMontserrat = { fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' };
const fontOpenSans = { fontFamily: 'Open Sans, Arial, Helvetica, sans-serif' };

// Definoj tipin e produktit
interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  img: string;
}

export default function Favorites() {
  const [products, setProducts] = useState<Product[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const favs = localStorage.getItem('apex_favorites');
        if (favs) setFavorites(JSON.parse(favs));

        const storedCart = localStorage.getItem('apex_cart');
        if (storedCart) setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error("Failed to parse localStorage data", error);
        setFavorites([]);
        setCart([]);
      }
    }

    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/shop-products');
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Could not fetch products", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product: Product) => {
    const exists = cart.find((p) => p.id === product.id);
    let newCart;
    if (exists) {
      newCart = cart.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }
    setCart(newCart);
    if (typeof window !== 'undefined') {
      localStorage.setItem('apex_cart', JSON.stringify(newCart));
      window.dispatchEvent(new CustomEvent('cart-updated'));
    }
    setMessage('Product added to cart!');
    setTimeout(() => setMessage(null), 2000);
  };

  const removeFavorite = (id: number) => {
    const newFavs = favorites.filter(favId => favId !== id);
    setFavorites(newFavs);
    if (typeof window !== 'undefined') {
      localStorage.setItem('apex_favorites', JSON.stringify(newFavs));
      window.dispatchEvent(new CustomEvent('favorites-updated'));
    }
  };

  const favoriteProducts = products.filter(p => favorites.includes(p.id));

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #f5f5f5 0%, #eaf0fa 100%)' }}>
      <Header cartCount={cart.reduce((acc, item) => acc + (item.quantity || 0), 0)} favoritesCount={favorites.length} />
      <main className="flex-1 flex flex-col items-center py-16">
        <section className="w-full max-w-5xl mx-auto mb-12 px-4 py-10 bg-gradient-to-r from-pink-100 via-blue-50 to-blue-100 rounded-2xl shadow-lg flex flex-col items-center">
          <h1 className="text-4xl font-extrabold uppercase text-pink-600 mb-4 text-center" style={fontMontserrat}>
            Your Favorites
          </h1>
          <p className="text-lg text-blue-700 text-center mb-2" style={fontOpenSans}>
            All products you have marked as favorite are shown here. Add them to your cart anytime!
          </p>
        </section>
        {message && (
          <div className="fixed top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg font-bold z-50" style={fontMontserrat}>
            {message}
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 w-full max-w-7xl px-4">
          {favoriteProducts.length === 0 ? (
            <div className="col-span-full text-center text-blue-900 text-xl font-bold" style={fontMontserrat}>
              You have no favorite products yet.
            </div>
          ) : (
            favoriteProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-blue-100 relative">
                <button
                  onClick={() => removeFavorite(product.id)}
                  className="absolute top-4 right-4 p-1 rounded-full bg-white shadow hover:bg-pink-100 transition"
                  aria-label="Remove from favorites"
                  type="button"
                >
                  <Heart className="w-6 h-6 fill-pink-500 text-pink-500" fill="#ec4899" />
                </button>
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-32 h-32 object-contain rounded-xl mb-4"
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
            ))
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}