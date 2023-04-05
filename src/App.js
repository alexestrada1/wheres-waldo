import "./App.css";
import React, { useState } from "react";
import Game from "./Components/Game/Game";
import Header from "./Components/Header/Header";

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  function handleRestartGame() {
    setGameStarted(false);
  }
  function handleStartGame() {
    setGameStarted(true);
  }

  return (
    <div className="App">
      <Header />
      {!gameStarted && (
        <div className="start-game">
          <button onClick={handleStartGame}>Start Game</button>
        </div>
      )}
      {gameStarted && <Game restartGame={handleRestartGame} />}
    </div>
  );
}

export default App;
