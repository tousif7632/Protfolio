import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="bg-gradient-to-r from-[#0f1535] via-[#1e2746] to-[#2e3a5e] text-cyan-100 py-10 px-4 mt-16">
    <div className="max-w-3xl mx-auto flex flex-col items-center gap-6">
      {/* Navigation Links */}
      <div className="flex flex-wrap justify-center gap-6 text-base font-semibold">
        <Link to="/" className="hover:text-cyan-300 transition">Home</Link>
        <Link to="/about" className="hover:text-cyan-300 transition">About</Link>
        <Link to="/portfolio" className="hover:text-cyan-300 transition">Projects</Link>
        <Link to="/contact" className="hover:text-cyan-300 transition">Contact</Link>
      </div>
      {/* Social Icons */}
      <div className="flex gap-6 mt-2">
        <a href="https://github.com/tousif7632" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-500 hover:bg-cyan-400 text-white text-xl transition shadow-lg" aria-label="GitHub"><FaGithub /></a>
        <a href="https://www.linkedin.com/in/md-tousif-alam-25782327a/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-700 hover:bg-blue-500 text-white text-xl transition shadow-lg" aria-label="LinkedIn"><FaLinkedin /></a>
        <Link to="/contact" className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-400 hover:bg-cyan-300 text-white text-xl transition shadow-lg" aria-label="Contact"><FaEnvelope /></Link>
      </div>
      {/* Contact Info */}
      <div className="flex flex-wrap justify-center gap-4 text-cyan-200 text-base items-center">
        <span className="flex items-center gap-1">📧 <a href="mailto:mdtousifalam85@gmail.com" className="hover:text-cyan-300 transition">mdtousifalam85@gmail.com</a></span>
        <span className="flex items-center gap-1">📍 India</span>
        <span className="flex items-center gap-1">💼 Open to Opportunities</span>
      </div>
      {/* Copyright */}
      <div className="text-cyan-300 text-sm mt-2">&copy; {new Date().getFullYear()} Md Tousif Alam. All rights reserved.</div>
    </div>
  </footer>
);

export default Footer;
