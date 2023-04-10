import React, { useState } from "react";
import Board from "../../Components/Game/Board/Board";

const Game = ({restartGame, stopTimer}) => {
  const [gameWon, setGameWon] = useState(false);

  
  const handleGameWon = () => {
    setGameWon(true);
    stopTimer();
  };

  return (
    <div>
      {gameWon ? (
        <div>
            <div>You have won!</div>
            <button onClick={restartGame}>Restart Game</button>
        </div>
      ) : (
        <Board gameWon={handleGameWon} />
      )}
    </div>
  );
};

export default Game;
