import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import PageNotFound from "./pages/PageNotFound";
// import Lobby from "./pages/Lobby";
import JoinRoom from "./pages/JoinRoom";
import Lobby from "./pages/Lobby";
import SubmitAnswer from "./pages/paired pages/SubmitAnswer";
import SelectOption from "./pages/paired pages/SelectOption";
import YourScore from "./pages/paired pages/YourScore";
import GameResult from "./pages/paired pages/GameResult";
import { useState } from "react";
import SocketConfig from "./GameConfig/SocketConfig";

// import GameConfig from "./GameConfig";

function App() {
  const [joinGame, setJoinGame] = useState(false);
  return (
    <div>
      <SocketConfig joinGame={joinGame} />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/landing/:joinRoom?" element={<Landing />} />
        <Route exact path="/join-room/:name/:avatarColor" element={<JoinRoom />} />
        <Route
          exact
          path="/lobby/:roomId/:name/:avatarColor/:isAdmin"
          element={<Lobby setJoinGame={setJoinGame} />}
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
