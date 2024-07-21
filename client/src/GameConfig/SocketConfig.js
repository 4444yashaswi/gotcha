import { useEffect, useState } from "react";
// import io from "socket.io-client";
import CONSTANTS from "../Constants/Constants";
import { useLocation } from "react-router-dom";

const SocketConfig = ({ joinGame, socketHandler, sendInformation, setSendInformation }) => {
  const { WEB_SOCKET_URL, JOINED, LEFT, READY, SUBMIT, SELECT } = CONSTANTS;
  const location = useLocation();

  const [isConnected, setIsConnected] = useState(false);
  const [webSocket, setWebSocket] = useState(null);
  
  let socket;

  useEffect(() => {
    console.log("insocket");
    if (joinGame) {
      //   socket = io(`${WEB_SOCKET_URL}/ws`);
      const queryParams = new URLSearchParams(location.search);
      const roomId = queryParams.get("roomId");
      const userName = queryParams.get("userName");
      console.log(
        "Connecting to websocket: " + WEB_SOCKET_URL + " FOR ROOM ID: " + roomId
      );

      // eslint-disable-next-line react-hooks/exhaustive-deps
      socket = new WebSocket(
        `${WEB_SOCKET_URL}/websocket/listen?room_id=${roomId}&user_name=${userName}`
      );

      //   socket.on("connect", () => {
      //     console.log("Connected successfully");
      //     // parentCallback({ socket });
      //     const joinRoomPayload = {
      //         roomId,
      //         userName: "LANDINGS",
      //         avatarColour: "aqua"
      //     };
      //     socket.emit("join_room", { ...joinRoomPayload });
      //   });

      socket.onopen = () => {
        console.log("Successfully connected from client");
        setIsConnected(true);
        setWebSocket(socket);
      };

      socket.onclose = () => {
        setIsConnected(false);
        setWebSocket(null);
      }

      socket.onmessage = (event) => {
        console.log("Message from the server : ", event?.data);
        const { flag, userName, avatarColour, isAll } = JSON.parse(event?.data);

        switch(flag) {
            //case if a person joins a room:
            case JOINED:
                console.log(flag, userName, avatarColour);
                const joinedRoomPlayer = {name: userName, avatarColor: avatarColour};
                socketHandler({ joinedRoom: joinedRoomPlayer });
                break;

            //case if a person leaves a room:
            case LEFT:
                console.log(flag, userName);
                const leftRoomPlayer = {name: userName, avatarColor: avatarColour};
                socketHandler({leftRoom: leftRoomPlayer});
                break;

            //case if a person change their status to ready
            case READY:
                console.log(flag, userName);
                const isReadyPlayer = {name: userName, avatarColor: avatarColour, isReady: true};
                socketHandler({isReady: isReadyPlayer});
                break;

            //case if a person submits their answer
            case SUBMIT:
                console.log(flag, userName);
                break;

            //case if a person selects an option
            case SELECT:
                console.log(flag, userName);
                break;

            default:
                console.log(flag, userName, avatarColour, isAll);
        }
      };

      socket.onclose = () => {
        console.log("Disconnected message");
      };

      return () => {
        socket.close();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joinGame]);



  // For sending messages
  useEffect(() => {
    console.log(webSocket);
    if(isConnected && webSocket && sendInformation) {
        const message = JSON.stringify(sendInformation);
        console.log("Sending message: " + message);
        webSocket.send(message);
        setSendInformation(null)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sendInformation]);

  return;
};

export default SocketConfig;
