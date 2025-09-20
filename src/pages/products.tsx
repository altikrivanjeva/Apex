import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Heart } from 'lucide-react'; 
import { ShopProduct } from '../models/ShopProduct';

const fontMontserrat = { fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' };
const fontOpenSans = { fontFamily: 'Open Sans, Arial, Helvetica, sans-serif' };

// Fallback products in case database is empty
const fallbackProducts: ShopProduct[] = [
  {
    name: 'Whey Gold Protein',
    img: 'https://th.bing.com/th/id/R.f90eb6d9c1335e9625b85fe393b17f6f?rik=9RFBJDdbHmvS4A&pid=ImgRaw&r=0',
    price: '€29.99',
    category: 'Protein',
    status: 'Add to Cart',
    id: 1,
  },
  {
    name: 'Creatine Monohydrate',
    img: 'https://vitafit-ks.com/wp-content/webp-express/webp-images/uploads/2025/02/Untitled-2.png.webp',
    price: '€19.99',
    category: 'Kreatinë',
    status: 'Add to Cart',
    id: 2,
  },
  {
    name: 'BCAA Complex',
    img: 'https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com/PIE/product/6564fd35d3f6ee5d94d3efea_2023-11-27_20-34-11_front.main._FMwebp__SR600,600_.jpg',
    price: '€16.99',
    category: 'Amino Acidet',
    status: 'Add to Cart',
    id: 3,
  },
  {
    name: 'Multivitamin',
    img: 'https://tfnhealth.com/wp-content/uploads/2023/03/Muscle-tech-multi-vitamin-1.jpg',
    price: '€11.99',
    category: 'Vitamina',
    status: 'Add to Cart',
    id: 4,
  },
  {
    name: 'C4 Pre Workout',
    img: 'https://www.preworkout.org/wp-content/uploads/2022/05/C4-Preworkout-720x760.jpg',
    price: '€24.99',
    category: 'Pre Workout',
    status: 'Add to Cart',
    id: 5,
  },
  {
    name: 'L-Glutamine',
    img: 'https://tse3.mm.bing.net/th/id/OIP.DaCVLNLnx2peqC3nbKm7yQHaJH?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    price: '€13.99',
    category: 'Amino Acidet',
    status: 'Add to Cart',
    id: 6,
  },
  {
    name: 'Omega 3',
    img: 'https://cdn.shopify.com/s/files/1/1515/2714/files/NordicNaturals_Omega3_60_SoftGels_690x690.png?v=1752163836',
    price: '€9.99',
    category: 'Vitamina',
    status: 'Add to Cart',
    id: 7,
  },
  {
    name: 'Casein Protein',
    img: 'https://i5.walmartimages.com/asr/85540182-1447-4c51-ab4e-d07f01cd61c0.7688ec321af3fa9431fae3cbaf5ba316.jpeg',
    price: '€27.99',
    category: 'Protein',
    status: 'Add to Cart',
    id: 8,
  },
  {
    name: 'Pre Workout Xplode',
    img: 'https://rs.dolphinfitness.com/tn1/tn1_177326895.jpg',
    price: '€21.99',
    category: 'Pre Workout',
    status: 'Add to Cart',
    id: 9,
  },
  {
    name: 'Vitamin D3',
    img: 'https://i5.walmartimages.com/seo/Spring-Valley-Vitamin-D3-Softgels-5000-IU-100-Count_23f1cfb7-b9ef-4e34-847d-7ec99c0d963e.e4a74cf4aeb784fba9dcb71c3327b853.jpeg',
    price: '€7.99',
    category: 'Vitamina',
    status: 'Add to Cart',
    id: 10,
  },
  {
    name: 'Amino Energy',
    img: 'https://i5.walmartimages.com/asr/0325691b-a441-43fb-b4f2-34f73057e9cd_1.e5ffbc78e8741eef40bdafe5acaaf33b.jpeg',
    price: '€15.99',
    category: 'Amino Acidet',
    status: 'Add to Cart',
    id: 11,
  },
  {
    name: 'Protein Bar',
    img: 'https://tse3.mm.bing.net/th/id/OIP.ZAH98AAUnvkk7Oo9SKtaOQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    price: '€2.99',
    category: 'Protein',
    status: 'Add to Cart',
    id: 12,
  },
  {
    name: 'ZMA',
    img: 'https://tse4.mm.bing.net/th/id/OIP.QCwzh75sHv0nKiG5Yr4r3AHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    price: '€10.99',
    category: 'Vitamina',
    status: 'Add to Cart',
    id: 13,
  },
  {
    name: 'Beta Alanine',
    img: 'https://m.media-amazon.com/images/I/71aeT1glg+L._AC_SL1500_.jpg',
    price: '€12.99',
    category: 'Amino Acidet',
    status: 'Add to Cart',
    id: 14,
  },
  {
    name: 'Mass Gainer',
    img: 'https://tse1.mm.bing.net/th/id/OIP.NhLy3sS4V0Kwz4LuEt7nQwHaK_?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    price: '€34.99',
    category: 'Protein',
    status: 'Add to Cart',
    id: 15,
  },
  {
    name: 'B-Complex',
    img: 'https://sportlandercv.com/wp-content/uploads/2016/02/1222-B-Complex-60-tabs.jpg',
    price: '€8.99',
    category: 'Vitamina',
    status: 'Add to Cart',
    id: 16,
  },
  {
    name: 'L-Carnitine',
    img: 'https://www.gosupps.com/media/catalog/product/7/1/71yQ6v0mD6L.jpg',
    price: '€17.99',
    category: 'Amino Acidet',
    status: 'Add to Cart',
    id: 17,
  },
  {
    name: 'Hydro Whey',
    img: 'https://tse4.mm.bing.net/th/id/OIP.7bRUAas7Hut-gJ-h-SKDXQHaLp?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    price: '€32.99',
    category: 'Protein',
    status: 'Add to Cart',
    id: 18,
  },
  {
    name: 'Magnesium Citrate',
    img: 'https://tse3.mm.bing.net/th/id/OIP.N_gHZk9y73V_lFv57SR7sQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
    price: '€6.99',
    category: 'Vitamina',
    status: 'Add to Cart',
    id: 19,
  },
  {
    name: 'Pump Booster',
    img: 'https://www.proteini-outlet.com/wp-content/uploads/2024/05/all-stars-pump-booster-320g-green-apple-1-proteini-outlet.jpg',
    price: '€18.99',
    category: 'Pre Workout',
    status: 'Add to Cart',
    id: 20,
  },
  {
    name: 'Electrolyte Mix',
    img: 'https://m.media-amazon.com/images/I/81a4zT6ZypL._AC_.jpg',
    price: '€7.99',
    category: 'Amino Acidet',
    status: 'Add to Cart',
    id: 21,
  },
  {
    name: 'Protein Cookies',
    img: 'https://th.bing.com/th/id/R.b3f829e2ad2ba77caf0ae9a4a4b9b918?rik=l5v7mVn3HqV6Fg&pid=ImgRaw&r=0',
    price: '€3.99',
    category: 'Protein',
    status: 'Add to Cart',
    id: 22,
  },
  {
    name: 'Collagen Peptides',
    img: 'https://i5.walmartimages.com/asr/d231cbd7-0efd-486a-8bb3-d9e3c2b5572c.e0cb8e624f7278d85e8cdd38fa93c095.png',
    price: '€15.49',
    category: 'Amino Acidet',
    status: 'Add to Cart',
    id: 23,
  },
  {
    name: 'Vitamin C 1000mg',
    img: 'https://th.bing.com/th/id/R.b4c62d8d374a32e2dd50c2cd346cf9b3?rik=hXFZ3IA32FBvXA&pid=ImgRaw&r=0',
    price: '€6.49',
    category: 'Vitamina',
    status: 'Add to Cart',
    id: 24,
  }
]; 

// Vendose këtë në faqen ku shfaqen produktet (p.sh. index.tsx ose products.tsx)

export default function Products() {
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [cart, setCart] = useState<{ id: number; name: string; img: string; price: string; quantity: number }[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all'); // Gjendja e re per kategorine
  const router = useRouter();

  // Load products from database
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/shop-products');
      if (res.ok) {
        const dbProducts = await res.json();
        const combinedProducts = [...dbProducts, ...fallbackProducts];
        setProducts(combinedProducts.reverse()); // Rendit produktet e reja ne fillim
      } else {
        setProducts(fallbackProducts.reverse());
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts(fallbackProducts.reverse());
    } finally {
      setLoading(false);
    }
  };

  // Load cart and favorites from localStorage only on client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('apex_cart');
      if (stored) setCart(JSON.parse(stored));
      const fav = localStorage.getItem('apex_favorites');
      if (fav) setFavorites(JSON.parse(fav));
    }
  }, []);

  const syncCart = (newCart: typeof cart) => {
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

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      let updatedCart;
      if (existing) {
        updatedCart = prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
  const addToCart = (product: ShopProduct) => {
    const newCart = (() => {
      const exists = cart.find((p) => p.id === product.id);
      if (exists) {
        return cart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        updatedCart = [...prev, { ...product, quantity: 1 }];
      }
      localStorage.setItem('apex_cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
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
                    price = price.replace('€', '').trim();
                  }
                  return acc + item.quantity * Number(price);
                  const price = typeof item.price === 'string' 
                    ? parseFloat(item.price.replace('€', '').replace(',', '.')) 
                    : parseFloat(String(item.price));
                  return acc + (item.quantity * (isNaN(price) ? 0 : price));
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
              <div
                className="text-lg font-bold text-orange-500 mb-2"
                style={fontMontserrat}
              >
                {product.price}
              </div>
              <button
                onClick={() => addToCart(product)}
                className="px-5 py-2 bg-black text-white font-extrabold italic rounded-none shadow hover:bg-blue-900 transition text-base uppercase"
              >
                Add to Cart
              </button>
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