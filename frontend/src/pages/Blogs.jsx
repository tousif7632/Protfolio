import React, { useEffect, useState } from 'react';
import { fetchBlogs } from '../services/blogService';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaSearch } from 'react-icons/fa';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBlogs()
      .then(data => {
        // Defensive: handle array or object with blogs property
        if (Array.isArray(data)) {
          setBlogs(data);
        } else if (data && Array.isArray(data.blogs)) {
          setBlogs(data.blogs);
        } else {
          setBlogs([]);
        }
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load blogs.');
        setLoading(false);
      });
  }, []);

  return (
    <section id="blog" className="py-16 bg-gradient-to-br from-cyan-50 to-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-10 text-center">Latest Blogs</h2>
        {/* Search Input */}
        <div className="relative max-w-md mx-auto mb-10">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg" />
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 transition-all duration-200 shadow-sm"
          />
        </div>
        {loading ? (
          <div className="text-center text-blue-700">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.filter(blog => blog.title.toLowerCase().includes(search.toLowerCase())).map(blog => (
              <div key={blog._id || blog.title} className="relative group bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl p-7 flex flex-col hover:scale-105 hover:shadow-2xl border border-blue-100 hover:border-blue-400 transition-all duration-300 animate-achievement-item overflow-hidden">
                {/* Gradient Accent Bar */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />
                {blog.image && (
                  <img src={blog.image} alt={blog.title} className="h-44 w-full object-cover rounded-t-2xl mb-3" />
                )}
                {/* Date Badge */}
                <div className="mb-4 mt-2 flex items-center gap-2">
                  <span className="inline-block px-3 py-1 bg-gradient-to-r from-blue-600 to-cyan-400 text-white text-xs font-semibold rounded-full shadow">
                    {blog.date || (blog.createdAt && blog.createdAt.slice(0,10))}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-blue-800 mb-3 group-hover:text-purple-700 transition-colors duration-300">{blog.title}</h3>
                <p className="text-gray-600 mb-6 flex-1">
                  {(() => {
                    const desc = blog.description || blog.desc || '';
                    const words = desc.split(' ');
                    if (words.length > 20) {
                      return words.slice(0, 20).join(' ') + '...';
                    }
                    return desc;
                  })()}
                </p>
                <Link to={`/blog/${blog._id}`} className="inline-flex items-center gap-2 mt-auto px-6 py-2 bg-gradient-to-r from-blue-700 to-cyan-500 text-white rounded-full font-semibold shadow hover:from-cyan-500 hover:to-blue-700 transition-transform duration-200 hover:scale-105">
                  Read More <FaArrowRight />
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blogs;
