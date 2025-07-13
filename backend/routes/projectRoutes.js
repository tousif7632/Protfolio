import express from 'express';
import {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/project', protect, isAdmin, createProject);
router.get('/', getProjects);
router.get('/:id', getProjectById);
router.put('/:id', protect, isAdmin, updateProject);
router.delete('/:id', protect, isAdmin, deleteProject);

export default router;
