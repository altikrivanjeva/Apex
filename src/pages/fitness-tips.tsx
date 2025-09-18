import Header from '../components/Header';
import Footer from '../components/Footer';

const fontMontserrat = { fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' };

export default function FitnessTips() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        <h1 className="text-4xl font-extrabold uppercase mb-8 text-blue-900" style={{ ...fontMontserrat, letterSpacing: '2px' }}>
          Fitness Tips
        </h1>
        <div className="max-w-3xl space-y-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
            <h2 className="font-bold text-xl mb-2" style={fontMontserrat}>5 Ways to Boost Your Workout</h2>
            <ul className="list-disc pl-6 text-gray-700" style={fontMontserrat}>
              <li>Set clear, realistic goals for every session.</li>
              <li>Warm up properly to prevent injuries.</li>
              <li>Focus on form, not just weight or reps.</li>
              <li>Stay hydrated and fuel your body with the right nutrition.</li>
              <li>Track your progress and celebrate small wins!</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
            <h2 className="font-bold text-xl mb-2" style={fontMontserrat}>Protein: How Much Do You Need?</h2>
            <p className="text-gray-700 mb-2" style={fontMontserrat}>
              Most athletes need 1.6–2.2g of protein per kg of body weight daily. Spread your intake throughout the day for optimal muscle growth and recovery.
            </p>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded text-blue-900 font-semibold" style={fontMontserrat}>
              <span role="img" aria-label="tip">💡</span> Tip: Add a protein shake after your workout for faster recovery!
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
            <h2 className="font-bold text-xl mb-2" style={fontMontserrat}>Hydration for Athletes</h2>
            <p className="text-gray-700 mb-2" style={fontMontserrat}>
              Dehydration can reduce performance and slow recovery. Drink water before, during, and after exercise. For intense workouts, consider an electrolyte drink.
            </p>
            <div className="bg-orange-50 border-l-4 border-orange-400 p-3 rounded text-orange-900 font-semibold" style={fontMontserrat}>
              <span role="img" aria-label="water">🚰</span> Pro Tip: If you feel thirsty, you're already dehydrated—sip water regularly!
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-blue-100">
            <h2 className="font-bold text-xl mb-2" style={fontMontserrat}>Bonus: Stay Consistent!</h2>
            <p className="text-gray-700 mb-2" style={fontMontserrat}>
              The best results come from consistency, not perfection. Even on tough days, do something active—your future self will thank you!
            </p>
            <div className="bg-green-50 border-l-4 border-green-400 p-3 rounded text-green-900 font-semibold" style={fontMontserrat}>
              <span role="img" aria-label="motivation">🔥</span> Motivation: “Success is the sum of small efforts, repeated day in and day out.”
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}