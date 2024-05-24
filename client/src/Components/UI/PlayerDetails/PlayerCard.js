import React from "react";
import "./Player.css";

const PlayerCard = ({ name, avatarColor, isReady, isStatusNotRequired, isNameNotRequired, containerStyle }) => {
  return (
    <div className="player-card--container" style={{...containerStyle}}>
      <div className="player-card--avatar">
        <div
          className="player-card--avatar-initial"
          style={{ backgroundColor: avatarColor }}
        >
          {name?.[0]}
        </div>
        {!isStatusNotRequired && (
          <div
            className="player-card--avatar-is-ready"
            style={
              isReady
                ? { backgroundColor: "greenyellow" }
                : { backgroundColor: "lightslategray" }
            }
          />
        )}
      </div>
      {!isNameNotRequired && <div className="player-card--name">{name}</div>}
    </div>
  );
};

export default PlayerCard;
