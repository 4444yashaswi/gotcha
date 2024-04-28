import React from "react";
import "./CommonButton.css";

const CommonButton = ({ isPrimary, children }) => {
  return (
    <div
      className={
        isPrimary ? "btn-container--primary" : "btn-container--secondary"
      }
    >
      <div
        className={isPrimary ? "btn-border--primary" : "btn-border--secondary"}
      >
        <div
          className={
            isPrimary ? "btn-children--primary" : "btn-children--secondary"
          }
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default CommonButton;
