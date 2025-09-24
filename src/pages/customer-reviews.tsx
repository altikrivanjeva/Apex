import Header from '../components/Header';
import Footer from '../components/Footer';

const fontMontserrat = { fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' };

export default function CustomerReviews({ reviews }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        <h1 className="text-4xl font-extrabold uppercase mb-8 text-blue-900" style={{ ...fontMontserrat, letterSpacing: '2px' }}>
          Customer Reviews
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-blue-100">
              {/* No profile image */}
              <h3 className="font-bold text-lg mb-2" style={fontMontserrat}>{review.name}</h3>
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

export async function getStaticProps() {
  // 3 persona pa foto profili
  const reviews = [
    {
      id: 1,
      name: "Arta Krasniqi",
      text: "Jam shumë e kënaqur me shërbimin dhe produktet e Apex! Porosia ime arriti shumë shpejt dhe gjithçka ishte siç pritej.",
    },
    {
      id: 2,
      name: "Blerim Gashi",
      text: "Stafi është shumë profesional dhe i gatshëm të ndihmojë. Produktet janë të cilësisë së lartë. Do të porosis përsëri!",
    },
    {
      id: 3,
      name: "Elira Berisha",
      text: "Çmimet janë shumë të mira dhe kam marrë këshilla të dobishme për suplementet që më përshtaten. Rekomandoj Apex për të gjithë!",
    },
  ];
  return {
    props: { reviews },
    revalidate: 60,
  };
}