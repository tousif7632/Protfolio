import React, { useEffect, useState } from 'react';
import { fetchProjects } from '../services/projectService';
import { FaGithub, FaExternalLinkAlt, FaSearch } from 'react-icons/fa';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchProjects()
      .then(data => {
        console.log('Projects API response:', data);
        // Defensive: handle array or object with projects property
        if (Array.isArray(data)) {
          setProjects(data);
        } else if (data && Array.isArray(data.projects)) {
          setProjects(data.projects);
        } else {
          setProjects([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects.');
        setLoading(false);
      });
  }, []);

  return (
    <section id="portfolio" className="py-16 bg-gradient-to-br from-white to-cyan-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-10 text-center">My Projects</h2>
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
            {projects.filter(project => project.title.toLowerCase().includes(search.toLowerCase())).map(project => (
              <div key={project._id || project.title} className="relative group bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden hover:scale-105 hover:shadow-2xl border border-blue-100 hover:border-blue-400 transition-all duration-300 flex flex-col animate-achievement-item">
                {/* Gradient Accent Bar */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />
                {project.image && <img src={project.image} alt={project.title} className="h-48 w-full object-cover rounded-t-3xl" />}
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-blue-800 mb-2 group-hover:text-purple-700 transition-colors duration-300">{project.title}</h3>
                  <p className="text-gray-600 mb-4 flex-1">{project.description || project.desc}</p>
                  {/* Tech Stack */}
                  {project.techStack && project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {(Array.isArray(project.techStack) ? project.techStack : project.techStack.split(',')).map((tech, idx) => (
                        <span key={idx} className="flex items-center gap-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-2 py-1 rounded-full text-xs font-semibold shadow-sm border border-blue-200">
                          {/* Optionally add icon here */}
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  {/* Links */}
                  <div className="flex gap-3 mt-auto">
                    {project.githubLink && (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-gray-900 to-blue-700 text-white rounded-full text-sm font-semibold shadow hover:from-blue-700 hover:to-gray-900 transition-transform duration-200 hover:scale-105">
                        <FaGithub className="inline-block" /> GitHub
                      </a>
                    )}
                    {project.liveLink && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-400 text-white rounded-full text-sm font-semibold shadow hover:from-cyan-400 hover:to-blue-600 transition-transform duration-200 hover:scale-105">
                        <FaExternalLinkAlt className="inline-block" /> Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
