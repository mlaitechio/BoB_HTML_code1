import React, { useState, useRef, useEffect } from "react";
import "./css/newStyle.css";
import images from "./images/index.js";

function App() {
  const [ws, setWs] = useState(null);
  const [stopButtonVisible, setStopButtonVisible] = useState(false);
  const [msgLoadingVisible, setMsgLoadingVisible] = useState(false);
  let stopGenerating = false;
  const [promptValue, setPromptValue] = useState("");
  const [isStartModalVisible, setIsStartModalVisible] = useState(true);
  const dataContainerRef = useRef(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [maxStar] = useState(3);
  const [isSupportModalVisible, setIsSupportModalVisible] = useState(false);
  const solidStarComponent = <i className="fa-solid fa-star"></i>;
  const emptyStarComponent = <i className="fa-regular fa-star"></i>;
  const [isSending, setIsSending] = useState(true);

  const renderStars = (max_star) => {
    const solidStars = Array(max_star).fill(solidStarComponent);
    const emptyStars = Array(5 - max_star).fill(emptyStarComponent);
    return [...solidStars, ...emptyStars];
  };

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
    stopGenerating = false;
    console.log("called");
    // const msg = promptValue.toLowerCase().replace(/\s/g, "");
    if (promptValue.length) {
      value = promptValue
    }
    if (value.length === 0) return;
    console.log(value);
    setPromptValue("");
    setIsSending(false);
    setIsStartModalVisible(false);
    ws.send(value);
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

        <div
          className="start_overlay"
          id="start_screen"
          style={{ display: isStartModalVisible ? "flex" : "none" }}
        >
          <div className="start_screen">
            <div className="start_container">
              <div className="start_con">
                <div className="img_container">
                  <img
                    className="bot_logo"
                    src={images.bot_logo}
                    alt="bot_logo"
                  />
                  <div className="ask_container">
                    <img
                      className="bot_name"
                      src={images.bot_name}
                      alt="bot_name"
                    />
                  </div>
                </div>
                <h4 className="heading ">How can I help you today?</h4>
                <div className="start_options">
                  <button
                    className="start_opt"
                    onClick={() => handleClick("Digital Banking")}
                  >
                    <strong>Digital Banking</strong>
                    <p>Assist in offering details about Digital Products</p>
                  </button>
                  <a
                    href="https://www.bankofbaroda.in/personal-banking/offers"
                    target="_blank"
                    className="start_opt"
                  >
                    <button className="new_page_button">
                      <strong>Promotions & Offers</strong>
                      <p>Latest Offers will be visible here</p>
                    </button>
                  </a>
                  <a
                    href="https://www.bankofbaroda.in/interest-rate-and-service-charges"
                    target="_blank"
                    className="start_opt"
                  >
                    <button className="new_page_button">
                      <strong>Interest Rate & Service Charges</strong>
                      <p>Know the latest Interest Rate & Service Charges</p>
                    </button>
                  </a>
                  <button
                    className="start_opt"
                    onClick={() => handleClick("Loan Products")}
                  >
                    <strong>Loan Products</strong>
                    <p>Assist in offering details about Loan Products</p>
                  </button>
                  <button
                    className="start_opt"
                    onClick={() => handleClick("Deposit Products")}
                  >
                    <strong>Deposit Products</strong>
                    <p>Assist in offering details about Deposit Products</p>
                  </button>
                  <button
                    className="start_opt"
                    onClick={() => handleClick("Insurance & Investment Product")}
                  >
                    <strong>Insurance & Investment Product</strong>
                    <p>
                      Assist in offering details about the Insurance &
                      Investment Product
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="myInsureGPT__footer" id="myInsureGPT__footer">
          <div className="myInsureGPT__inputContainer">
            <button
              className="options_button"
              id="options_button"
              onClick={handleStartModal}
            >
              {/* <!-- <i className="fa-solid fa-qrcode"></i> -->
          <i className="fa-solid fa-grip"></i>
          <!-- <i className="fa-solid fa-cubes-stacked"></i> -->
          <!-- <i className="fa-solid fa-cubes"></i> -->  */}
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

              {/* <!-- <i className="fa-solid fa-paper-plane"></i> --> */}
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
          <div id="myModal" className="modal" style={{ display: "block" }}>
            <form id="feedbackForm" onSubmit={(e) => e.preventDefault()} >
              <div className="modal-content">
                <button className="close" onClick={hidePopUp} >
                  <i className="fa-solid fa-xmark"></i>
                </button>
                <div>
                  {/* <!-- <div className="modal_header">
               <p>It was great seeing you today!!!</p>
             </div> --> */}
                  {/* <!-- 
             <div className="modal_icon_container" >
               <i className="fa-solid fa-hand-holding-heart"></i>
             </div> --> */}
                  <div className="header_container">
                    <div className="block block_1">
                      {/* <!-- <p className="header">On exiting, all chat history will be cleared</p> --> */}
                      <div className="modal_icon_container">
                        <i className="fa-solid fa-ranking-star"></i>
                      </div>
                      <p className="header_2">
                        How would you rate your overall experience?
                      </p>
                      <div className="star_container" id="experience">
                        {renderStars(maxStar)}
                      </div>
                      {/* <!-- <p className="star_state" id="star_state_1">EXTREMELY SATISFIED</p> --> */}
                    </div>
                    <div className="block block_1">
                      <div className="modal_icon_container">
                        <i className="fa-solid fa-hand-sparkles"></i>
                      </div>
                      <p className="header_2">
                        How likely you would recommend Bank of Baroda to a
                        family & friend?
                      </p>
                      {/* <!-- <p className="desc">On a scale of 0 to 10, with 10 being “Very Likely” and 0 being “Very Unlikely”</p> --> */}
                      <div className="star_container" id="likely">
                        {renderStars(maxStar)}
                      </div>
                      {/* <!-- <p className="star_state" id="star_state_1">VERY LIKELY</p> --> */}
                    </div>
                    <div className="block">
                      <div className="modal_icon_container">
                        <i className="fa-solid fa-hand-holding-heart"></i>
                      </div>
                      <p className="header_2">
                        How much effort did it take to resolve your issue?
                      </p>
                      <div className="star_container" id="effort">
                        {renderStars(maxStar)}
                      </div>
                      {/* <!-- <p className="star_state" id="star_state_1">LEAST EFFORT</p> --> */}
                    </div>
                    <div className="feedback_comment">
                      <textarea
                        name="feedback"
                        id="feedback"
                        cols="50"
                        rows="5"
                        placeholder="Feedbacks or Comments"
                      ></textarea>
                    </div>
                    <div className="button_container">
                      <button type="submit" onClick={handleSupportModalOpen}>
                        SUBMIT
                      </button>
                      <button id="close_modal" type="reset" onClick={hidePopUp}>
                        CLOSE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        )}

        {isSupportModalVisible && (
          <div
            id="support_modal"
            className="support_modal"
            style={{ display: "flex" }}
          >
            <div className="modal-content">
              <button
                id="support_modal_close"
                className="close"
                onClick={handleSupportClose}
              >
                <i className="fa-solid fa-xmark" />
              </button>
              <div>
                <div className="header_container">
                  <div className="block">
                    <p className="header_2">
                      Oops! Seems like you are not happy with the overall
                      experience. You can choose below options to connect to our
                      customer support team
                    </p>
                    <div className="star_container" id="experience"></div>
                  </div>
                  <div className="button_container">
                    <a
                      href="https://bankofbaroda.in/chat/bob/countrywebsite/india/uat-buid2/livechat.html"
                      target="_blank"
                    >
                      <button>
                        <i className="fa-solid fa-comments"></i>
                        Live Chat
                      </button>
                    </a>
                    <a
                      href="https://bankofbaroda.in/chat/bob/countrywebsite/india/videochat/video_calling_setup_06022023.html"
                      target="_blank"
                    >
                      <button>
                        <i className="fa-solid fa-video"></i>
                        Video Call
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
