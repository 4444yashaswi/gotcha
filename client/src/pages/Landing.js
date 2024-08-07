import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CommonButton from "../Components/UI/CommonButton";
import DetailsForm from "../Components/DetailsForm/DetailsForm";
import axios from "../Axios/Axios";
import Loader from "../Components/UI/Loader";
import Notify from "../Components/UI/Notify";

const Landing = ({ setJoinGame }) => {
  const { joinRoom } = useParams();

  const [avatarInitial, setAvatarInitial] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState();
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

  const joinExistingRoom = async () => {
    setIsLoading(true);
    console.log(joinRoom);
    const joinRoomBody = {
      userName: avatarInitial,
      avatarColour: bgColor,
      roomId: joinRoom.toLowerCase(),
    };
    try {
      const getRoomDetails = await axios.post("/roomManagement/joinRoom", {
        ...joinRoomBody,
      });
      setRoomDetails(getRoomDetails);
    } catch (err) {
      setNotification("Oops! Something went wrong.");
    }
  };

  const startNewRoom = async () => {
    setIsLoading(true);
    const newRoomBody = {
      userName: avatarInitial,
      avatarColour: bgColor,
      rounds: 5,
    };
    try {
      const getRoomDetails = await axios.post("/roomManagement/createRoom", {
        ...newRoomBody,
      });
      setRoomDetails(getRoomDetails);
    } catch (err) {
      setNotification("Oops! Something went wrong.");
    }
  };

  const joinGameHandler = () => {
    let isValid = inputCheck();
    if (isValid) {
      setIsAdmin(false);
      console.log(avatarInitial + " Proceed to Join a game");
      const joinRoomId = joinRoom || false;
      if (joinRoomId) joinExistingRoom(); //join the room id provided!!!!
      else navigate(`/join-room/${avatarInitial}/${bgColor}`);
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
      const params = new URLSearchParams({
        roomId: roomDetails?.data?.roomId,
        userName: avatarInitial,
      });
      navigate(
        `/lobby/${
          roomDetails?.data?.roomId
        }/${avatarInitial}/${bgColor}/${isAdmin}?${params.toString()}`,
        { state: existingPlayers }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomDetails]);

  useEffect(() => {
    setJoinGame(false);
    return () => {
      setRoomDetails(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="landing-page--container">
      {isLoading && <Loader />}
      <Notify notification={notification} setNotification={setNotification} />
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
