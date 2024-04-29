import React from "react";
import PlayerCard from "../Components/UI/PlayerCard";

const PageNotFound = () => {
  return (
    <div>
      <h1>
        Error 404! Page not found :( <div className="triangle"></div>
      </h1>
      <div>
        <PlayerCard name="Tera Baap" avatarColor="#DF7F35" isReady={false}/>
      </div>
    </div>
  );
};

export default PageNotFound;
