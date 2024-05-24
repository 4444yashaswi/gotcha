import React, { useState } from 'react';
import GameWinner from '../GameWinner';
import Results from '../Results';

const YourScore = () => {
    const [isCheckingResult, setIsCheckingResult] = useState(false);
  return (
    <>
    {isCheckingResult ? <Results /> : <GameWinner setNext={setIsCheckingResult} player={"OJ"} />}
    </>
  )
}

export default YourScore