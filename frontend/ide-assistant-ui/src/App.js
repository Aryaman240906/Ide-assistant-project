import API from "./api";
import React, { useState } from "react";

function App() {
  const [userMessage, setUserMessage] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const sendMessage = async () => {
  if (!userMessage.trim()) return;

  try {
    const res = await API.post("/send", { message: userMessage });
    setAiResponse(res.data.response); // This saves backend's reply
  } catch (error) {
    console.error("Error sending message:", error);
    setAiResponse("⚠️ Failed to reach backend.");
  }
};

  return (
    <div className="App" style={{ padding: "2rem", fontFamily: "sans-serif" }}>
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
        }}
      >
        Send
      </button>
      {aiResponse && (
        <div
          style={{
            marginTop: "30px",
            padding: "15px",
            background: "#f1f1f1",
            borderRadius: "8px",
            maxWidth: "70%",
            fontSize: "16px",
          }}
        >
          <strong>AI:</strong> {aiResponse}
        </div>
      )}
    </div>
  );
}

export default App;
