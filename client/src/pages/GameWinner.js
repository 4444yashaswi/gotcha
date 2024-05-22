import React from "react";
import { BsTrophyFill } from "react-icons/bs";
import CommonButton from "../Components/UI/CommonButton";
import PlayerStack from "../Components/UI/PlayerDetails/PlayerStack";

const GameWinner = ({ setNext }) => {
  const winningPlayers = [
    { name: "OJ", avatarColor: "blue" },
    // { name: "Tera Baap", avatarColor: "orange" },
    { name: "Tosh", avatarColor: "pink" },
    // { name: "Singh", avatarColor: "purple" },
    { name: "Ohm", avatarColor: "black" },
    // { name: "Goyal", avatarColor: "pink", isReady: true },
    // { name: "Omar", avatarColor: "orange", isReady: true },
  ];

  const getWinnerPrompt = (playerList) => {
    let returnString = playerList?.[0]?.name;
    playerList.map((player, i) => {
      if (i !== 0) returnString += ` and ${player?.name}`;
      return null;
    });
    return returnString;
  };

  return (
    <div className="game-winner--container">
        <div className="game-winner--winner-stack">
        {winningPlayers.map((player, index) => (
          <PlayerStack
            userName={player?.name}
            avatarColor={player?.avatarColor}
            index={index}
            dependentPlayers={winningPlayers}
            style={{height: "20vh", width: "20vh", fontSize: "17vh", border: "10px solid #ffffff"}}
            key={index}
          />
        ))}
        </div>
      <div className="game-winner--card">
        <div className="game-winner--symbol-container">
          <BsTrophyFill />
        </div>
        {getWinnerPrompt(winningPlayers)}
        <div style={{ fontSize: "4vh" }}>
          {winningPlayers?.length === 1 ? "Wins!" : "Win!"}
        </div>
      </div>
      <div className="game-winner--next-btn-container">
        <CommonButton functionality={() => setNext(true)}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            Next&nbsp;
            <div style={{ transform: "rotateY(60deg)", fontWeight: "700" }}>
              &gt;
            </div>
          </div>
        </CommonButton>
      </div>
    </div>
  );
};

export default GameWinner;
