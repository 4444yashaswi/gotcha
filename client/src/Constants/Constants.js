const CONSTANTS = {
  // URLs
  BASE_URL: process.env.REACT_APP_BACKEND_BASE_URL,
  WEB_SOCKET_URL: process.env.REACT_APP_BACKEND_WEBSOCKET_URL,

  // Page Routes
  LANDING: "/landing",
  JOINROOM: "/join-room",
  LOBBY: "/lobby",
  SUBMITANSWER: "/answer",
  SELECTOPTION: "/select-option",
  YOURSCORE: "/scores",
  GAMERESULT: "/result",
  PAGENOTFOUND: "*",

  // Socket flags
  JOINED: "JOIN",
  LEFT: "LEAVE",
  READY: "READY",
  SUBMIT: "SUBMIT",
  SELECT: "SELECT",

  // Room Status Flags
  SUBMIT_STATUS: "Submit",
  SELECT_STATUS: "Select",
};

export default CONSTANTS;
