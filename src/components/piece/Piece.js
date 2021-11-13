import React from "react";
import "./Piece.css";

function Piece(props) {
  return (
    <svg className="Piece">
      <circle
        cx="25"
        cy="25"
        r="20"
        stroke={props.stroke}
        strokeWidth="3"
        fill={props.color}
      />
    </svg>
  );
}

export default Piece;
