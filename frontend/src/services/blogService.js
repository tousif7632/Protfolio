import api from './api';

export const fetchBlogs = async () => {
  const res = await api.get('/blogs/');
  return res.data;
};
