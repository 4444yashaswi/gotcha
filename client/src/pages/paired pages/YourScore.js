import React, { useState } from 'react'
import YourChoice from '../YourChoice';
import Scores from '../Scores';

const YourScore = () => {
    const [isCheckingScores, setIsCheckingScores] = useState(false);
  return (
    <>
    {isCheckingScores ? <Scores /> : <YourChoice setNext={setIsCheckingScores} player={"OJ"} />}
    </>
  )
}

export default YourScore