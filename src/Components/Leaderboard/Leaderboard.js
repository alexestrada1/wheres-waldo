import React, { useState, useEffect } from "react";
import { firestore } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import "./Leaderboard.css";

const Leaderboard = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      const scoresRef = collection(firestore, "names");
      const snapshot = await getDocs(scoresRef);
      const scoresData = snapshot.docs.map((doc) => ({
        id: doc.id,
        time: doc.data().time,
      }));

      // Filter scores with non-integer times
      const integerScores = scoresData.filter((score) =>
        Number.isInteger(score.time)
      );

      // Sort scores in ascending order
      integerScores.sort((a, b) => a.time - b.time);

      setScores(integerScores);
    };

    fetchScores();
  }, []);

  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ul>
        {scores.map((score, index) => (
          <li key={score.id}>
            {index + 1}. <span className="score-id">{score.id}:</span>{" "}
            {score.time} seconds
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
