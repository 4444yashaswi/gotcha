// import React, { useState } from "react";
// import PlayerDetailsCard from "../Components/UI/PlayerDetails/PlayerDetailsCard";
import PlayerScoreCard from "../Components/UI/PlayerDetails/PlayerScoreCard";
// import Countdown from "../Components/UI/Countdown";
// import PlayerCard from "../Components/UI/PlayerCard";
// import Modal from "../Components/UI/Modal";
// import Loader from "../Components/UI/Loader";

const PageNotFound = () => {
  //{ name: "Omar", avatarColor: "orange", isReady: true },
  // const onClose = () => {console.log("colse the modal")};
  // const functonality = () => {console.log("execute the functiona;ity")};

  // const [inputVal, setInputVal] = useState("");

  // const LIMIT = 50;

  // const inputChangeHandler = (event) => {
  //   const { target } = event;
  //   setInputVal(target.value);
  // };

  return (
    <div style={{ position: "relative" }}>
      {/* <Modal title="Are you sure you want to leave the game?" onClose={onClose} functionality={functonality}/>
       */}
      {/* <Loader /> */}
      <h1>
        Error 404! Page not found :( <div className="triangle"></div>
      </h1>
      <div>
        {/* <PlayerCard name="Tera Baap" avatarColor="#DF7F35" isReady={false}/> */}
      </div>
      {/* <div>
        <input onChange={inputChangeHandler} maxLength={LIMIT}/>
      </div>
      <br />
      <div style={{display: "flex"}}>
      vfdsvfdsvfdsvfbhjbjhbjkbhjbhjbhjbjhkbjhk<Countdown inputVal={inputVal} LIMIT={LIMIT}/>
      </div> */}
      <PlayerScoreCard name="Ohm" avatarColor="orange" isAnswer answer="party animal hona" picked={2} />
      
      <PlayerScoreCard name="Ohm" avatarColor="orange" isReady={true} score={5} />
    </div>
  );
};

export default PageNotFound;
