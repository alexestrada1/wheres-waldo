import React from "react";
import "../Header/Header.css"
import krillin from "../../Assets/krillin.png";

const Header = () =>{
return(
    <div className="header">
        <div className="title">Cartoon Wheres Waldo Game</div>
        <div className="find">
        <div>Find krillin</div>
        <img alt="krillin" src={krillin}/>
        </div>
        <div className="timer">00:00:00</div>
        <div className="leaderboard">leaderboard</div>
    </div>
)
}
export default Header