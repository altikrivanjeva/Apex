// Kjo faqe shfaq vlerësimet dhe komentet e klientëve për Apex Supplements.
// Përdor getStaticProps për të marrë listën e komenteve në build time ose çdo 60 sekonda (ISR).

import Header from '../components/Header';
import Footer from '../components/Footer';

// Definimi i fontit për stilizim të tekstit
const fontMontserrat = { fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' };

export default function CustomerReviews({ reviews }) {
  return (
    // Kontejneri kryesor me sfond të lehtë
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <Header />
      {/* Main përmban titullin dhe grid-in me komentet */}
      <main className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        <h1 className="text-4xl font-extrabold uppercase mb-8 text-blue-900" style={{ ...fontMontserrat, letterSpacing: '2px' }}>
          Customer Reviews
        </h1>
        {/* Grid me komentet e klientëve */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-blue-100">
              {/* Emri i klientit */}
              <h3 className="font-bold text-lg mb-2" style={fontMontserrat}>{review.name}</h3>
              {/* Komenti i klientit */}
              <p className="text-gray-700 text-center" style={fontMontserrat}>
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Funksioni getStaticProps për të marrë komentet në build ose çdo 60 sekonda
export async function getStaticProps() {
  // 3 persona pa foto profili
  const reviews = [
    {
      id: 1,
      name: "Festa Qoqaj",
      text: "Jam shumë e kënaqur me shërbimin dhe produktet e Apex! Porosia ime arriti shumë shpejt dhe gjithçka ishte siç pritej.",
    },
    {
      id: 2,
      name: "Blerim Destani",
      text: "Stafi është shumë profesional dhe i gatshëm të ndihmojë. Produktet janë të cilësisë së lartë. Do të porosis përsëri!",
    },
    {
      id: 3,
      name: "Shpetim Desku",
      text: "Çmimet janë shumë të mira dhe kam marrë këshilla të dobishme për suplementet që më përshtaten. Rekomandoj Apex për të gjithë!",
    },
  ];
  return {
    props: { reviews },
    revalidate: 60,
  };
}