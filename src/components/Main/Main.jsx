import React, { useContext } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Main = () => {
  const {
    onSent,
    recentPrompt,
    showResult,
    loading,
    resultData,
    setInput,
    input,
  } = useContext(Context);

  const handleTemplateClick = (prompt) => {
    console.log("Template clicked:", prompt);
    setInput(prompt); 
    onSent(prompt); 
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Fern AI</p>
        <img src={assets.user_icon} alt="User Icon" />
      </div>
      <div className="main-container">
        {showResult ? (
          <div className="result">
            <div className="result-title">
              <img src={assets.user_icon} alt="User Icon" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="Gemini Icon" />
              {loading ? (
                <div className="loader">
                  <hr className="animated-bg" />
                  <hr className="animated-bg" />
                  <hr className="animated-bg" />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="greet">
              <p>
                <span>Hello, Dev.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              {[
                {
                  text: "Suggest beautiful places to see on an upcoming road trip",
                  icon: assets.compass_icon,
                },
                {
                  text: "Briefly summarize this concept: urban planning",
                  icon: assets.bulb_icon,
                },
                {
                  text: "Brainstorm team bonding activities for our work retreat",
                  icon: assets.message_icon,
                },
                {
                  text: "Explain about React JS",
                  icon: assets.code_icon,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="card"
                  onClick={() => handleTemplateClick(item.text)}
                >
                  <p>{item.text}</p>
                  <img src={item.icon} alt={`Card ${index}`} />
                </div>
              ))}
            </div>
          </>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} width={30} alt="Gallery Icon" />
              <img src={assets.mic_icon} width={30} alt="Mic Icon" />
              {input ? (
                <img
                  onClick={() => {
                    console.log("Input submitted:", input); 
                    onSent();
                  }}
                  src={assets.send_icon}
                  width={30}
                  alt="Send Icon"
                />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            Fern Ai may display inaccurate info, including about people, so
            double-check its responses. Your privacy and Fern Ai Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
