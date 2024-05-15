import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Lobby from "../pages/Lobby";
import PageNotFound from "../pages/PageNotFound";
import SocketConfig from "./SocketConfig";
import SubmitAnswer from "../pages/paired pages/SubmitAnswer";
import SelectOption from "../pages/paired pages/SelectOption";
import YourScore from "../pages/paired pages/YourScore";

const Index = () => {
  const [roomId, setRoomId] = useState();


  return (
    <>
      <SocketConfig roomId={roomId} />
      <Routes>
        <Route
          exact
          path="/lobby/:roomId/:name/:avatarColor/:isAdmin"
          element={<Lobby setRoomId={setRoomId} />}
        />
        <Route exact path="/answer" element={<SubmitAnswer />} />
        <Route exact path="/select-option" element={<SelectOption />} />
        <Route exact path="/scores" element={<YourScore />} />
        <Route exact path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default Index;