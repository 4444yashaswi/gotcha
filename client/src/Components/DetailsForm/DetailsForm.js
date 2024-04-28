import React, { useEffect, useState } from "react";
import "./DetailsForm.css";

const LandingForm = ({
  isError,
  setIsError,
  avatarInitial,
  setAvatarInitial,
}) => {
  const [bgColor, setBgColor] = useState("aqua");
  const [colorIndex, setColorIndex] = useState(0);

  const colorsArr = ["aqua", "lightgreen", "pink", "yellow"];

  const switchColor = () => {
    setColorIndex((colorIndex + 1) % colorsArr.length);
  };

  const inputChangeHandler = e => {
    setAvatarInitial(e.target.value.toUpperCase());
    setIsError(false);
  }

  useEffect(() => {
    setBgColor(colorsArr[colorIndex]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorIndex]);

  return (
    <div className="details-form--container">
      <div
        className="details-form--avatar"
        style={{ backgroundColor: bgColor }}
        onClick={() => switchColor()}
      >
        {avatarInitial?.[0] || "G"}
      </div>
      <div className="details-form--name-container">
        <div
          className="details-form--input-label"
          style={isError ? { color: "red" } : {}}
        >
          Enter your name
        </div>
        <input
          className="details-form--input-field"
          value={avatarInitial}
          onChange={inputChangeHandler}
          style={isError ? { borderColor: "pink" } : {}}
        />
      </div>
    </div>
  );
};

export default LandingForm;
