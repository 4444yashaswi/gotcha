import React, { useState } from "react";
import RoomCode from "./RoomCode";
import CommonButton from "./CommonButton";
import "./OptionsDrawer.css";
import { IoIosArrowBack } from "react-icons/io";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

const OptionsDrawer = ({ closeDrawer }) => {
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const exitButtonHandler = () => {
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const modalFunctionality = () => {
        navigate("/landing");
    }

  return (<>{isModalOpen && <Modal title="Are you sure you want to leave the game?" functionality={modalFunctionality} onClose={closeModal} />}
    <div className="options-drawer--background">
      <div className="options-drawer--conatiner">
        <div className="options-drawer--close-btn" onClick={closeDrawer}>
          <IoIosArrowBack />
        </div>
        <div className="options-drawer--title">Secret Code:</div>
        <RoomCode />
        <div className="opttions-drawer--exit-btn">
          <CommonButton isPrimary="exit" functionality={exitButtonHandler}>Leave Game</CommonButton>
        </div>
      </div>
    </div></>
  );
};

export default OptionsDrawer;
