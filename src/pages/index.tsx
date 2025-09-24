
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useEffect } from "react";

export default function Home() {
 
  useEffect(() => {
    if (typeof window !== "undefined") {
      var Tawk_API = Tawk_API || {};
      var Tawk_LoadStart = new Date();
      (function () {
        var s1 = document.createElement("script");
        s1.async = true;
        s1.src = "https://embed.tawk.to/68cd4cbff6dadc19215a37c6/1j5gv7jk5";
        s1.charset = "UTF-8";
        s1.setAttribute("crossorigin", "*");
        document.body.appendChild(s1);
      })();
    }
  }, []);

  
  const addToFavorites = (productId: number) => {
    let favs = [];
    if (typeof window !== "undefined") {
      favs = JSON.parse(localStorage.getItem('apex_favorites') || '[]');
      if (!favs.includes(productId)) {
        favs.push(productId);
        localStorage.setItem('apex_favorites', JSON.stringify(favs));
        window.dispatchEvent(new CustomEvent('favorites-updated'));
      }
    }
  };

  
  const addToCart = (product: any) => {
    let cart = [];
    if (typeof window !== "undefined") {
      cart = JSON.parse(localStorage.getItem('apex_cart') || '[]');
      const existing = cart.find((item: any) => item.id === product.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      localStorage.setItem('apex_cart', JSON.stringify(cart));
      window.dispatchEvent(new CustomEvent('cart-updated'));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css?family=Montserrat:800,700,400&display=swap');
        @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,500,600&display=swap');
      `}</style>
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        
        <section className="w-full flex flex-col md:flex-row items-center justify-center px-4 py-16 max-w-7xl mx-auto">
          
          <div className="md:w-1/2 w-full flex flex-col justify-center items-start px-2 md:px-8">
            <span
              className="text-base font-semibold italic text-gray-500 mb-2"
              style={{
                fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
                letterSpacing: '1px',
                fontStyle: 'italic',
              }}
            >
              INSTAGRAM: <span className="font-bold text-gray-700 italic" style={{ fontFamily: 'Montserrat, Arial, Helvetica, sans-serif', fontStyle: 'italic' }}>@APEXSUPPLEMENTS</span>
            </span>
            <h1
              className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6 uppercase"
              style={{
                fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
                fontWeight: 800,
                letterSpacing: '2px',
              }}
            >
              NUTRITIONAL SUPPLEMENTS
            </h1>
            <p
              className="text-sm text-gray-700 mb-8"
              style={{
                fontFamily: 'Open Sans, Arial, Helvetica, sans-serif',
                fontWeight: 400,
              }}
            >
              
              Apex is a protein shop located in Kosovo and operating also in Albania. We offer nutritional supplements for all athletes. Our company aims for high quality and supports athletes. Apex has exclusivity for the best brands in the Kosovo and Albanian market.
            </p>
            <div className="flex gap-4">
             
              <button
                className="px-5 py-2 bg-white text-black font-extrabold italic rounded-none shadow hover:bg-gray-100 border border-black transition text-base uppercase"
                style={{
                  fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
                  letterSpacing: '1px',
                  fontWeight: 800,
                  fontStyle: 'italic',
                  borderWidth: '2px',
                }}
                onClick={() => {
                  const dealsSection = document.getElementById('weekly-deals');
                  if (dealsSection) {
                    dealsSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                ON SALE
              </button>
            </div>
          </div>
          
          <div className="md:w-1/2 w-full flex justify-center items-center mt-12 md:mt-0 relative">
            <img
              src="https://vitafit-ks.com/wp-content/webp-express/webp-images/uploads/2025/02/Untitled-2.png.webp"
              alt="Apex Top Seller"
              className="w-[28rem] h-[28rem] object-contain drop-shadow-xl"
            />
            {/* Badge për Top Seller */}
            <div className="absolute top-6 left-6">
              <span
                className="bg-yellow-400 text-red-700 font-extrabold px-4 py-2 rounded-full shadow-lg border-2 border-yellow-600 text-lg uppercase"
                style={{
                  fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
                  letterSpacing: '1px',
                  fontWeight: 800,
                }}
              >
                TOP SELLER
              </span>
            </div>
          </div>
        </section>
       
        <section className="w-full flex flex-col md:flex-row items-center justify-center py-12 px-4"
          style={{
            background: 'linear-gradient(120deg, #ff4d00 0%, #ff7c1c 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          
          <div className="md:w-1/2 w-full flex justify-center items-center mb-8 md:mb-0 gap-4">
            <img
              src="https://www.preworkout.org/wp-content/uploads/2022/05/C4-Preworkout-720x760.jpg"
              alt="C4 Pre Workout"
              className="w-64 h-64 object-cover drop-shadow-2xl bg-transparent"
              style={{ background: 'transparent' }}
            />
            <img
              src="https://c4preworkout.com/images/c4-ultimate-pre-workout-powder-sugar-free-preworkout-energy-supplement-for-men-women.webp"
              alt="C4 Ultimate Pre Workout"
              className="w-64 h-64 object-cover drop-shadow-2xl bg-transparent"
              style={{ background: 'transparent' }}
            />
          </div>
          
          <div className="md:w-1/2 w-full flex flex-col items-center md:items-start justify-center text-center md:text-left">
            <h2
              className="text-4xl md:text-5xl font-extrabold uppercase text-white mb-6"
              style={{
                fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
                letterSpacing: '2px',
              }}
            >
              GET THE ENERGY<br />THAT YOU NEED!
            </h2>
            <p
              className="text-lg md:text-xl font-bold uppercase text-white mb-6"
              style={{
                fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
                letterSpacing: '1px',
              }}
            >
              C4 pre workouts, with many flavours and a lot of energy.
            </p>
            <span
              className="text-lg font-bold text-white mb-8"
              style={{
                fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
                letterSpacing: '2px',
              }}
            >
              APEX
            </span>
          </div>
        </section>
       
        <section
          id="weekly-deals"
          className="w-full max-w-7xl mx-auto px-4 py-16"
        >
          <h2
            className="text-3xl md:text-4xl font-extrabold uppercase mb-10 text-gray-900"
            style={{
              fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
              letterSpacing: '2px',
            }}
          >
            Weekly Deals!!
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-8">
            
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-blue-100">
              <img
                src="https://a1protein.com/wp-content/uploads/2021/12/KL-Gold-Whey-Protein-2-kg.jpg"
                alt="Whey Gold Protein"
                className="w-32 h-32 object-contain rounded-xl mb-4"
              />
              <h3
                className="text-xl font-extrabold uppercase text-gray-900 mb-2 text-center"
                style={{
                  fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
                  letterSpacing: '1px',
                }}
              >
                Whey Gold Protein
              </h3>
              <div
                className="text-lg font-bold text-blue-700 mb-4"
                style={{
                  fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
                }}
              >
                €39.99
              </div>
             
              <button
                className="px-5 py-2 bg-black text-white font-extrabold italic rounded-none shadow hover:bg-blue-900 transition text-base uppercase"
                style={{
                  fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
                  letterSpacing: '1px',
                  fontWeight: 800,
                  fontStyle: 'italic',
                  borderWidth: '2px',
                }}
                onClick={() => addToCart({ id: 1, name: 'Whey Gold Protein', price: 39.99 })}
              >
                Add to Cart
              </button>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-blue-100">
              <img
                src="https://www.preworkout.org/wp-content/uploads/2022/05/C4-Preworkout-720x760.jpg"
                alt="C4 Pre Workout"
                className="w-32 h-32 object-contain rounded-xl mb-4"
              />
              <h3
                className="text-xl font-extrabold uppercase text-gray-900 mb-2 text-center"
                style={{
                  fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
                  letterSpacing: '1px',
                }}
              >
                C4 Pre Workout
              </h3>
              <div
                className="text-lg font-bold text-blue-700 mb-4"
                style={{
                  fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
                }}
              >
                €29.99
              </div>
              <button
                className="px-5 py-2 bg-black text-white font-extrabold italic rounded-none shadow hover:bg-blue-900 transition text-base uppercase"
                style={{
                  fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
                  letterSpacing: '1px',
                  fontWeight: 800,
                  fontStyle: 'italic',
                  borderWidth: '2px',
                }}
                onClick={() => addToCart({ id: 2, name: 'C4 Pre Workout', price: 29.99 })}
              >
                Add to Cart
              </button>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-blue-100">
              <img
                src="https://images.bauerhosting.com/affiliates/sites/9/2024/08/amino-5.jpg?auto=format&w=480&q=80"
                alt="Amino Acidet"
                className="w-32 h-32 object-contain rounded-xl mb-4"
              />
              <h3
                className="text-xl font-extrabold uppercase text-gray-900 mb-2 text-center"
                style={{
                  fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
                  letterSpacing: '1px',
                }}
              >
                Amino Acidet
              </h3>
              <div
                className="text-lg font-bold text-blue-700 mb-4"
                style={{
                  fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
                }}
              >
                €19.99
              </div>
              <button
                className="px-5 py-2 bg-black text-white font-extrabold italic rounded-none shadow hover:bg-blue-900 transition text-base uppercase"
                style={{
                  fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
                  letterSpacing: '1px',
                  fontWeight: 800,
                  fontStyle: 'italic',
                  borderWidth: '2px',
                }}
                onClick={() => addToCart({ id: 3, name: 'Amino Acidet', price: 19.99 })}
              >
                Add to Cart
              </button>
            </div>
          </div>
          
          <div className="flex justify-center">
            <a
              href="/products"
              className="px-6 py-3 bg-black text-white font-extrabold italic rounded-none shadow hover:bg-gray-900 transition text-base uppercase"
              style={{
                fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
                letterSpacing: '1px',
                fontWeight: 800,
                fontStyle: 'italic',
                borderWidth: '2px',
                display: 'inline-block',
              }}
            >
              Look all the products!
            </a>
          </div>
        </section>
        
        <section className="w-full max-w-3xl mx-auto my-24 flex flex-col gap-16 items-center">
          <Link
            href="/why-choose-us"
            className="text-2xl md:text-3xl font-extrabold text-black hover:text-orange-500 transition uppercase tracking-wide text-center"
            style={{ fontFamily: 'Montserrat, Arial, Helvetica, sans-serif', letterSpacing: '2px' }}
          >
            WHY CHOOSE US?
          </Link>
          <Link
            href="/customer-reviews"
            className="text-2xl md:text-3xl font-extrabold text-black hover:text-orange-500 transition uppercase tracking-wide text-center"
            style={{ fontFamily: 'Montserrat, Arial, Helvetica, sans-serif', letterSpacing: '2px' }}
          >
            CUSTOMER REVIEWS
          </Link>
          <Link
            href="/fitness-tips"
            className="text-2xl md:text-3xl font-extrabold text-black hover:text-orange-500 transition uppercase tracking-wide text-center"
            style={{ fontFamily: 'Montserrat, Arial, Helvetica, sans-serif', letterSpacing: '2px' }}
          >
            FITNESS TIPS
          </Link>
        </section>
        
        <section className="w-full py-16 flex flex-col items-center justify-center bg-gradient-to-r from-orange-500 via-orange-400 to-orange-500">
          <h2
            className="text-3xl md:text-4xl font-extrabold uppercase text-white mb-8 text-center"
            style={{
              fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
              letterSpacing: '2px',
            }}
          >
            Shop Now and Start Your Fitness Journey!
          </h2>
          <a
            href="/products"
            className="px-10 py-4 bg-black text-white font-extrabold italic rounded-none shadow hover:bg-gray-900 transition text-lg uppercase"
            style={{
              fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
              letterSpacing: '1px',
              fontWeight: 800,
              fontStyle: 'italic',
              borderWidth: '2px',
              display: 'inline-block',
            }}
          >
            Shop Now
          </a>
        </section>
      </main>
      <Footer />
    </div>
  );
}
