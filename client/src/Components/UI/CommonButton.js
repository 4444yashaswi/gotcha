import React from "react";
import "./CommonButton.css";

const CommonButton = ({
  isPrimary,
  isDisabled,
  functionality,
  children,
  style,
}) => {
  const disabledStyle = {
    true: {
      cursor: "not-allowed",
      backgroundColor: "#93C5DE",
      boxShadow: "0px 5px 0px 0px rgb(146,184,207)",
    },
    false: { cursor: "not-allowed" },
  };

  return (
    <div
      className={
        isPrimary ? "btn-container--primary" : "btn-container--secondary"
      }
      style={
        isDisabled ? { ...style, ...disabledStyle?.[isPrimary] } : { ...style }
      }
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
