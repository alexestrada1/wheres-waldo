import React, { useState } from "react";
import "./Waldo.css";

const Waldo = ({ name }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <div
    onClick={handleClick}
      className={`${name} ${isClicked ? "clicked" : ""}`}
    ></div>
  );
};

export default Waldo;
