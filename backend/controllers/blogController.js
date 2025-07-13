import Blog from "../models/Blog.js";

// Create Blog
export const createBlog = async (req, res) => {
  const {
    title,
    author,
    content,
    image,
    tags,
    category,
    published,
    publishedAt,
  } = req.body;

  try {
    const blog = await Blog.create({
      title,
      author,
      content,
      image,
      tags,
      category,
      published,
      publishedAt: published ? publishedAt || new Date() : null,
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Blog
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Blog
export const updateBlog = async (req, res) => {
  const {
    title,
    author,
    content,
    image,
    tags,
    category,
    published,
    publishedAt,
  } = req.body;

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.title = title || blog.title;
    blog.author = author || blog.author;
    blog.content = content || blog.content;
    blog.image = image || blog.image;
    blog.tags = tags || blog.tags;
    blog.category = category || blog.category;
    blog.published = published !== undefined ? published : blog.published;
    blog.publishedAt = published ? publishedAt || new Date() : null;

    const updated = await blog.save();
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Blog
export const deleteBlog = async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Blog not found" });

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add Comment
export const addComment = async (req, res) => {
  const { user, comment } = req.body;

  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    blog.comments.push({ user, comment });
    await blog.save();

    res.status(201).json({ message: "Comment added", comments: blog.comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Like/Unlike Comment
export const likeComment = async (req, res) => {
  const { blogId, commentId } = req.params;
  const { user } = req.body; // user email or id

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const comment = blog.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // Toggle like
    if (comment.likedBy.includes(user)) {
      comment.likedBy.pull(user);
      comment.likes = Math.max(0, comment.likes - 1);
    } else {
      comment.likedBy.push(user);
      comment.likes += 1;
    }

    await blog.save();
    res.status(200).json({ likes: comment.likes, likedBy: comment.likedBy });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reply to Comment
export const replyToComment = async (req, res) => {
  const { blogId, commentId } = req.params;
  const { user, comment } = req.body;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const parentComment = blog.comments.id(commentId);
    if (!parentComment) return res.status(404).json({ message: "Comment not found" });

    parentComment.replies.push({ user, comment });
    await blog.save();

    res.status(201).json({ replies: parentComment.replies });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Comment (Admin Only)
export const deleteComment = async (req, res) => {
  const { blogId, commentId } = req.params;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const comment = blog.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    // Remove the comment from the array
    blog.comments.pull(commentId);
    await blog.save();

    res.status(200).json({ message: "Comment deleted successfully", comments: blog.comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Reply (Admin Only)
export const deleteReply = async (req, res) => {
  const { blogId, commentId, replyId } = req.params;

  try {
    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const comment = blog.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    const reply = comment.replies.id(replyId);
    if (!reply) return res.status(404).json({ message: "Reply not found" });

    // Remove the reply from the array
    comment.replies.pull(replyId);
    await blog.save();

    res.status(200).json({ message: "Reply deleted successfully", comments: blog.comments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
