import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const SocketConfig = ({ children }) => {

  const { roomId } =  useParams();

  useEffect(() => {
    console.log("insocket");
    let socket;
    if (roomId !== null && roomId !== undefined) {
        console.log("Connecting to websocket");
        socket = new WebSocket(`ws://192.168.0.105:8000/${roomId}`);
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

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  return <>{children}</>;
}

export default SocketConfig