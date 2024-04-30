import PropTypes from 'prop-types';

const FeedbackModal = ({ hidePopUp, handleSupportModalOpen }) => {


  const renderStars = (max_star) => {
    const solidStars = Array(max_star).fill(solidStarComponent);
    const emptyStars = Array(5 - max_star).fill(emptyStarComponent);
    return [...solidStars, ...emptyStars];
  };

  const maxStar = 3;

  const solidStarComponent = <i className="fa-solid fa-star"></i>;
  const emptyStarComponent = <i className="fa-regular fa-star"></i>;

  return (
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
  )
}


FeedbackModal.propTypes = {
  hidePopUp: PropTypes.func,
  handleSupportModalOpen: PropTypes.func
}

export default FeedbackModal