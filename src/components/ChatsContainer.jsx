import PropTypes from 'prop-types';
import { messageType } from '../../constant';
import images from "../images"
// import Typewriter from "typewriter-effect";
import TypingComponent from './TypingComponent';
import { useState } from 'react';

const ChatsContainer = ({ chat, handleIsRenderChange, typingEnabled }) => {
  const [text, setText] = useState('');


  function getCurrentTime(currentTime) {
    let hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    const amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedHours = hours < 10 ? "0" + hours : hours;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return formattedHours + ":" + formattedMinutes + " " + amPm;
  }

  const handleText = (inp) => {
    setText(prev => prev + inp)
  }

  const handleRenderChange = () => {
    handleIsRenderChange(chat)
  }

  return (
    <>
      {chat.type === messageType.question && (
        <div
          className="myInsureGPT__sentMessages_container"
        >
          <div className='myInsureGPT__messages myInsureGPT__sentMessages' >
            <p>{chat.message}</p>
          </div>
          <p className='time' >{getCurrentTime(chat.time)}</p>
        </div>
      )}
      {chat.type === messageType.answer && (
        <div
          className="bot_message_container"
        >
          <img src={images.bot_logo} alt="" className="bot_logo" />
          <div className="myInsureGPT__messages myInsureGPT__receivedMessages">
            {/* 
            <p>
              {
                chat.isRendering ? (
                  <TypingComponent
                    textToType={chat.message}
                    handleRenderChange={handleRenderChange}
                    isRendering={chat.isRendering}
                    typingEnabled={typingEnabled}
                    handleText={handleText}
                    text={text}
                  />
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: text }} />
                )
              }
            </p> */}

            <p>
              <div dangerouslySetInnerHTML={{ __html: chat.message }} />
            </p>



          </div>
        </div>
      )}
    </>
  )
}


ChatsContainer.propTypes = {
  chat: PropTypes.shape({
    id: PropTypes.string,
    message: PropTypes.string,
    time: PropTypes.object,
    type: PropTypes.string,
    isRendering: PropTypes.bool,
  }),
  handleIsRenderChange: PropTypes.func,
  typingEnabled: PropTypes.bool,
  chatsArr: PropTypes.array
}

export default ChatsContainer

