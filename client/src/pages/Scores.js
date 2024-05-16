import React, { useState } from "react";
import TruthHeader from "../Components/TruthComesOutComponents/TruthHeader";
import PlayerDetailsCard from "../Components/UI/PlayerDetails/PlayerDetailsCard";
import PlayerScoreCard from "../Components/UI/PlayerDetails/PlayerScoreCard";
import CommonButton from "../Components/UI/CommonButton";
import WaitingAnimation from "../Components/UI/WaitingAnimation";

const Scores = () => {
  const playersSelectedYourAnswerList = [
    { name: "OJ", avatarColor: "blue", isReady: true },
    { name: "Tera Baap", avatarColor: "orange", isReady: true },
    // { name: "Yashaswi", avatarColor: "lightgreen", isReady: false },
    // { name: "Tosh :)", avatarColor: "pink", isReady: true },
    // { name: "Singh", avatarColor: "purple", isReady: false },
    // { name: "Ohm", avatarColor: "yellowgreen", isReady: true },
    // { name: "Goyal", avatarColor: "pink", isReady: true },
    // { name: "Omar", avatarColor: "orange", isReady: true },
  ];

  const allAnswersList = [
    {
      name: "Yash",
      avatarColor: "pink",
      answer: "party animal hona",
      pickedTimes: 2,
    },
    {
      name: "Tera Baap",
      avatarColor: "orange",
      answer: "Lmao nvm",
      pickedTimes: 0,
    },
    {
      name: "OJ",
      avatarColor: "blue",
      answer: "Being the best coder",
      pickedTimes: 1,
    },
    {
      name: "Tosh",
      avatarColor: "purple",
      answer: "I will win",
      pickedTimes: 0,
    },
  ];

  const roundScoreList = [
    { name: "Yash", avatarColor: "pink", isReady: true, score: 5 },
    { name: "Tosh", avatarColor: "purple", isReady: false, score: 5 },
    { name: "OJ", avatarColor: "blue", isReady: false, score: 4 },
    { name: "Tera Baap", avatarColor: "orange", isReady: true, score: 3 },
  ];

  const [isReadyForNextRound, setIsReadyForNextRound] = useState(false);

  const handleReadyBtn = () => {
    console.log("The player is ready for the next round");
    setIsReadyForNextRound(true);
  };

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
          {playersSelectedYourAnswerList.length > 0
            ? `${playersSelectedYourAnswerList.length} players liked `
            : "No one picked "}
          your answer
        </div>
        <div className="scored--picked-yours-players">
          {playersSelectedYourAnswerList.map((player) => (
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
          {allAnswersList.map((answer) => (
            <PlayerScoreCard
              isAnswer
              name={answer.name}
              avatarColor={answer.avatarColor}
              answer={answer.answer}
              picked={answer.pickedTimes}
            />
          ))}
        </div>
        <div className="scores--score-heading">Scores</div>
        <div className="scores-list--heading">
          Yash and Tosh are tied for the lead!
        </div>
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
      <div
        className={
          isReadyForNextRound
            ? "scores-list--footer-ready"
            : "scores-list--footer-not-ready"
        }
      >
        {isReadyForNextRound ? (
          <>
            <div className="scores-list--footer-ready-text">
              Waiting for players to ready up...
            </div>
            <WaitingAnimation />
          </>
        ) : (
          <>
            <div className="scores-list--footer-not-ready-text">
              Are you ready for the next round?
            </div>
            <div className="scores-list--footer-ready-btn">
              <CommonButton isPrimary functionality={handleReadyBtn}>
                Ready!
              </CommonButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Scores;
