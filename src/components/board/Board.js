import "./Board.css";
import React, { useState } from "react";
import Piece from "../piece/Piece";
import Square from "../square/square";
import MessageBanner from '../messageBanner/MessageBanner'
import Status from '../status/Status'
import { PlayerType, GameCurrentState, TurnIndicatorStyle } from '../../enums';

import GameState from "../../business/GameState";
import GameLogic from "../../business/GameLogic";


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

  const boardRowSize = 8;
  const boardColumnSize = 8;

  const [gameState, setGameState] = useState(new GameState(boardRowSize, boardColumnSize))
  const gameLogic = new GameLogic(boardRowSize, boardColumnSize, gameState);
 

  const updateAllState = () => {
    setGameState({...gameState});
  }

  const getStyleFromRowColumn = (row, column) => {
    let style = { ...TileStyle };

    if (row % 2 === column % 2) style = { ...style, ...GreyTile };
    else style = { ...style, ...WhiteTile };

    if (gameLogic.isCellSelected(row, column)) style = { ...style, ...SelectedTile };

    if (gameLogic.isCellHighlighted(row, column))
      style = { ...style, ...HighlightedTile };

    return style;
  };

  const tiles = [];

  for (let i = 0; i < gameLogic.boardRowSize; i++) {
    for (let j = 0; j < gameLogic.boardColumnSize; j++) {
      tiles.push(
        <Square
          key={`Tile-${i}-${j}`}
          style={getStyleFromRowColumn(i, j)}
          onClick={(e, row, column) => {
              gameLogic.trySelectCell(row, column);
              updateAllState();

              if (gameLogic.gameState === GameCurrentState.Over) {
                props.onGameFinished();
              }
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
      {gameState.gameCurrentState === GameCurrentState.Over ? (
        <MessageBanner heading = 'Game Over!' message = {`${gameLogic.getOpponent(gameState.turn)} Wins!!`} />) : ''
      }
    </div>
  );
}

export default Board;
