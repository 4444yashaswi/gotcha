import React, { useState } from "react";
import Answer from "../Answer";

const SubmitAnswer = () => {
  const [hasPlayerSubmittedAnswer, setHasPlayerSubmittedAnswer] =
    useState(false);
  return (
    <>
      {hasPlayerSubmittedAnswer ? (
        <div>Submitted the answer already</div>
      ) : (
        <Answer setSubmitted={setHasPlayerSubmittedAnswer} />
      )}
    </>
  );
};

export default SubmitAnswer;
