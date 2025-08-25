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
              <button
                className="px-5 py-2 bg-black text-white font-extrabold italic rounded-none shadow hover:bg-gray-900 transition text-base uppercase"
                style={{
                  fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
                  letterSpacing: '1px',
                  fontWeight: 800,
                  fontStyle: 'italic',
                  borderWidth: '2px',
                  borderColor: 'black',
                }}
              >
                PRODUKTET
              </button>
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
              className="text-lg font-bold text-white"
              style={{
                fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
                letterSpacing: '2px',
              }}
            >
              {/* Replace with your logo if needed */}
              APEX
            </span>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
