import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import CommonButton from "../Components/UI/CommonButton";
import DetailsForm from "../Components/DetailsForm/DetailsForm";

const Landing = () => {
  const [avatarInitial, setAvatarInitial] = useState();
  const [isError, setIsError] = useState(false);

  const navigate = useNavigate();

  const inputCheck = () => {
    if (avatarInitial?.length && avatarInitial.length !== 0) {
      setIsError(false);
      return !false;
    } else {
      setIsError(true);
      return !true;
    }
  };

  const joinGameHandler = () => {
    let isValid = inputCheck();
    if (isValid) {
      console.log(avatarInitial + "Proceed to Join a game");
      navigate('/lobby');
    } else {
      console.log("Error occured while trying to join a game");
    }
  };

  const startGameHandler = () => {
    let isValid = inputCheck();
    if (isValid) {
      console.log(avatarInitial + "Proceed to Start a game");
      navigate('/lobby');
    } else {
      console.log("Error occured while trying to Start a game");
    }
  };

  return (
    <div className="landing-page--container">
      <div className="landing-page--bg-container" />'
      <div className="landing-page--body-container">
        <div className="landing-page--header">GOTCHA!</div>
        <div className="landing-page--details-form">
          <DetailsForm
            avatarInitial={avatarInitial}
            setAvatarInitial={setAvatarInitial}
            isError={isError}
            setIsError={setIsError}
          />
        </div>
        <div className="landing-page--btns-container">
          <CommonButton isPrimary functionality={joinGameHandler}>
            Join Game
          </CommonButton>
          <CommonButton functionality={startGameHandler}>
            Start Game
          </CommonButton>
        </div>
      </div>
    </div>
  );
};

export default Landing;
