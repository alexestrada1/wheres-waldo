import React, { useState } from "react";
import Board from "../../Components/Game/Board/Board";
import "../Game/Game.css"

const Game = ({restartGame, stopTimer}) => {
  const [gameWon, setGameWon] = useState(false);

  
  const handleGameWon = () => {
    setGameWon(true);
    stopTimer();
  };

  return (
    <div>
      {gameWon ? (
        <div className="won">
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
