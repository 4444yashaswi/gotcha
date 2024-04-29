import React from "react";
import PlayerCard from "../Components/UI/PlayerCard";
// import Modal from "../Components/UI/Modal";
import Loader from "../Components/UI/Loader";

const PageNotFound = () => {
  // const onClose = () => {console.log("colse the modal")};
  // const functonality = () => {console.log("execute the functiona;ity")};
  return (
    <div style={{position: "relative"}}>
      {/* <Modal title="Are you sure you want to leave the game?" onClose={onClose} functionality={functonality}/>
       */}
      <Loader />
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
