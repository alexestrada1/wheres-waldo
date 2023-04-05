import React from "react";
import Waldo from "../Waldo/Waldo";
import "./Board.css";

const Board = ({gameWon}) => {
  function handleClick(event) {
    const myDiv = document.getElementsByClassName("board")[0];
    const x = event.clientX - myDiv.offsetLeft;
    const y = event.clientY - myDiv.offsetTop;
    console.log(`Coordinates: (${x},${y})`);
  }

  return (
    <div className="board" onClick={handleClick}>
      <div className="game">
        <Waldo gameWon = {gameWon}/>
      </div>
    </div>
  );
};

export default Board;
