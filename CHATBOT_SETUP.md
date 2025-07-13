# Resume-Based Chatbot Setup Guide

## Overview
The chatbot has been enhanced to read my resume data and answer questions about your experience, skills, projects, and background.

## Features
- Reads resume data from `backend/data/resume.txt`
- Uses Groq AI (Llama 3.3 70B model) for intelligent responses
- Answers questions about:
  - Work experience
  - Skills and technologies
  - Projects
  - Education and certifications
  - Contact information
  - Professional background

## Setup Instructions

### 1. Environment Variables
Create a `.env` file in the backend directory with:
```
GROQ_API_KEY=your_groq_api_key_here
```

### 2. Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### 3. Start the Application
```bash
# Start backend (from backend directory)
npm start

# Start frontend (from frontend directory)
npm run dev
```

## API Endpoint
- **POST** `/api/chatbot/`
- **Body**: `{ "message": "your question here" }`
- **Response**: `{ "success": true, "message": "AI response" }`

## Example Questions
- "What is your experience with React?"
- "Tell me about your projects"
- "What are your skills?"
- "Where do you work currently?"
- "What is your contact information?"

## How It Works
1. User sends a question through the frontend chatbot interface
2. Backend reads the resume data from `resume.txt`
3. Creates a system prompt with resume information
4. Sends user question + resume context to Groq AI
5. Returns AI-generated response based on resume data

## Files Modified
- `backend/controllers/chatbotController.js` - Main chatbot logic
- `frontend/src/services/api.js` - API call structure
- `frontend/src/pages/Chatbot.jsx` - Frontend interface
- `backend/data/resume.txt` - Resume data source 