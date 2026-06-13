// =============================
// Calling backend API
// =============================

export async function botsReply({ history, jobTitle, answerCount, API_URL, setChatHistory }) {
  try {
    // Convert frontend chat history -> backend format
    const formattedHistory = history.map(({ role, text }) => ({
      sender: role,
      text,
    }));

    // Send request to backend
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        jobTitle,
        messages: formattedHistory,
        answerCount,
      }),
    });

    const data = await response.json();

    // Backend returns: { reply: "..." }
    const aiText = data.reply;

    // Replace "Thinking..." with AI reply
    setChatHistory((prev) => [...prev.filter((msg) => msg.text !== "Thinking..."), { role: "assistant", text: aiText }]);
  } catch (error) {
    console.error("API Error:", error);

    // Remove "Thinking..." if error occurs
    setChatHistory((prev) => prev.filter((msg) => msg.text !== "Thinking..."));
  }
}
