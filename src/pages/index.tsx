// This file renders the Home page from home.tsx
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      {/* Google Fonts import for Montserrat and Open Sans */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css?family=Montserrat:800,700,400&display=swap');
        @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,500,600&display=swap');
      `}</style>
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center">
        {/* Hero Section */}
        <section className="w-full flex flex-col md:flex-row items-center justify-center px-4 py-16 max-w-7xl mx-auto">
          {/* Left: Text */}
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
              SHTESA USHQIMORE
            </h1>
            <p
              className="text-sm text-gray-700 mb-8"
              style={{
                fontFamily: 'Open Sans, Arial, Helvetica, sans-serif',
                fontWeight: 400,
              }}
            >
              Apex është protein shop me lokacion në Kosovë dhe veprimtari edhe në Shqipëri. Ne ofrojmë shtesa ushqimore për të gjithë sportistët. Kompania jonë ka synim kualitetin e lartë dhe mbështetjen e sportistëve. Apex ka ekskluzivitet për brendet më të mira në tregun e Kosovës dhe Shqipërisë.
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
              >
                NE ZBRITJE
              </button>
              {/* PRODUKTET button removed */}
            </div>
          </div>
          {/* Right: Product Image */}
          <div className="md:w-1/2 w-full flex justify-center items-center mt-12 md:mt-0 relative">
            <img
              src="https://vitafit-ks.com/wp-content/webp-express/webp-images/uploads/2025/02/Untitled-2.png.webp"
              alt="Apex Top Seller"
              className="w-[28rem] h-[28rem] object-contain drop-shadow-xl"
            />
            {/* Top Seller Badge */}
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
        {/* Energy Banner Section */}
        <section className="w-full flex flex-col md:flex-row items-center justify-center py-12 px-4"
          style={{
            background: 'linear-gradient(120deg, #ff4d00 0%, #ff7c1c 100%)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Left: Product Image */}
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
          {/* Right: Text */}
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
            {/* Remove the button below */}
            {/* <a ...>Shiko të gjitha produktet</a> */}
          </div>
        </section>
        {/* Products Section */}
        <section className="w-full max-w-7xl mx-auto px-4 py-16">
          <h2
            className="text-3xl md:text-4xl font-extrabold uppercase mb-10 text-gray-900"
            style={{
              fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
              letterSpacing: '2px',
            }}
          >
            PRODUKTET TONA
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-8">
            {[
              {
                name: 'Whey Gold Protein',
                img: 'https://a1protein.com/wp-content/uploads/2021/12/KL-Gold-Whey-Protein-2-kg.jpg',
                price: '€39.99',
              },
              {
                name: 'C4 Pre Workout',
                img: 'https://www.preworkout.org/wp-content/uploads/2022/05/C4-Preworkout-720x760.jpg',
                price: '€29.99',
              },
              {
                name: 'Amino Acidet',
                img: 'https://images.bauerhosting.com/affiliates/sites/9/2024/08/amino-5.jpg?auto=format&w=480&q=80',
                price: '€19.99',
              },
            ].map((product) => (
              <div
                key={product.name}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-blue-100"
              >
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-32 h-32 object-contain rounded-xl mb-4"
                />
                <h3
                  className="text-xl font-extrabold uppercase text-gray-900 mb-2 text-center"
                  style={{
                    fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
                    letterSpacing: '1px',
                  }}
                >
                  {product.name}
                </h3>
                <div
                  className="text-lg font-bold text-blue-700 mb-4"
                  style={{
                    fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
                  }}
                >
                  {product.price}
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
                >
                  Add to Cart
                </button>
              </div>
            ))}
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
              Shiko të gjitha produktet
            </a>
          </div>
        </section>
      </main>

      {/* Weekly Deals Section */}
      <section className="w-full max-w-7xl mx-auto px-4 py-16">
        <h2
          className="text-3xl md:text-4xl font-extrabold uppercase mb-10 text-gray-900"
          style={{
            fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
            letterSpacing: '2px',
          }}
        >
          Weekly Deals
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/*
            {
              name: 'Creatine Monohydrate',
              img: 'https://vitafit-ks.com/wp-content/webp-express/webp-images/uploads/2025/02/Untitled-2.png.webp',
              price: '€19.99',
              deal: '20% OFF',
              link: '/products/creatine',
            },
            {
              name: 'BCAA Complex',
              img: 'https://www.trufit.eu/media/adjconfigurable/1100/copyright-www.trufit.eu-1100-cellucor-c4-ultimate-40serv.png',
              price: '€16.99',
              deal: 'Best Seller',
              link: '/products/bcaa',
            },
            {
              name: 'Multivitamin',
              img: 'https://images.unsplash.com/photo-1517960413843-0aee8e2d7e58?auto=format&fit=crop&w=600&q=80',
              price: '€11.99',
              deal: 'Limited Time',
              link: '/products/multivitamin',
            },
          */}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="w-full max-w-5xl mx-auto px-4 py-16" id="why-choose-us">
        <h2
          className="text-3xl font-extrabold uppercase mb-8 text-gray-900 text-center"
          style={{
            fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
            letterSpacing: '2px',
          }}
        >
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {/*
            {
              icon: (
                <svg className="mx-auto mb-3" width="32" height="32" fill="none" stroke="#ff7c1c" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12h18M3 12l4-4m-4 4l4 4"></path></svg>
              ),
              label: 'Fast Shipping',
              link: '/info/shipping',
            },
            {
              icon: (
                <svg className="mx-auto mb-3" width="32" height="32" fill="none" stroke="#ff7c1c" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 16v-4"></path><path d="M12 8h.01"></path></svg>
              ),
              label: 'Secure Payments',
              link: '/info/payments',
            },
            {
              icon: (
                <svg className="mx-auto mb-3" width="32" height="32" fill="none" stroke="#ff7c1c" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
              ),
              label: 'Authentic Products',
              link: '/info/authenticity',
            },
            {
              icon: (
                <svg className="mx-auto mb-3" width="32" height="32" fill="none" stroke="#ff7c1c" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><path d="M12 8v4l3 3"></path></svg>
              ),
              label: '24/7 Support',
              link: '/contact',
            },
          */}
        </div>
        <style>{`
          @keyframes fade-in {
            0% { opacity: 0; transform: translateY(20px);}
            100% { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in {
            animation: fade-in 0.7s both;
          }
        `}</style>
      </section>

      {/* Customer Reviews Section */}
      <section className="w-full max-w-5xl mx-auto px-4 py-16" id="reviews">
        <h2
          className="text-3xl font-extrabold uppercase mb-8 text-gray-900 text-center"
          style={{
            fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
            letterSpacing: '2px',
          }}
        >
          Customer Reviews
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/*
            {
              name: 'Arber K.',
              img: 'https://randomuser.me/api/portraits/men/32.jpg',
              review: 'Produktet janë super cilësore dhe dërgesa shumë e shpejtë!',
            },
            {
              name: 'Elira S.',
              img: 'https://randomuser.me/api/portraits/women/44.jpg',
              review: 'Jam shumë e kënaqur me shërbimin dhe suplementet që mora.',
            },
            {
              name: 'Gent R.',
              img: 'https://randomuser.me/api/portraits/men/65.jpg',
              review: 'Apex është zgjedhja ime për çdo suplement sportiv!',
            },
          */}
        </div>
      </section>

      {/* Fitness Tips Blog Preview Section */}
      <section className="w-full max-w-5xl mx-auto px-4 py-16" id="fitness-tips">
        <h2
          className="text-3xl font-extrabold uppercase mb-8 text-gray-900 text-center"
          style={{
            fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
            letterSpacing: '2px',
          }}
        >
          Fitness Tips
        </h2>
        <div className="flex flex-wrap gap-8 justify-center">
          {/*
            {
              title: '5 Ways to Boost Your Workout',
              text: 'Discover simple strategies to maximize your gym results and stay motivated every day.',
              link: '/blog/boost-workout',
            },
            {
              title: 'Protein: How Much Do You Need?',
              text: 'Learn how to calculate your daily protein needs for muscle growth and recovery.',
              link: '/blog/protein-needs',
            },
            {
              title: 'Hydration for Athletes',
              text: 'Why water and electrolytes matter for performance and how to stay hydrated.',
              link: '/blog/hydration-athletes',
            },
          */}
        </div>
        <style>{`
          .animate-fade-in {
            animation: fade-in 0.7s both;
          }
        `}</style>
      </section>

      {/* Final Call to Action Section */}
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

      {/* Simple Footer */}
      <Footer />
    </div>
  );
}
