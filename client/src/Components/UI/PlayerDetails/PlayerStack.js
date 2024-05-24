import React from 'react'

const PlayerStack = ({ userName, avatarColor, dependentPlayers, index, style }) => {
    let styleMap;
    if (dependentPlayers.length === 1) styleMap = {};
    else if (dependentPlayers.length === 2)
      styleMap = {
        0: { left: "0" },
        1: { right: "0" },
      };
    else
      styleMap = {
        0: { left: "0" },
        1: {},
        2: { right: "0" },
      };
    return (
      <div
        style={{
          height: "7vh",
          width: "7vh",
          borderRadius: "50%",
          boxSizing: "border-box",
          border: "4px solid white",
          fontSize: "3vh",
          fontWeight: "500",
          color: "rgba(255, 255, 255, 0.8)",
          backgroundColor: avatarColor,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          top: "-18%",
          ...styleMap[index],
          ...style,
        }}
      >
        {userName?.[0]}
      </div>
    );
  };

export default PlayerStack