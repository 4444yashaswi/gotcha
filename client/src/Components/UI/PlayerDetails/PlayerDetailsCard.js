import React from "react";
import PlayerCard from "./PlayerCard";
import "./Player.css";

const PlayerDetailsCard = ({
  name,
  avatarColor,
  isReady,
//   isDetailsNotRequired,
}) => {
  return (
    <div className="player-details-card--container">
      <PlayerCard
        name={name}
        avatarColor={avatarColor}
        isReady={isReady || null}
        isStatusNotRequired
        isNameNotRequired
        containerStyle={{margin: "1vh 1.5vh"}}
      />
      <div className="player-details-card--name">{name}</div>
    </div>
  );
};

export default PlayerDetailsCard;
