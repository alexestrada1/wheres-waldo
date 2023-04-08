import React, { useState } from "react";
import "./Waldo.css";

const Waldo = ({ name, onImageClick }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onImageClick(name);
  };

  return (
    <div
      className={`${name} ${isClicked ? "clicked" : ""}`}
      onClick={handleClick}
    ></div>
  );
};

export default Waldo;
