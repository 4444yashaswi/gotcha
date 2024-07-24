import React, { useEffect } from "react";
import TruthHeader from "../Components/TruthComesOutComponents/TruthHeader";
import PlayerCard from "../Components/UI/PlayerDetails/PlayerCard";

const Submissions = ({ nextScreen, playerList }) => {
  // const playerList = [
  //   { name: "OJ", avatarColor: "blue", isReady: true },
  //   { name: "Tera Baap", avatarColor: "orange", isReady: true },
  //   { name: "Yashaswi", avatarColor: "lightgreen", isReady: false },
  //   { name: "Tosh :)", avatarColor: "pink", isReady: true },
  //   { name: "Singh", avatarColor: "purple", isReady: false },
  //   { name: "Ohm", avatarColor: "yellowgreen", isReady: true },
  //   { name: "Goyal", avatarColor: "pink", isReady: true },
  //   { name: "Omar", avatarColor: "orange", isReady: true },
  // ];

  useEffect(() => {
    console.log("The screen afer this will be: ", nextScreen);
  }, [nextScreen]);

  return (
    <div className="waiting-container">
      <TruthHeader>The Truth Comes Out Teaser</TruthHeader>
      <div className="waiting-list--container">
        <div className="waiting-list--heading">Collecting answers...</div>
        <div className="waiting-list--players-container">
          {playerList?.length > 0 ? playerList?.map((player) => (
            <PlayerCard
              name={player?.name}
              avatarColor={player?.avatarColor}
              isReady={player?.isReady}
            />
          )) : <></>}
        </div>
      </div>
    </div>
  );
};

export default Submissions;
