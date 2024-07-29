import React, { useEffect, useState } from "react";
import TruthHeader from "../Components/TruthComesOutComponents/TruthHeader";
import TruthQuestion from "../Components/TruthComesOutComponents/TruthQuestion";
import CommonButton from "../Components/UI/CommonButton";
import { useParams } from "react-router-dom";
import axios from "../Axios/Axios";
import Loader from "../Components/UI/Loader";
import Notify from "../Components/UI/Notify";

const Options = ({ setSubmitted }) => {
  const { roomId, name } = useParams();
  // const questonquestion =
  //   "You find a brown paper bag with a note \"DO NOT OPEN\" in Yashaswi's refrigerator. What's inside?";
  // const dependentDependent = [
  //   // { nameName: "Ojaswi", colorColor: "pink" },
  //   { nameName: "Yashaswi", colorColor: "purple" },
  //   // { nameName: "Toshit", colorColor: "black" },
  // ];
  // const optionsOptions = [
  //   "Freshly cooked sunny side up",
  //   "Half fried eggs",
  //   "litchi juice",
  //   "Stale 2 weeks old food",
  // ];

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const [notification, setNotification] = useState();

  const [depententPlayers, setDependentPlayers] = useState([
    { name: "Gotcha", avatarColour: "aqua" },
  ]);

  const submitAnswer = async (option) => {
    const selectedAnswerPayload = {
      roomId,
      userName: name,
      selectedAnswerOfUser: option?.submittedBy,
    };
    try {
      const submitAnswerResponse = await axios.post(
        "/triviaManagement/selectOption",
        { ...selectedAnswerPayload }
      );
      setIsSubmitDisabled(() => {
        console.log(submitAnswerResponse);
        return false;
      });
    } catch (err) {
      setNotification("Oops! Something went wrong.");
    }
  };

  const optionSelectHandler = (option) => {
    console.log("the selected option was ", option);
    if (option?.submittedBy === name)
      setNotification("You cannot select your own answer!");
    else {
      setIsSubmitDisabled(true);
      submitAnswer(option);
      setSubmitted(true);
    }
  };

  const jumbleOptionsArray = (optionsArray) => {
    let jumbledOptions = [...optionsArray];
    for (let i = jumbledOptions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [jumbledOptions[i], jumbledOptions[j]] = [
        jumbledOptions[j],
        jumbledOptions[i],
      ]; // Swap elements
    }
    return jumbledOptions;
  };

  const getQuestionAndOptions = async () => {
    setIsLoading(true);
    try {
      const questionDetails = await axios.get(
        `/triviaManagement/getQuestion?roomId=${roomId}&userName=${name}`
      );
      const getOptions = await axios.get(
        `/triviaManagement/getOptions?roomId=${roomId}&userName=${name}`
      );
      setQuestion(questionDetails?.data?.trivia);
      setDependentPlayers(questionDetails?.data?.associated_users);
      setOptions(jumbleOptionsArray(getOptions?.data?.options));
    } catch (err) {
      setNotification("Oops! Something went wrong.");
    }
  };

  useEffect(() => {
    if (roomId && name) getQuestionAndOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (question !== "" && options?.length !== 0) setIsLoading(false);
  }, [question, options]);

  return (
    <div className="options-container">
      {isLoading && <Loader />}
      <Notify notification={notification} setNotification={setNotification} />
      <TruthHeader>The Truth Comes Out Teaser</TruthHeader>
      <TruthQuestion question={question} dependentPlayers={depententPlayers} />
      <div className="options-options--container">
        <div className="options-options--heading">Pick your favorite:</div>
        {options?.map((option, i) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              textAlign: "center",
              margin: "3vh 0",
            }}
            key={i}
          >
            <CommonButton
              isPrimary
              isDisabled={isSubmitDisabled}
              functionality={() => optionSelectHandler(option)}
            >
              {option?.answer}
            </CommonButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Options;
