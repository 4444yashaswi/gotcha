import React from "react";
import "./PlayerCard.css";

const PlayerCard = ({ name, avatarColor, isReady }) => {
  return (
    <div className="player-card--container">
      <div className="player-card--avatar">
        <div
          className="player-card--avatar-initial"
          style={{ backgroundColor: avatarColor }}
        >
          {name?.[0]}
        </div>
        <div
          className="player-card--avatar-is-ready"
          style={
            isReady ? { backgroundColor: "greenyellow" } : { backgroundColor: "lightslategray" }
          }
        />
      </div>
      <div className="player-card--name">{name}</div>
    </div>
  );
};

export default PlayerCard;
