import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Landing from "./pages/Landing";
import PageNotFound from "./pages/PageNotFound";
import JoinRoom from "./pages/JoinRoom";
import Lobby from "./pages/Lobby";
import SubmitAnswer from "./pages/paired pages/SubmitAnswer";
import SelectOption from "./pages/paired pages/SelectOption";
import YourScore from "./pages/paired pages/YourScore";
import GameResult from "./pages/paired pages/GameResult";
import { useEffect, useState } from "react";
import SocketConfig from "./GameConfig/SocketConfig";
import axios from "./Axios/Axios";
import CONSTANTS from "./Constants/Constants";
import Notify from "./Components/UI/Notify";

function App() {
  const {
    LANDING,
    JOINROOM,
    LOBBY,
    SUBMITANSWER,
    SELECTOPTION,
    YOURSCORE,
    GAMERESULT,
    PAGENOTFOUND,
  } = CONSTANTS;

  const [redirectToLanding, setRedirectToLanding] = useState();
  const [joinGame, setJoinGame] = useState(null);
  const [notification, setNotification] = useState();

  // Socket Response States
  const [joinedRoomPlayer, setJoinedRoomPlayer] = useState(null);
  const [leftRoomPlayer, setLeftRoomPlayer] = useState(null);
  const [isReadyPlayer, setIsReadyPlayer] = useState(null);
  const [hasSubmittedPlayer, setHasSubmittedPlayer] = useState(null);
  const [hasSelectedPlayer, setHasSelectedPlayer] = useState(null);

  const [isAllReady, setIsAllReady] = useState(false);
  const [haveAllSubmitted, setHaveAllSubmitted] = useState(false);
  const [haveAllSelected, setHaveAllSelected] = useState(false);

  // Socket Send State
  const [sendInformation, setSendInformation] = useState(null);

  const navigate = useNavigate();

  // Handle Messages from Socket
  const socketHandler = ({
    joinedRoom,
    leftRoom,
    isReady,
    hasSubmitted,
    hasSelected,
  }) => {
    if (joinedRoom) setJoinedRoomPlayer({ ...joinedRoom });
    else if (leftRoom) setLeftRoomPlayer({ ...leftRoom });
    else if (isReady) {
      console.log(isReady);
      setIsReadyPlayer({ ...isReady });
      if (isReady?.isAll) setIsAllReady(isReady?.isAll);
    } else if (hasSubmitted) {
      console.log(hasSubmitted);
      setHasSubmittedPlayer({ ...hasSubmitted });
      if (hasSubmitted?.isAll) setHaveAllSubmitted(hasSubmitted?.isAll);
    } else if (hasSelected) {
      console.log(hasSelected);
      setHasSelectedPlayer({ ...hasSelected });
      if (hasSelected?.isAll) setHaveAllSelected(hasSelected?.isAll);
    } else console.log("else here");
  };

  useEffect(() => {
    if (typeof redirectToLanding === "boolean") navigate(`${LANDING}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectToLanding]);

  // Function for waking up the backend
  const wakeUpBackend = async () => {
    try {
      const response = await axios.get("/");
      console.log(response);
    } catch (err) {
      console.log("Server Down\n", err);
      setNotification("Oops! Something went wrong.");
    }
  };

  useEffect(() => {
    wakeUpBackend();
  }, []);

  return (
    <div>
      <SocketConfig
        joinGame={joinGame}
        setRedirectToLanding={setRedirectToLanding}
        socketHandler={socketHandler}
        sendInformation={sendInformation}
        setSendInformation={setSendInformation}
      />
      <Notify notification={notification} setNotification={setNotification}/>
      <Routes>
        <Route exact path="/" element={<Landing setJoinGame={setJoinGame} />} />
        <Route
          exact
          path={`${LANDING}/:joinRoom?`}
          element={<Landing setJoinGame={setJoinGame} />}
        />
        <Route
          exact
          path={`${JOINROOM}/:name/:avatarColor`}
          element={<JoinRoom />}
        />
        <Route
          exact
          path={`${LOBBY}/:roomId/:name/:avatarColor/:isAdmin`}
          element={
            <Lobby
              setJoinGame={setJoinGame}
              joinedRoomPlayer={joinedRoomPlayer}
              leftRoomPlayer={leftRoomPlayer}
              isReadyPlayer={isReadyPlayer}
              isAllReady={isAllReady}
              setIsAllReady={setIsAllReady}
              setIsReadyPlayer={setIsReadyPlayer}
              setSendInformation={setSendInformation}
            />
          }
        />
        <Route
          exact
          path={`${SUBMITANSWER}/:roomId/:name`}
          element={
            <SubmitAnswer
              hasSubmittedPlayer={hasSubmittedPlayer}
              setHasSubmittedPlayer={setHasSubmittedPlayer}
              haveAllSubmitted={haveAllSubmitted}
              setHaveAllSubmitted={setHaveAllSubmitted}
            />
          }
        />
        <Route
          exact
          path={`${SELECTOPTION}/:roomId/:name`}
          element={
            <SelectOption
              hasSelectedPlayer={hasSelectedPlayer}
              setHasSelectedPlayer={setHasSelectedPlayer}
              haveAllSelected={haveAllSelected}
              setHaveAllSelected={setHaveAllSelected}
            />
          }
        />
        <Route
          exact
          path={`${YOURSCORE}/:roomId/:name`}
          element={
            <YourScore
              setSendInformation={setSendInformation}
              isReadyPlayer={isReadyPlayer}
              setIsReadyPlayer={setIsReadyPlayer}
              isAllReady={isAllReady}
              setIsAllReady={setIsAllReady}
            />
          }
        />
        <Route exact path={`${GAMERESULT}`} element={<GameResult />} />
        <Route exact path={`${PAGENOTFOUND}`} element={<PageNotFound />} />
        {/* <Route exact path="*" element={<GameConfig/>} /> */}
      </Routes>
    </div>
  );
}

export default App;
