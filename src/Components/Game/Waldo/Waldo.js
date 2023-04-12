import React, { useState } from "react";

const Waldo = ({ name, position }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
  };

  return (
    <div
      style={{
        position: "absolute",
        height: `${position[0]}px`,
        width: `${position[1]}px`,
        left: `${position[2]}px`,
        top: `${position[3]}px`,
      }}
      onClick={handleClick}
      className={`${name} ${isClicked ? "clicked" : ""}`}
    ></div>
  );
};

export default Waldo;
