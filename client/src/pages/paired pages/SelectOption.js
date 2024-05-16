import React, { useState } from "react";
import Options from "../Options";
import SelectSubmit from "../SelectSubmit";

const SelectOption = () => {
  const [hasPlayerSelectedOption, setHasPlayerSelectedOption] = useState(false);
  return (
    <>
      {hasPlayerSelectedOption ? (
        <SelectSubmit nextScreen="/scores" />
      ) : (
        <Options setSubmitted={setHasPlayerSelectedOption} />
      )}
    </>
  );
};

export default SelectOption;
