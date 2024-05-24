import React from "react";
import "./CommonButton.css";

const CommonButton = ({
  isPrimary,
  isDisabled,
  functionality,
  children,
  style,
}) => {
  const getStyleType = (primary) => {
    if (primary === "exit") return "exit";
    if (primary) return "primary";
    else return "secondary";
  };

  const disabledStyle = {
    "exit": { cursor: "not-allowed" },
    true: {
      cursor: "not-allowed",
      backgroundColor: "#93C5DE",
      boxShadow: "0px 5px 0px 0px rgb(146,184,207)",
    },
    false: { cursor: "not-allowed" },
  };

  return (
    <div
      className={`btn-container--${getStyleType(isPrimary)}`}
      style={
        isDisabled ? { ...style, ...disabledStyle?.[isPrimary] } : { ...style }
      }
      onClick={() => {
        if (!isDisabled) functionality();
      }}
    >
      <div className={`btn-border--${getStyleType(isPrimary)}`}>
        <div className={`btn-children--${getStyleType(isPrimary)}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default CommonButton;
