import React, { useState } from "react";

function App() {
  const [userMessage, setUserMessage] = useState("");

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
        onClick={() => alert(`You typed: ${userMessage}`)}
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
    </div>
  );
}

export default App;
