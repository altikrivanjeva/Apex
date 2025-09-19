import { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const fontMontserrat = { fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' };

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setSuccess(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-16 px-4">
        <h1 className="text-4xl font-extrabold uppercase mb-8 text-blue-900" style={fontMontserrat}>
          Contact Us
        </h1>
        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 max-w-lg w-full flex flex-col gap-4 border border-blue-100">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="border rounded px-4 py-2"
            style={fontMontserrat}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            required
            className="border rounded px-4 py-2"
            style={fontMontserrat}
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            required
            className="border rounded px-4 py-2 min-h-[100px]"
            style={fontMontserrat}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition"
            style={fontMontserrat}
          >
            Send Message
          </button>
          {success && (
            <div
              className="text-green-600 font-bold mt-2 flex items-center justify-center text-lg animate-bounce"
              style={fontMontserrat}
            >
              Message sent successfully! <span className="ml-2" role="img" aria-label="muscle">💪</span>
            </div>
          )}
        </form>
      </main>
      <Footer />
    </div>
  );
}