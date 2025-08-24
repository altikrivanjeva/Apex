import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState, useEffect } from 'react';

const slides = [
  {
    img: 'https://images.unsplash.com/photo-1704650311481-a3cd10c5b3fb?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    caption: 'Whey Gold Protein: Build & Recover',
  },
  {
    img: 'https://www.preworkout.org/wp-content/uploads/2022/05/C4-Preworkout-720x760.jpg',
    caption: 'Pre Workout: Ignite Your Energy',
  },
  {
    img: 'https://images.bauerhosting.com/affiliates/sites/9/2024/08/amino-5.jpg?auto=format&w=480&q=80',
    caption: 'Amino Acids: Essential for Growth',
  },
];

const sections = [
  {
    img: 'https://images.unsplash.com/photo-1532029837206-abbe2b7620e3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Our Mission',
    text: 'Empowering athletes and fitness enthusiasts to reach their full potential with clean, effective supplements. We believe in transparency, quality, and results.',
    reverse: false,
  },
  {
    img: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb3RlaW58ZW58MHx8MHx8fDA%3D',
    title: 'Innovation & Science',
    text: 'Our formulas are developed by experts and backed by the latest research. Every product is rigorously tested for purity and potency.',
    reverse: true,
  },
  {
    img: 'https://staticg.sportskeeda.com/editor/2022/10/e7d4c-16661008432576-1920.jpg?w=1200',
    title: 'Community & Support',
    text: 'Join a global community of athletes who trust Apex. Our support team is here to guide you on your journey, every step of the way.',
    reverse: false,
  },
];

export default function About() {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);

  // Slideshow interval & fade
  useEffect(() => {
    setFade(true);
    const timer = setTimeout(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((current + 1) % slides.length);
        setFade(true);
      }, 600); // fade duration
    }, 6000); // slide interval
    return () => clearTimeout(timer);
  }, [current]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'linear-gradient(135deg, #0f2027 0%, #2c5364 100%)' }}>
      <Header />
      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center py-16" style={{ background: 'rgba(44, 83, 100, 0.95)' }}>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white tracking-tight drop-shadow-lg" style={{ fontFamily: 'Oswald, Arial, Helvetica, sans-serif' }}>
          About Apex Supplements
        </h1>
        <p className="mb-8 text-xl text-blue-200 font-medium text-center max-w-2xl drop-shadow">
          Fuel your ambition. Transform your results. Discover the Apex difference.
        </p>
        {/* Slideshow */}
        <div className="w-full max-w-2xl mb-12">
          <div className="relative rounded-2xl overflow-hidden shadow-xl flex items-center justify-center bg-transparent" style={{ height: '20rem', width: '100%' }}>
            <img
              src={slides[current].img}
              alt={slides[current].caption}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${fade ? 'opacity-100' : 'opacity-0'}`}
              style={{ borderRadius: '1.2rem', boxShadow: '0 4px 32px 0 rgba(44,83,100,0.18)' }}
            />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-6 py-3"
              style={{
                background: 'rgba(255,255,255,0.25)',
                backdropFilter: 'blur(8px)',
                borderRadius: '1rem',
                boxShadow: '0 2px 12px 0 rgba(44,83,100,0.12)',
                minWidth: '220px',
              }}>
              <span className="text-blue-900 text-lg md:text-xl font-bold drop-shadow text-center block">{slides[current].caption}</span>
            </div>
          </div>
          <div className="flex justify-center mt-6 gap-4">
            {slides.map((_, idx) => (
              <button
                key={idx}
                className={`w-5 h-5 rounded-full border-2 ${idx === current ? 'bg-blue-600 border-blue-800 scale-110' : 'bg-blue-200 border-blue-300'} transition-transform duration-200`}
                onClick={() => setCurrent(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                style={{ outline: 'none' }}
              />
            ))}
          </div>
        </div>
      </section>
      {/* Alternating Sections */}
      <main className="flex-1 flex flex-col gap-16 px-4 py-12" style={{ background: '#f8f5f2' }}>
        {sections.map((section, idx) => (
          <section
            key={idx}
            className={`flex flex-col md:flex-row items-center justify-center max-w-5xl mx-auto ${section.reverse ? 'md:flex-row-reverse' : ''}`}
          >
            <div className="md:w-1/2 w-full flex justify-center">
              <img
                src={section.img}
                alt={section.title}
                className="rounded-2xl shadow-xl w-full h-64 object-cover"
                style={{ maxWidth: '400px', filter: 'brightness(0.95)' }}
              />
            </div>
            <div className="md:w-1/2 w-full mt-8 md:mt-0 px-6">
              <h2 className="text-3xl font-bold text-blue-900 mb-4" style={{ fontFamily: 'Oswald, Arial, Helvetica, sans-serif' }}>
                {section.title}
              </h2>
              <p className="text-lg text-gray-700 font-medium">{section.text}</p>
            </div>
          </section>
        ))}
        {/* Why Choose Us */}
        <section className="bg-white/60 backdrop-blur-lg rounded-2xl shadow-xl p-8 max-w-3xl mx-auto border border-blue-400/30 text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-4" style={{ fontFamily: 'Oswald, Arial, Helvetica, sans-serif' }}>
            Why Choose Us?
          </h2>
          <ul className="text-lg text-gray-700 font-medium space-y-2">
            <li>✔️ Science-backed formulas</li>
            <li>✔️ Transparent ingredient sourcing</li>
            <li>✔️ Trusted by athletes and trainers</li>
            <li>✔️ Fast, friendly customer support</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}