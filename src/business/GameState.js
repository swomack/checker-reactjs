import Player from '../player/Player';
import {PlayerType, GameCurrentState} from "../enums";

class GameState {
    constructor(totalRow, totalColumn, gameStateObj) {
      const {board, gameCurrentState, possibleMoves, selected, turn} = gameStateObj || {};

      this.board = board || this.getDefaultBoard(totalRow, totalColumn);
      this.gameCurrentState = gameCurrentState || GameCurrentState.Running;
      this.possibleMoves = possibleMoves || [];
      this.selected = selected || null;
      this.turn = turn || PlayerType.First;
    }
  
    getDefaultBoard(totalRow, totalColumn) {
      const board = Array(totalRow).fill().map(() => Array(totalColumn).fill(null));
  
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < totalColumn; j++) {
          board[i][j] = this.getBoardData(PlayerType.First);
        }
      }
  
      for (let i = totalRow - 2; i < totalRow; i++) {
        for (let j = 0; j < totalColumn; j++) {
          board[i][j] = this.getBoardData(PlayerType.Second);
        }
      }
  
      return board;
    }
  
    getBoardData(player) {
      if (player === PlayerType.First)
        return new Player(PlayerType.First, 'Black', 'Red');
      else
        return new Player(PlayerType.Second, 'Red', 'Black');
    }

    isCellSelected(row, column) {
      return (
        this.selected !== null &&
        this.selected.row === row &&
        this.selected.column === column
      );
    }
  
    isCellHighlighted(row, column) {
      for (let i = 0; i < this.possibleMoves.length; i++) {
        if (this.possibleMoves[i].row === row && this.possibleMoves[i].column === column)
          return true;
      }
  
      return false;
    }
}

export default GameState;
