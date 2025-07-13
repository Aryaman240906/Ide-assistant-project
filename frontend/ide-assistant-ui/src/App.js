import React, { useState } from "react";
import API from "./api";

function App() {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]); // Array of chat objects

  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    // 👩‍💻 Add user's message to chat first
    const newHistory = [...chatHistory, { from: "user", text: userMessage }];

    try {
      // 📤 Send the message to backend
      const res = await API.post("/send", { message: userMessage });

      // 🤖 Add AI response to chat history
      newHistory.push({ from: "ai", text: res.data.response });

      // 💾 Save the updated chat
      setChatHistory(newHistory);

      // ✨ Clear the input box
      setUserMessage("");
    } catch (error) {
      console.error("Error:", error);

      // ⚠️ Show error if backend fails
      newHistory.push({ from: "ai", text: "⚠️ Failed to reach backend." });
      setChatHistory(newHistory);
    }
  };

  return (
    <div
      className="App"
      style={{
        padding: "2rem",
        fontFamily: "sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>💬 IDE Assistant Chat</h1>

      <input
        type="text"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="Type your message..."
        style={{
          width: "70%",
          padding: "10px",
          fontSize: "16px",
          marginTop: "20px",
        }}
      />

      <button
        onClick={sendMessage}
        style={{
          marginLeft: "10px",
          padding: "10px 20px",
          fontSize: "16px",
          background: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          marginTop: "10px",
        }}
      >
        Send
      </button>

      {/* 💬 CHAT BUBBLES DISPLAY */}
      <div style={{ marginTop: "30px", width: "70%" }}>
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            style={{
              background: msg.from === "user" ? "#DCF8C6" : "#f1f1f1",
              padding: "10px 15px",
              borderRadius: "12px",
              marginBottom: "10px",
              alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
              textAlign: "left",
            }}
          >
            <strong>{msg.from === "user" ? "You" : "AI"}:</strong> {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
