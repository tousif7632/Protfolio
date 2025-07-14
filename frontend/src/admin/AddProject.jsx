import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHeading, FaRegFileAlt, FaImage, FaCode, FaGithub, FaExternalLinkAlt, FaEdit, FaProjectDiagram } from 'react-icons/fa';

const AddProject = () => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search);
  const id = query.get('id');

  const [form, setForm] = useState({
    title: '',
    description: '',
    image: '',
    techStack: '', // comma separated
    githubLink: '',
    liveLink: '',
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (id) {
      setLoading(true);
      api.get(`/projects/${id}`)
        .then(res => {
          const project = res.data;
          setForm({
            title: project.title || '',
            description: project.description || '',
            image: project.image || '',
            techStack: (project.techStack || []).join(', '),
            githubLink: project.githubLink || '',
            liveLink: project.liveLink || ''
          });
          setLoading(false);
        })
        .catch(() => {
          setStatus('Failed to load project data.');
          setLoading(false);
        });
    }
  }, [id]);

  if (!user || user.role !== 'admin') {
    return <div className="text-center text-red-600 py-20">Access denied. Admins only.</div>;
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      const payload = {
        ...form,
        techStack: form.techStack.split(',').map(t => t.trim()).filter(Boolean),
      };
      if (id) {
        await api.put(`/projects/${id}`, payload);
        setStatus('Project updated successfully!');
        setTimeout(() => navigate('/admin/projects'), 1000);
      } else {
        await api.post('/projects/project', payload);
        setStatus('Project added successfully!');
        setForm({ title: '', description: '', image: '', techStack: '', githubLink: '', liveLink: '' });
        setTimeout(() => navigate('/admin/projects'), 1000);
      }
    } catch (err) {
      setStatus('Failed to save project.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-cyan-50 to-blue-200 py-10 px-2">
      <div className="max-w-2xl w-full mx-auto bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl p-10 border border-blue-100 animate-achievement-item overflow-hidden relative">
        {/* Gradient Accent Bar */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />
        <h2 className="text-3xl font-bold text-blue-800 mb-8 flex items-center gap-2">
          <FaProjectDiagram className="text-blue-600" /> {id ? 'Edit Project' : 'Add Project'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <FaHeading className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg" />
            <input type="text" name="title" placeholder="Title" value={form.title} onChange={handleChange} required className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 transition-all duration-200 shadow-sm" disabled={loading} />
          </div>
          <div className="relative">
            <FaRegFileAlt className="absolute left-4 top-4 text-blue-400 text-lg" />
            <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required rows={4} className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 transition-all duration-200 shadow-sm resize-none" disabled={loading} />
          </div>
          <div className="relative">
            <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg" />
            <input type="text" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 transition-all duration-200 shadow-sm" disabled={loading} />
          </div>
          <div className="relative">
            <FaCode className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg" />
            <input type="text" name="techStack" placeholder="Tech Stack (comma separated)" value={form.techStack} onChange={handleChange} className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 transition-all duration-200 shadow-sm" disabled={loading} />
          </div>
          <div className="relative">
            <FaGithub className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg" />
            <input type="text" name="githubLink" placeholder="GitHub Link" value={form.githubLink} onChange={handleChange} className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 transition-all duration-200 shadow-sm" disabled={loading} />
          </div>
          <div className="relative">
            <FaExternalLinkAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400 text-lg" />
            <input type="text" name="liveLink" placeholder="Live Link" value={form.liveLink} onChange={handleChange} className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 transition-all duration-200 shadow-sm" disabled={loading} />
          </div>
          <button type="submit" className="w-full py-3 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-700 to-cyan-500 text-white rounded-lg font-semibold shadow-lg hover:from-cyan-500 hover:to-blue-700 transition-transform duration-200 hover:scale-105 text-lg" disabled={loading}>
            {loading ? (id ? 'Updating...' : 'Adding...') : (id ? <><FaEdit /> Update Project</> : <><FaProjectDiagram /> Add Project</>)}
          </button>
          {status && <div className={`text-center mt-2 animate-fade-in-up ${status.startsWith('Project') ? 'text-green-600' : 'text-red-600'}`}>{status}</div>}
        </form>
      </div>
    </div>
  );
};

export default AddProject;
