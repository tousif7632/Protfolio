import React from 'react';

const services = [
  {
    title: 'Web Development',
    desc: 'Custom, high-performance websites and web apps built with modern technologies.',
    icon: '🌐',
    gradient: 'from-blue-500 to-cyan-400',
  },
  {
    title: 'React.js Development',
    desc: 'Build fast, interactive, and scalable user interfaces with React.js.',
    icon: '⚛️',
    gradient: 'from-cyan-400 to-blue-600',
  },
  {
    title: 'Next.js Development',
    desc: 'Production-grade, SEO-friendly web apps with Next.js and server-side rendering.',
    icon: '🔗',
    gradient: 'from-gray-800 to-black',
  },
  {
    title: 'Frontend Developer',
    desc: 'Pixel-perfect, responsive, and modern UI for web and mobile platforms.',
    icon: '💻',
    gradient: 'from-pink-500 to-purple-500',
  },
  {
    title: 'Chatbot Solutions',
    desc: 'Smart, AI-powered chatbots for customer support and automation.',
    icon: '💬',
    gradient: 'from-blue-400 to-indigo-500',
  },
  {
    title: 'UI/UX Design',
    desc: 'Beautiful, user-friendly interfaces and experiences for web and mobile.',
    icon: '🎨',
    gradient: 'from-purple-500 to-pink-400',
  },
  {
    title: 'API Integration',
    desc: 'Seamless integration with REST APIs and third-party services.',
    icon: '🔗',
    gradient: 'from-green-400 to-blue-500',
  },
  {
    title: 'AI & LLM Solutions',
    desc: 'Integrate AI, LLMs, and LangChain for smart, automated, and scalable digital products.',
    icon: '🤖',
    gradient: 'from-indigo-500 to-blue-400',
  },
  {
    title: 'Backend Development',
    desc: 'Robust, scalable, and secure backend systems with Node.js, Express, and databases.',
    icon: '🖥️',
    gradient: 'from-gray-700 to-gray-900',
  },
  {
    title: 'Consulting',
    desc: 'Expert advice and solutions for your digital projects and business growth.',
    icon: '💡',
    gradient: 'from-yellow-400 to-orange-400',
  },
  {
    title: 'Production & DevOps',
    desc: 'Expertise in API deployment, cloud hosting (Render, Heroku, Vercel, Netlify, AWS), and managed databases (MongoDB Atlas, MySql,Railway, etc.) for scalable, secure, and reliable applications.',
    icon: '🚀',
    gradient: 'from-orange-500 to-yellow-400',
  },
];

const Services = () => (
  <section id="services" className="py-20 min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-100">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-purple-600 mb-12 text-center drop-shadow-lg">
        My Services
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, idx) => (
          <div
            key={service.title}
            className={`relative group bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl p-10 flex flex-col items-center text-center border border-blue-100 hover:border-blue-300 transition-all duration-300 overflow-hidden animate-achievement-item`}
            style={{ animationDelay: `${idx * 0.08}s` }}
          >
            {/* Gradient Icon Ring */}
            <div className={`mb-6 w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br ${service.gradient} p-1 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-4xl">
                {service.icon}
              </div>
            </div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-3 group-hover:text-blue-700 transition-colors duration-300">
              {service.title}
            </h3>
            <p className="text-gray-600 text-base mb-4">
              {service.desc}
            </p>
            {/* Glassmorphism Glow */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-20 bg-gradient-to-r from-blue-400/30 to-purple-400/30 blur-2xl opacity-60 group-hover:opacity-80 transition-all duration-300" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Services; 