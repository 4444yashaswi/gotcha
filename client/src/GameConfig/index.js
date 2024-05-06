import React from "react";
import { Route, Routes } from "react-router-dom";
import Lobby from "../pages/Lobby";
import PageNotFound from "../pages/PageNotFound";
import SocketConfig from "./SocketConfig";

const Index = () => {
  return (
    <>
      <Routes>
        <Route
          exact
          path="/lobby/:roomId/:name/:avatarColor/:isAdmin"
          element={
            <SocketConfig>
              <Lobby />
            </SocketConfig>
          }
        />
        <Route
          exact
          path="*"
          element={
            <SocketConfig>
              <PageNotFound />
            </SocketConfig>
          }
        />
      </Routes>
    </>
  );
};

export default Index;
