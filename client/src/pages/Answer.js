import React, { useRef, useState } from "react";
import CommonButton from "../Components/UI/CommonButton";
import Countdown from "../Components/UI/Countdown";
import TruthHeader from "../Components/TruthComesOutComponents/TruthHeader";
import TruthQuestion from "../Components/TruthComesOutComponents/TruthQuestion";

const Answer = ({ setSubmitted }) => {
  const textAreaRef = useRef();

  const questonquestion = "If OJ became famous overnight, it would be for";
  const dependentDependent = [
    { nameName: "Ojaswi", colorColor: "pink" },
    { nameName: "Yashaswi", colorColor: "purple" },
    { nameName: "Toshit", colorColor: "black" },
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
      <TruthHeader />
      <TruthQuestion
        question={questonquestion}
        dependentDependent={dependentDependent}
      />
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
