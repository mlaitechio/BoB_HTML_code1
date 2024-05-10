import { useEffect } from 'react';
import PropTypes from 'prop-types';


const TypingComponent = ({ textToType, handleRenderChange, isRendering, typingEnabled, handleText, text }) => {

  useEffect(() => {
    // let currentIndex = 0;
    // let typingInterval;
    // if (typingEnabled) {
    //   if (isRendering && currentIndex < textToType.length) {
    //     typingInterval = setInterval(() => {
    //       if (isRendering && currentIndex < textToType.length) {
    //         handleText(textToType[currentIndex])
    //         currentIndex++;
    //       } else {
    //         handleRenderChange()
    //       }
    //     }, 30);
    //   }
    // }
    // return () => clearInterval(typingInterval);
    let currentIndex = 0;
    let typingInterval;
    const textArr = textToType.split(" ")
    if (typingEnabled) {
      if (isRendering && currentIndex < textArr.length) {
        typingInterval = setInterval(() => {
          if (isRendering && text.length  < textArr.length) {
            handleText(textArr[currentIndex])
            currentIndex++;
          } else {
            handleRenderChange()
          }
        }, 30);
      }
    }
    return () => clearInterval(typingInterval);
  }, [isRendering, typingEnabled]);


  return (
    <div dangerouslySetInnerHTML={{ __html: text }} />
  );
};

TypingComponent.propTypes = {
  textToType: PropTypes.string,
  text: PropTypes.string,
  isRendering: PropTypes.bool,
  typingEnabled: PropTypes.bool,
  handleRenderChange: PropTypes.func,
  handleText: PropTypes.func,
}

export default TypingComponent;
