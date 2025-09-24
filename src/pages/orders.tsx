import { useEffect, useState } from "react";
import Header from '../components/Header';
import Footer from '../components/Footer';

const fontMontserrat = { fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' };

export default function Orders() {
  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: '',
    payment: 'cash',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
  });
  const [success, setSuccess] = useState(false);
  const [cart, setCart] = useState<{ id: number; name: string; img: string; price: string; quantity: number }[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const updateCart = () => {
        const stored = localStorage.getItem('apex_cart');
        if (stored) setCart(JSON.parse(stored));
        else setCart([]);
      };
      updateCart();
      window.addEventListener('cart-updated', updateCart);
      return () => window.removeEventListener('cart-updated', updateCart);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const orderData = {
      ...form,
      cart,
      createdAt: new Date().toISOString(),
    };
    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });
    setSuccess(true);
    setForm({
      name: '',
      address: '',
      phone: '',
      payment: 'cash',
      cardNumber: '',
      cardExpiry: '',
      cardCVV: '',
    });
    setCart([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('apex_cart');
      window.dispatchEvent(new CustomEvent('cart-updated'));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-blue-50 to-white text-blue-900">
      <Header cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} />
      <main className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        <section className="w-full max-w-xl mx-auto mb-10 px-6 py-8 bg-white/90 rounded-2xl shadow-2xl border border-blue-100 flex flex-col items-center">
          <h1 className="text-3xl font-extrabold uppercase mb-2 text-blue-900 text-center tracking-wide" style={fontMontserrat}>
            Place Your Order
          </h1>
          {/* Shfaq produktet në cart */}
          {cart.length > 0 ? (
            <div className="w-full mb-6">
              <h2 className="text-xl font-bold text-blue-900 mb-2" style={fontMontserrat}>Your Cart</h2>
              <ul>
                {cart.map((item) => (
                  <li key={item.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <img src={item.img} alt={item.name} className="w-10 h-10 object-contain rounded" />
                      <span className="font-bold" style={fontMontserrat}>{item.name}</span>
                      <span className="text-gray-600" style={fontMontserrat}>x{item.quantity}</span>
                    </div>
                    <span className="text-orange-500 font-bold" style={fontMontserrat}>
                      {(
                        item.quantity *
                        Number(
                          typeof item.price === "string"
                            ? item.price.replace('€', '').trim()
                            : item.price
                        )
                      ).toFixed(2)} €
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-2 text-right font-bold text-blue-900" style={fontMontserrat}>
                Total: {cart.reduce((acc, item) => {
                  let price = item.price;
                  if (typeof price === "string") {
                    price = price.replace('€', '').trim();
                  }
                  return acc + item.quantity * Number(price);
                }, 0).toFixed(2)} €
              </div>
            </div>
          ) : (
            <div className="w-full mb-6 text-center text-blue-900 font-bold" style={fontMontserrat}>
              Your cart is empty.
            </div>
          )}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
              className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-200 transition"
              style={fontMontserrat}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={form.address}
              onChange={handleChange}
              required
              className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-200 transition"
              style={fontMontserrat}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
              className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-200 transition"
              style={fontMontserrat}
            />
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <label className="font-bold text-blue-900" style={fontMontserrat}>
                Payment Method:
              </label>
              <select
                name="payment"
                value={form.payment}
                onChange={handleChange}
                className="border rounded px-4 py-2 focus:ring-2 focus:ring-orange-200 transition"
                style={fontMontserrat}
              >
                <option value="cash">Cash</option>
                <option value="card">Card</option>
              </select>
            </div>
          
            {form.payment === 'card' && (
              <div className="bg-blue-50 rounded-xl p-4 flex flex-col gap-3 border border-blue-200 shadow-inner animate-fade-in">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">💳</span>
                  <span className="font-bold text-blue-900" style={fontMontserrat}>Card Details</span>
                </div>
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={form.cardNumber}
                  onChange={handleChange}
                  required
                  maxLength={19}
                  className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-300 transition tracking-widest"
                  style={fontMontserrat}
                  inputMode="numeric"
                  pattern="[0-9\s]{13,19}"
                />
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="cardExpiry"
                    placeholder="MM/YY"
                    value={form.cardExpiry}
                    onChange={handleChange}
                    required
                    maxLength={5}
                    className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-300 transition w-1/2"
                    style={fontMontserrat}
                    inputMode="numeric"
                    pattern="\d{2}/\d{2}"
                  />
                  <input
                    type="text"
                    name="cardCVV"
                    placeholder="CVV"
                    value={form.cardCVV}
                    onChange={handleChange}
                    required
                    maxLength={4}
                    className="border rounded px-4 py-2 focus:ring-2 focus:ring-blue-300 transition w-1/2"
                    style={fontMontserrat}
                    inputMode="numeric"
                    pattern="\d{3,4}"
                  />
                </div>
                <div className="text-xs text-blue-700 mt-1" style={fontMontserrat}>
                  Your card data is encrypted and not stored.
                </div>
              </div>
            )}
            <button
              type="submit"
              className="bg-blue-600 text-white font-bold py-2 rounded-xl shadow hover:bg-blue-700 transition uppercase tracking-wider mt-2"
              style={fontMontserrat}
              disabled={cart.length === 0}
            >
              Confirm Order
            </button>
            {success && (
              <div className="text-green-600 font-bold mt-4 flex flex-col items-center justify-center text-lg animate-bounce" style={fontMontserrat}>
                <span className="flex items-center gap-2">
                  Order placed successfully! <span role="img" aria-label="check">✅</span>
                </span>
                <span className="text-4xl mt-2 animate-pulse" role="img" aria-label="muscle">💪</span>
              </div>
            )}
          </form>
        </section>
        <div className="mt-8 text-center text-blue-900 text-lg font-bold" style={fontMontserrat}>
          Thank you for choosing Apex! <span role="img" aria-label="muscle">💪</span>
        </div>
      </main>
      <Footer />
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease;
        }
      `}</style>
    </div>
  );
}

export function ProductsPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('apex_cart');
    if (stored) setCart(JSON.parse(stored));
  }, []);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      let updatedCart;
      if (existing) {
        updatedCart = prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updatedCart = [...prev, { ...product, quantity: 1 }];
      }
      localStorage.setItem('apex_cart', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  return (
    <div>
      {/* ...kodi për produktet... */}
      <div>
        <h2>CART</h2>
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              {item.name} x{item.quantity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
