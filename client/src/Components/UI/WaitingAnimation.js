import React from "react";
import "./WaitingAnimation.css";
import { GoDotFill } from "react-icons/go";

const WaitingAnimation = () => {
  const numbers = [0, 2, 4, 6, 8, 8, 6, 4, 2, 0];
  return (
    <div className="waiting-animation--container">
      {numbers.map((number) => (
        <div className={`waiting-animation--position`} style={{animationDelay: `0.${number}s`}}>
          <GoDotFill />
        </div>
      ))}
    </div>
  );
};

export default WaitingAnimation;
