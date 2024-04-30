import React from "react";
import "./CommonButton.css";

const CommonButton = ({
  isPrimary,
  isDisabled,
  functionality,
  children,
  style,
}) => {
  return (
    <div
      className={
        isPrimary ? "btn-container--primary" : "btn-container--secondary"
      }
      style={isDisabled ? { ...style, cursor: "not-allowed" } : { ...style }}
      onClick={() => {
        if (!isDisabled) functionality();
      }}
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
