import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { FaHeading, FaUser, FaImage, FaTags, FaListAlt, FaCheck, FaEdit, FaBookOpen } from 'react-icons/fa';

const AddBlog = () => {
  const { user } = useAuth();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const id = query.get('id');

  const [form, setForm] = useState({
    title: '',
    author: '',
    content: '',
    image: '',
    tags: '', // comma separated
    category: '',
    published: false,
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`/api/blogs/${id}`)
        .then(res => {
          const blog = res.data;
          setForm({
            title: blog.title || '',
            author: blog.author || '',
            content: blog.content || '',
            image: blog.image || '',
            tags: (blog.tags || []).join(', '),
            category: blog.category || '',
            published: blog.published || false,
          });
          setLoading(false);
        })
        .catch(() => {
          setStatus('Failed to load blog data.');
          setLoading(false);
        });
    }
  }, [id]);

  if (!user || user.role !== 'admin') {
    return <div className="text-center text-red-600 py-20">Access denied. Admins only.</div>;
  }

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      };
      if (id) {
        await axios.put(`/api/blogs/${id}`, payload);
        setStatus('Blog updated successfully!');
      } else {
        await axios.post('/api/blogs/blog', payload);
        setStatus('Blog added successfully!');
        setForm({ title: '', author: '', content: '', image: '', tags: '', category: '', published: false });
      }
    } catch (err) {
      setStatus('Failed to save blog.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-cyan-50 to-blue-200 py-10 px-2">
      <div className="max-w-2xl w-full mx-auto bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-blue-100 animate-achievement-item overflow-hidden relative">
        {/* Gradient Accent Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />
        <h2 className="text-3xl font-bold text-blue-800 mb-8 flex items-center gap-2">
          <FaBookOpen className="text-blue-600" /> {id ? 'Edit Blog' : 'Add Blog'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaHeading className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg" />
            <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 transition-all duration-200 shadow-sm" disabled={loading} />
          </div>
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg" />
            <input type="text" name="author" placeholder="Author" value={form.author} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 transition-all duration-200 shadow-sm" disabled={loading} />
          </div>
          <div className="relative">
            <FaEdit className="absolute left-4 top-4 text-blue-400 text-lg" />
            <textarea name="content" placeholder="Content" value={form.content} onChange={handleChange} required rows={5} className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 transition-all duration-200 shadow-sm resize-none" disabled={loading} />
          </div>
          <div className="relative">
            <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg" />
            <input type="text" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 transition-all duration-200 shadow-sm" disabled={loading} />
          </div>
          <div className="relative">
            <FaTags className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg" />
            <input type="text" name="tags" placeholder="Tags (comma separated)" value={form.tags} onChange={handleChange} className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 transition-all duration-200 shadow-sm" disabled={loading} />
          </div>
          <div className="relative">
            <FaListAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg" />
            <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 transition-all duration-200 shadow-sm" disabled={loading} />
          </div>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="published" checked={form.published} onChange={handleChange} disabled={loading} />
            <FaCheck className="text-green-500" /> Published
          </label>
          <button type="submit" className="w-full py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-700 to-cyan-500 text-white rounded-lg font-semibold shadow-lg hover:from-cyan-500 hover:to-blue-700 transition-transform duration-200 hover:scale-105 text-lg" disabled={loading}>
            {loading ? (id ? 'Updating...' : 'Adding...') : (id ? <><FaEdit /> Update Blog</> : <><FaBookOpen /> Add Blog</>)}
          </button>
          {status && <div className={`text-center mt-2 animate-fade-in-up ${status.startsWith('Blog') ? 'text-green-600' : 'text-red-600'}`}>{status}</div>}
        </form>
      </div>
    </div>
  );
};

export default AddBlog;
