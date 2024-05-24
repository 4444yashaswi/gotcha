import React, { useEffect, useRef, useState } from "react"; // useEffect,
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import CommonButton from "../Components/UI/CommonButton";
import axios from "../Axios/Axios";
import Loader from "../Components/UI/Loader";
import Modal from "../Components/UI/Modal";

const JoinRoom = () => {
    const inputRoom = useRef();

  const navigate = useNavigate();
  const { name, avatarColor } = useParams();

  const [isDisabled, setIsDisabled] = useState(true);
  const [roomDetails, setRoomDetails] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [roomId, setRoomId] = useState("");
  const [roomIdArr, setRoomIdArr] = useState([
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
    " ",
  ]);

  const RoomIdDisplayElement = ({ children, index }) => {
    return (
      <>
        <div className="join-room--display-element">{children || " "}</div>
        {index === 3 && <div className="join-room--display-space" />}
      </>
    );
  };

  const roomIdChangeHandler = (event) => {
    const updatedValue = event.target.value;
    if (updatedValue.length > 8 && roomId.length >= 8) {
      event.preventDefault();
    } else {
      const tempRoomIdArr = updatedValue.split("");
      for (let i = updatedValue.length; i < 8; i++) {
        tempRoomIdArr.push(" ");
      }
      setRoomIdArr(tempRoomIdArr);
      setRoomId(event.target.value);
    }
  };

  const roomIdChangeChecker = (event) => {
    // console.log(event?.key);
    if (!/^[a-zA-Z]+$/.test(event?.key)) event.preventDefault();
  };

  const joinExistingRoom = async () => {
    setIsLoading(true);
    const sendRoomId = roomId.substring(0, 4) + " " + roomId.substring(4);
    console.log(sendRoomId);
    const joinRoomBody = {
      userName: name,
      avatarColour: avatarColor,
      roomId: sendRoomId.toLowerCase(),
    };
    const getRoomDetails = await axios.post("/roomManagement/joinRoom", {
      ...joinRoomBody,
    });
    setRoomDetails(getRoomDetails);
  };

  const backClickHandler = () => {
    setIsModalOpen(true);
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const backButtonFunctionality = () => {
    navigate("/landing");
  };

  useEffect(() => {
    // console.log(roomId.length === 8, /^[a-zA-Z]+$/.test(roomId));
    setIsDisabled(!(roomId.length === 8 && /^[a-zA-Z]+$/.test(roomId)));
  }, [roomId]);

  useEffect(() => {
    if (roomDetails) {
      setIsLoading(false);
      const existingPlayers = roomDetails?.data?.playersList || [];
      navigate(
        `/lobby/${roomDetails?.data?.roomId}/${name}/${avatarColor}/false`,
        { state: existingPlayers }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomDetails]);

  useEffect(() => {
    inputRoom.current.focus();

    return () => {
      setRoomDetails(null);
    };
  }, []);

  return (
    <div className="join-container">
      {isLoading && <Loader />}
      {isModalOpen && (
        <Modal
          title="Are you sure you want to leave the game?"
          onClose={onModalClose}
          functionality={backButtonFunctionality}
        />
      )}
      <div className="join-background" />
      <div className="join-header">
        <div className="join-header--back-button" onClick={backClickHandler}>
          <IoIosArrowBack />
        </div>
        <div className="join-header--title">Join Game</div>
      </div>
      <div className="join-body--contianer">
        <div className="join-body--prompt">
          Awkwardly stare at whoever in you group tapped "Start" until they tell
          you the secret code. then enter it here:
        </div>
        <div className="join-body--room-id-container">
          <input
            className="join-body--room-id-input"
            spellCheck={false}
            ref={inputRoom}
            value={roomId}
            onChange={roomIdChangeHandler}
            onKeyDown={roomIdChangeChecker}
          />
          <div className="join-body--room-display-container">
            {roomIdArr.map((character, index) => (
              <RoomIdDisplayElement index={index}>
                {character}
              </RoomIdDisplayElement>
            ))}
          </div>
          <div />
          {/* for justifying the content inside */}
          <div className="join-body--submit-btn-container">
            <CommonButton
              isPrimary
              isDisabled={isDisabled}
              functionality={joinExistingRoom}
            >
              Submit
            </CommonButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
