import React, { useState, useRef, useEffect } from "react";
import "./css/newStyle.css";
import images from "./images/index.js";
import FeedbackModal from "./components/FeedbackModal.jsx";
import SupportModal from "./components/SupportModal.jsx";
import StartingPage from "./components/StartingPage.jsx";

function App() {
  const [ws, setWs] = useState(null);
  const [stopButtonVisible, setStopButtonVisible] = useState(false);
  const [msgLoadingVisible, setMsgLoadingVisible] = useState(false);

  const [promptValue, setPromptValue] = useState("");
  const [isStartModalVisible, setIsStartModalVisible] = useState(true);
  const dataContainerRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isSupportModalVisible, setIsSupportModalVisible] = useState(false);

  const [isSending, setIsSending] = useState(true);

  const handleSupportModalOpen = () => {
    setIsSupportModalVisible(true);
    setIsModalVisible(false); // Close the main modal when support modal is opened
  };

  const showPopUp = () => {
    setIsModalVisible(true);
  };

  const hidePopUp = () => {
    setIsModalVisible(false);
  };
  const handleSupportClose = () => {
    setIsSupportModalVisible(false);
    setIsModalVisible(true);
  };

  const sendMessage = (value) => {
    // const msg = promptValue.toLowerCase().replace(/\s/g, "");
    if (promptValue.length) {
      value = promptValue
    }
    if (value.length === 0) return;
    console.log(value);
    setPromptValue("");
    setIsSending(false);
    setIsStartModalVisible(false);
  };

  function handleClick(val) {
    sendMessage(val)
  }

  const handleStartModal = () => {
    setIsStartModalVisible((prevState) => !prevState);
  };

  // Function to get current time
  function getCurrentTime() {
    const currentTime = new Date();
    let hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = hours < 10 ? "0" + hours : hours;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return formattedHours + ":" + formattedMinutes + " " + amPm;
  }
  const currentTime = getCurrentTime();

  return (
    <>
      <div className="main_container">
        {/* <!--Content Header--> */}
        <header
          id="header"
          style={{ display: isStartModalVisible ? "none" : "flex" }}
        >
          <div className="logo">
            <picture className="">
              <img src={images.bot_logo} alt="bob logo" className="bot_logo" />
            </picture>
            <div>
              <img className="bot_name" src={images.header_bot_name} alt="" />
            </div>
          </div>
          <div className="controls">
            <button onClick={showPopUp}>
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
        </header>

        {/* <!--Content Body--> */}
        <div className="greet_container" id="greet_container">
          <h5 id="greeting_msg">Good Morning!</h5>
          <p>Welcome to Bank of Baroda, this is ADI, your virtual assistant.</p>
        </div>

        <div
          className="myInsureGPT__chat"
          id="myInsureGPT__chat"
          ref={dataContainerRef}
          style={{ display: isStartModalVisible ? "none" : "flex" }}
        >
          <div
            className="bot_message_container"
            style={{ display: msgLoadingVisible ? "block" : "flex" }}
            id="loading_container"
          >
            <img src={images.bot_logo} alt="" className="bot_logo" />
            <div className="myInsureGPT__messages loading">
              <li className="ball"></li>
              <li className="ball"></li>
              <li className="ball"></li>
            </div>
          </div>
        </div>

        {isStartModalVisible && <StartingPage handleClick={handleClick} />}


        <div className="myInsureGPT__footer" id="myInsureGPT__footer">
          <div className="myInsureGPT__inputContainer">
            <button
              className="options_button"
              id="options_button"
              onClick={handleStartModal}
            >
              <i className="fa-solid fa-grip"></i>
            </button>
            <input
              className="myInsureGPT__input"
              id="promptAndResponse_Prompt"
              name="promptAndResponse.Prompt"
              placeholder="Kindly type your query"
              type="text"
              value={promptValue}
              onChange={(e) => setPromptValue(e.target.value)}
            />
            <input
              type="hidden"
              id="hdnds"
              value="65517cf78ef54b5ca765754e97ff0224"
            />
          </div>
          {isSending ? (
            <button
              className="myInsureGPT__newMessageSendButton"
              title="Send"
              id="sendButton"
              onClick={sendMessage}
            >
              <img src={images.send} alt="" className="myInsureGPT__sendIcon" />

            </button>
          ) : (
            <button
              className="stopButton_container myInsureGPT__newMessageSendButton"
              id="stopButton"
              title="Stop"
            >
              <i className="fa-solid fa-pause"></i>
            </button>
          )}
        </div>

        {/* <!-- Content Footer --> */}

        <p className="genAI_msg">
          ADI is genAI powered virtual assistant , help you in providing our
          product and service related information though it may sometimes
          provide inaccurate responses.
        </p>

        {/* <!-- {% csrf_token %} --> */}
        {isModalVisible && (
          <FeedbackModal hidePopUp={hidePopUp} handleSupportModalOpen={handleSupportModalOpen} />
        )}

        {isSupportModalVisible && (
          <SupportModal handleSupportClose={handleSupportClose} />
        )}

      </div>
    </>
  );
}

export default App;
