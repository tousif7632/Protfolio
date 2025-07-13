// models/Blog.js

import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
  user: String,
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const commentSchema = new mongoose.Schema({
  user: String,
  comment: String,
  likes: { type: Number, default: 0 },
  likedBy: [String],
  replies: [replySchema],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    author: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    image: {
      type: String // URL of featured image
    },
    tags: {
      type: [String], // Array of tags
      default: []
    },
    category: {
      type: String,
      default: "General"
    },
    published: {
      type: Boolean,
      default: false
    },
    publishedAt: {
      type: Date
    },
    comments: [commentSchema]
  },
  {
    timestamps: true // Automatically adds createdAt and updatedAt
  }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
