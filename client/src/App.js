import "./App.css";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import PageNotFound from "./pages/PageNotFound";
import Lobby from "./pages/Lobby";
import JoinRoom from "./pages/JoinRoom";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/landing" element={<Landing />} />
        <Route exact path="/lobby/:roomId/:name/:avatarColor/:isAdmin" element={<Lobby />} />
        <Route exact path="/join-room/:name/:avatarColor" element={<JoinRoom />} />
        <Route exact path="*" element={<PageNotFound/>} />
      </Routes>
    </div>
  );
}

export default App;
