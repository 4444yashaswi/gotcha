import React, { useState } from "react";
import "./Truth.css";
import { IoMenu } from "react-icons/io5";
import OptionsDrawer from "../UI/OptionsDrawer";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const TruthHeader = ({ directExit, children, textStyle, btnStyle }) => {
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const optionsBtnHandler = () => {
    if (directExit) navigate("/landing");
    else setIsDrawerOpen(true);
  };

  const drawerCloseHandler = () => {
    setIsDrawerOpen(false);
  };

  return (
    <>
      {isDrawerOpen && <OptionsDrawer closeDrawer={drawerCloseHandler} />}
      <div className="truth-header--container">
        <div
          className="truth-header--menu"
          style={{ ...btnStyle }}
          onClick={optionsBtnHandler}
        >
          {directExit ? (
            <IoIosArrowBack fontSize={"3.5vh"} color="#99AFC4" />
          ) : (
            <IoMenu fontSize={"3.5vh"} color="#99AFC4" />
          )}
        </div>
        <div className="truth-header--title" style={{ ...textStyle }}>
          {children}
        </div>
      </div>
    </>
  );
};

export default TruthHeader;
