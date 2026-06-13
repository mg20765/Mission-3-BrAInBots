import React from "react";
import styles from "./ChatbotPopup.module.css";
import ChatbotIcon from "./ChatbotIcon.jsx";

export default function ChatbotPopup({ showChatbot, setShowChatbot, children }) {
  return (
    <div className={`${styles.container} ${showChatbot ? styles.showChatbot : ""}`}>
      <button className={styles.chatbotToggler} onClick={() => setShowChatbot((prev) => !prev)}>
        <span className={styles.toggleIcon}>{showChatbot ? "✕" : "💬"}</span>
      </button>

      <div className={styles.chatbotPopup}>
        <div className={styles.chatHeader}>
          <div className={styles.headerInfo}>
            <ChatbotIcon />
            <h2 className={styles.logoText}>AI Mock Interviewer</h2>
          </div>

          <button className={styles.closeBtn} onClick={() => setShowChatbot(false)}>
            ▼
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
