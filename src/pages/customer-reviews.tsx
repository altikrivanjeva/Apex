import Header from '../components/Header';
import Footer from '../components/Footer';

const fontMontserrat = { fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' };

export default function CustomerReviews() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        <h1 className="text-4xl font-extrabold uppercase mb-8 text-blue-900" style={{ ...fontMontserrat, letterSpacing: '2px' }}>
          Customer Reviews
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-blue-100">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Arber K." className="w-20 h-20 rounded-full mb-4" />
            <h3 className="font-bold text-lg mb-2" style={fontMontserrat}>Arber K.</h3>
            <p className="text-gray-700 text-center" style={fontMontserrat}>
              The products are top quality and the delivery was very fast!
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-blue-100">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Elira S." className="w-20 h-20 rounded-full mb-4" />
            <h3 className="font-bold text-lg mb-2" style={fontMontserrat}>Elira S.</h3>
            <p className="text-gray-700 text-center" style={fontMontserrat}>
              I am very satisfied with the service and the supplements I received.
            </p>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-blue-100">
            <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="Gent R." className="w-20 h-20 rounded-full mb-4" />
            <h3 className="font-bold text-lg mb-2" style={fontMontserrat}>Gent R.</h3>
            <p className="text-gray-700 text-center" style={fontMontserrat}>
              Apex is my go-to choice for every sports supplement!
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}