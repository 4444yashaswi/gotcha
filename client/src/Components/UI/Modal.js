import React from "react";
import CommonButton from "./CommonButton";
import "./Modal.css"

const Modal = ({ title, functionality, onClose }) => {
  return (
    <div className="modal--background">
      <div className="modal--container">
        <div className="modal--title">{title}</div>
        <div className="modal--footer">
          <CommonButton style={{marginRight: "1vw"}} functionality={onClose}>No</CommonButton>{" "}
          <CommonButton isPrimary style={{marginLeft: "1vw"}} functionality={functionality}>Yes</CommonButton>
        </div>
      </div>
    </div>
  );
};

export default Modal;
