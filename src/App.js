import React, { useRef, useState } from "react";
import Game from "./Components/Game/Game";
import Header from "./Components/Header/Header";
import { firestore } from "./firebase";
import { setDoc, doc, collection, updateDoc, getDoc } from "firebase/firestore";
import Leaderboard from "./Components/Leaderboard/Leaderboard";
import randomImgs from "./Assets/randomImg";
import "./App.css";
function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [pause, setPause] = useState(false);
  const [score, setScore] = useState(0);
  const [randImgs, setRandImgs] = useState([]);
  const playerNameRef = useRef();

  function stopTimer() {
    setPause(true);
  }

  function getScore(x) {
    setScore(x);
  }

  async function handleRestartGame() {
    const docRef = doc(collection(firestore, "names"), playerName);

    try {
      const docSnap = await getDoc(docRef);
      const existingData = docSnap.data();
      const existingTime = existingData?.time || 0;
      if (score < existingTime || existingTime === 0) {
        const data = {
          time: score,
        };
        await updateDoc(docRef, data);
      }
    } catch (e) {
      console.log(e);
    }

    setGameStarted(false);
  }

  const handleStartGame = async () => {
    //makes the imgs into an array from a promise
    const imgs = await randomImgs();
    setRandImgs(imgs);
    setPause(false);
    const name = playerNameRef.current.value;
    if (name === "") {
      alert("Please enter a name to start the game.");
      return;
    }
    setPlayerName(name);
    const docRef = doc(collection(firestore, "names"), name);

    try {
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        // if the document doesn't exist yet, create it with an empty time field
        await setDoc(docRef, { time: "" });
      }
    } catch (e) {
      console.log(e);
    }
    setGameStarted(true);
  };

  return (
    <div className="App">
      <Header gameStarted={gameStarted} pause={pause} getScore={getScore} />
      {!gameStarted && (
        <div className="container">
          <div className="left">
            <div className="start-game">
              <label>Enter Name</label>
              <input type="text" ref={playerNameRef} />
              <button onClick={handleStartGame}>Start Game</button>
            </div>
          </div>
          <div className="right">
            <Leaderboard />
          </div>
        </div>
      )}
      {gameStarted && (
        <Game
          restartGame={handleRestartGame}
          stopTimer={stopTimer}
          randImgs={randImgs}
        />
      )}
    </div>
  );
}

export default App;
