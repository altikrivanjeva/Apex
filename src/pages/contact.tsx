import { useForm } from 'react-hook-form';
import Header from '../components/Header';
import Footer from '../components/Footer';

const fontMontserrat = { fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' };

export default function Contact() {
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm();

  const onSubmit = async (data: any) => {
    await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    alert('Message sent!');
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f5f5f5]">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center py-16 px-4 text-black">
        <h1 className="text-3xl font-extrabold uppercase mb-8 text-blue-900" style={fontMontserrat}>
          Contact Us
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-4 w-full max-w-md border border-blue-100"
        >
          <input
            className="border rounded px-3 py-2"
            placeholder="Your Name"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <span className="text-red-500">{errors.name.message}</span>}

          <input
            className="border rounded px-3 py-2"
            placeholder="Your Email"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' }
            })}
          />
          {errors.email && <span className="text-red-500">{errors.email.message}</span>}

          <textarea
            className="border rounded px-3 py-2"
            placeholder="Your Message"
            rows={4}
            {...register('message', { required: 'Message is required', minLength: { value: 10, message: 'Message too short' } })}
          />
          {errors.message && <span className="text-red-500">{errors.message.message}</span>}

          <button
            type="submit"
            className="bg-blue-900 text-white px-6 py-2 rounded font-bold hover:bg-blue-700 transition"
          >
            Send
          </button>
          {isSubmitSuccessful && <span className="text-green-600">Message sent successfully!</span>}
        </form>
      </main>
      <Footer />
    </div>
  );
}