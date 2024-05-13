import React from "react";
import TruthHeader from "../Components/TruthComesOutComponents/TruthHeader";
import TruthQuestion from "../Components/TruthComesOutComponents/TruthQuestion";
import CommonButton from "../Components/UI/CommonButton";

const Options = ({ setSubmitted }) => {
  const questonquestion =
    "You find a brown paper bag with a note \"DO NOT OPEN\" in Yashaswi's refrigerator. What's inside?";
  const dependentDependent = [
    // { nameName: "Ojaswi", colorColor: "pink" },
    { nameName: "Yashaswi", colorColor: "purple" },
    // { nameName: "Toshit", colorColor: "black" },
  ];
  const optionsOptions = [
    "pot and pot only",
    "ganja ganja",
    "litchi juice",
    "naughty",
  ];

  const optionSelectHandler = (option) => {
    console.log("the selected option was ", option);
    setSubmitted(true);
  };

  return (
    <div className="options-container">
      <TruthHeader />
      <TruthQuestion
        question={questonquestion}
        dependentDependent={dependentDependent}
      />
      <div className="options-options--container">
        <div className="options-options--heading">Pick your favorite:</div>
        {optionsOptions.map((option) => (
          <div style={{ display: "flex", justifyContent: "center", textAlign: "center", margin: "3vh 0" }}>
            <CommonButton
              isPrimary
              functionality={() => optionSelectHandler(option)}
            >
              {option}
            </CommonButton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Options;
