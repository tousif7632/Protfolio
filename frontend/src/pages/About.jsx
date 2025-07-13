import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const skills = [
  { name: 'Next.js', level: 85, icon: '🔗', color: 'from-gray-800 to-black' },
  { name: 'ReactJS', level: 90, icon: '⚛️', color: 'from-blue-500 to-cyan-400' },
  { name: 'TypeScript', level: 80, icon: '🟦', color: 'from-blue-400 to-blue-700' },
  { name: 'JavaScript', level: 85, icon: '🟨', color: 'from-yellow-400 to-orange-400' },
  { name: 'Node.js', level: 80, icon: '🟢', color: 'from-green-500 to-emerald-400' },
  { name: 'Tailwind CSS', level: 85, icon: '💨', color: 'from-cyan-400 to-blue-500' },
  { name: 'MongoDB', level: 75, icon: '🍃', color: 'from-green-400 to-teal-400' },
  { name: 'UI/UX Design', level: 80, icon: '🎨', color: 'from-purple-500 to-pink-400' },
  { name: 'AI Integration', level: 75, icon: '🤖', color: 'from-indigo-500 to-blue-400' },
  { name: 'LLM', level: 70, icon: '🧠', color: 'from-pink-500 to-purple-500' },
  { name: 'LangChain', level: 70, icon: '🔗', color: 'from-green-500 to-blue-400' },
  { name: 'Backend Developer', level: 85, icon: '🖥️', color: 'from-gray-700 to-gray-900' },
];

const experiences = [
  {
    year: '2023 - Present',
    title: 'Full Stack Developer',
    company: 'Remote Full Stack Developer',
    description: 'Building modern web applications with React, Node.js, and MongoDB. Specializing in responsive design and user experience.',
    technologies: [
      'React',
      'Next.js',
      'Node.js',
      'Express.js',
      'MongoDB',
      'MySQL',
      'Tailwind CSS',
      'JavaScript',
      'LangChain',
      'LLM',
      'OpenAI API',
      'Prompt Engineering',
      'AI Integration'
    ]
    
  },
  {
    year: '2022 - 2023',
    title: 'Frontend Developer',
    company: 'Tech Startup',
    description: 'Developed responsive user interfaces and implemented modern design patterns. Collaborated with design and backend teams.',
    technologies: [
      'React',
      'JavaScript',
      'TypeScript',
      'HTML5',
      'CSS3',
      'Tailwind CSS',
      'Bootstrap',
      'SASS/SCSS',
      'Redux Toolkit',
      'Next.js',
      'Git',
      'GitHub',
      'Figma',
      'Vite',
      'Webpack',
      'AI Integration'

    ]
    
  },
  {
    year: '2021 - 2022',
    title: 'Junior Developer',
    company: 'Digital Agency',
    description: 'Started my journey in web development, learning modern frameworks and best practices.',
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'Bootstrap',
      'Tailwind CSS',
      'Git',
      'GitHub',
      'Responsive Design',
      'VS Code',
      'Figma (Basics)',
      'React (Basics)',
      'DOM Manipulation',
      'API Integration (Basics)'
    ]
    
  }
];

const achievements = [
  { number: '25+', label: 'Projects Completed', icon: '🚀' },
  { number: '100%', label: 'Client Satisfaction', icon: '⭐' },
  { number: '2.3+', label: 'Years Experience', icon: '⏰' },
  { number: '24/7', label: 'Support Available', icon: '🛠️' }
];

