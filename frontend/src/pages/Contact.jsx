import React, { useState } from 'react';
import { submitContact } from '../services/contactService';
import { FaUser, FaEnvelope, FaPhone, FaRegCommentDots, FaRegFileAlt, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus('');
    setLoading(true);
    try {
      await submitContact(form);
      setStatus('Thank you! Your message has been sent.');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      setStatus('Failed to send message. Please try again.');
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="py-20 min-h-screen bg-gradient-to-br from-white via-cyan-50 to-blue-100 flex items-center">
      <div className="max-w-2xl mx-auto px-4 w-full">
        <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 mb-10 text-center drop-shadow-lg">Contact Me</h2>
        <form onSubmit={handleSubmit} className="relative group bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl p-10 space-y-7 border border-blue-100 animate-achievement-item overflow-hidden">
          {/* Gradient Accent Bar */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />
          {/* Name */}
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg" />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 transition-all duration-200 shadow-sm"
              disabled={loading}
            />
          </div>
          {/* Email */}
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg" />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 transition-all duration-200 shadow-sm"
              disabled={loading}
            />
          </div>
          {/* Phone */}
          <div className="relative">
            <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg" />
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 transition-all duration-200 shadow-sm"
              disabled={loading}
            />
          </div>
          {/* Subject */}
          <div className="relative">
            <FaRegFileAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg" />
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={form.subject}
              onChange={handleChange}
              required
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 transition-all duration-200 shadow-sm"
              disabled={loading}
            />
          </div>
          {/* Message */}
          <div className="relative">
            <FaRegCommentDots className="absolute left-4 top-6 text-blue-400 text-lg" />
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 transition-all duration-200 shadow-sm resize-none"
              disabled={loading}
            />
          </div>
          <button type="submit" className="w-full py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-700 to-cyan-500 text-white rounded-lg font-semibold shadow-lg hover:from-cyan-500 hover:to-blue-700 transition-transform duration-200 hover:scale-105 text-lg" disabled={loading}>
            {loading ? 'Sending...' : (<><FaPaperPlane /> Send Message</>)}
          </button>
          {status && <div className={`text-center mt-2 animate-fade-in-up ${status.startsWith('Thank') ? 'text-green-600' : 'text-red-600'}`}>{status}</div>}
        </form>
      </div>
    </section>
  );
};

export default Contact;
