import React, { useEffect, useState } from "react";
import Waldo from "../Waldo/Waldo";
import "./Board.css";
import krillin from "../../../Assets/krillin.png";
import beavis from "../../../Assets/Beavis.png";
import elmo from "../../../Assets/elmo.png";

const Board = ({ gameWon }) => {
  const [foundImages, setFoundImages] = useState([]);
  const [points, setPoints] = useState(0)

  const handleImageClick = (imageName) => {
    setFoundImages((prevImages) => [...prevImages, imageName]);
    setPoints(points + 1)
  };

  useEffect(() => {
    if(points === 3){
      gameWon();
    }
  }, [points, gameWon]);

  return (
    <div className="board">
      <div className="find">
        <div>Find: </div>
        <div className="imgs">
          {!foundImages.includes("krillin") && <img alt="krillin" src={krillin} />}
          {!foundImages.includes("beavis") && <img alt="beavis" src={beavis} />}
          {!foundImages.includes("elmo") && <img alt="elmo" src={elmo} />}
        </div>
      </div>
      <div className="game">
        <Waldo name="krillin" onImageClick={handleImageClick} />
        <Waldo name="beavis" onImageClick={handleImageClick} />
        <Waldo name="elmo" onImageClick={handleImageClick} />
      </div>
    </div>
  );
};

export default Board;
