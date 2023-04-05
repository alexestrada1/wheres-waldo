import React from "react";
import "./Waldo.css"

const Waldo = ({gameWon}) => {
  return <div className="waldo" onClick={gameWon}></div>;
};
export default Waldo;
