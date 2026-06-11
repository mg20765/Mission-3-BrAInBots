import React, { useRef, useEffect, useState } from "react";
import styles from "./App.module.css";
import turnersLogo from "./assets/turnersLogo.png";

import ChatbotPopup from "./components/ChatbotPopup.jsx";

// API logic extracted in its own file
import { botsReply } from "./components/botsReply.js";

function App() {
  const [showChatbot, setShowChatbot] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  // This handles the user's input message
  const [userMessage, setUserMessage] = useState("");

  // Tracks how many answers the user has given
  const [answerCount, setAnswerCount] = useState(0);

  // API URL
  const API_URL = "http://localhost:5001/api/interview";

  // Handle Job Title Submit
  const handleJobTitleSubmit = (e) => {
    e.preventDefault();

    if (!jobTitle.trim()) {
      alert("Please enter a job title before starting the interview.");
      return;
    }

    // Reset chat for a fresh interview.
    setChatHistory([
      {
        role: "assistant",
        text: `Geat - lets begin your ${jobTitle} interview.`,
      },
      { role: "assistant", text: "Tell me about yourself." },
    ]);

    // Reset answer count
    setAnswerCount(0);
  };

  // =========================================================
  // Handles the form submission when the user sends a message
  // =========================================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!jobTitle.trim()) {
      alert("Please enter a job title before sending a message.");
      return;
    }

    if (!userMessage.trim()) return;

    // Add user message
    const updatedHistory = [
      ...chatHistory,
      { role: "user", text: userMessage },
    ];

    setChatHistory(updatedHistory);

    // Increment answer count BEFORE sending to backend
    const newCount = answerCount + 1;
    setAnswerCount(newCount);

    // Add temporary "Thinking..."
    setChatHistory((prev) => [
      ...prev,
      { role: "assistant", text: "Thinking..." },
    ]);

    // API logic moved to separate file
    await botsReply({
      history: updatedHistory,
      jobTitle,
      answerCount: newCount,
      API_URL,
      setChatHistory,
    });

    // Clears the input area
    setUserMessage("");
  };

  // Handles Autoscroll when messaging
  const messagesEndRef = useRef(null);

  // Auto-scroll with additional messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  return (
    <>
      <ChatbotPopup showChatbot={showChatbot} setShowChatbot={setShowChatbot}>
        <main className={styles.main}>
          <header className={styles.header}>
            <img src={turnersLogo} alt="logo" style={{ width: 70 }} />
            <div className={styles.contactBlock}>
              <h2>brAIn-bot</h2>
              <p>Tina and Tom from Turners</p>
            </div>
          </header>

          {/* Job title input */}
          <form className={styles.jobTitle} onSubmit={handleJobTitleSubmit}>
            <label>Job Title:</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g., Junior Developer"
            />
          </form>

          {/* Messages Container */}
          <div className={styles.messageContainer}>
            {chatHistory.map((message, index) => (
              <p
                key={index}
                className={
                  message.role === "assistant"
                    ? styles.messageAI
                    : styles.messageUser
                }
              >
                {message.text}
              </p>
            ))}
            {/* Autoscroll Element */}
            <div ref={messagesEndRef} />
          </div>

          {/* Where the user types their reply and submits it */}
          <form className={styles.inputForm} onSubmit={handleSubmit}>
            <textarea
              placeholder="Message..."
              value={userMessage}
              onChange={(e) => setUserMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              className={styles.messageInput}
            />

            <button type="submit" className={styles.sendBtn}>
              ➤
            </button>
          </form>
        </main>
      </ChatbotPopup>
    </>
  );
}

export default App;
