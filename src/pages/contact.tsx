import Header from '../components/Header';
import Footer from '../components/Footer';
import { useState } from 'react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    setSuccess(false);
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (res.ok) {
      setStatus('Mesazhi u dërgua me sukses!');
      setForm({ name: '', email: '', message: '' });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000); // konfeti për 3 sekonda
    } else {
      setStatus('Gabim gjatë dërgimit të mesazhit.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{
      background: 'linear-gradient(135deg, #0f2027 0%, #2c5364 100%)',
    }}>
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-white tracking-tight drop-shadow-lg">
          Contact Us
        </h1>
        <p className="mb-8 text-xl text-blue-200 font-medium text-center max-w-2xl drop-shadow">
          Have questions about our products or your order? Reach out and our team will help you achieve your fitness goals!
        </p>
        {success && (
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
            <div className="animate-bounce text-6xl text-yellow-400 font-bold bg-white/80 rounded-full px-8 py-4 shadow-2xl border-4 border-yellow-300">
              💪
            </div>
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-12 w-full max-w-5xl">
          <form
            className="flex-1 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-10 flex flex-col gap-6 border border-blue-400/30"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="name"
              placeholder="Name & Surname"
              value={form.name}
              onChange={handleChange}
              required
              className="border border-blue-400/40 bg-white/20 text-white placeholder-blue-200 p-4 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 focus:border-green-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="border border-blue-400/40 bg-white/20 text-white placeholder-blue-200 p-4 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 focus:border-green-400"
            />
            <textarea
              name="message"
              placeholder="Your message"
              value={form.message}
              onChange={handleChange}
              required
              className="border border-blue-400/40 bg-white/20 text-white placeholder-blue-200 p-4 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 focus:border-green-400"
              rows={6}
            />
            <button
              type="submit"
              className="px-8 py-4 bg-blue-700/80 text-white rounded-xl font-bold text-lg hover:bg-blue-800 transition shadow-lg flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <span className="animate-spin mr-2 w-5 h-5 border-2 border-t-2 border-white border-t-blue-400 rounded-full"></span>
              ) : (
                'Send'
              )}
            </button>
            {status && (
              <p className={`mt-2 font-semibold ${success ? 'text-green-400 bg-white/30 rounded-xl px-4 py-2' : 'text-blue-300'}`}>
                {status}
              </p>
            )}
          </form>
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full border border-blue-400/30 mb-8">
              <h2 className="text-2xl font-bold text-blue-200 mb-2">
                Contact Info
              </h2>
              <p className="text-lg text-blue-100 font-medium mb-2">
                <span className="font-bold text-white">Phone:</span> +1 (555) 123-4567
              </p>
              <p className="text-lg text-blue-100 font-medium">
                <span className="font-bold text-white">Email:</span> support@apexsupplements.com
              </p>
            </div>
            <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden border-2 border-blue-400/40 shadow-2xl">
              <iframe
                title="Company Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2931.242370226019!2d21.1737906!3d42.6497918!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13549fd2d0f7bbd5%3A0x877c0f7bcdb6d39e!2sFlex%20Gym!5e0!3m2!1sen!2s!4v1692812345678!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'brightness(0.8)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="mt-6 text-center">
              <h2 className="text-xl font-bold text-blue-200 mb-1">
                Our Address
              </h2>
              <p className="text-lg text-blue-100 font-medium">Apex Supplements , Prishtinë</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}