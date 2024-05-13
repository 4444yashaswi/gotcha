import React, { useState } from "react";
import Answer from "../Answer";
import SelectSubmit from "../SelectSubmit";

const SubmitAnswer = () => {
  const [hasPlayerSubmittedAnswer, setHasPlayerSubmittedAnswer] =
    useState(false);
  return (
    <>
      {hasPlayerSubmittedAnswer ? (
        <SelectSubmit nextScreen="/select-option" />
      ) : (
        <Answer setSubmitted={setHasPlayerSubmittedAnswer} />
      )}
    </>
  );
};

export default SubmitAnswer;
