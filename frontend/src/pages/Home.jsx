import React, { useEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaDatabase, FaCube, FaChevronLeft, FaChevronRight, FaDownload } from 'react-icons/fa';
import { SiNextdotjs, SiTypescript } from 'react-icons/si';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

const roles = [
  'Full Stack JavaScript Developer (MERN)',
  'React & Next.js Frontend Architect',
  'Scalable Backend Systems Engineer',
  'UI/UX-Focused Frontend Specialist',
  'RESTful & Third-Party API Integrator',
  'Performance-Driven Web Developer',
  'Reusable Component Library Builder',
  'Clean Code & Scalable Architecture Advocate',
  'Database Design & Optimization Expert',
  'End-to-End Product Development Specialist',
];

const services = [
  {
    title: 'Backend Development',
    desc: 'Scalable backend systems using Node.js, Express, MongoDB, and SQL for high-performance apps.',
    icon: '🖥️',
  },
  {
    title: 'Frontend Development',
    desc: 'Building modern, responsive, and user-friendly web applications using React, Next.js, and TypeScript.',
    icon: '💻',
  },
  {
    title: 'Deployment & Hosting',
    desc: 'Deploying web apps on Vercel, Netlify, and cloud platforms like AWS, Render, and Railway.',
    icon: '☁️',
  },
  {
    title: 'Authentication & Security',
    desc: 'Implementing secure login systems using JWT, OAuth, and best practices for data protection.',
    icon: '🔒',
  },
  {
    title: 'Responsive Design',
    desc: 'Ensuring seamless experience across all devices using mobile-first and responsive design principles.',
    icon: '📱',
  },
  {
    title: 'AI/Chatbot Integration',
    desc: 'Integrating AI-based assistants and chatbots using OpenAI API and custom NLP logic.',
    icon: '🧠',
  },
  {
    title: 'AI Integration',
    desc: 'Building smart web apps using OpenAI, GPT, and other large language models for real-time AI interaction.',
    icon: '🤖',
  },
  {
    title: 'LangChain Applications',
    desc: 'Creating AI agents and document-based Q&A systems using LangChain, vector stores, and prompt engineering.',
    icon: '🔗',
  },
  {
    title: 'Chatbot & PDF Q&A Systems',
    desc: 'Building intelligent chatbots and AI tools to answer questions from uploaded PDFs and documents.',
    icon: '📄',
  },
  {
    title: 'LLM Workflows',
    desc: 'Designing advanced LLM chains for tasks like summarization, question answering, content generation, and more.',
    icon: '🧠',
  },
  {
    title: 'Vector Database Integration',
    desc: 'Storing and retrieving embeddings using Pinecone, ChromaDB, or FAISS for high-speed semantic search.',
    icon: '🗃️',
  },
  {
    title: 'Custom Tools with AI',
    desc: 'Developing internal AI tools like prompt builders, AI dashboards, and automation utilities.',
    icon: '🛠️',
  },
  {
    title: 'AI Prompt Engineering',
    desc: 'Crafting optimized prompts for precise, controlled responses from AI models.',
    icon: '🧪',
  },
];

const socialLinks = [
  {
    icon: <FaGithub />,
    url: 'https://github.com/tousif7632',
    label: 'GitHub',
  },
  {
    icon: <FaLinkedin />,
    url: 'https://www.linkedin.com/in/md-tousif-alam-25782327a/',
    label: 'LinkedIn',
  },
  {
    icon: <FaEnvelope />,
    url: 'mdtousifalam85@gmail.com',
    label: 'Email',
  },
];

function useTypewriter(words, speed = 80, pause = 1200) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), pause);
      return;
    }
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting, words, speed, pause]);

  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink((v) => !v), 500);
    return () => clearInterval(blinkInterval);
  }, []);

  return `${words[index].substring(0, subIndex)}${blink ? '|' : ' '}`;
}

