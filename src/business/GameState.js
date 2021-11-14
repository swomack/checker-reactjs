import Player from '../player/Player';
import {PlayerType} from "../enums";


function getDefaultBoard(totalRow, totalColumn) {
  const board = Array(totalRow).fill().map(() => Array(totalColumn).fill(null));

  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < totalColumn; j++) {
      board[i][j] = getBoardData(PlayerType.First);
    }
  }

  for (let i = totalRow - 2; i < totalRow; i++) {
    for (let j = 0; j < totalColumn; j++) {
      board[i][j] = getBoardData(PlayerType.Second);
    }
  }

  return board;
}

function getBoardData(player) {
  if (player === PlayerType.First)
    return new Player(PlayerType.First, 'Black', 'Red');
  else
    return new Player(PlayerType.Second, 'Red', 'Black');
}

function getInitialGameState(totalRow, totalColumn) {
  const initialGameState = {
    board: getDefaultBoard(totalRow, totalColumn),
    possibleMoves: [],
    selectedCell: null,
    turn: PlayerType.First
  }

  return initialGameState;
}


export default getInitialGameState;
