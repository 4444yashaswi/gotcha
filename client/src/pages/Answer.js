import React, { useRef, useState } from "react";
import { IoMenu } from "react-icons/io5";
import CommonButton from "../Components/UI/CommonButton";
import Countdown from "../Components/UI/Countdown";

const Answer = ({ setSubmitted }) => {
  const textAreaRef = useRef();

  const UserAvatar = ({ userName, avatarColor, index }) => {
    let styleMap;
    if (dependentDependent.length === 1) styleMap = {};
    else if (dependentDependent.length === 2)
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
        }}
      >
        {userName[0]}
      </div>
    );
  };

  const questonquestion = "If OJ became famous overnight, it would be for";
  const dependentDependent = [
    { nameName: "Ojaswi", colorColor: "pink" },
    // { nameName: "Yashaswi", colorColor: "purple" },
    // { nameName: "Toshit", colorColor: "black" },
  ];

  const Limit = 100;

  const [answer, setAnswer] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const answerChangeHandler = ({ target }) => {
    const input = target.innerText;
    if (target.innerText.length > Limit) {
      target.innerText = answer;
    } else {
      setAnswer(input);
      setIsDisabled(input.length === 0);
    }
  };

  const textAreaContainerClickHandler = () => {
    textAreaRef.current.focus();
  };

  const submitAnswerHandler = () => {
    console.log(answer, " has been submitted");
    setSubmitted(true);
  };

  return (
    <div className="answer-container">
      <div className="answer-header--container">
        <div className="answer-header--menu">
          <IoMenu fontSize={"3.5vh"} color="#99AFC4" />
        </div>
        <div className="answer-header--title">The Truth Comes Out Teaser</div>
      </div>
      <div className="answer-question--container">
        <div className="answer-question--avatar-container">
          {dependentDependent.map((player, index) => (
            <UserAvatar
              userName={player.nameName}
              avatarColor={player.colorColor}
              index={index}
              key={index}
            />
          ))}
        </div>
        <div className="answer-question--question">{questonquestion}</div>
      </div>
      <div className="answer-input--container">
        <div
          className="answer-input--text-container"
          onClick={textAreaContainerClickHandler}
        >
          {/*onInput={answerChangeHandler}>*/}
          <div
            contentEditable={true}
            className="answer-input--text-area"
            onInput={answerChangeHandler}
            ref={textAreaRef}
            maxLength={200}
          />
        </div>
        {answer.length === 0 && (
          <div className="answer-input--text-placeholder">
            Write an answer to the above question that you think the other
            players will choose!
          </div>
        )}
      </div>
      <div className="answer-footer--container">
        <div className="answer-footer--submit-btn-container">
          <CommonButton
            isPrimary
            isDisabled={isDisabled}
            style={{ width: "43vw" }}
            functionality={submitAnswerHandler}
          >
            Submit
          </CommonButton>
        </div>
        <div className="answer-footer--countdown-container">
          <Countdown inputVal={answer} LIMIT={Limit} />
        </div>
      </div>
    </div>
  );
};

export default Answer;
