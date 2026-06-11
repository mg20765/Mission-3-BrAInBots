AI Interview Chatbot
A React-based AI-powered interview simulator that lets users practice job interviews through a conversational chat interface.
Overview
Each session starts with a job title — from there, the AI steps in as the interviewer, opening with "Tell me about yourself" and continuing with role-specific questions. The conversation history is maintained throughout, and the interview wraps up after a set number of responses.
Features
• Job-specific interviews — tailor the session by entering any job title
• Conversational chat UI — message history displayed with distinct styling for user and AI turns
• Keyboard shortcut — press Enter to send, Shift + Enter for a new line
• Auto-scroll — the view follows the latest message automatically
• Responsive feedback — a "Thinking..." indicator appears while the AI is processing

Project Structure
src/
├── App.js # Main component — state, handlers, and layout
└── components/
└── botsReply.js # API logic — handles fetch requests and updates chat state

Key state variables (App.js)
Variable Type Purpose
showChatbot boolean Toggles chatbot popup visibility
jobTitle string Stores the role being interviewed for
chatHistory array Full conversation log
userMessage string Current value of the input field
answerCount number Tracks responses submitted; used to end the interview
Getting Started
Prerequisites
• Node.js
• The backend server running on localhost:5001 (required for AI responses)
Installation
bash
npm install
npm start
Make sure the backend server is running before starting the app, otherwise AI responses will fail.
How It Works

1. Enter a job title and submit to start a session
2. The AI opens with "Tell me about yourself"
3. Type a response and press Enter (or click send)
4. The AI replies after a short processing delay
5. The interview ends after a set number of answers
   Potential Improvements
   • Error handling — wrap handleSubmit in a try/catch to handle cases where the backend is unavailable
   • Loading state — replace the "Thinking..." text injection with a dedicated isTyping boolean and a proper animation
   • Unique keys — replace array index keys with crypto.randomUUID() for more robust list rendering
   • Accessibility — add aria-label attributes to the send button and ensure form labels are correctly associated with inputs

## Contributors

Github handles
Rebekah -BekahW
Ryan -ryanjonesnm-svg
Maria -mg20765
Varun -varungit111
