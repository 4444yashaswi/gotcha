import React from "react";
import "./WaitingAnimation.css";
import { GoDotFill } from "react-icons/go";

const WaitingAnimation = () => {
  const timeDelayList = [0, 2, 4, 6, 8, 8, 6, 4, 2, 0];
  return (
    <div className="waiting-animation--container">
      {timeDelayList.map((delayBy) => (
        <div className={`waiting-animation--position`} style={{animationDelay: `0.${delayBy}s`}}>
          <GoDotFill />
        </div>
      ))}
    </div>
  );
};

export default WaitingAnimation;
