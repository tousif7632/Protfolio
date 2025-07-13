import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUser } from 'react-icons/fa';

const navLinks = [
  { name: 'Home', to: '/' },
  { name: 'About', to: '/about' },
  { name: 'Services', to: '/services' },
  { name: 'Project', to: '/portfolio' },
  { name: 'Blog', to: '/blog' },
  { name: 'Contact', to: '/contact' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="fixed w-full z-50 top-0 left-0">
      <div className="pointer-events-auto w-full rounded-none shadow-2xl border-b border-cyan-400/40 bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-700 px-4 py-2 flex items-center justify-between relative overflow-visible animate-navbar-float text-white">
        {/* Animated Gradient Border */}
        {/* Removed extra animated border div for a cleaner look */}
        {/* Logo + Animated Dot */}
        <div className="flex items-center gap-3 relative">
          <img
            src="https://avatars.githubusercontent.com/u/9919?v=4"
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-cyan-200 shadow-md bg-white/60"
          />
          <span className="text-2xl font-extrabold bg-gradient-to-r from-cyan-100 via-blue-200 to-blue-100 bg-clip-text text-transparent tracking-wide drop-shadow-lg select-none flex items-center gap-2">
            Md Tousif Alam
            <span className="inline-block w-2 h-2 rounded-full bg-gradient-to-r from-cyan-100 to-blue-200 animate-pulse ml-1 shadow-lg" />
          </span>
        </div>
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 items-center">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.to}
              className={`relative font-semibold px-2 py-1 transition-colors duration-200 group
                ${location.pathname === link.to ? 'text-white' : 'text-white/80 hover:text-white'}`}
            >
              <span>{link.name}</span>
              <span className={`absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-cyan-100 to-blue-200 rounded-full transition-all duration-300
                ${location.pathname === link.to ? 'w-full' : 'w-0 group-hover:w-full group-focus:w-full'}`}></span>
            </Link>
          ))}
          {!user && (
            <>
              <Link to="/login" className="ml-2 px-4 py-1.5 rounded-full bg-white/20 text-white font-bold shadow-md hover:bg-white/30 transition-all duration-200">Login</Link>
              <Link to="/register" className="ml-2 px-4 py-1.5 rounded-full bg-white/30 text-white font-bold shadow-md hover:bg-white/40 transition-all duration-200">Register</Link>
            </>
          )}
          {user && (
            <>
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white font-semibold shadow-md ml-2">
                <FaUser className="text-cyan-200" />
                Welcome, {user.name}
              </span>
              {user.role === 'admin' && (
                <Link to="/admin" className="ml-2 px-4 py-1.5 rounded-full bg-white/20 text-white font-bold shadow-md hover:bg-white/30 transition-all duration-200">Dashboard</Link>
              )}
              <button onClick={handleLogout} className="ml-2 px-4 py-1.5 rounded-full bg-red-500/80 text-white font-bold shadow-md hover:bg-red-600/90 transition-all duration-200">Logout</button>
            </>
          )}
        </div>
        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`w-7 h-1 bg-white rounded transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-7 h-1 bg-white rounded transition-all ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-7 h-1 bg-white rounded transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden fixed top-20 left-1/2 -translate-x-1/2 w-[95vw] max-w-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-blue-700 text-white shadow-2xl rounded-2xl border border-cyan-400/30 px-8 py-8 flex flex-col gap-6 animate-fade-in-down z-50">
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.to}
              className={`text-white font-semibold text-lg px-2 py-1 rounded hover:bg-white/10 transition-colors ${location.pathname === link.to ? 'bg-white/10 text-white' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex flex-col gap-2 mt-2">
            {!user && (
              <>
                <Link to="/login" className="px-4 py-2 rounded-full bg-white/20 text-white font-bold shadow-md hover:bg-white/30 transition-all duration-200" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" className="px-4 py-2 rounded-full bg-white/30 text-white font-bold shadow-md hover:bg-white/40 transition-all duration-200" onClick={() => setMenuOpen(false)}>Register</Link>
              </>
            )}
            {user && (
              <>
                <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 text-white font-semibold shadow-md">
                  <FaUser className="text-cyan-200" />
                  Welcome, {user.name}
                </span>
                {user.role === 'admin' && (
                  <Link to="/admin" className="px-4 py-2 rounded-full bg-white/20 text-white font-bold shadow-md hover:bg-white/30 transition-all duration-200" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                )}
                <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="px-4 py-2 rounded-full bg-red-500/80 text-white font-bold shadow-md hover:bg-red-600/90 transition-all duration-200">Logout</button>
              </>
            )}
          </div>
        </div>
      )}
      {/* Custom CSS for animated border */}
      <style>{`
        @keyframes navbar-float {
          0% { transform: translateY(-30px) scale(0.98); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        .animate-navbar-float {
          animation: navbar-float 0.8s cubic-bezier(.22,1,.36,1) both;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
