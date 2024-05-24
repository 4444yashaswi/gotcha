import React, { useState } from 'react';
import GameWinner from '../GameWinner';
import Results from '../Results';
import { useLocation } from 'react-router-dom';

const YourScore = () => {
    const { playerScores, leaders }  = useLocation().state;

    const [isCheckingResult, setIsCheckingResult] = useState(false);
  return (
    <>
    {isCheckingResult ? <Results playerScores={playerScores} /> : <GameWinner setNext={setIsCheckingResult} winners={leaders} />}
    </>
  )
}

export default YourScore