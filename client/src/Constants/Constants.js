const CONSTANTS = {
  // URLs
  BASE_URL: process.env.REACT_APP_BACKEND_BASE_URL,
  WEB_SOCKET_URL: process.env.REACT_APP_BACKEND_WEBSOCKET_URL,

  // Socket flags
  JOINED: "JOIN",
  LEFT: "LEAVE",
  READY: "READY",
  SUBMIT: "SUBMIT",
  SELECT: "SELECT"
};

export default CONSTANTS;
