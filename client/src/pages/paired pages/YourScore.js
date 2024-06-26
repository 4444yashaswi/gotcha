import React, { useEffect, useState } from "react";
import YourChoice from "../YourChoice";
import Scores from "../Scores";
import axios from "../../Axios/Axios";
import Loader from "../../Components/UI/Loader";
import { useParams } from "react-router-dom";

const YourScore = () => {
  const { roomId, name } = useParams();

  const [isCheckingScores, setIsCheckingScores] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [playersSelectedYourAnswer, setaPlayersSelectedYourAnswer] = useState(
    []
  );
  const [allAnswers, setAllAnswers] = useState([]);
  const [roundScores, setRoundScores] = useState([]);
  const [leaders, setLeaders] = useState([]);
  const [youSelected, setYouSelected] = useState("");
  const [round, setRound] = useState("");
  const [totalRounds, setTotalRounds] = useState("");

  const getRoundScore = async () => {
    setIsLoading(true);
    const scoreDetails = await axios.get(
      `/triviaManagement/roundScore?roomId=${roomId}&userName=${name}`
    );
    console.log(scoreDetails);
    setaPlayersSelectedYourAnswer(scoreDetails?.data?.answerPickedBy);
    setAllAnswers(scoreDetails?.data?.answerList);
    const scores = scoreDetails?.data?.totalScore?.sort(
      (player1, player2) => player2.score - player1.score
    );
    setRoundScores(scores);
    setLeaders(() => {
      let leaders = [scores?.[0]];
      for (let i = 1; i < scores?.length; i++)
        if (scores?.[0]?.score === scores?.[i]?.score)
          leaders.append(scores?.[i]);
      return leaders;
    });
    setYouSelected(scoreDetails?.data?.answerPicked);
    setRound(scoreDetails?.data?.round);
    setTotalRounds(scoreDetails?.data?.totalRounds);
  };

  useEffect(() => {
    if (roomId && name) getRoundScore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId, name]);

  useEffect(() => {
    if (round && round !== "") {
      setIsLoading(false);
    }
  }, [round]);

  return (
    <>
      {isLoading && <Loader />}
      {isCheckingScores ? (
        <Scores
          playersSelectedYourAnswer={playersSelectedYourAnswer}
          allAnswers={allAnswers}
          roundScores={roundScores}
          leaders={leaders}
          round={round}
          totalRounds={totalRounds}
        />
      ) : (
        <YourChoice setNext={setIsCheckingScores} player={youSelected} />
      )}
    </>
  );
};

export default YourScore;
