import Groq from "groq-sdk";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Read resume data
const getResumeData = () => {
  try {
    const resumePath = path.join(__dirname, "../data/resume.txt");
    return fs.readFileSync(resumePath, "utf8");
  } catch (error) {
    console.error("Error reading resume:", error);
    return "Resume data not available";
  }
};

export async function chatWithResume(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ 
        success: false, 
        message: "Message is required" 
      });
    }

    const resumeData = getResumeData();

    const systemPrompt = `You are an AI assistant representing MD TOUSIF ALAM, a Full Stack MERN Developer. 
    You have access to his resume information and should answer questions about his experience, skills, projects, and background.
    
    Here is his resume information:
    ${resumeData}
    
    Instructions:
    1. Answer questions based ONLY on the resume information provided
    2. Be professional and helpful
    3. If asked about something not in the resume, politely say you don't have that information
    4. Keep responses concise but informative
    5. Always represent MD TOUSIF ALAM professionally
    6. If asked about contact information, provide it from the resume
    7. If asked about projects, describe them based on the resume details`;

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: message,
        },
      ],
      model: "llama-3.3-70b-versatile",
      max_tokens: 1000,
      temperature: 0.7,
    });

    const response = chatCompletion.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";

    res.json({
      success: true,
      message: response,
    });

  } catch (error) {
    console.error("Chatbot error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your request",
    });
  }
}

// Keep the original functions for backward compatibility
export async function main() {
  const chatCompletion = await getGroqChatCompletion();
  console.log(chatCompletion.choices[0]?.message?.content || "");
}

export async function getGroqChatCompletion() {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "Hi how can i help you.",
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
}