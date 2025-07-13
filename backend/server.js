import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import errorHandler from './middleware/errorMiddleware.js';
import blogRoutes from './routes/blogRoutes.js';
import chatbotRoutes from './routes/chatbotRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import projecRoutes from './routes/projectRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
const app = express();
import cors from 'cors';

const PORT = process.env.PORT || 3000;

dotenv.config();
// Connect to MongoDB
connectDB();

app.use(cors({
  origin: 'https://protfolio-vodd.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/projects', projecRoutes);
app.use('/api/resume', resumeRoutes);

// Error handling middleware
app.use(errorHandler);


// Start the server 
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});