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

function App() {
  const [redirectToLanding, setRedirectToLanding] = useState(false);
  const [joinGame, setJoinGame] = useState(null);

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
    navigate("/landing");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectToLanding]);

  return (
    <div>
      <SocketConfig
        joinGame={joinGame}
        setRedirectToLanding={setRedirectToLanding}
        socketHandler={socketHandler}
        sendInformation={sendInformation}
        setSendInformation={setSendInformation}
      />
      <Routes>
        <Route exact path="/" element={<Landing setJoinGame={setJoinGame} />} />
        <Route
          exact
          path="/landing/:joinRoom?"
          element={<Landing setJoinGame={setJoinGame} />}
        />
        <Route
          exact
          path="/join-room/:name/:avatarColor"
          element={<JoinRoom />}
        />
        <Route
          exact
          path="/lobby/:roomId/:name/:avatarColor/:isAdmin"
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
          path="/answer/:roomId/:name"
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
          path="/select-option/:roomId/:name"
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
          path="/scores/:roomId/:name"
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
        <Route exact path="/result" element={<GameResult />} />
        <Route exact path="*" element={<PageNotFound />} />
        {/* <Route exact path="*" element={<GameConfig/>} /> */}
      </Routes>
    </div>
  );
}

export default App;
