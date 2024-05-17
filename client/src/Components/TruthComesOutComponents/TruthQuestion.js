import React from "react";
import "./Truth.css";

const TruthQuestion = ({ question, dependentPlayers }) => {
  const UserAvatar = ({ userName, avatarColor, index }) => {
    let styleMap;
    if (dependentPlayers.length === 1) styleMap = {};
    else if (dependentPlayers.length === 2)
      styleMap = {
        0: { left: "0" },
        1: { right: "0" },
      };
    else
      styleMap = {
        0: { left: "0" },
        1: {},
        2: { right: "0" },
      };
    return (
      <div
        style={{
          height: "7vh",
          width: "7vh",
          borderRadius: "50%",
          boxSizing: "border-box",
          border: "4px solid white",
          fontSize: "3vh",
          fontWeight: "500",
          color: "rgba(255, 255, 255, 0.8)",
          backgroundColor: avatarColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "-18%",
          ...styleMap[index],
        }}
      >
        {userName?.[0]}
      </div>
    );
  };

  return (
    <div className="truth-question--container">
      <div className="truth-question--avatar-container">
        {dependentPlayers.map((player, index) => (
          <UserAvatar
            userName={player?.name}
            avatarColor={player?.avatarColour}
            index={index}
            key={index}
          />
        ))}
      </div>
      <div className="truth-question--question">{question}</div>
    </div>
  );
};

export default TruthQuestion;
