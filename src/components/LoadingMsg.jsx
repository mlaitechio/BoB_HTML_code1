import images from "../images"

const LoadingMsg = () => {
  return (
    <div
      className="bot_message_container"
      id="loading_container"
    >
      <img src={images.bot_logo} alt="" className="bot_logo" />
      <div className="myInsureGPT__messages loading">
        <li className="ball"></li>
        <li className="ball"></li>
        <li className="ball"></li>
      </div>
    </div>
  )
}
export default LoadingMsg

