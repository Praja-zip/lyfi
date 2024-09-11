import React from "react";
import Background from "./../../assets/LandingPage/mail.png";
import "./LandingPage.css"

const Mail = () => {
  return (
    <div>
      <div className="container-mail">
        <div class="image-container">
          <img src={Background} alt="Your Image" class="image-girl bg-dark" />
          <div className="overlay-content">
            <h2>Leave Question Here</h2>
            <p>If you have questions or criticism or suggestions, you can <br />click the button below</p>
            <input type="text" className="input-form" placeholder="Type Here.."/>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Mail;
