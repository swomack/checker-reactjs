import Player from '../player/Player';
import {PlayerType, GameCurrentState} from "../enums";

class GameState {
    constructor(totalRow, totalColumn) {
      this.board = this.getDefaultBoard(totalRow, totalColumn);
      this.gameCurrentState = GameCurrentState.Running;
      this.possibleMoves = [];
      this.selected = null;
      this.turn = PlayerType.First;
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
}

export default GameState;
