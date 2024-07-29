import React, { useEffect, useState } from "react";
import Options from "../Options";
import SelectSubmit from "../SelectSubmit";
import { useNavigate, useParams } from "react-router-dom";
import CONSTANTS from "../../Constants/Constants";
import axios from "../../Axios/Axios";
import Notify from "../../Components/UI/Notify";

const SelectOption = ({
  hasSelectedPlayer,
  setHasSelectedPlayer,
  haveAllSelected,
  setHaveAllSelected,
}) => {
  const { SELECT_STATUS } = CONSTANTS;
  const { roomId, name } = useParams();

  const navigate = useNavigate();

  const [hasPlayerSelectedOption, setHasPlayerSelectedOption] = useState(false);
  const [playerList, setPlayerList] = useState([]);
  const [notification, setNotification] = useState();

  // update the player status if they submit an answer
  useEffect(() => {
    if (hasSelectedPlayer) {
      setPlayerList((players) =>
        players.map((player) =>
          player?.name === hasSelectedPlayer?.name
            ? { ...hasSelectedPlayer }
            : { ...player }
        )
      );
    }
  }, [hasSelectedPlayer]);

  // change the screen if the isAll is true
  useEffect(() => {
    const readyTimeOut = setTimeout(() => {
      if (haveAllSelected) navigate(`/scores/${roomId}/${name}`);
    }, 3000);

    return () => {
      clearTimeout(readyTimeOut);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [haveAllSelected]);

  // get the list of players present in the room
  const getPlayerList = async () => {
    try {
      const players = await axios.get(
        `/roomManagement/userList?roomId=${roomId}&userName=${name}&flag=${SELECT_STATUS}`
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
      setHasSelectedPlayer(false);
      setHaveAllSelected(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Notify notification={notification} setNotification={setNotification} />
      {hasPlayerSelectedOption ? (
        <SelectSubmit nextScreen="/scores" playerList={playerList} />
      ) : (
        <Options setSubmitted={setHasPlayerSelectedOption} />
      )}
    </>
  );
};

export default SelectOption;
