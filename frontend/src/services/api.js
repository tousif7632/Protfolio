import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default api;

export const askChatbot = async (message) => {
  const res = await api.post('/chatbot/', { message });
  return res.data;
};
