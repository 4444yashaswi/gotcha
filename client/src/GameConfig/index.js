import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Lobby from "../pages/Lobby";
import PageNotFound from "../pages/PageNotFound";
import SocketConfig from "./SocketConfig";

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
        <Route exact path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};

export default Index;
