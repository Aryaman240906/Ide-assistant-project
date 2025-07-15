import { useEffect, useRef } from "react";
import React, { useState } from "react";
import API from "./api";

function formatLine(line) {
  const boldRegex = /\*\*(.*?)\*\*/g;
  const parts = line.split(boldRegex);
  return parts.map((part, i) => {
    if (i % 2 === 1) {
      return <strong key={i}>{part}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

function App() {
  const [userMessage, setUserMessage] = useState("");
  const inputRef = useRef(null);
  const [chatHistory, setChatHistory] = useState([]);
  const bottomRef = useRef(null);
  const [isThinking, setIsThinking] = useState(false);
  const [loaderDots, setLoaderDots] = useState("."); // ✅ loader

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  // ✅ Animated dots logic
  useEffect(() => {
    if (!isThinking) return;

    const interval = setInterval(() => {
      setLoaderDots((prev) => (prev.length < 3 ? prev + "." : "."));
    }, 500);

    return () => clearInterval(interval);
  }, [isThinking]);

  const sendMessage = async () => {
    if (!userMessage.trim()) return;

    const timestamp = new Date().toLocaleTimeString();
    const newHistory = [
      ...chatHistory,
      {
        from: "user",
        text: userMessage,
        timestamp: timestamp,
      },
    ];

    setIsThinking(true);

    try {
      const res = await API.post("/send", { message: userMessage });

      newHistory.push({
        from: "ai",
        text: res.data.response,
        timestamp: new Date().toLocaleTimeString(),
      });

      setChatHistory(newHistory);
      setUserMessage("");
      inputRef.current?.focus();
    } catch (error) {
      newHistory.push({
        from: "ai",
        text: "⚠️ Failed to reach backend.",
        timestamp: new Date().toLocaleTimeString(),
      });
      setChatHistory(newHistory);
    } finally {
      setIsThinking(false);
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

      <div
        style={{
          marginTop: "30px",
          width: "80%",
          maxHeight: "400px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            style={{
              alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
              background: msg.from === "user" ? "#DCF8C6" : "#F1F0F0",
              padding: "10px 15px",
              borderRadius: "12px",
              maxWidth: "70%",
              boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: "bold",
                marginBottom: "5px",
              }}
            >
              {msg.from === "user" ? "You" : "AI Assistant"}
            </div>

            {/* ✅ Step 1 of Module 3: Highlight warning messages heh*/}
            {msg.from === "ai" ? (
              <div
                style={{
                  fontSize: "15px",
                  lineHeight: "1.5",
                  padding: "10px",
                  borderRadius: "10px",
                  maxWidth: "70%",
                  backgroundColor: msg.text.startsWith("⚠️") || msg.text.startsWith("⏱️")
                    ? "#fff3cd" // yellow background
                    : "#f1f0f0", // normal gray
                  borderLeft: msg.text.startsWith("⚠️") || msg.text.startsWith("⏱️")
                    ? "4px solid #ffc107" // yellow bar
                    : "none",
                  color: msg.text.startsWith("⚠️") || msg.text.startsWith("⏱️")
                    ? "#856404" // dark yellow text
                    : "#000",
                  fontFamily: "monospace",
                }}
              >
                {msg.text}
              </div>
            ) : (
              <div
                style={{
                  fontSize: "16px",
                  whiteSpace: "pre-line",
                  overflowWrap: "break-word",
                  wordBreak: "break-word",
                }}
              >
                {msg.text}
              </div>
            )}


            <div
              style={{
                fontSize: "12px",
                marginTop: "5px",
                textAlign: "right",
                color: "#888",
              }}
            >
              {msg.timestamp}
            </div>
          </div>
        ))}
        <div ref={bottomRef}></div>
      </div>

      {/* ✅ Typing indicator */}
      {isThinking && (
        <div
          style={{
            marginTop: "10px",
            fontStyle: "italic",
            color: "#888",
            alignSelf: "flex-start",
            paddingLeft: "10px",
          }}
        >
          AI is thinking{loaderDots}
        </div>
      )}

      <input
        ref={inputRef}
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
    </div>
  );
}

export default App;