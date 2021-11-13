import React from "react";
import "./GameController.css";

function GameControllers(props) {
  return (
    <div className="GameController">
      <div className="EditContainer">
        <div>
          <span>Player1: </span>
          <input
            className="Edit"
            value={props.players[0]}
            readOnly
          ></input>
        </div>
        <div>
          <span>Player2: </span>{" "}
          <input
            className="Edit"
            value={props.players[1]}
            readOnly
          ></input>
        </div>
      </div>
      <button className="StartButton" onClick={(e) => props.onClick()}>
        {props.text}
      </button>
    </div>
  );
}

export default GameControllers;