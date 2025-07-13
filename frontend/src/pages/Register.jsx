import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock, FaUserPlus, FaCheckDouble } from 'react-icons/fa';

const Register = () => {
  const { register, loading, error } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [success, setSuccess] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const ok = await register(form.name, form.email, form.password, form.confirmPassword);
    if (ok) setSuccess(true);
  };

  if (success) {
    window.location.href = '/login'; // Redirect to home or dashboard
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-cyan-50 to-blue-200">
      <form onSubmit={handleSubmit} className="relative group bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full max-w-md space-y-7 border border-blue-100 animate-achievement-item overflow-hidden">
        {/* Gradient Accent Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />
        <h2 className="text-3xl font-bold text-blue-800 text-center mb-6">Register</h2>
        {/* Name */}
        <div className="relative">
          <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg" />
          <input
            type="text"
            name="name"
            placeholder="Name"
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
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 transition-all duration-200 shadow-sm"
            disabled={loading}
          />
        </div>
        {/* Password */}
        <div className="relative">
          <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg" />
          <input
            type="password"
            name="password"
            placeholder="Password (min 10 chars)"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 transition-all duration-200 shadow-sm"
            disabled={loading}
          />
        </div>
        {/* Confirm Password */}
        <div className="relative">
          <FaCheckDouble className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg" />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 transition-all duration-200 shadow-sm"
            disabled={loading}
          />
        </div>
        <button type="submit" className="w-full py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-700 to-cyan-500 text-white rounded-lg font-semibold shadow-lg hover:from-cyan-500 hover:to-blue-700 transition-transform duration-200 hover:scale-105 text-lg" disabled={loading}>
          {loading ? 'Registering...' : (<><FaUserPlus /> Register</>)}
        </button>
        {error && <div className="text-red-600 text-center animate-fade-in-up">{error}</div>}
      </form>
    </div>
  );
};

export default Register; 