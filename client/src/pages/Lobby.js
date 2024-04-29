import React, { useState } from "react";
import CommonButton from "../Components/UI/CommonButton";
import PlayerCard from "../Components/UI/PlayerCard";
import Modal from "../Components/UI/Modal";
import { useNavigate } from "react-router-dom";

const Lobby = () => {
  const players = [
    { name: "OJ", avtarColor: "aqua", isReady: true },
    { name: "Tera Baap", avtarColor: "orange", isReady: true },
    { name: "Yashaswi", avtarColor: "lightgreen", isReady: false },
    { name: "Tosh :)", avtarColor: "pink", isReady: true },
    { name: "Singh", avtarColor: "pink", isReady: false },
    { name: "Ohm", avtarColor: "yellow", isReady: true },
    { name: "Goyal", avtarColor: "pink", isReady: true },
    { name: "Omar", avtarColor: "orange", isReady: true },
  ];

  const roundsList = ["5", "7", "10", "15"];

  const [noOfRounds, setNoOfRounds] = useState("5");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();

  const roundsClickHandler = (round) => {
    setNoOfRounds(round);
  };

  const backButtonFunctionality = () => {
    navigate("/landing");
  };

  const backClickHandler = () => {
    setIsModalOpen(true);
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="lobby-container">
      {isModalOpen && <Modal title="Are you sure you want to leave the game?" onClose={onModalClose} functionality={backButtonFunctionality}/>}
      <div className="lobby-background" />
      <div className="lobby-header">
        <div className="lobby-header--back-button" onClick={backClickHandler}>{"<"}</div>
        <div className="lobby-header--heading">Lobby</div>
        <div /> {/*place holder div*/}
      </div>
      <div className="lobby-body">
        <div className="lobby-body--join-text">
          Tell your friends to enter this code to join your game
        </div>
        <div className="lobby-body--code-container">
          <div className="lobby-body--code">{"chad skip"}</div>
          <div className="lobby-body--code-share-btn">^</div>
        </div>
        <div className="lobby-body--waiting">
          Waiting for everyone to get Ready...
        </div>
      </div>
      <div className="lobby-player--container">
        {players.map((player) => (
          <PlayerCard
            name={player.name}
            avatarColor={player.avtarColor}
            isReady={player.isReady}
          />
        ))}
      </div>{" "}
      <div className="lobby-footer--container">
        <div className="lobby-footer--rounds-container">
          <div className="lobby-footer--rounds-label">Number of rounds</div>
          <div className="lobby-footer--rounds-slider">
            {roundsList.map((round) => (
              <div
                className={`lobby-footer--rounds-option ${
                  round === noOfRounds
                    ? "lobby-footer--rounds-option-active"
                    : ""
                }`}
                onClick={(event) => roundsClickHandler(event.target.innerText)}
              >
                {round}
              </div>
            ))}
          </div>
        </div>
        <div className="lobby-footer--isReady-btn-container">
          <CommonButton
            isPrimary
            style={{ position: "absolute", left: "5%", width: "90vw" }}
          >
            Ready!
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
