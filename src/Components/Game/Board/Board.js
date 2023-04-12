import React, { useEffect, useState } from "react";
import Waldo from "../Waldo/Waldo";
import "./Board.css";

const Board = ({ gameWon, randImgs }) => {
  const [foundImages, setFoundImages] = useState([]);
  const [points, setPoints] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const handleImageClick = (imageName) => {
    //Get the imgs later, for now, create the divs
    const waldoElement = document.querySelector(`.${imageName}`);
    const notiElement = document.querySelector(".noti");
    if (waldoElement.classList.contains("clicked")) {
      setFoundImages((prevImages) => [...prevImages, imageName]);
      setPoints(points + 1);
      notiElement.textContent = `You found ${imageName}!`;
    } else {
      notiElement.textContent = "Try Again!";
      setShowMenu(false);
    }
  };

  useEffect(() => {
    if (points === 3) {
      gameWon();
    }
  }, [points, gameWon]);

  useEffect(() => {
    const notiElement = document.querySelector(".noti");
    const handleClick = (event) => {
      notiElement.textContent = "";
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
          {!foundImages.includes(randImgs[0].name) && (
            <img alt="krillin" src={randImgs[0].img} />
          )}
          {!foundImages.includes(randImgs[1].name) && (
            <img alt="beavis" src={randImgs[1].img} />
          )}
          {!foundImages.includes(randImgs[2].name) && (
            <img alt="elmo" src={randImgs[2].img} />
          )}
        </div>
      </div>
      <div className="noti"></div>
      <div className="game">
        {showMenu && (
          <div
            className="menu"
            style={{
              left: menuPosition.x + 20, // add 20 pixels to the x position
              top: menuPosition.y - 50,
            }}
          >
            {!foundImages.includes(randImgs[0].name) && (
              <button onClick={(event) => handleImageClick(randImgs[0].name)}>
                {randImgs[0].name}
              </button>
            )}
            {!foundImages.includes(randImgs[1].name) && (
              <button onClick={(event) => handleImageClick(randImgs[1].name)}>
                {randImgs[1].name}
              </button>
            )}
            {!foundImages.includes(randImgs[2].name) && (
              <button onClick={(event) => handleImageClick(randImgs[2].name)}>
                {randImgs[2].name}
              </button>
            )}
          </div>
        )}
        <Waldo name={randImgs[0].name} position={randImgs[0].position}/>
        <Waldo name={randImgs[1].name} position={randImgs[1].position}/>
        <Waldo name={randImgs[2].name} position={randImgs[2].position}/>
      </div>
    </div>
  );
};

export default Board;
