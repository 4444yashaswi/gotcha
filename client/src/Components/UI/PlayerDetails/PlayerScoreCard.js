import React from "react";
import PlayerCard from "./PlayerCard";
import "./Player.css";

const PlayerScoreCard = ({
  name,
  avatarColor,
  answer,
  picked,
  score,
  isReady,
  isAnswer,
}) => {
  return (
    <div className="player-score-card--container">
      <PlayerCard
        name={name}
        avatarColor={avatarColor}
        isReady={isReady || null}
        isStatusNotRequired={isAnswer}
        isNameNotRequired
        containerStyle={{ margin: "1vh 1.5vh" }}
      />
      <div className="player-score-card--details-container">
        <div
          className={
            isAnswer ? "player-score-card--answer" : "player-score-card--name"
          }
        >
          {isAnswer ? answer : name}
        </div>
        <div
          className={
            isAnswer ? "player-score-card--picked" : "player-score-card--score"
          }
        >
          {isAnswer ? (
            <>
              {picked}
              <div style={{ fontSize: "2vh", color: "#869CB4" }}>times</div>
            </>
          ) : (
            <>{score}</>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerScoreCard;
