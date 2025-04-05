import "../styling/Advice.css";
import { useState, useRef, useEffect } from "react";

import "../styling/menu.css";
import { Link } from "react-router-dom";
import Logo from "../styling/Removal-906.png";

import MenuPanel from "../components/MenuPanel";

function Advice({ goals, setGoals }) {
  const [chatLog, setChatLog] = useState([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);
  const [resources, setResources] = useState("");

  const handleSubmit = async () => {
    if (input.trim() === "") return;

    // Append a new chat entry to the log
    const res = await fetch(`${import.meta.env.VITE_API_URL}/getAnswer`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: input,
      }),
    });

    const res2 = await fetch(`${import.meta.env.VITE_API_URL}/getAnswer`, {
      method: "Post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: `${input}

Respond ONLY with 2 sources in this exact format. Do not include any explanation, summary, or additional commentary.

• Title: [Title]
  URL: [URL]

• Title: [Title]
  URL: [URL]`,
      }),
    });

    const data = await res.json();
    const answer = data.answer;

    const data2 = await res2.json();
    const source = data2.answer;

    setChatLog([...chatLog, { question: input, answer: answer }]);
    setInput("");
    setResources(source);
  };

  // accept 'enter' key to submit input
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatLog]);

  return (
    <div className="advice-page">
      <MenuPanel setter={setGoals} />

      <div className="advice-content-container">
        <div className="left-column">
          <div className="chat-panel">
            <div className="chat-messages">
              {chatLog.map((entry, index) => (
                <div key={index}>
                  <div className="message-row left">
                    <div className="dynamic-box question-box">
                      {entry.question}
                    </div>
                  </div>

                  <div className="message-row right">
                    <div className="dynamic-box answer-box">{entry.answer}</div>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>
        </div>

        <div className="right-column">
          <div className="faq-box">
            <h2>Resources</h2>
            {resources
              .split("•") // split the bullet points
              .filter((item) => item.trim() !== "") // remove empty strings
              .map((item, index) => (
                <p key={index}>• {item.trim()}</p>
              ))}
          </div>
        </div>
      </div>

      <div className="chat-input-wrapper">
        <div className="chat-input-panel">
          <input
            className="chat-input"
            type="text"
            placeholder="Ask me..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button className="chat-submit" onClick={handleSubmit}>
            Ask
          </button>
        </div>
      </div>
    </div>
  );
}

export default Advice;
