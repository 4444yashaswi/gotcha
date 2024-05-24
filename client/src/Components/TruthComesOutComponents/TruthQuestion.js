import React from "react";
import "./Truth.css";
import PlayerStack from "../UI/PlayerDetails/PlayerStack";

const TruthQuestion = ({ question, dependentPlayers }) => {

  return (
    <div className="truth-question--container">
      <div className="truth-question--avatar-container">
        {dependentPlayers.map((player, index) => (
          <PlayerStack
            userName={player?.name}
            avatarColor={player?.avatarColour}
            index={index}
            dependentPlayers={dependentPlayers}
            key={index}
          />
        ))}
      </div>
      <div className="truth-question--question">{question}</div>
    </div>
  );
};

export default TruthQuestion;
