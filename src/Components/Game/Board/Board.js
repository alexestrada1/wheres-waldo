import React, { useEffect, useState } from "react";
import Waldo from "../Waldo/Waldo";
import "./Board.css";
import krillin from "../../../Assets/krillin.png";
import beavis from "../../../Assets/Beavis.png";
import elmo from "../../../Assets/elmo.png";

const Board = ({ gameWon }) => {
  const [foundImages, setFoundImages] = useState([]);
  const [points, setPoints] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleImageClick = (imageName) => {
    const waldoElement = document.querySelector(`.${imageName}`);
    if (waldoElement.classList.contains("clicked")) {
      setFoundImages((prevImages) => [...prevImages, imageName]);
      setPoints(points + 1);
    }
    else{
      setShowMenu(false)
    }
  };

  useEffect(() => {
    if (points === 3) {
      gameWon();
    }
  }, [points, gameWon]);

  useEffect(() => {
    const handleClick = (event) => {
      setShowMenu(true);
      const gameDiv = document.querySelector(".game");
      const gameRect = gameDiv.getBoundingClientRect();
      setMenuPosition({
        x: event.clientX - gameRect.left,
        y: event.clientY - gameRect.top,
      });
    };

    const gameDiv = document.querySelector(".game");
    gameDiv.addEventListener("click", handleClick);
    console.log(menuPosition);

    return () => {
      gameDiv.removeEventListener("click", handleClick);
    };
  }, [foundImages, showMenu, menuPosition]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest(".game") === null) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="board">
      <div className="find">
        <div>Find: </div>
        <div className="imgs">
          {!foundImages.includes("krillin") && (
            <img alt="krillin" src={krillin} />
          )}
          {!foundImages.includes("beavis") && <img alt="beavis" src={beavis} />}
          {!foundImages.includes("elmo") && <img alt="elmo" src={elmo} />}
        </div>
      </div>
      <div className="game">
        {showMenu && (
          <div
            className="menu"
            style={{
              left: menuPosition.x + 20, // add 20 pixels to the x position
              top: menuPosition.y - 50,
            }}
          >
            {!foundImages.includes("krillin") && (
              <button onClick={(event) => handleImageClick("krillin")}>
                krillin
              </button>
            )}
            {!foundImages.includes("beavis") && (
              <button onClick={(event) => handleImageClick("beavis")}>
                beavis
              </button>
            )}
            {!foundImages.includes("elmo") && (
              <button onClick={(event) => handleImageClick("elmo")}>
                elmo
              </button>
            )}
          </div>
        )}
        <Waldo name="krillin" />
        <Waldo name="beavis" />
        <Waldo name="elmo" />
      </div>
    </div>
  );
};

export default Board;