const About = () => {
  const [animatedSkills, setAnimatedSkills] = useState(false);
  const [animatedNumbers, setAnimatedNumbers] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const skillsSection = document.getElementById('skills-section');
      const achievementsSection = document.getElementById('achievements-section');
      
      if (skillsSection && skillsSection.getBoundingClientRect().top < window.innerHeight * 0.8) {
        setAnimatedSkills(true);
      }
      
      if (achievementsSection && achievementsSection.getBoundingClientRect().top < window.innerHeight * 0.8) {
        setAnimatedNumbers(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
        <div className="relative max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-block p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl mb-6">
              <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                {/* Outer gradient border */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-1"></div>
                {/* Inner white border */}
                <div className="absolute inset-1 rounded-full bg-white p-1"></div>
                {/* Profile image */}
                <img
                  src="/public/image01.jpg"
                  alt="Profile"
                  className="relative w-28 h-28 object-cover rounded-full shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer"
                  style={{ zIndex: 1 }}
                  onClick={() => setShowModal(true)}
                />
              </div>
            </div>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
            About Me
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Passionate Full Stack Developer crafting digital experiences that blend innovation with elegance
          </p>
        </div>
      </section>

      {/* Personal Story Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Turning Ideas Into 
                <span className="text-blue-600"> Digital Reality</span>
              </h2>
              <div className="space-y-4 text-lg text-gray-600 leading-relaxed">
                <p>
                  I am a passionate Full Stack & Backend Developer with a deep love for creating modern, scalable, and visually stunning web applications. My journey in technology began with curiosity and has evolved into a mission to build digital solutions that make a difference.
                </p>
                <p>
                  With expertise in both frontend (React.js, Next.js, TypeScript) and backend technologies, I specialize in creating seamless user experiences and robust server-side logic. I have hands-on experience integrating AI, working with LLMs, and building intelligent applications using frameworks like LangChain.
                </p>
                <p>
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community. I'm always excited to take on new challenges and help businesses grow their digital presence.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-3xl shadow-2xl">
                <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">What I Do</h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <span>Full Stack & Backend Web Development</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                      <span>Responsive UI/UX Design</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                      <span>API Development & Integration</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span>Database Design & Optimization</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                      <span>Performance Optimization</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                      <span>AI Integration & LLM (Large Language Models)</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                      <span>LangChain & Intelligent Automation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills-section" className="py-16 px-4 bg-white/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Technical <span className="text-blue-600">Expertise</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              My skillset spans across modern web technologies, enabling me to build comprehensive solutions
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {skills.map((skill, index) => (
              <div 
                key={skill.name}
                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  animatedSkills ? 'animate-achievement-item' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{skill.icon}</span>
                    <span className="font-semibold text-lg text-gray-800">{skill.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-500">{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div 
                    className={`bg-gradient-to-r ${skill.color} h-3 rounded-full transition-all duration-1000 ease-out`}
                    style={{ 
                      width: animatedSkills ? `${skill.level}%` : '0%',
                      transitionDelay: `${index * 0.1}s`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Timeline */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Professional <span className="text-blue-600">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              My path in web development and the experiences that shaped my expertise
            </p>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500"></div>
            
            {experiences.map((exp, index) => (
              <div key={index} className={`relative mb-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`flex items-center ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'}`}>
                  <div className={`bg-white rounded-2xl p-6 shadow-lg max-w-md ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
                        {exp.year}
                      </span>
                      <span className="text-sm text-gray-500">{exp.company}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{exp.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{exp.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex}
                          className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 top-1/2 w-4 h-4 bg-white border-4 border-blue-500 rounded-full shadow-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements-section" className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">
              Key <span className="text-yellow-300">Achievements</span>
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Numbers that reflect my commitment to excellence and client satisfaction
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div 
                key={achievement.label}
                className={`text-center ${animatedNumbers ? 'animate-achievement-item' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300">
                  <div className="text-4xl mb-3">{achievement.icon}</div>
                  <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {animatedNumbers ? achievement.number : '0'}
                  </div>
                  <div className="text-blue-100 text-sm font-medium">
                    {achievement.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's collaborate to bring your vision to life with cutting-edge technology and exceptional design
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
                onClick={() => navigate('/portfolio')}
              >
                View My Work
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
              onClick={() => navigate('/contact')}
              >

                Get In Touch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for full image */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={() => setShowModal(false)}>
          <div className="relative" onClick={e => e.stopPropagation()}>
            <img
              src="/public/image01.jpg"
              alt="Profile Full"
              className="max-w-[90vw] max-h-[80vh] rounded-2xl shadow-2xl border-4 border-white"
            />
            <button
              className="absolute top-2 right-2 bg-white bg-opacity-80 rounded-full p-2 text-gray-700 hover:bg-opacity-100 transition"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
