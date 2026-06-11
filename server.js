
import "dotenv/config";
import express from "express";
import cors from "cors";
import OpenAI from "openai";


const app = express();

// Configure CORS to allow requests from the frontend
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }),
);

// Parse incoming JSON automatically

app.use(express.json());

// Create OpenAI instance
const openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Interview API
app.post("/api/interview", async (req, res) => {
  try {
    const { jobTitle, messages, answerCount } = req.body;

    if (!jobTitle || !messages) {
      return res.status(400).json({
        error: "Job title and messages are required",
      });
    }


    // Prepare conversation history
    const conversationText = messages
      .slice(-6)
      .map((msg) => `${msg.sender}: ${msg.text}`)
      .join("\n");

    let prompt = "";

    if (answerCount >= 6) {
      prompt = `
You are a professional job interviewer.

The candidate interviewed for this role:
${jobTitle}

Recent conversation:
${conversationText}

The interview is now finished.

Important rules:
- Do NOT ask any more questions.
- Give final interview feedback only.
- Keep the feedback clear and helpful.

Include:
1. What the candidate answered well
2. What the candidate needs to improve
3. Suggestions for stronger answers
4. A short overall summary

Respond as the AI interviewer.
`;
    } else {
      prompt = `
You are a professional job interviewer.

The candidate is interviewing for this role:
${jobTitle}

Recent conversation:
${conversationText}

Important rules:
- The first question has already been asked: "Tell me about yourself."
- Do not repeat the first question.
- Do not repeat previous questions.
- Do not ask hardcoded or generic repeated questions.
- Ask only ONE question.
- Ask a question relevant to the job role.
- Use the candidate's previous answers to decide the next question.
- Do not give final feedback yet.

The candidate has answered ${answerCount} question(s).

Ask the next best interview question only.

Respond as the AI interviewer.
`;
    }
    
// Send prompt to OpenAI
const result = await openAI.chat.completions.create({model: "gpt-4o-mini",
messages: [{ role: "user", content: prompt }], 
});

const reply = result.choices[0].message.content;

        res.json({ reply });     
      } catch (error) {  
            console.error("OpenAI Interview Error:", error);   
                  res.status(error.status || 500).json({error: error.message ||"AI response failed. Please check OpenAI API key or quota.", 

                          });    
                } });


// Server setup
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
