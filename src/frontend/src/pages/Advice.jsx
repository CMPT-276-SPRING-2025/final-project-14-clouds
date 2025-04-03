
import "../styling/Advice.css";
import { useState, useRef, useEffect } from "react";

import "../styling/menu.css";
import { Link } from "react-router-dom";
import Logo from "../styling/Removal-906.png";

import MenuPanel from "../components/MenuPanel";

function Advice() {
  const [chatLog, setChatLog] = useState([]);
  const [input, setInput] = useState("");     
  const chatEndRef = useRef(null);            

  const handleSubmit = () => {
    if (input.trim() === "") return;

    // Append a new chat entry to the log
    setChatLog([...chatLog, { question: input, answer: "thinking..." }]);
    setInput("");
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
      <MenuPanel />

      <div className="advice-content-container">
        <div className="left-column">
          <div className="chat-panel">
            <div className="chat-messages">
              {chatLog.map((entry, index) => (
                <div key={index}>
                  <div className="message-row left">
                    <div className="dynamic-box question-box">{entry.question}</div>
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
            <p>TODO: Hook up FAQ response content here once API is ready.</p>
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

export default Advice;