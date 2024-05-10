import { useState, useEffect, useRef } from "react";
// import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import "./css/newStyle.css";
import { messageType } from "../constant.js";
import images from "./images/index.js";
import { Header, FeedbackModal, SupportModal, LoadingMsg, ChatsContainer, StartingPage } from "./components"
import { formatResponse } from "./utils/formatResponse.js";

function App() {

  const messagesEndRef = useRef(null);
  const stream = useRef("");
  const isRender = useRef(false)

  const [msgLoadingVisible, setMsgLoadingVisible] = useState(false);
  const [promptValue, setPromptValue] = useState("");
  const [isStartModalVisible, setIsStartModalVisible] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [sessionId, setSessionId] = useState("")
  const [isSupportModalVisible, setIsSupportModalVisible] = useState(false);
  const [isSending, setIsSending] = useState(true);
  const [typingEnabled, setTypingEnabled] = useState(true);
  const [chats, setChats] = useState([])

  const [message, setMessage] = useState("")

  const handleSupportModalOpen = () => {
    setIsSupportModalVisible(true);
    setIsModalVisible(false);
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

  const getApiResponse = async (query) => {
    try {

      // console.log("Open api called");
      isRender.current = true

      // const url = "https://1aa5-2409-40c1-5c-e132-c20-f915-3dc7-33cf.ngrok-free.app/api/prompt"
      const url = "/api/prompt"

      // const header = {
      //   "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0ODg1NzcyLCJpYXQiOjE3MTQ0NTM3NzIsImp0aSI6ImQ2NzkwODVhZjQ2YzQzNzNhZGYwMmM2ZTM5YTFkYjc0IiwidXNlcl9pZCI6MX0.rKvwRS3NvaI-dgUcSi3b-vWVSoC6-c5walKzGlKUnXA',
      //   'Content-Type': 'application/json'
      // }

      const header = {
        'Content-Type': 'application/json'
      }

      const reqBody = JSON.stringify({
        "prompt": query
      });

      const response = await fetch(url, { method: "POST", headers: header, body: reqBody });

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          // console.log("Response Completed");
          break;
        }

        if (!isRender.current) {
          // console.log("break stream called");
          break;
        }

        const chunk = decoder.decode(value, { stream: true });
        setMsgLoadingVisible(false)
        stream.current = stream.current + chunk
        setMessage(formatResponse(stream.current))
      }

      const formattedData = formatResponse(stream.current)
      setMessage("")
      const newMsg = {
        id: uuidv4(),
        message: formattedData,
        time: new Date,
        type: messageType.answer,
        isRendering: true
      }
      setChats(prev => [...prev, newMsg])
      setTypingEnabled(prev => !prev)
      setIsSending(prev => !prev)
      // await saveConversation(query, stream.current)
      stream.current = ""
    } catch (error) {
      console.log(error);
    }
  }

  // const getApiResponse = async (value) => {
  //   try {

  //     let reqPackage = JSON.stringify({
  //       "question": value
  //     });
  //     let config = {
  //       method: 'post',
  //       maxBodyLength: Infinity,
  //       url: '/chat/',
  //       headers: {
  //         "Authorization": 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzE0ODg1NzcyLCJpYXQiOjE3MTQ0NTM3NzIsImp0aSI6ImQ2NzkwODVhZjQ2YzQzNzNhZGYwMmM2ZTM5YTFkYjc0IiwidXNlcl9pZCI6MX0.rKvwRS3NvaI-dgUcSi3b-vWVSoC6-c5walKzGlKUnXA',
  //         'Content-Type': 'application/json'
  //       },
  //       data: reqPackage
  //     };

  //     const { data } = await axios.request(config)

  //     const ans = data.response[1][1][0][3][1][0][1]

  //     const formattedData = formatResponse(ans)

  //     setTypingEnabled(true)
  //     setIsSending(false)

  //     const newMsg = {
  //       id: uuidv4(),
  //       message: formattedData,
  //       time: new Date,
  //       type: messageType.answer,
  //       isRendering: true
  //     }

  //     setChats(prev => [...prev, newMsg])
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setMsgLoadingVisible(false)
  //   }
  // }

  const handleIsRenderChange = (ele) => {
    const filteredChat = chats.filter(element => element.id !== ele.id)
    // console.log({ filteredChat });
    const updatedChat = {
      ...ele, isRendering: false
    }
    setChats([...filteredChat, updatedChat])
    setIsSending(true)
  }

  const sendMessage = async (value) => {
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
    setMsgLoadingVisible(true)
    setIsStartModalVisible(false);
    setIsSending(false)
    await getApiResponse(value)
  };

  const handleStartModal = () => {
    setIsStartModalVisible((prevState) => !prevState);
  };


  // const saveConversation = async (que, ans) => {
  //   try {
  //     const url = "";

  //     const header = {
  //       'Content-Type': 'application/json'
  //     }

  //     const reqBody = JSON.stringify({
  //       id: sessionId,
  //       ques: que,
  //       ans: ans
  //     });

  //     await fetch(url, { method: "POST", headers: header, body: reqBody });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const handleStopResponse = () => {
    // const ele = chats.at(-1)
    // const filteredChat = chats.filter(element => element.id !== ele.id)
    // console.log({ filteredChat });
    // const updatedChat = {
    //   ...ele, isRendering: false
    // }
    // setChats([...filteredChat, updatedChat])
    // setTypingEnabled(prev => !prev)
    // setIsSending(prev => !prev)

    isRender.current = false

    // const formattedData = formatResponse(stream.current)
    // const newMsg = {
    //   id: uuidv4(),
    //   message: formattedData,
    //   time: new Date,
    //   type: messageType.answer,
    //   isRendering: true
    // }
    // setMessage("")
    // stream.current = ""
    // setChats(prev => [...prev, newMsg])
  }

  // useEffect(() => {
  //   setSessionId(uuidv4())
  // }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  });

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
          : <div className="myInsureGPT__chat">
            {chats.map(chat => (
              <ChatsContainer
                key={chat.id}
                chat={chat}
                handleIsRenderChange={handleIsRenderChange}
                typingEnabled={typingEnabled}
              />
            ))}

            {message ? (
              <div
                className="bot_message_container"
              >
                <img src={images.bot_logo} alt="" className="bot_logo" />
                <div className="myInsureGPT__messages myInsureGPT__receivedMessages render ">
                  <p>
                    <div dangerouslySetInnerHTML={{
                      __html: message + ` <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><circle cx="18" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin=".67" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="12" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin=".33" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle><circle cx="6" cy="12" r="0" fill="currentColor"><animate attributeName="r" begin="0" calcMode="spline" dur="1.5s" keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8" repeatCount="indefinite" values="0;2;0;0"/></circle></svg>`
                    }} />
                  </p>
                  {/* <div style={{ position: "absolute", top: "5px", right: "5px" }} >
                    <Streaming />
                  </div> */}
                </div>
              </div>
            ) : (
              <></>
            )}

            {msgLoadingVisible && (
              <LoadingMsg />
            )}
            <div ref={messagesEndRef} />
          </div>}



        <form
          onSubmit={(e) => {
            e.preventDefault()
            sendMessage()
          }}
          onReset={handleStopResponse}
        >
          <div className="myInsureGPT__footer" id="myInsureGPT__footer">
            <div className="myInsureGPT__inputContainer">
              {(chats.length > 1 && isSending) ? (
                <button
                  className="options_button"
                  id="options_button"
                  onClick={handleStartModal}
                  type="button"
                >
                  <i className="fa-solid fa-grip"></i>
                </button>
              ) :
                <></>
              }
              <input
                className="myInsureGPT__input"
                id="promptAndResponse_Prompt"
                name="promptAndResponse.Prompt"
                placeholder="Kindly type your query"
                type="text"
                value={promptValue}
                onChange={(e) => setPromptValue(e.target.value)}
                disabled={!isSending}
              />
            </div>
            {isSending ? (
              <button
                className="myInsureGPT__newMessageSendButton"
                title="Send"
                type="submit"
              >
                <img src={images.send} alt="" className="myInsureGPT__sendIcon" />
              </button>
            ) : (
              <button
                className="stopButton_container myInsureGPT__newMessageSendButton"
                title="Stop"
                type="button"
                onClick={handleStopResponse}
              >
                <i className="fa-solid fa-stop"></i>
                {/* <i className="fa-solid fa-pause"></i> */}
              </button>
            )}
          </div>
        </form>

        {/* <!-- Content Footer --> */}

        <p className="genAI_msg">
          ADI is a GenAI-powered virtual assistant that helps you by providing information related to our products and services, though it may sometimes provide inaccurate responses.
        </p>
        {/* 
        <p className="genAI_msg">
          ADI is genAI powered virtual assistant , help you in providing our
          product and service related information though it may sometimes
          provide inaccurate responses.
        </p> */}

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
