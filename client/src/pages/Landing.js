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

  // const joinExistingRoom = async () => {
  //   setIsLoading(false);
  //   const joinRoomBody = {userName: avatarInitial, avatarColour: bgColor, roomId: "cake clog"};
  //   const getRoomDetails = await axios.get('/roomManagement/joinRoom', {...joinRoomBody});
  //   setRoomDetails(getRoomDetails);
  // }

  const startNewRoom = async () => {
    setIsLoading(true);
    const newRoomBody = {userName: avatarInitial, avatarColour: bgColor, rounds: 5};
    const getRoomDetails = await axios.post('/roomManagement/createRoom', {...newRoomBody});
    setRoomDetails(getRoomDetails);
  }

  const joinGameHandler = () => {
    let isValid = inputCheck();
    if (isValid) {

      // setIsAdmin(false);
      // console.log(avatarInitial + " Proceed to Join a game");
      // joinExistingRoom(); //join the room id provided!!!!
    
      navigate(`/join-room/${avatarInitial}/${bgColor}`)
    } else {
      console.log("Error occured while trying to join a game");
    }
  };

  const startGameHandler = () => {
    let isValid = inputCheck();
    if (isValid) {
      setIsAdmin(true);
      console.log(avatarInitial + " Proceed to Start a game");
      startNewRoom();
    } else {
      console.log("Error occured while trying to Start a game");
    }
  };

  useEffect(() => {
    if (roomDetails) {
      setIsLoading(false);
      const existingPlayers = roomDetails?.data?.playersList || [];
      navigate(`/lobby/${roomDetails?.data?.roomId}/${avatarInitial}/${bgColor}/${isAdmin}`, {state: existingPlayers});
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
