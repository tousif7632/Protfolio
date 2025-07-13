import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { FaEdit, FaTrashAlt, FaBookOpen, FaSearch } from 'react-icons/fa';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const fetchBlogs = () => {
    setLoading(true);
    api.get('/blogs')
      .then(res => {
        setBlogs(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load blogs.');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        const token = localStorage.getItem('token');
        await api.delete(`/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        fetchBlogs();
      } catch {
        alert('Failed to delete blog.');
      }
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-600 py-10">{error}</div>;
  if (!blogs.length) return <div className="text-center py-10">No blogs found.</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-cyan-50 to-blue-200 py-10 px-2">
      <div className="max-w-3xl w-full mx-auto bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-blue-100 animate-achievement-item overflow-hidden relative">
        {/* Gradient Accent Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />
        <h2 className="text-3xl font-bold mb-8 text-blue-800 flex items-center gap-2">
          <FaBookOpen className="text-blue-600" /> All Blogs
        </h2>
        {/* Search Input */}
        <div className="relative mb-8">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg" />
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 transition-all duration-200 shadow-sm"
          />
        </div>
        <ul className="space-y-6">
          {blogs.filter(blog => blog.title.toLowerCase().includes(search.toLowerCase())).map(blog => (
            <li key={blog._id} className="bg-white/80 rounded-2xl shadow-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between border border-blue-100 hover:border-blue-400 hover:shadow-2xl transition-all duration-300 animate-achievement-item">
              <div className="mb-4 md:mb-0">
                <div className="font-semibold text-lg text-blue-800 mb-1">{blog.title}</div>
                <div className="text-gray-600 mb-1">By {blog.author}</div>
                <div className="text-gray-500 text-sm mb-1">{blog.category}</div>
              </div>
              <div className="flex gap-2 mt-2 md:mt-0">
                <button
                  className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 text-white rounded-full font-semibold shadow hover:from-yellow-600 hover:to-yellow-500 transition-transform duration-200 hover:scale-105"
                  onClick={() => navigate(`/admin/add-blog?id=${blog._id}`)}
                >
                  <FaEdit /> Edit
                </button>
                <button
                  className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-red-600 to-pink-500 text-white rounded-full font-semibold shadow hover:from-pink-500 hover:to-red-600 transition-transform duration-200 hover:scale-105"
                  onClick={() => handleDelete(blog._id)}
                >
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AllBlogs; 