const achievementData = [
  {
    title: 'Professional Achievements',
    icon: '🚀',
    items: [
      'Successfully completed 25+ freelance projects as a Full Stack MERN Developer with 100% client satisfaction.',
      'Built and deployed 10+ production-ready web applications using React, Node.js, MongoDB, and Express.js.',
      'Reduced page load time by 40% by optimizing React components and implementing lazy loading.',
      'Integrated secure authentication and file uploads in enterprise-level apps without third-party services.',
    ],
  },
  {
    title: 'Academic Achievements',
    icon: '🎓',
    items: [
      'Graduated with B.Sc in Mathematics with distinction (2021).',
      'Ranked in top 10% in university-level coding challenge.',
      'Completed certified MERN Stack course from Next Wave (or any other platform).',
    ],
  },
  {
    title: 'Coding/Community Achievements',
    icon: '💻',
    items: [
      'Completed 100 Days of Code Challenge and shared daily progress on LinkedIn.',
      'Solved 500+ coding questions across platforms like LeetCode, HackerRank, and GeeksforGeeks.',
      'Actively contributed to open-source projects on GitHub.',
    ],
  },
  {
    title: 'Leadership / Extra Initiative',
    icon: '🌟',
    items: [
      'Led a team of 5+ developers in building a startup project dashboard using AI integration.',
      'Organized and conducted frontend development workshops for college juniors.',
    ],
  },
];

const techStackGroups = [
  {
    title: 'Frontend',
    icon: '🖥️',
    items: [
      'React.js',
      'Next.js',
      'Tailwind CSS',
      'GSAP',
      'HTML5',
      'CSS3',
      'JavaScript',
      'TypeScript',
      'Redux Toolkit',
      'Bootstrap',
      'Material UI',
      'ShadCN UI',
      'Axios',
      'React Query',
      'SWR',
      'Vite',
      'Webpack',
      'ESLint',
      'Prettier',
      'Figma (UI Design)',
      'Responsive Design',
      'Accessibility (a11y)',
      'Git & GitHub'
    ]
    
  },
  {
    title: 'Backend',
    icon: '🖧',
    items: [
      'Node.js',
      'Express.js',
      'MongoDB',
      'PostgreSQL',
      'MySQL',
      'JWT',,
      'Mongoose',
      'Sequelize',
      'REST API',
      'bcrypt',
      'Crypto.js',
      'Nodemailer',
      'Socket.io',
      'Rate Limiting',
      'Helmet.js',
      'CORS',
      'Docker',
      'Cloudinary (Media Storage)',
      'AWS S3',
      'Firebase Admin',
      'Cron Jobs',
      'Stripe / Razorpay (Payments)',
      'Environment Variables (.env)',
      'CI/CD (GitHub Actions / Vercel / Railway)'
    ]
    
  },
  {
    title: 'AI Tools',
    icon: '🤖',
    items: [
      'OpenAI',
      'LangChain',
      'GPT-4 / GPT-3.5',
      'ChatGPT API',
      'OpenAI Embeddings',
      'Vector Databases (Pinecone, Weaviate, Chroma)',
      'LLM Chains',
      'Agents (LangChain Agents)',
      'Tools / Tool Calling (Functions)',
      'LangServe / LangSmith',
      'LlamaIndex',
      'Gradio / Streamlit (for Demos)',
      'Google Gemini',
      'Groq Cloude'
    ]
    
  },
  {
    title: 'DevOps',
    icon: '🚀',
    items: [
      'Docker',
      'GitHub',
      'GitHub Actions',
      'GitLab CI/CD',
      'Bitbucket',
      'Railway',
      'Render',
      'Vercel',
      'Netlify',
      'Heroku',
      'AWS (EC2, S3, Lambda)',
      'Google Cloud Platform (GCP)',
      'Azure',
      'PM2 (Process Manager)',
      'Nodemon',
      'CI/CD Pipelines',
      'Kubernetes',
      'Docker Compose',
      'Postman (API Testing)',
      'Monitoring (Grafana, Prometheus)',
      'Logging (LogRocket, Sentry)',
      'SSL Certificates',
      'Environment Variables (.env)',
      'Domain Management (GoDaddy, Namecheap)'
    ]
    
  },
  {
    title: 'Integrations',
    icon: '🔗',
    items: [
      'Email APIs (Nodemailer, Resend, Mailgun, SendGrid)',
      'LinkedIn API',
      'Stripe (Payments)',
      'Razorpay',
      'PayPal',
      'Google OAuth / Facebook Login',
      'Auth0',
      'Firebase Auth',
      'Twilio (SMS / WhatsApp)',
      'Fast2SMS',
      'OpenAI API',
      'Google Maps API',
      'Cloudinary (Image Upload)',
      'AWS S3 (File Storage)',
      'IP Geolocation API',
      'PDF Generation (pdf-lib / puppeteer)',
      'Slack API',
      'Zoom API',
      'Telegram Bot API',
      'WhatsApp Cloud API',
      'REST & GraphQL APIs',
      'Webhooks',
      'Webhook.site (Testing)',
      'Pabbly / Zapier (No-code Integration)',
      'CRM APIs (HubSpot, Zoho)'
    ]
    
  },
];

