import "./Board.css";
import React, { useState } from "react";
import Piece from "../piece/Piece";
import Square from "../square/square";
import Player from '../../player/Player';
import MessageBanner from '../messageBanner/MessageBanner'
import Status from '../status/Status'
import { PlayerType, GameState, TurnIndicatorStyle } from '../../enums';


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

  const getDefaultBoard = () => {
    const board = Array(boardRowSize).fill().map(() => Array(boardColumnSize).fill(null));

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < boardColumnSize; j++) {
        board[i][j] = getBoardData(PlayerType.First);
      }
    }

    for (let i = boardRowSize - 2; i < boardRowSize; i++) {
      for (let j = 0; j < boardColumnSize; j++) {
        board[i][j] = getBoardData(PlayerType.Second);
      }
    }

    return board;
  }

  const getBoardData = (player) => {
    if (player === PlayerType.First)
      return new Player(PlayerType.First, 'Black', 'Red');
    else
      return new Player(PlayerType.Second, 'Red', 'Black');
  }

  // initialize the board data with empty board
  const initialBoard = getDefaultBoard();

  const [board, setBoard] = useState(initialBoard);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [gameState, setGameState] = useState(GameState.Running);
  const [selected, setSelected] = useState(null);
  const [turn, setTurn] = useState(PlayerType.First);


  const getAllPiecesPosition = (player) => {
    let allPositions = [];

    for (let i = 0; i < boardRowSize; i++) {
      for (let j = 0; j < boardColumnSize; j++) {
        if (board[i][j]  && board[i][j].player === player)
          allPositions.push({row: i, column: j});
      }
    }

    return allPositions;
  }

  const isCellValid = (row, column) => {
    if (row >= 0 && row < boardRowSize && column >= 0 && column < boardColumnSize)
      return true;
    
    return false;
  }

  const getMovableCells = (row, column, player) => {
    const cells = [];
    if (player === PlayerType.First) {
      cells.push({row: row + 1, column: column - 1});
      cells.push({row: row + 1, column: column + 1});
    } else {
      cells.push({row: row - 1, column: column - 1});
      cells.push({row: row - 1, column: column + 1});
    }

    return cells;
  }

  const isMovePossible = (row, column) => {
    if (isCellValid(row, column) && board[row][column] === null)
      return true;
    
    return false;
  }

  const getOpponent = (player) => {
    return (player + 1) % 2;
  }

  const isOpponentPiece = (row, column, player) => {
    if (isCellValid(row, column) && board[row][column] && board[row][column].player === getOpponent(player))
      return true;
    
    return false;
  }

  const calculatePossibleMove = (row, column, player) => {
    const possibleMoves = [];
    const movableCells = getMovableCells(row, column, player);

    movableCells.forEach(({row: destRow, column: destColumn}) => {
      if (isMovePossible(destRow, destColumn)) {
        possibleMoves.push({row: destRow, column: destColumn});
      } else if (isOpponentPiece(destRow, destColumn, player)) {
        if (isMovePossible(destRow + (destRow - row), destColumn + (destColumn - column))) {
          possibleMoves.push({row: destRow + (destRow - row), column: destColumn + (destColumn - column)});
        }
      }
    });

    return possibleMoves;
  }

  const isGameOver = (player) => {
    let allPiecesPositions = getAllPiecesPosition(player);
  
    if (allPiecesPositions.length <= 0)
      return true;

    for (let i = 0; i < allPiecesPositions.length; i++) {
      const possibleMoves = calculatePossibleMove(allPiecesPositions[i].row, allPiecesPositions[i].column, player);

      if (possibleMoves.length > 0)
        return false;
    }
    
    return true;
  }

  const isBoardDisabled = () => {
    return gameState === GameState.Stopped || gameState === GameState.Over;
  }

  const isPieceMovable = (row, column) => {
    for (let i = 0; i < possibleMoves.length; i++) {
      if (possibleMoves[i].row === row && possibleMoves[i].column === column)
        return true;
    }

    return false;
  }

  const onClickCell = (row, column) => {

    if (isBoardDisabled())
      return;

    if (selected !== null) {

      if (selected.row === row && selected.column === column) {
        setSelected(null);
        setPossibleMoves([]);
        return;
      }

      tryToMoveSelectedPiece(row, column);
    } else {
      selectPieceToMove(row, column);
    }
      
  }

  const selectPieceToMove = (row, column) => {
    if (isCellSeletable(row, column)) {
      const possibleMoves = calculatePossibleMove(row, column, turn);

      if (possibleMoves.length > 0) {
        setSelected({row, column});
        setPossibleMoves(possibleMoves);
      }
    }
  }

  

  const isCellSeletable = (row, column) => {
    return board[row][column] && board[row][column].player === turn;
  }

  const  tryToMoveSelectedPiece = (row, column) => {
    if (isPieceMovable(row, column)) {

      let newBoard = [...board];

      newBoard[row][column] = newBoard[selected.row][selected.column];
      newBoard[selected.row][selected.column] = null;

      // Check if it is a capture move
      if (Math.abs(row - selected.row) === 2) {
        let a = (selected.row + row) / 2;
        let b = (selected.column + column) / 2;

        newBoard[a][b] = null;
      }

      const opponent = getOpponent(turn);
      setTurn(opponent);
      setPossibleMoves([]);
      setBoard(newBoard);
      setSelected(null);

      const gameOver = isGameOver(opponent);

      if (gameOver) {
        setGameState(GameState.Over);
        props.onGameFinished();
      }
    }
  }


  const isCellSelected = (i, j) => {
    return (
      selected !== null &&
      selected.row === i &&
      selected.column === j
    );
  };

  const isCellHighlighted = (x, y) => {
    for (let i = 0; i < possibleMoves.length; i++) {
      if (possibleMoves[i].row === x && possibleMoves[i].column === y)
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

    return style;
  };

  const tiles = [];

  for (let i = 0; i < boardRowSize; i++) {
    for (let j = 0; j < boardColumnSize; j++) {
      tiles.push(
        <Square
          key={`Tile-${i}-${j}`}
          style={getStyleFromRowColumn(i, j)}
          onClick={(e, row, column) => onClickCell(row, column)}
          row={i}
          column={j}
        >
          {board[i][j] ? <Piece {...board[i][j]} /> : ""}
        </Square>
      );
    }
  }

  let statusStyle = {...TurnIndicatorStyle};
    if (turn === PlayerType.Second)
      statusStyle.backgroundColor = 'Red';
    else
      statusStyle.backgroundColor = 'Black';

  return (
    <div>
      <Status style = {statusStyle}/>
      <div className={"Board"}>{tiles}</div>
      {gameState === GameState.Over ? (<MessageBanner heading = 'Game Over!' message = {`${getOpponent(this.state.turn)} Wins!!`} />) : ''}
    </div>
  );
}

export default Board;
