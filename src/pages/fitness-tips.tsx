// This file renders the Home page from home.tsx
import Header from '../components/Header';
import Footer from '../components/Footer';

const fontMontserrat = { fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' };

export default function FitnessTips() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css?family=Montserrat:800,700,400&display=swap');
        @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,500,600&display=swap');
      `}</style>
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        <section className="w-full max-w-3xl space-y-8">
          <h1 className="text-3xl font-extrabold uppercase mb-8 text-blue-900 text-center" style={{ ...fontMontserrat, letterSpacing: '2px' }}>
            Fitness Tips
          </h1>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
            <h2 className="font-bold text-xl mb-2" style={fontMontserrat}>5 Ways to Boost Your Workout</h2>
            <ul className="list-disc ml-6 text-gray-700" style={fontMontserrat}>
              <li>Set clear goals for every session.</li>
              <li>Warm up properly to prevent injuries.</li>
              <li>Focus on form, not just weight or reps.</li>
              <li>Stay hydrated and fuel your body with the right nutrition.</li>
              <li>Track your progress and celebrate small wins!</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
            <h2 className="font-bold text-xl mb-2" style={fontMontserrat}>Protein: How Much Do You Need?</h2>
            <p className="text-gray-700 mb-2" style={fontMontserrat}>
              Most athletes need about 1.2-2.2g of protein per kg of body weight daily. Spread your intake throughout the day for optimal muscle growth and recovery.
            </p>
            <div className="bg-orange-50 border-l-4 border-orange-400 p-3 rounded text-orange-900 font-semibold" style={fontMontserrat}>
              Tip: Try a protein shake after your workout for faster recovery!
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
            <h2 className="font-bold text-xl mb-2" style={fontMontserrat}>Hydration for Athletes</h2>
            <p className="text-gray-700 mb-2" style={fontMontserrat}>
              Hydration is key for performance and recovery. Drink water before, during, and after exercise. For intense workouts, consider an electrolyte drink.
            </p>
            <div className="bg-orange-50 border-l-4 border-orange-400 p-3 rounded text-orange-900 font-semibold" style={fontMontserrat}>
              Don’t wait until you’re already dehydrated—sip water regularly!
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
            <h2 className="font-bold text-xl mb-2" style={fontMontserrat}>Bonus: Stay Consistent!</h2>
            <p className="text-gray-700 mb-2" style={fontMontserrat}>
              Consistency beats intensity. Build healthy habits and your future self will thank you!
            </p>
            <div className="font-semibold text-blue-900" style={fontMontserrat}>
              <span role="img" aria-label="motivation">🔥</span> Motivation: “Success is the sum of small efforts, repeated day in and day out.”
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}