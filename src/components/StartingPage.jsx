
import PropTypes from 'prop-types';
import images from '../images';

const StartingPage = ({ handleClick }) => {
  return (
    <div
      className="start_overlay"
      id="start_screen"
      style={{ display: "flex" }}
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
  )
}

StartingPage.propTypes = {
  handleClick: PropTypes.func,
}


export default StartingPage