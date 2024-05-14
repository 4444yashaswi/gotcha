import React from "react";
import TruthHeader from "../Components/TruthComesOutComponents/TruthHeader";
import PlayerDetailsCard from "../Components/UI/PlayerDetails/PlayerDetailsCard";
import PlayerScoreCard from "../Components/UI/PlayerDetails/PlayerScoreCard";

const Scores = () => {
  const playerList = [
    { name: "OJ", avatarColor: "blue", isReady: true },
    { name: "Tera Baap", avatarColor: "orange", isReady: true },
    // { name: "Yashaswi", avatarColor: "lightgreen", isReady: false },
    // { name: "Tosh :)", avatarColor: "pink", isReady: true },
    // { name: "Singh", avatarColor: "purple", isReady: false },
    // { name: "Ohm", avatarColor: "yellowgreen", isReady: true },
    // { name: "Goyal", avatarColor: "pink", isReady: true },
    // { name: "Omar", avatarColor: "orange", isReady: true },
  ];

  return (
    <div className="scores-container">
      <TruthHeader
        textStyle={{ fontSize: "3vh", fontWeight: "600" }}
        btnStyle={{ top: "8.7vh" }}
      >
        Results: round 2/5
      </TruthHeader>
      <div className="scores-list--container">
        <div className="scores--picked-yours-heading">
          {playerList.length > 0
            ? `${playerList.length} players liked `
            : "No one picked "}
          your answer
        </div>
        <div className="scored--picked-yours-players">
          {playerList.map((player) => (
            <PlayerDetailsCard
              name={player.name}
              avatarColor={player.avatarColor}
              key={player.name}
            />
          ))}
        </div>
        <div className="scores-list--heading">
          How many times was each answer picked?
        </div>
        <div className="scores-list--answers-container">
        <PlayerScoreCard
            name="Yash"
            avatarColor="pink"
            isAnswer
            answer="party animal hona"
            picked={2}
          />
          <PlayerScoreCard
            name="Tera Baap"
            avatarColor="orange"
            isAnswer
            answer="Lmao nvm"
            picked={0}
          />
          <PlayerScoreCard
            name="OJ"
            avatarColor="blue"
            isAnswer
            answer="Being the best coder"
            picked={1}
          />
          <PlayerScoreCard
            name="Tosh"
            avatarColor="purple"
            isAnswer
            answer="I will win"
            picked={0}
          />
        </div>
        <div className="scores--score-heading">Scores</div>
        <div className="scores-list--heading">
          Yash and Tosh are tied for the lead!
        </div>
        <div className="scores-list--players-container">
          <PlayerScoreCard
            name="Yash"
            avatarColor="pink"
            isReady={true}
            score={5}
          />

          <PlayerScoreCard
            name="Tosh"
            avatarColor="purple"
            isReady={false}
            score={5}
          />

          <PlayerScoreCard
            name="OJ"
            avatarColor="blue"
            isReady={false}
            score={4}
          />

          <PlayerScoreCard
            name="Tera Baap"
            avatarColor="orange"
            isReady={true}
            score={3}
          />
        </div>
      </div>
    </div>
  );
};

export default Scores;
