import React from "react";
import CommonButton from "../Components/UI/CommonButton";
import { TiArrowDown } from "react-icons/ti";

const YourChoice = ({ setNext, player }) => {
  return (
    <div className="your-choice--container">
      <div className="your-choice--card">
        <div className="your-choice--symbol-container">
          <TiArrowDown />
        </div>
        You picked {player}'s answer!
      </div>
      <div className="your-choice--next-btn-container">
        <CommonButton functionality={() => setNext(true)}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            Next&nbsp;
            <div style={{ transform: "rotateY(60deg)", fontWeight: "700" }}>
              &gt;
            </div>
          </div>
        </CommonButton>
      </div>
    </div>
  );
};

export default YourChoice;
