import "./App.css";
import { Routes, Route } from "react-router-dom";
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
  const [joinGame, setJoinGame] = useState(null);

  // Socket Response States
  const [joinedRoomPlayer, setJoinedRoomPlayer] = useState(null);
  const [leftRoomPlayer, setLeftRoomPlayer] = useState(null);
  const [isReadyPlayer, setIsReadyPlayer] = useState(null);
  const [hasSubmittedPlayer, setHasSubmittedPlayer] = useState(null);
  const [hasSelectedPlayer, setHasSelectedPlayer] = useState(null);

  // Socket Send State
  const [sendInformation, setSendInformation] = useState(null);

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
    else if (isReady) setIsReadyPlayer({ ...isReady });
    else console.log("else here");
  };

  return (
    <div>
      <SocketConfig
        joinGame={joinGame}
        socketHandler={socketHandler}
        sendInformation={sendInformation}
        setSendInformation={setSendInformation}
      />
      <Routes>
        <Route exact path="/" element={<Landing setJoinGame={setJoinGame} />} />
        <Route exact path="/landing/:joinRoom?" element={<Landing setJoinGame={setJoinGame} />} />
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
              setSendInformation={setSendInformation}
            />
          }
        />
        <Route exact path="/answer/:roomId/:name" element={<SubmitAnswer />} />
        <Route
          exact
          path="/select-option/:roomId/:name"
          element={<SelectOption />}
        />
        <Route exact path="/scores/:roomId/:name" element={<YourScore />} />
        <Route exact path="/result" element={<GameResult />} />
        <Route exact path="*" element={<PageNotFound />} />
        {/* <Route exact path="*" element={<GameConfig/>} /> */}
      </Routes>
    </div>
  );
}

export default App;
