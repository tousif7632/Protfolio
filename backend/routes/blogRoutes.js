import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  addComment,
  likeComment,
  replyToComment,
  deleteComment,
  deleteReply,
} from "../controllers/blogController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.post("/", protect, isAdmin, createBlog);
router.put("/:id", protect, isAdmin, updateBlog);
router.delete("/:id", protect, isAdmin, deleteBlog);
router.post("/:id/comment", addComment);
router.post("/:blogId/comment/:commentId/like", likeComment);
router.post("/:blogId/comment/:commentId/reply", replyToComment);
router.delete("/:blogId/comment/:commentId", protect, isAdmin, deleteComment);
router.delete("/:blogId/comment/:commentId/reply/:replyId", protect, isAdmin, deleteReply);

export default router;
