import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { FaUserShield, FaPlus, FaList, FaSignOutAlt, FaBlog, FaProjectDiagram } from 'react-icons/fa';

const Dashboard = () => {
  const { user, logout } = useAuth();

  if (!user || user.role !== 'admin') {
    return <div className="text-center text-red-600 py-20">Access denied. Admins only.</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-cyan-50 to-blue-100 py-10 px-2">
      <div className="max-w-3xl w-full mx-auto bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-blue-100 animate-achievement-item overflow-hidden relative">
        {/* Gradient Accent Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />
        <div className="flex flex-col items-center mb-10">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-4xl shadow-lg mb-4">
            <FaUserShield />
          </div>
          <h2 className="text-4xl font-bold text-blue-800 mb-2">Admin Dashboard</h2>
          <div className="text-lg text-gray-700">Welcome, <span className="font-semibold text-blue-700">{user.name}</span> <span className="text-gray-500">({user.email})</span></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 mb-10">
          <Link to="/admin/add-blog" className="group bg-white/80 rounded-2xl shadow-lg px-6 py-8 flex flex-col items-center text-center font-semibold border border-blue-100 hover:border-blue-400 hover:scale-105 transition-all duration-300">
            <FaPlus className="text-3xl text-blue-600 mb-2 group-hover:text-purple-600 transition-colors" />
            <span className="text-lg">Add Blog</span>
          </Link>
          <Link to="/admin/add-project" className="group bg-white/80 rounded-2xl shadow-lg px-6 py-8 flex flex-col items-center text-center font-semibold border border-blue-100 hover:border-blue-400 hover:scale-105 transition-all duration-300">
            <FaPlus className="text-3xl text-blue-600 mb-2 group-hover:text-purple-600 transition-colors" />
            <span className="text-lg">Add Project</span>
          </Link>
          <Link to="/admin/blogs" className="group bg-white/80 rounded-2xl shadow-lg px-6 py-8 flex flex-col items-center text-center font-semibold border border-blue-100 hover:border-blue-400 hover:scale-105 transition-all duration-300">
            <FaBlog className="text-3xl text-blue-600 mb-2 group-hover:text-purple-600 transition-colors" />
            <span className="text-lg">All Blogs</span>
          </Link>
          <Link to="/admin/projects" className="group bg-white/80 rounded-2xl shadow-lg px-6 py-8 flex flex-col items-center text-center font-semibold border border-blue-100 hover:border-blue-400 hover:scale-105 transition-all duration-300">
            <FaProjectDiagram className="text-3xl text-blue-600 mb-2 group-hover:text-purple-600 transition-colors" />
            <span className="text-lg">All Projects</span>
          </Link>
        </div>
        <button onClick={logout} className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-red-600 to-pink-500 text-white rounded-xl font-semibold shadow-lg hover:from-pink-500 hover:to-red-600 transition-transform duration-200 hover:scale-105 text-lg">
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
