import express from "express";
import { chatWithResume } from "../controllers/chatbotController.js";

const router = express.Router();

router.post("/", chatWithResume);

export default router;
