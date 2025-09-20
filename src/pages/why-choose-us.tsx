import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { useRouter } from 'next/router';

const fontMontserrat = { fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' };

export default function WhyChooseUs() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        <h1
          className="text-4xl font-extrabold uppercase mb-6 text-blue-900 text-center"
          style={{ ...fontMontserrat, letterSpacing: '2px' }}
        >
          Why Choose Apex?
        </h1>
        <p
          className="max-w-2xl text-lg text-gray-700 text-center mb-10"
          style={fontMontserrat}
        >
          Discover what makes Apex Supplements the best choice for your fitness journey. We combine quality, trust, and innovation to help you reach your goals faster and safer!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 border-l-8 border-blue-400 flex flex-col items-center">
            <span className="text-5xl mb-4">🔬</span>
            <h2 className="text-2xl font-bold mb-2 text-blue-900" style={fontMontserrat}>
              Science-Backed Formulas
            </h2>
            <p className="text-gray-700 text-center" style={fontMontserrat}>
              All our supplements are developed with the latest scientific research and tested for purity and effectiveness.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 border-l-8 border-orange-400 flex flex-col items-center">
            <span className="text-5xl mb-4">🚚</span>
            <h2 className="text-2xl font-bold mb-2 text-orange-600" style={fontMontserrat}>
              Fast & Reliable Delivery
            </h2>
            <p className="text-gray-700 text-center" style={fontMontserrat}>
              Get your products quickly and safely, wherever you are in Kosovo or Albania. We guarantee fast shipping!
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 border-l-8 border-green-400 flex flex-col items-center">
            <span className="text-5xl mb-4">🤝</span>
            <h2 className="text-2xl font-bold mb-2 text-green-700" style={fontMontserrat}>
              Trusted by Athletes
            </h2>
            <p className="text-gray-700 text-center" style={fontMontserrat}>
              Our products are recommended by trainers and used by top athletes. Join the Apex community and feel the difference!
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-xl p-8 border-l-8 border-purple-400 flex flex-col items-center">
            <span className="text-5xl mb-4">💬</span>
            <h2 className="text-2xl font-bold mb-2 text-purple-700" style={fontMontserrat}>
              Expert Support 24/7
            </h2>
            <p className="text-gray-700 text-center" style={fontMontserrat}>
              Need advice? Our team is always ready to help you choose the right supplement and answer your questions.
            </p>
          </div>
        </div>
        <div className="mt-14 text-center">
          <button
            className="inline-block bg-orange-100 text-orange-700 font-bold px-6 py-3 rounded-full text-lg
              hover:bg-orange-500 hover:text-white hover:scale-105 transition duration-200 shadow-md active:scale-95"
            onClick={() => router.push('/register')}
          >
            Join the Apex Family Today!
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}