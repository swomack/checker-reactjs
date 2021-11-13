import "./Board.css";
import React from "react";
import Piece from "../piece/Piece";
import Square from "../square/square";

const TileStyle = {
  width: "50px",
  paddingBottom: "50px",
  float: "left",
  position: "relative",
};

const WhiteTile = {
  background: "white",
};

const GreyTile = {
  background: "grey",
};

const SelectedTile = {
  boxShadow: "inset 0px 0px 0px 10px #ff54ff",
};

const HighlightedTile = {
  boxShadow: "inset 0px 0px 0px 25px #564132",
};

function Board(props) {
  const isCellSelected = (i, j) => {
    return (
      props.selected !== null &&
      props.selected.row === i &&
      props.selected.column === j
    );
  };

  const isCellHighlighted = (x, y) => {
    for (let i = 0; i < props.highlighted.length; i++) {
      if (props.highlighted[i].row === x && props.highlighted[i].column === y)
        return true;
    }

    return false;
  };

  const getStyleFromRowColumn = (row, column) => {
    let style = { ...TileStyle };

    if (row % 2 === column % 2) style = { ...style, ...GreyTile };
    else style = { ...style, ...WhiteTile };

    if (isCellSelected(row, column)) style = { ...style, ...SelectedTile };

    if (isCellHighlighted(row, column))
      style = { ...style, ...HighlightedTile };

    
    console.log(JSON.stringify(style));      

    return style;
  };

  const tiles = [];

  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      tiles.push(
        <Square
          key={`Tile-${i}-${j}`}
          style={getStyleFromRowColumn(i, j)}
          onClick={(e, row, column) => props.onClick(row, column)}
          row={i}
          column={j}
        >
          {props.board[i][j] ? <Piece {...props.board[i][j]} /> : ""}
        </Square>
      );
    }
  }

  return (
    <div>
      <div className={`Board ${props.disabled ? "Disabled" : ""}`}>{tiles}</div>
    </div>
  );
}

export default Board;
