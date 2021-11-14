import "./Board.css";
import React from "react";
import Piece from "../piece/Piece";
import Square from "../square/square";
import Status from '../status/Status'
import { PlayerType, TurnIndicatorStyle } from '../../enums';


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

  const {gameState, boardRowSize, boardColumnSize, onCellClickHanlder} = props;
  

  const getStyleFromRowColumn = (row, column) => {
    let style = { ...TileStyle };

    if (row % 2 === column % 2) style = { ...style, ...GreyTile };
    else style = { ...style, ...WhiteTile };

    if (gameState.isCellSelected(row, column)) style = { ...style, ...SelectedTile };

    if (gameState.isCellHighlighted(row, column))
      style = { ...style, ...HighlightedTile };

    return style;
  };

  const tiles = [];

  for (let i = 0; i < boardRowSize; i++) {
    for (let j = 0; j < boardColumnSize; j++) {
      tiles.push(
        <Square
          key={`Tile-${i}-${j}`}
          style={getStyleFromRowColumn(i, j)}
          onClick={(e, row, column) => {
              onCellClickHanlder(row, column);
            }
          }
          row={i}
          column={j}
        >
          {gameState.board[i][j] ? <Piece {...(gameState.board[i][j])} /> : ""}
        </Square>
      );
    }
  }

  const statusStyle = {...TurnIndicatorStyle};
    if (gameState.turn === PlayerType.Second)
      statusStyle.backgroundColor = 'Red';
    else
      statusStyle.backgroundColor = 'Black';

  return (
    <div>
      <Status style = {statusStyle}/>
      <div className={"Board"}>{tiles}</div>
      
    </div>
  );
}

export default Board;