const testimonials = [
  {
    name: 'Amit Sharma',
    role: 'Startup Founder',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    feedback: 'Working with Tousif was a game-changer. He delivered our project ahead of schedule and exceeded expectations in both design and performance!'
  },
  {
    name: 'Priya Verma',
    role: 'Product Manager',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    feedback: 'Superb communication and technical skills. Our web app is now lightning fast and looks stunning. Highly recommended for any MERN stack work.'
  },
  {
    name: 'Athar hussain',
    role: 'Agency Owner',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    feedback: 'Professional, reliable, and creative. Tousif handled complex integrations and AI features with ease. Will hire again!'
  },
  {
    name: 'Sara Khan',
    role: 'Freelance Designer',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    feedback: 'Loved the collaboration! The code quality and UI polish were top-notch. My clients are super happy.'
  },
];

const communityWork = [
  {
    icon: '🤝',
    title: 'Mentored juniors in MERN stack',
    desc: 'Guided and supported junior developers in learning and building real-world MERN stack projects.'
  },
  {
    icon: '🌍',
    title: 'Contributed to open-source (GitHub)',
    desc: 'Actively contributed code, documentation, and bug fixes to open-source repositories and community projects.'
  },
  {
    icon: '🎤',
    title: 'Spoke at tech webinars',
    desc: 'Shared knowledge and best practices as a guest speaker at online tech events and webinars.'
  },
  {
    icon: '👥',
    title: 'Organized local coding meetups',
    desc: 'Brought together developers for learning, networking, and collaboration in local coding meetups.'
  },
  {
    icon: '🛡️',
    title: 'Helped moderate online dev communities',
    desc: 'Supported healthy discussions and learning by moderating developer forums and Discord/Slack groups.'
  },
  {
    icon: '🔍',
    title: 'Reviewed PRs for open-source projects',
    desc: 'Reviewed and provided feedback on pull requests to help maintain code quality in open-source projects.'
  },
];

