import React, { useEffect, useState } from "react";
import "./Countdown.css";

const Countdown = ({ inputVal, LIMIT }) => {
  // GREY: #B9BDC0, BLUE: #34B1F1

  const [countdownProgress, setCountdownProgress] = useState({
    backgroundImage:
      "linear-gradient(180deg, #B9BDC0 50%, transparent 50%), linear-gradient(00deg, #B9BDC0 50%, transparent 50%)",
  });

  useEffect(() => {
    if (inputVal?.length < LIMIT / 2)
      setCountdownProgress({
        backgroundImage: `linear-gradient(${
          180 + (180 / (LIMIT / 2)) * inputVal?.length
        }deg, #B9BDC0 50%, transparent 50%), linear-gradient(00deg, #B9BDC0 50%, transparent 50%)`,
      });
    else
      setCountdownProgress({
        backgroundImage: `linear-gradient(${
          (180 / (LIMIT / 2)) * (inputVal?.length - LIMIT)
        }deg, #34B1F1 50%, transparent 50%), linear-gradient(00deg, #B9BDC0 50%, transparent 50%)`,
      });
  }, [inputVal, LIMIT]);

  return (
    <div className="countdown--container">
      <div className="countdown--base" style={{ ...countdownProgress }} />
      <div className="countdown--cover" />
    </div>
  );
};

export default Countdown;
