import React from "react";
import CommonButton from "../Components/UI/CommonButton";

const Landing = () => {
  return (
    <div className="landing-page--container">
      <div className="landing-page--bg-container" />'
      <div className="landing-page--body-container">
        <div className="landing-page--header">GOTCHA!</div>
        <div className="landing-page--details-form">
          This is the detaisl form
        </div>
        <div className="landing-page--btns-container">
          <CommonButton isPrimary>Join Game</CommonButton>
          <CommonButton>Start Game</CommonButton>
        </div>
      </div>
    </div>
  );
};

export default Landing;