const Home = () => {
  const heroTextRef = useRef(null);
  const heroImgRef = useRef(null);
  const skillsRef = useRef([]);
  const servicesCardRef = useRef([]);
  const achievementsRef = useRef([]);
  const typewriterText = useTypewriter(roles, 70, 1200);
  const techStackGroupRef = useRef([]);
  const testimonialsRef = useRef([]);
  const communityRef = useRef([]);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const testimonialsToShow = () => {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };
  const [showCount, setShowCount] = useState(testimonialsToShow());

  useEffect(() => {
    const handleResize = () => setShowCount(testimonialsToShow());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = testimonials.length - showCount;
  const goLeft = () => setTestimonialIndex(i => Math.max(i - 1, 0));
  const goRight = () => setTestimonialIndex(i => Math.min(i + 1, maxIndex));

  useEffect(() => {
    if (heroTextRef.current) {
      gsap.fromTo(
        heroTextRef.current,
        { opacity: 0, x: -60 },
        { opacity: 1, x: 0, duration: 1.2, ease: 'power3.out' }
      );
    }
    if (heroImgRef.current) {
      gsap.fromTo(
        heroImgRef.current,
        { opacity: 0, x: 60, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 1.2, delay: 0.2, ease: 'power3.out' }
      );
    }
    if (skillsRef.current && skillsRef.current.length > 0) {
      gsap.fromTo(
        skillsRef.current.filter(Boolean),
        { opacity: 0, y: 40, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.12,
          delay: 0.5,
          ease: 'back.out(1.7)',
        }
      );
    }
    if (servicesCardRef.current && servicesCardRef.current.length > 0) {
      gsap.fromTo(
        servicesCardRef.current.filter(Boolean),
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.1, stagger: 0.12, delay: 0.7, ease: 'power3.out' }
      );
    }
    if (achievementsRef.current && achievementsRef.current.length > 0) {
      gsap.fromTo(
        achievementsRef.current.filter(Boolean),
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, delay: 1.1, ease: 'power3.out', stagger: 0.18 }
      );
    }
    if (techStackGroupRef.current && techStackGroupRef.current.length > 0) {
      gsap.fromTo(
        techStackGroupRef.current.filter(Boolean),
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          delay: 0.3,
          ease: 'back.out(1.7)',
        }
      );
    }
    if (testimonialsRef.current && testimonialsRef.current.length > 0) {
      gsap.fromTo(
        testimonialsRef.current.filter(Boolean),
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.18,
          delay: 1.3,
          ease: 'power3.out',
        }
      );
    }
    if (communityRef.current && communityRef.current.length > 0) {
      gsap.fromTo(
        communityRef.current.filter(Boolean),
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          stagger: 0.18,
          delay: 1.5,
          ease: 'power3.out',
        }
      );
    }
  }, []);

  const [communityIndex, setCommunityIndex] = useState(0);
  const communityToShow = () => {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768) return 2;
    return 1;
  };
  const [communityShowCount, setCommunityShowCount] = useState(communityToShow());

  useEffect(() => {
    const handleResize = () => setCommunityShowCount(communityToShow());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const communityMaxIndex = communityWork.length - communityShowCount;
  const goCommunityLeft = () => setCommunityIndex(i => Math.max(i - 1, 0));
  const goCommunityRight = () => setCommunityIndex(i => Math.min(i + 1, communityMaxIndex));

  return (
    <main className="w-full min-h-screen bg-gradient-to-br from-[#0f1535] via-[#1e2746] to-[#2e3a5e] text-white">
      {/* Hero Section */}
      <section className="relative flex flex-col-reverse md:flex-row items-center justify-between min-h-[80vh] max-w-7xl mx-auto px-4 py-12 md:py-24 gap-8">
        {/* Left: Text */}
        <div ref={heroTextRef} className="flex-1 z-10 text-left space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-100 bg-clip-text text-transparent drop-shadow-lg">
            Hi, I'm Md Tousif Alam
      </h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 tracking-wide bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent min-h-[2.5rem]">
            {typewriterText}
          </h2>
          <p className="text-lg md:text-xl text-blue-100/90 max-w-xl mb-6">
            I build modern, beautiful, and high-performance websites & apps for businesses and individuals. Let's work together to bring your ideas to life!
          </p>
          <div className="flex gap-3">
            <a href="/contact" className="inline-block px-10 py-2 text-center rounded-full bg-gradient-to-r from-cyan-400 to-blue-700 shadow-lg font-medium text-base uppercase tracking-wide hover:scale-105 hover:from-blue-700 hover:to-cyan-400 transition-all duration-200">
              Hire Me
            </a>
            <a
              href={`${import.meta.env.VITE_API_BASE_URL}/resume`}
              download
              className="inline-block px-10 py-2 rounded-full bg-gradient-to-r from-blue-700 to-cyan-400 shadow-lg font-medium text-base uppercase tracking-wide flex items-center gap-2 hover:scale-105 hover:from-cyan-400 hover:to-blue-700 transition-all duration-200"
            >
              <FaDownload className="text-lg" /> Resume
            </a>
          </div>
          <div className="flex gap-6 mt-8">
            <a
              href="https://github.com/tousif7632"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl hover:text-cyan-400 transition-colors"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/md-tousif-alam-25782327a/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl hover:text-cyan-400 transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <Link
              to="/contact"
              className="text-3xl hover:text-cyan-400 transition-colors"
              aria-label="Contact"
            >
              <FaEnvelope />
            </Link>
          </div>
        </div>
        {/* Right: Image with gradient ring and floating effect */}
        <div ref={heroImgRef} className="flex-1 flex items-center justify-center relative w-full md:w-auto mb-10 md:mb-0">
          <div className="relative group">
            <div className="absolute -inset-2 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-700 to-blue-900 blur-xl opacity-60 group-hover:scale-110 transition-transform duration-500" />
            <img
              src="https://avatars.githubusercontent.com/u/9919?v=4"
              alt="Profile"
              className="w-56 h-56 md:w-72 md:h-72 rounded-full border-8 border-white/10 shadow-2xl object-cover relative z-10 group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
        {/* Decorative shapes */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-cyan-400/20 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-blue-700/20 rounded-full blur-3xl -z-10 animate-pulse" />
      </section>

      {/* Tech Stack & Tools Section (Grouped) */}
      <section className="py-16 px-4 bg-transparent">
        <h3 className="text-3xl font-bold text-center mb-10 text-cyan-200 tracking-wider drop-shadow flex items-center justify-center gap-2">⚙️ Tech Stack & Tools</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {techStackGroups.map((group, idx) => (
            <div
              key={group.title}
              ref={el => (techStackGroupRef.current[idx] = el)}
              className="glass-card bg-white/20 border-2 border-cyan-400/30 rounded-2xl shadow-2xl p-8 flex flex-col items-center hover:scale-105 hover:border-cyan-400 transition-transform duration-300 backdrop-blur-xl min-h-[420px] max-h-[420px]"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">{group.icon}</span>
                <span className="text-xl font-bold text-cyan-100 tracking-wide">{group.title}</span>
              </div>
              <ul className="flex flex-wrap justify-center gap-2 mt-2 overflow-y-auto scrollbar-thin scrollbar-thumb-cyan-300/40 scrollbar-track-transparent max-h-56 w-full">
                {group.items.map((item, i) => (
                  <li key={i} className="bg-cyan-400/10 text-cyan-100 px-3 py-1 rounded-lg text-base font-medium shadow-sm border border-cyan-400/20 mb-2">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-transparent">
        <h3 className="text-3xl font-bold text-center mb-10 text-cyan-200 tracking-wider drop-shadow">What I Do</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {services.map((service, idx) => (
            <div
              key={service.title}
              ref={el => (servicesCardRef.current[idx] = el)}
              className="glass-card bg-white/10 border border-blue-400/20 rounded-2xl shadow-xl p-8 text-center hover:scale-105 transition-transform duration-300 backdrop-blur-md flex flex-col items-center"
            >
              <div className="text-4xl mb-4 drop-shadow-lg">{service.icon}</div>
              <h4 className="text-xl font-bold text-cyan-100 mb-2 tracking-wide">{service.title}</h4>
              <p className="text-blue-100/80 text-base">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#1e2746]/80 via-[#2e3a5e]/80 to-[#0f1535]/80 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-400/20 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-700/20 rounded-full blur-3xl -z-10 animate-pulse" />
        <h3 className="text-4xl font-extrabold text-center mb-14 bg-gradient-to-r from-cyan-300 to-blue-200 bg-clip-text text-transparent tracking-wider drop-shadow-lg">Achievements</h3>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {achievementData.map((group, i) => (
            <div
              key={group.title}
              ref={el => (achievementsRef.current[i] = el)}
              className="relative glass-card bg-gradient-to-br from-white/10 via-cyan-200/10 to-blue-400/10 border border-cyan-400/30 rounded-3xl shadow-2xl p-10 backdrop-blur-xl hover:scale-105 transition-transform duration-300 group"
            >
              <div className="flex items-center gap-4 mb-5">
                <span className="text-4xl md:text-5xl drop-shadow-lg group-hover:scale-125 transition-transform duration-300">{group.icon}</span>
                <h4 className="text-2xl md:text-3xl font-bold text-cyan-100 tracking-wide drop-shadow">{group.title}</h4>
              </div>
              <ul className="space-y-4 mt-2">
                {group.items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-blue-100/90 text-base md:text-lg bg-white/5 rounded-xl px-4 py-3 shadow-sm border-l-4 border-cyan-400/40 hover:bg-cyan-400/10 transition-colors duration-200 animate-achievement-item"
                    style={{ animationDelay: `${0.15 * idx + 0.2}s` }}
                  >
                    <span className="mt-1 text-cyan-300 text-lg">✔️</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
    </div>
  </section>

{/* Testimonials Section (Carousel) */}
<section className="py-20 px-4 bg-transparent">
  <h3 className="text-3xl font-bold text-center mb-12 text-cyan-200 tracking-wider drop-shadow">Testimonials</h3>
  <div className="relative max-w-6xl mx-auto">
    {/* Carousel Controls */}
    <button
      onClick={goLeft}
      disabled={testimonialIndex === 0}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-cyan-400/30 hover:bg-cyan-400/60 text-white p-3 rounded-full shadow-lg transition disabled:opacity-40"
      aria-label="Previous testimonials"
    >
      <FaChevronLeft size={22} />
    </button>
    <button
      onClick={goRight}
      disabled={testimonialIndex === maxIndex}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-cyan-400/30 hover:bg-cyan-400/60 text-white p-3 rounded-full shadow-lg transition disabled:opacity-40"
      aria-label="Next testimonials"
    >
      <FaChevronRight size={22} />
    </button>
    {/* Carousel Slides */}
    <div className="overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${testimonialIndex * (100 / showCount)}%)` }}
      >
        {testimonials.map((t, idx) => (
          <div
            key={t.name}
            className="min-w-0 w-full md:w-1/2 lg:w-1/3 px-2 flex-shrink-0"
            style={{ flex: `0 0 ${100 / showCount}%` }}
          >
            <div className="glass-card bg-white/10 border border-cyan-400/20 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 backdrop-blur-md mx-2">
              <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full border-2 border-cyan-300 shadow mb-4 object-cover" />
              <p className="text-blue-100/90 text-base mb-4 italic">"{t.feedback}"</p>
              <div className="mt-auto">
                <div className="font-bold text-cyan-100 text-lg">{t.name}</div>
                <div className="text-cyan-200 text-sm">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    {/* Dots */}
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: maxIndex + 1 }).map((_, i) => (
        <button
          key={i}
          onClick={() => setTestimonialIndex(i)}
          className={`w-3 h-3 rounded-full ${i === testimonialIndex ? 'bg-cyan-400' : 'bg-cyan-200/40'} transition`}
          aria-label={`Go to testimonials ${i + 1}`}
        />
      ))}
    </div>
  </div>
</section>
{/* Volunteer / Community Work Section (Carousel) */}
<section className="py-20 px-4 bg-transparent">
  <h3 className="text-3xl font-bold text-center mb-12 text-cyan-200 tracking-wider drop-shadow">Volunteer / Community Work</h3>
  <div className="relative max-w-4xl mx-auto">
    {/* Carousel Controls */}
    <button
      onClick={goCommunityLeft}
      disabled={communityIndex === 0}
      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-cyan-400/30 hover:bg-cyan-400/60 text-white p-3 rounded-full shadow-lg transition disabled:opacity-40"
      aria-label="Previous community work"
    >
      <FaChevronLeft size={22} />
    </button>
    <button
      onClick={goCommunityRight}
      disabled={communityIndex === communityMaxIndex}
      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-cyan-400/30 hover:bg-cyan-400/60 text-white p-3 rounded-full shadow-lg transition disabled:opacity-40"
      aria-label="Next community work"
    >
      <FaChevronRight size={22} />
    </button>
    {/* Carousel Slides */}
    <div className="overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${communityIndex * (100 / communityShowCount)}%)` }}
      >
        {communityWork.map((item, idx) => (
          <div
            key={item.title}
            className="min-w-0 w-full md:w-1/2 lg:w-1/3 px-2 flex-shrink-0"
            style={{ flex: `0 0 ${100 / communityShowCount}%` }}
          >
            <div className="glass-card bg-white/10 border border-cyan-400/20 rounded-2xl shadow-xl p-8 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 backdrop-blur-md mx-2">
              <span className="text-4xl mb-4">{item.icon}</span>
              <div className="font-bold text-cyan-100 text-lg mb-2">{item.title}</div>
              <div className="text-blue-100/90 text-base">{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    {/* Dots */}
    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: communityMaxIndex + 1 }).map((_, i) => (
        <button
          key={i}
          onClick={() => setCommunityIndex(i)}
          className={`w-3 h-3 rounded-full ${i === communityIndex ? 'bg-cyan-400' : 'bg-cyan-200/40'} transition`}
          aria-label={`Go to community work ${i + 1}`}
        />
      ))}
    </div>
  </div>
</section>
    </main>
);
};

export default Home;
