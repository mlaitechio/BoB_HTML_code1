import images from "../images"
import PropTypes from 'prop-types';


const Header = ({ showPopUp }) => {
  return (
    <header
      id="header"
      style={{ display: "flex" }}
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
  )
}


Header.propTypes = {
  showPopUp: PropTypes.func,
}
export default Header