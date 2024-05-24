import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CONSTANTS from '../Constants/Constants';

const SocketConfig = ({ joinGame }) => {

  const { roomId } =  useParams();
  const { WEB_SOCKET_URL } = CONSTANTS;

  useEffect(() => {
    console.log("insocket");
    let socket;
    if (joinGame) {
        console.log("Connecting to websocket");
        socket = new WebSocket(`${WEB_SOCKET_URL}/websocket/listen/${roomId}`);
        // socket = new WebSocket(`ws://192.168.0.105:8014/subscribe/checkAlert`);

        socket.onopen = () => {
            console.log("Successfully connected from client");
        };

        socket.onmessage = (event) => {
            console.log("MEssage from the server : ", event.data);
        };
        
        socket.onclose = () => {
            console.log("Disconnected message");
        }

        return () => {
            socket.close();
        }

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [joinGame]);

  return;
}

export default SocketConfig