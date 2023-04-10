import React, { useRef, useState } from "react";
import Game from "./Components/Game/Game";
import Header from "./Components/Header/Header";
import { firestore } from "./firebase";
import { setDoc, doc, collection, updateDoc } from "firebase/firestore";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [pause, setPause] = useState(false)
  const [score, setScore] = useState(0)
  const playerNameRef = useRef();

  function stopTimer() {
    setPause(true)
  }
  function getScore(x){
    setScore(x)
  }

  function handleRestartGame() {
    const docRef = doc(collection(firestore, "names"), playerName);
    const data = {
      time: score,
    };
    try {
      updateDoc(docRef, data);
    } catch (e) {
      console.log(e);
    }
    setGameStarted(false);
  }

  const handleStartGame = async () => {
    setPause(false)
    const name = playerNameRef.current.value;
    setPlayerName(name);
    const docRef = doc(collection(firestore, "names"), name);
    const data = {
      time: "",
    };
    try {
      await setDoc(docRef, data);
    } catch (e) {
      console.log(e);
    }
    setGameStarted(true);
  };

  return (
    <div className="App">
      <Header gameStarted={gameStarted} pause={pause} getScore={getScore}/>
      {!gameStarted && (
        <div className="start-game">
          <label>Enter Name</label>
          <input type="text" ref={playerNameRef} />
          <button onClick={handleStartGame}>Start Game</button>
        </div>
      )}
      {gameStarted && (
        <Game restartGame={handleRestartGame} stopTimer={stopTimer} />
      )}
    </div>
  );
}

export default App;
