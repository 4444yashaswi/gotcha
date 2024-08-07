import React, { useEffect, useState } from "react";
import TruthHeader from "../Components/TruthComesOutComponents/TruthHeader";
import PlayerDetailsCard from "../Components/UI/PlayerDetails/PlayerDetailsCard";
import PlayerScoreCard from "../Components/UI/PlayerDetails/PlayerScoreCard";
import CommonButton from "../Components/UI/CommonButton";
import WaitingAnimation from "../Components/UI/WaitingAnimation";
import { useNavigate, useParams } from "react-router-dom";
import CONSTANTS from "../Constants/Constants";

const Scores = ({
  playersSelectedYourAnswer,
  allAnswers,
  roundScores,
  leaders,
  round,
  totalRounds,
  setSendInformation,
  isReadyPlayer,
  setIsReadyPlayer,
  isAllReady,
  setIsAllReady,
}) => {
  const { READY } = CONSTANTS;
  const navigate = useNavigate();

  const { name, roomId } = useParams();

  const [isReadyForNextRound, setIsReadyForNextRound] = useState(false);
  const [playerRoundScores, setPlayerRoundScores] = useState([...roundScores]);

  const getLeaderPrompt = (leaders) => {
    let returnPrompt = leaders?.[0]?.name;
    if (leaders?.length === 1) return returnPrompt + " is in the lead!";
    for (let i = 1; i < leaders?.length; i++)
      returnPrompt += " and " + leaders?.[i]?.name;
    return returnPrompt + " are tied for the lead!";
  };

  const handleReadyBtn = () => {
    if (round !== totalRounds) {
      console.log("The player is ready for the next round");
      setIsReadyForNextRound(true);
      const information = {
        flag: READY,
        userName: name,
        avatarColour: "N/A",
        isAll: false,
      };
      setSendInformation(information);
    } else {
      console.log("go to the gameResults page");
      const state = {
        playerScores: roundScores,
        leaders: leaders,
      };
      navigate("/result", { state: state });
    }
  };

  useEffect(() => {
    if (isReadyPlayer) {
      setPlayerRoundScores((players) =>
        players.map((player) =>
          player?.name === isReadyPlayer?.name
            ? { ...player, isReady: true }
            : { ...player }
        )
      );
    }
  }, [isReadyPlayer]);

  useEffect(() => {
    const readyTimeOut = setTimeout(() => {
      if (isAllReady)
        setTimeout(() => navigate(`/answer/${roomId}/${name}`), 100);
    }, 3000);

    return () => {
      clearTimeout(readyTimeOut);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAllReady]);

  useEffect(() => {
    return () => {
      setIsAllReady(false);
      setIsReadyPlayer(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="scores-container">
      <TruthHeader
        textStyle={{ fontSize: "3vh", fontWeight: "600" }}
        btnStyle={{ top: "8.7vh" }}
      >
        Results: round {round}/{totalRounds}
      </TruthHeader>
      <div className="scores-list--container">
        <div className="scores--picked-yours-heading">
          {playersSelectedYourAnswer?.length > 0
            ? `${playersSelectedYourAnswer?.length} player${
                playersSelectedYourAnswer?.length !== 1 ? "s" : ""
              } liked `
            : "No one picked "}
          your answer
        </div>
        <div className="scored--picked-yours-players">
          {playersSelectedYourAnswer?.map((player) => (
            <PlayerDetailsCard
              name={player.name}
              avatarColor={player.avatarColour}
              key={player.name}
            />
          ))}
        </div>
        <div className="scores-list--heading">
          How many times was each answer picked?
        </div>
        <div className="scores-list--answers-container">
          {allAnswers.map((answer) => (
            <PlayerScoreCard
              isAnswer
              name={answer.userName}
              avatarColor={answer.avatarColour}
              answer={answer.answer}
              picked={answer.pickedByCount}
            />
          ))}
        </div>
        <div className="scores--score-heading">Scores</div>
        <div className="scores-list--heading">{getLeaderPrompt(leaders)}</div>
        <div className="scores-list--players-container">
          {playerRoundScores.map((player) => (
            <PlayerScoreCard
              name={player.name}
              avatarColor={player.avatarColour}
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
            {round !== totalRounds && (
              <div className="scores-list--footer-not-ready-text">
                Are you ready for the next round?
              </div>
            )}
            <div className="scores-list--footer-ready-btn">
              <CommonButton isPrimary functionality={handleReadyBtn}>
                {round !== totalRounds ? "Ready!" : "Game Results"}
              </CommonButton>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Scores;
