import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import "./css/newStyle.css";
import { messageType } from "../constant.js";
import images from "./images/index.js";
import Header from "./components/Header.jsx";
import FeedbackModal from "./components/FeedbackModal.jsx";
import SupportModal from "./components/SupportModal.jsx";
import LoadingMsg from "./components/LoadingMsg.jsx";
import ChatsContainer from "./components/ChatsContainer.jsx";
import StartingPage from "./components/StartingPage.jsx";


function App() {
  const [msgLoadingVisible, setMsgLoadingVisible] = useState(false);
  const [promptValue, setPromptValue] = useState("");
  const [isStartModalVisible, setIsStartModalVisible] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [sessionId, setSessionId] = useState("")
  const [isSupportModalVisible, setIsSupportModalVisible] = useState(false);
  const [isSending, setIsSending] = useState(true);
  const [chats, setChats] = useState([])

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

    if (promptValue.length) {
      value = promptValue
    }
    if (value.length === 0) return;


    const newInputMsg = {
      id: uuidv4(),
      message: value,
      time: new Date,
      type: messageType.question
    }

    setChats(prev => [...prev, newInputMsg])
    setPromptValue("");
    setIsSending(false);
    setMsgLoadingVisible(true)
    setIsStartModalVisible(false);
  };

  const handleStartModal = () => {
    setIsStartModalVisible((prevState) => !prevState);
  };

  useEffect(() => {
    setSessionId(uuidv4())
  }, [])

  return (
    <>
      <div className="main_container">
        {/* <!--Content Header--> */}

        {!isStartModalVisible && <Header showPopUp={showPopUp} />}


        {/* <!--Content Body--> */}
        <div className="greet_container" id="greet_container">
          <h5 id="greeting_msg">Good Morning!</h5>
          <p>Welcome to Bank of Baroda, this is ADI, your virtual assistant.</p>
        </div>



        {isStartModalVisible ?
          <StartingPage handleClick={sendMessage} />
          : (
            <div
              className="myInsureGPT__chat"
              id="myInsureGPT__chat"
              style={{ display: "flex" }}
            >
              {chats.map(chat => (
                <ChatsContainer chat={chat} key={chat.id} />
              ))}

              {msgLoadingVisible && (
                <LoadingMsg />
              )}

            </div>
          )}

        <form onSubmit={(e) => {
          e.preventDefault()
          sendMessage()
        }} >
          <div className="myInsureGPT__footer" id="myInsureGPT__footer">
            <div className="myInsureGPT__inputContainer">
              <button
                className="options_button"
                id="options_button"
                onClick={handleStartModal}
                type="button"
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
            </div>
            {isSending ? (
              <button
                className="myInsureGPT__newMessageSendButton"
                title="Send"
                id="sendButton"
                type="submit"
              >
                <img src={images.send} alt="" className="myInsureGPT__sendIcon" />

              </button>
            ) : (
              <button
                className="stopButton_container myInsureGPT__newMessageSendButton"
                id="stopButton"
                title="Stop"
                type="button"
              >
                <i className="fa-solid fa-pause"></i>
              </button>
            )}
          </div>
        </form>

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
