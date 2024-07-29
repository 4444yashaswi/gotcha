import React, { /*useEffect,*/ useEffect, useState } from "react";
import Answer from "../Answer";
import SelectSubmit from "../SelectSubmit";
import axios from "../../Axios/Axios";
import { useNavigate, useParams } from "react-router-dom";
import CONSTANTS from "../../Constants/Constants";
import Notify from "../../Components/UI/Notify";

const SubmitAnswer = ({
  hasSubmittedPlayer,
  setHasSubmittedPlayer,
  haveAllSubmitted,
  setHaveAllSubmitted,
}) => {
  const { SUBMIT_STATUS } = CONSTANTS;
  const { roomId, name } = useParams();

  const navigate = useNavigate();

  const [hasPlayerSubmittedAnswer, setHasPlayerSubmittedAnswer] =
    useState(false);
  const [playerList, setPlayerList] = useState([]);
  const [notification, setNotification] = useState();

  // update the player status if they submit an answer
  useEffect(() => {
    if (hasSubmittedPlayer) {
      setPlayerList((players) =>
        players.map((player) =>
          player?.name === hasSubmittedPlayer?.name
            ? { ...hasSubmittedPlayer }
            : { ...player }
        )
      );
    }
  }, [hasSubmittedPlayer]);

  // change the screen if the isAll is true
  useEffect(() => {
    const readyTimeOut = setTimeout(() => {
      if (haveAllSubmitted) {
        navigate(`/select-option/${roomId}/${name}`);
      }
    }, 3000);

    return () => {
      clearTimeout(readyTimeOut);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [haveAllSubmitted]);

  // get the list of players present in the room
  const getPlayerList = async () => {
    try {
      const players = await axios.get(
        `/roomManagement/userList?roomId=${roomId}&userName=${name}&flag=${SUBMIT_STATUS}`
      );
      console.log(players);
      setPlayerList(
        players?.data?.userList?.map((player) => ({
          name: player?.name,
          avatarColor: player?.avatarColour,
          ready: player?.status,
        }))
      );
    } catch (err) {
      setNotification("Oops! Something went wrong.");
    }
  };

  useEffect(() => {
    getPlayerList();

    return () => {
      setHaveAllSubmitted(false);
      setHasSubmittedPlayer(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Notify notification={notification} setNotification={setNotification} />
      {hasPlayerSubmittedAnswer ? (
        <SelectSubmit nextScreen="/select-option" playerList={playerList} />
      ) : (
        <Answer
          setSubmitted={setHasPlayerSubmittedAnswer}
          setPlayerList={setPlayerList}
        />
      )}
    </>
  );
};

export default SubmitAnswer;
