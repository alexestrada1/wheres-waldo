import React, { useState, useEffect } from "react";
import "../Header/Header.css";

const Header = ({ gameStarted, pause, getScore }) => {
  const [time, setTime] = useState(0);
  useEffect(() => {
    if (!gameStarted) {
      setTime(0);
    }
  }, [gameStarted]);

  useEffect(() => {
    if (pause) {
      getScore(time);
    }
  }, [pause, time, getScore]);

  useEffect(() => {
    let interval;
    if (gameStarted && !pause) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, pause]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours < 10 ? "0" + hours : hours}:${
      minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  return (
    <div className="header">
      <div className="left-header">
        <div className="title">Cartoon Wheres Waldo Game</div>
      </div>
      <div className="right-header">
        {gameStarted && <div className="timer">Time: {formatTime(time)}</div>}
      </div>
    </div>
  );
};
export default Header;
