import React, { useState } from "react";
import { MdIosShare } from "react-icons/md";
import { useParams } from "react-router-dom";
import "./RoomCode.css";
import Notify from "./Notify";
import CONSTANTS from "../../Constants/Constants";

const RoomCode = () => {
  const { LANDING } = CONSTANTS;

  const { roomId } = useParams();
  const [notification, setNotification] = useState();

  const getBaseUrl = () => {
    const { protocol, hostname, port } = window.location;
    return `${protocol}//${hostname}${port ? `:${port}` : ""}`;
  };

  const copyToClipboard = (text) => {
    if (navigator.clipboard) {
      return navigator.clipboard
        .writeText(text)
        .then(() => {
          setNotification("Copied to clipboard");
          return true;
        })
        .catch(() => {
          setNotification("Unable to copy code");
          return false;
        });
    } else {
      // Fallback for older browsers or unsupported environments
      const textArea = document.createElement("textarea");
      textArea.value = text;
      textArea.style.position = "fixed"; // Prevent scrolling to bottom of page in MS Edge.
      textArea.style.top = "0";
      textArea.style.left = "0";
      textArea.style.width = "2em";
      textArea.style.height = "2em";
      textArea.style.padding = "0";
      textArea.style.border = "none";
      textArea.style.outline = "none";
      textArea.style.boxShadow = "none";
      textArea.style.background = "transparent";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        document.body.removeChild(textArea);
        setNotification("Copied to clipboard");
        return Promise.resolve(true);
      } catch (err) {
        document.body.removeChild(textArea);
        setNotification("Unable to copy code");
        return Promise.resolve(false);
      }
    }
  };

  const shareClickHandler = () => {
    copyToClipboard(
      `${getBaseUrl()}${LANDING}/${roomId.split(" ").join("%20")}`
    );
  };

  // const shareClickHandler = async () => {
  //   if ("clipboard" in navigator) {
  //     await navigator.clipboard.writeText(
  //       `${getBaseUrl()}${LANDING}/${roomId.split(" ").join("%20")}`
  //     );
  //     setNotification("Copied to clipboard");
  //   } else {
  //     document.execCommand(
  //       "copy",
  //       true,
  //       `${getBaseUrl()}${LANDING}/${roomId.split(" ").join("%20")}`
  //     );
  //     setNotification("Copied to clipboard");
  //   }
  // };

  return (
    <div className="room-code--code-container">
      <Notify notification={notification} setNotification={setNotification} />
      <div className="room-code--code">{roomId || "???? ????"}</div>
      <div className="room-code--code-share-btn" onClick={shareClickHandler}>
        <MdIosShare />
      </div>
    </div>
  );
};

export default RoomCode;
