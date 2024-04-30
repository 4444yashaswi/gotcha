import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import CommonButton from "../Components/UI/CommonButton";
import DetailsForm from "../Components/DetailsForm/DetailsForm";
import axios from "../Axios/Axios";
import Loader from "../Components/UI/Loader";

const Landing = () => {
  const [avatarInitial, setAvatarInitial] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [roomDetails, setRoomDetails] = useState();
  const [bgColor, setBgColor] = useState("aqua");
  const [isAdmin, setIsAdmin] = useState();

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

  const getLobbyId = async () => {
    setIsLoading(true);
    const getRoomDetails = await axios.get(`/triviaManagement/hit?name=${avatarInitial}`);
    setRoomDetails(getRoomDetails);
  }

  const joinGameHandler = () => {
    let isValid = inputCheck();
    if (isValid) {
      setIsAdmin(true);
      console.log(avatarInitial + " Proceed to Join a game");
      getLobbyId();
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

  useEffect(() => {
    if (roomDetails) {
      setIsLoading(false);
      navigate(`/lobby/${roomDetails?.data?.roomId}/${avatarInitial}/${bgColor}/${isAdmin}`);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomDetails]);

  useEffect(() => {
    return () => {
      setRoomDetails(null);
    }
  },[]);

  return (
    <div className="landing-page--container">
      {isLoading && <Loader />}
      <div className="landing-page--bg-container" />'
      <div className="landing-page--body-container">
        <div className="landing-page--header">GOTCHA!</div>
        <div className="landing-page--details-form">
          <DetailsForm
            avatarInitial={avatarInitial}
            setAvatarInitial={setAvatarInitial}
            isError={isError}
            setIsError={setIsError}
            bgColor={bgColor}
            setBgColor={setBgColor}
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
