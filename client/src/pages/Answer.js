import React, { useEffect, useRef, useState } from "react";
import CommonButton from "../Components/UI/CommonButton";
import Countdown from "../Components/UI/Countdown";
import TruthHeader from "../Components/TruthComesOutComponents/TruthHeader";
import TruthQuestion from "../Components/TruthComesOutComponents/TruthQuestion";
import axios from "../Axios/Axios";
import { useParams } from "react-router-dom";
import Loader from "../Components/UI/Loader";
// import CONSTANTS from "../Constants/Constants";

const Answer = ({ setSubmitted }) => {
  const textAreaRef = useRef();
  // const { SUBMIT_STATUS } = CONSTANTS;
  const { roomId, name } = useParams();

  // const question = "If OJ became famous overnight, it would be for";
  // const dependentDependent = [
  //   { nameName: "Ojaswi", colorColor: "pink" },
  //   { nameName: "Yashaswi", colorColor: "purple" },
  //   { nameName: "Toshit", colorColor: "black" },
  // ];

  const Limit = 100;

  const [answer, setAnswer] = useState("");
  const [question, setQuestion] = useState("");
  const [depententPlayers, setDependentPlayers] = useState([
    { name: "Gotcha", avatarColour: "aqua" },
  ]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const setCaretPosition = (el, position) => {
    const range = document.createRange();
    const sel = window.getSelection();

    range.setStart(el.childNodes[0], position); // Adjust the position as needed
    range.collapse(true);

    sel.removeAllRanges();
    sel.addRange(range);
  };

  const answerChangeHandler = ({ target }) => {
    const input = target.innerText;
    if (target.innerText.length > Limit) {
      target.innerText = answer;
      setCaretPosition(textAreaRef.current, 100);
    } else {
      setAnswer(input);
      setIsDisabled(input.length === 0);
    }
  };

  const textAreaContainerClickHandler = () => {
    textAreaRef.current.focus();
  };

  const submitAnswerHandler = async () => {
    setIsLoading(true);
    const submitAnswerPayload = {
      roomId,
      userName: name,
      answer,
    };
    const submitAnswer = await axios.post("/triviaManagement/submitAnswer", {
      ...submitAnswerPayload,
    });
    setIsLoading((loading) => {
      console.log(submitAnswer);
      setSubmitted(true);
      return false;
    });
  };

  // const getPlayerList = async () => {
  //   const players = await axios.get(
  //     `/roomManagement/userList?roomId=${roomId}&userName=${name}&flag=${SUBMIT_STATUS}`
  //   );
  //   console.log(players);
  //   setPlayerList(
  //     players?.data?.userList?.map((player) => ({
  //       name: player?.name,
  //       avatarColor: player?.avatarColour,
  //       ready: player?.status,
  //     }))
  //   );
  // };

  const getQuestion = async () => {
    setIsLoading(true);
    const questionDetails = await axios.get(
      `/triviaManagement/getQuestion?roomId=${roomId}&userName=${name}`
    );
    setQuestion(questionDetails?.data?.trivia);
    setDependentPlayers(questionDetails?.data?.associated_users);
  };

  useEffect(() => {
    if (roomId && name) {
      getQuestion();
      // getPlayerList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (question !== "") setIsLoading(false);
  }, [question]);

  return (
    <div className="answer-container">
      {isLoading && <Loader />}
      <TruthHeader>The Truth Comes Out Teaser</TruthHeader>
      <TruthQuestion question={question} dependentPlayers={depententPlayers} />
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
