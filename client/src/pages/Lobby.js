import React, { useEffect, useState } from "react";
import CommonButton from "../Components/UI/CommonButton";
import PlayerCard from "../Components/UI/PlayerCard";
import Modal from "../Components/UI/Modal";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import axios from "../Axios/Axios";
import { MdIosShare } from "react-icons/md";
import { IoIosArrowBack } from "react-icons/io";

const Lobby = () => {
  // const playerList = [
  //   { name: "OJ", avatarColor: "blue", isReady: true },
  //   { name: "Tera Baap", avatarColor: "orange", isReady: true },
  //   { name: "Yashaswi", avatarColor: "lightgreen", isReady: false },
  //   { name: "Tosh :)", avatarColor: "pink", isReady: true },
  //   { name: "Singh", avatarColor: "purple", isReady: false },
  //   { name: "Ohm", avatarColor: "yellowgreen", isReady: true },
  //   { name: "Goyal", avatarColor: "pink", isReady: true },
  //   { name: "Omar", avatarColor: "orange", isReady: true },
  // ];
  
  const playerList = useLocation().state;

  const roundsList = ["5", "7", "10", "15"];

  const [noOfRounds, setNoOfRounds] = useState("5");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [players, setPlayers] = useState([]);

  const navigate = useNavigate();
  const { roomId, name, avatarColor, isAdmin } = useParams();

  const readyBtnHandler = async () => {
    // const response = await axios.get(`/triviaManagement/hit?name=${name}`);
    // console.log(response);
    setIsReady((isReady) => !isReady);
  };

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

  useEffect(() => {
    setPlayers([{ name, avatarColor, isReady, key: name }, ...playerList]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPlayers((players) =>
      players.map((player) => {
        if (player.key === name) return { ...player, isReady };
        else return player;
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReady]);

  return (
    <div className="lobby-container">
      {isModalOpen && (
        <Modal
          title="Are you sure you want to leave the game?"
          onClose={onModalClose}
          functionality={backButtonFunctionality}
        />
      )}
      <div className="lobby-background" />
      <div className="lobby-header">
        <div className="lobby-header--back-button" onClick={backClickHandler}>
          <IoIosArrowBack />
        </div>
        <div className="lobby-header--heading">Lobby</div>
        <div /> {/*place holder div*/}
      </div>
      <div className="lobby-body">
        <div className="lobby-body--join-text">
          Tell your friends to enter this code to join your game
        </div>
        <div className="lobby-body--code-container">
          <div className="lobby-body--code">{roomId}</div>
          <div className="lobby-body--code-share-btn">
            <MdIosShare />
          </div>
        </div>
        <div className="lobby-body--waiting">
          Waiting for everyone to get Ready...
        </div>
      </div>
      <div className="lobby-player--container">
        {players.map((player) => (
          <PlayerCard
            name={player.name}
            avatarColor={player.avatarColor}
            isReady={player.isReady}
          />
        ))}
      </div>{" "}
      <div className="lobby-footer--container">
        <div className="lobby-footer--rounds-container">
          {isAdmin === "true" && (
            <>
              <div className="lobby-footer--rounds-label">Number of rounds</div>
              <div className="lobby-footer--rounds-slider">
                {roundsList.map((round) => (
                  <div
                    className={`lobby-footer--rounds-option ${
                      round === noOfRounds
                        ? "lobby-footer--rounds-option-active"
                        : ""
                    }`}
                    onClick={(event) =>
                      roundsClickHandler(event.target.innerText)
                    }
                  >
                    {round}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="lobby-footer--isReady-btn-container">
          <CommonButton
            isPrimary
            style={{ position: "absolute", left: "5%", width: "90vw" }}
            functionality={readyBtnHandler}
          >
            {isReady ? "Ready!" : "Are you Ready?"}
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
