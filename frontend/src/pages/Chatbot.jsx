import React, { useState, useRef, useEffect } from 'react';
import { askChatbot } from '../services/api';
import { FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';

const demoMessages = [
  { from: 'bot', text: 'Hi! I\'m an AI assistant representing MD TOUSIF ALAM. Ask me anything about his experience, skills, projects, or background!' },
];

const Chatbot = () => {
  const [messages, setMessages] = useState(demoMessages);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async e => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    setMessages(msgs => [...msgs, userMsg]);
    setLoading(true);
    setInput('');
    try {
      const res = await askChatbot(input);
      setMessages(msgs => [...msgs, { from: 'bot', text: res.message }]);
    } catch (err) {
      setMessages(msgs => [...msgs, { from: 'bot', text: 'Sorry, there was an error. Please try again.' }]);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Floating Chat Icon */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-gradient-to-br from-blue-700 via-cyan-500 to-purple-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center transition-transform duration-300 hover:scale-110 hover:shadow-3xl border-4 border-white/40 animate-bounce"
          aria-label="Open Chatbot"
        >
          <FaRobot className="w-7 h-7" />
        </button>
      )}

      {/* Chatbot Window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-80 max-w-full bg-white/60 backdrop-blur-xl rounded-3xl shadow-2xl flex flex-col border border-blue-100 animate-fade-in-up overflow-hidden" style={{ 
          maxHeight: 'calc(100vh - 3rem)',
          minHeight: '400px',
          top: 'auto'
        }}>
          {/* Gradient Accent Bar */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-500" />
          <div className="flex items-center justify-between px-4 py-3 border-b bg-white/70">
            <h2 className="text-lg font-bold text-blue-800 flex items-center gap-2"><FaRobot className="text-blue-600" /> Chatbot</h2>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-blue-700 text-2xl font-bold" aria-label="Close Chatbot">&times;</button>
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 p-4 h-72 bg-gradient-to-br from-white/60 via-cyan-50 to-blue-100 chatbot-scrollbar">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`relative max-w-xs px-4 py-2 rounded-2xl shadow-md flex items-end gap-2 animate-achievement-item ${msg.from === 'user' ? 'bg-gradient-to-r from-blue-700 to-cyan-500 text-white rounded-br-none' : 'bg-white/80 text-blue-900 rounded-bl-none border border-blue-100'}`}
                  style={{ animationDelay: `${i * 0.05}s` }}>
                  {msg.from === 'user' ? <FaUser className="text-lg text-white/80" /> : <FaRobot className="text-lg text-blue-500" />}
                  <span>{msg.text}</span>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="px-4 py-2 rounded-2xl max-w-xs bg-white/80 text-blue-900 border border-blue-100 animate-pulse flex items-center gap-2">
                  <FaRobot className="text-blue-500" /> Thinking...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSend} className="flex gap-2 p-4 border-t bg-white/70">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white/80 transition-all duration-200 shadow-sm"
              disabled={loading}
            />
            <button type="submit" className="px-4 py-2 flex items-center gap-1 bg-gradient-to-r from-blue-700 to-cyan-500 text-white rounded-lg font-semibold shadow-lg hover:from-cyan-500 hover:to-blue-700 transition-transform duration-200 hover:scale-105 text-lg" disabled={loading}>
              <FaPaperPlane />
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
