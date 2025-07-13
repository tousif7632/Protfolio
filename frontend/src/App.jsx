import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Blogs from './pages/Blogs';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './admin/Dashboard';
import AddBlog from './admin/AddBlog';
import AddProject from './admin/AddProject';
import Chatbot from './pages/Chatbot';
import BlogDetail from './pages/BlogDetail';
import AllBlogs from './admin/AllBlogs';
import AllProjects from './admin/AllProjects';

function AdminRoute({ children }) {
  const { user } = useAuth();
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  return children;
}

function ChatbotWrapper() {
  const location = useLocation();
  // Hide chatbot on admin routes
  if (location.pathname.startsWith('/admin')) return null;
  return <Chatbot />;
}

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="bg-white min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 pt-20">
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Projects />} />
              <Route path="/blog" element={<Blogs />} />
              <Route path="/blog/:id" element={<BlogDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Admin routes */}
              <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
              <Route path="/admin/add-blog" element={<AdminRoute><AddBlog /></AdminRoute>} />
              <Route path="/admin/add-project" element={<AdminRoute><AddProject /></AdminRoute>} />
              <Route path="/admin/blogs" element={<AdminRoute><AllBlogs /></AdminRoute>} />
              <Route path="/admin/projects" element={<AdminRoute><AllProjects /></AdminRoute>} />
            </Routes>
            <ChatbotWrapper />
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
