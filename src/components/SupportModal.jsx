import PropTypes from 'prop-types';

const SupportModal = ({ handleSupportClose }) => {
  return (
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
  )
}

SupportModal.propTypes = {
  handleSupportClose: PropTypes.func,
}

export default SupportModal