import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api'; //your axios instance with baseURL

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const [token, setToken] = useState(() => localStorage.getItem('token') || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  //  Sync user/token to localStorage
  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');

    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [user, token]);

  // Update token on API headers
  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Login Function
  const login = async (email, password) => {
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', { email, password }, { withCredentials: true });
      setUser(res.data);
      setToken(res.data.token);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      setLoading(false);
      return false;
    }
  };

  // Register Function
  const register = async (name, email, password, confirmPassword) => {
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/register', { name, email, password, confirmPassword }, { withCredentials: true });
      setUser(res.data);
      setToken(res.data.token);
      setLoading(false);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
