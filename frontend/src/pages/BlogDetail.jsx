import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const HeartFilled = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="#e11d48" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#e11d48" className="w-5 h-5 inline">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.435 6.582a5.373 5.373 0 00-7.6 0l-.835.836-.835-.836a5.373 5.373 0 00-7.6 7.6l.836.835 7.6 7.6 7.6-7.6.836-.835a5.373 5.373 0 000-7.6z" />
  </svg>
);
const HeartOutline = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#e11d48" className="w-5 h-5 inline">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.435 6.582a5.373 5.373 0 00-7.6 0l-.835.836-.835-.836a5.373 5.373 0 00-7.6 7.6l.836.835 7.6 7.6 7.6-7.6.836-.835a5.373 5.373 0 000-7.6z" />
  </svg>
);

// Helper to get/set like status from localStorage
const getLikedComments = () => {
  try {
    return JSON.parse(localStorage.getItem('likedComments') || '{}');
  } catch {
    return {};
  }
};
const setLikedComments = (obj) => {
  localStorage.setItem('likedComments', JSON.stringify(obj));
};

const BlogDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [comments, setComments] = useState([]);
  const [commentForm, setCommentForm] = useState({ user: '', comment: '' });
  const [commentStatus, setCommentStatus] = useState('');
  const [replyForms, setReplyForms] = useState({});
  const [likeLoading, setLikeLoading] = useState({});
  const [likedComments, setLikedCommentsState] = useState(getLikedComments());

  const fetchBlog = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/blogs/${id}`);
      setBlog(res.data);
      setComments(res.data.comments || []);
      setLoading(false);
    } catch {
      setError('Failed to load blog.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlog();
    setLikedCommentsState(getLikedComments());
    // eslint-disable-next-line
  }, [id]);

  const handleCommentChange = e => {
    setCommentForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleCommentSubmit = async e => {
    e.preventDefault();
    setCommentStatus('');
    try {
      const res = await api.post(`/blogs/${id}/comment`, {
        user: commentForm.user,
        comment: commentForm.comment,
      });
      setComments(res.data.comments || []);
      setCommentForm({ user: '', comment: '' });
      setCommentStatus('Comment added!');
      fetchBlog();
    } catch {
      setCommentStatus('Failed to add comment.');
    }
  };

  // Like/Unlike comment (YouTube style)
  const handleLikeToggle = async (commentId, liked) => {
    setLikeLoading(l => ({ ...l, [commentId]: true }));
    let newLikedComments = { ...likedComments };
    if (liked) {
      // Unlike
      delete newLikedComments[commentId];
    } else {
      // Like
      newLikedComments[commentId] = true;
    }
    setLikedComments(newLikedComments);
    setLikedCommentsState(newLikedComments);
    try {
      await api.post(`/blogs/${id}/comment/${commentId}/like`); // backend just updates count
      fetchBlog();
    } catch {}
    setLikeLoading(l => ({ ...l, [commentId]: false }));
  };

  useEffect(() => {
    setLikedCommentsState(getLikedComments());
  }, []);

  // Reply form handlers
  const handleReplyChange = (commentId, e) => {
    setReplyForms(f => ({
      ...f,
      [commentId]: { ...f[commentId], [e.target.name]: e.target.value }
    }));
  };

  const handleReplySubmit = async (commentId, e) => {
    e.preventDefault();
    const reply = replyForms[commentId];
    if (!reply || !reply.user || !reply.comment) return;
    try {
      await api.post(`/blogs/${id}/comment/${commentId}/reply`, reply);
      setReplyForms(f => ({ ...f, [commentId]: { user: '', comment: '' } }));
      fetchBlog();
    } catch {}
  };

  // Delete comment (Admin only)
  const handleDeleteComment = async (commentId) => {
    if (!user || user.role !== 'admin') {
      alert('Only admins can delete comments');
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this comment?')) {
      try {
        const token = localStorage.getItem('token');
        await api.delete(`/blogs/${id}/comment/${commentId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        fetchBlog();
      } catch (error) {
        alert('Failed to delete comment');
      }
    }
  };

  // Delete reply (Admin only)
  const handleDeleteReply = async (commentId, replyId) => {
    if (!user || user.role !== 'admin') {
      alert('Only admins can delete replies');
      return;
    }
    
    if (window.confirm('Are you sure you want to delete this reply?')) {
      try {
        const token = localStorage.getItem('token');
        await api.delete(`/blogs/${id}/comment/${commentId}/reply/${replyId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        fetchBlog();
      } catch (error) {
        alert('Failed to delete reply');
      }
    }
  };

  if (loading) return <div className="text-center py-20 text-blue-700">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-600">{error}</div>;
  if (!blog) return null;

  // Helper to get current user name for like/unlike (from comment form or reply form)
  const getCurrentUserName = (commentId) => {
    return (
      commentForm.user || (replyForms[commentId]?.user) || ''
    );
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold text-blue-800 mb-2">{blog.title}</h1>
      <div className="mb-4 text-gray-600">By {blog.author} | {blog.category}</div>
      {blog.image && <img src={blog.image} alt={blog.title} className="w-full rounded-lg mb-6" />}
      <div className="prose prose-blue max-w-none mb-8" style={{ whiteSpace: 'pre-line' }}>{blog.content}</div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Comments</h2>
        {comments.length === 0 && <div className="text-gray-500">No comments yet.</div>}
        <ul className="space-y-4">
          {comments.map((c, i) => {
            const liked = likedComments[c._id] || false;
            return (
              <li key={c._id || i} className="bg-gray-100 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-blue-700">{c.user}</span>
                  <button
                    className="ml-2 focus:outline-none"
                    title="Like/Unlike"
                    onClick={() => handleLikeToggle(c._id, liked)}
                    disabled={likeLoading[c._id]}
                  >
                    {liked ? <HeartFilled /> : <HeartOutline />}
                  </button>
                  <span className="text-sm text-gray-600">{c.likes || 0} Like{c.likes === 1 ? '' : 's'}</span>
                  <button
                    className="ml-4 text-cyan-700 hover:underline text-sm"
                    onClick={() => setReplyForms(f => ({ ...f, [c._id]: f[c._id] ? undefined : { user: '', comment: '' } }))}
                  >
                    Reply
                  </button>
                  {user && user.role === 'admin' && (
                    <button
                      className="ml-4 text-red-600 hover:text-red-800 hover:underline text-sm"
                      onClick={() => handleDeleteComment(c._id)}
                      title="Delete Comment (Admin Only)"
                    >
                      Delete
                    </button>
                  )}
                </div>
                <div className="text-gray-700 mb-2">{c.comment}</div>
                {/* Replies */}
                {c.replies && c.replies.length > 0 && (
                  <ul className="ml-6 space-y-2">
                    {c.replies.map((r, ri) => (
                      <li key={r._id || ri} className="bg-white rounded p-2 border border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-semibold text-blue-600">{r.user}</span>: <span>{r.comment}</span>
                          </div>
                          {user && user.role === 'admin' && (
                            <button
                              className="text-red-600 hover:text-red-800 hover:underline text-sm"
                              onClick={() => handleDeleteReply(c._id, r._id)}
                              title="Delete Reply (Admin Only)"
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                {/* Reply Form */}
                {replyForms[c._id] && (
                  <form onSubmit={e => handleReplySubmit(c._id, e)} className="mt-2 space-y-2">
                    <input
                      type="text"
                      name="user"
                      placeholder="Your Name"
                      value={replyForms[c._id].user || ''}
                      onChange={e => handleReplyChange(c._id, e)}
                      required
                      className="w-full px-3 py-2 border border-gray-200 rounded"
                    />
                    <textarea
                      name="comment"
                      placeholder="Your Reply"
                      value={replyForms[c._id].comment || ''}
                      onChange={e => handleReplyChange(c._id, e)}
                      required
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-200 rounded"
                    />
                    <button type="submit" className="px-4 py-1 bg-cyan-700 text-white rounded hover:bg-cyan-800">Send Reply</button>
                  </form>
                )}
              </li>
            );
          })}
        </ul>
      </div>
      <form onSubmit={handleCommentSubmit} className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <h3 className="text-lg font-semibold">Add a Comment</h3>
        <input type="text" name="user" placeholder="Your Name" value={commentForm.user} onChange={handleCommentChange} required className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
        <textarea name="comment" placeholder="Your Comment" value={commentForm.comment} onChange={handleCommentChange} required rows={3} className="w-full px-4 py-2 border border-gray-200 rounded-lg" />
        <button type="submit" className="px-6 py-2 bg-blue-700 text-white rounded-lg font-semibold hover:bg-cyan-500 transition-colors">Submit</button>
        {commentStatus && <div className={`text-center mt-2 animate-fade-in-up ${commentStatus.startsWith('Comment') ? 'text-green-600' : 'text-red-600'}`}>{commentStatus}</div>}
      </form>
    </div>
  );
};

export default BlogDetail; 