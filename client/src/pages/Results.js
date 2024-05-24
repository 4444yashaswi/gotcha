import React from "react";
import TruthHeader from "../Components/TruthComesOutComponents/TruthHeader";
import PlayerScoreCard from "../Components/UI/PlayerDetails/PlayerScoreCard";
import CommonButton from "../Components/UI/CommonButton";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const navigate = useNavigate();

  const roundScoreList = [
    { name: "Yash", avatarColor: "pink", isReady: true, score: 5 },
    { name: "Tosh", avatarColor: "purple", isReady: false, score: 5 },
    { name: "OJ", avatarColor: "blue", isReady: false, score: 4 },
    { name: "Tera Baap", avatarColor: "orange", isReady: true, score: 3 },
  ];

  const handleExitBtn = () => {
    navigate("/landing");
  };

  return (
    <div className="scores-container">
      <TruthHeader
        textStyle={{ fontSize: "3vh", fontWeight: "600" }}
        btnStyle={{ top: "8.7vh" }}
        directExit
      >
        Game Results
      </TruthHeader>
      <div className="scores-list--container">
        <div className="scores--score-heading">Scores</div>
        <div className="scores-list--players-container">
          {roundScoreList.map((player) => (
            <PlayerScoreCard
              name={player.name}
              avatarColor={player.avatarColor}
              isReady={player.isReady}
              score={player.score}
            />
          ))}
        </div>
      </div>
      <div className="scores-list--footer-not-ready">
        <div className="scores-list--footer-ready-btn">
          <CommonButton isPrimary="exit" functionality={handleExitBtn}>
            Exit
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default Results;
