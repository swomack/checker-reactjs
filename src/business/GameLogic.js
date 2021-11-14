import {PlayerType} from "../enums";

class GameLogic {
  constructor(row, column, gameState) {
    this.boardRowSize = row;
    this.boardColumnSize = column;

    this.gameState = gameState;
  }

  isCellValid(row, column) {
    if (
      row >= 0 &&
      row < this.boardRowSize &&
      column >= 0 &&
      column < this.boardColumnSize
    )
      return true;

    return false;
  }

  getAllPiecesPosition(player) {
    let allPositions = [];

    for (let i = 0; i < this.boardRowSize; i++) {
      for (let j = 0; j < this.boardColumnSize; j++) {
        if (
          this.gameState.board[i][j] &&
          this.gameState.board[i][j].player === player
        )
          allPositions.push({ row: i, column: j });
      }
    }

    return allPositions;
  }

  isGameOver(player) {
    const allPiecesPositions = this.getAllPiecesPosition(player);

    if (allPiecesPositions.length <= 0) return true;

    for (let i = 0; i < allPiecesPositions.length; i++) {
      const possibleMoves = this.calculatePossibleMove(
        allPiecesPositions[i].row,
        allPiecesPositions[i].column,
        player
      );

      if (possibleMoves.length > 0) return false;
    }

    return true;
  }

  calculatePossibleMove(row, column, player) {
    const possibleMoves = [];
    const movableCells = this.getMovableCells(row, column, player);

    movableCells.forEach(({ row: destRow, column: destColumn }) => {
      if (this.isMovePossible(destRow, destColumn)) {
        possibleMoves.push({ row: destRow, column: destColumn });
      } else if (this.isOpponentPiece(destRow, destColumn, player)) {
        if (
          this.isMovePossible(
            destRow + (destRow - row),
            destColumn + (destColumn - column)
          )
        ) {
          possibleMoves.push({
            row: destRow + (destRow - row),
            column: destColumn + (destColumn - column),
          });
        }
      }
    });

    return possibleMoves;
  }

  getMovableCells(row, column, player) {
    const cells = [];
    if (player === PlayerType.First) {
      cells.push({ row: row + 1, column: column - 1 });
      cells.push({ row: row + 1, column: column + 1 });
    } else {
      cells.push({ row: row - 1, column: column - 1 });
      cells.push({ row: row - 1, column: column + 1 });
    }

    return cells;
  }

  isMovePossible(row, column) {
    if (
      this.isCellValid(row, column) &&
      this.gameState.board[row][column] === null
    )
      return true;

    return false;
  }

  isOpponentPiece(row, column, player) {
    if (
      this.isCellValid(row, column) &&
      this.gameState.board[row][column] &&
      this.gameState.board[row][column].player === this.getOpponent(player)
    )
      return true;

    return false;
  }

  getOpponent(player) {
    return (player + 1) % 2;
  }

  trySelectCell(row, column) {
    if (this.gameState.selectedCell !== null) {
      if (
        this.gameState.selectedCell.row === row &&
        this.gameState.selectedCell.column === column
      ) {
        this.gameState.selectedCell = null;
        this.gameState.possibleMoves = [];

        return;
      }

      this.tryToMoveSelectedPiece(row, column);
    } else {
      this.selectPieceToMove(row, column);
    }
  }

  tryToMoveSelectedPiece(row, column) {
    if (this.isPieceMovable(row, column)) {
      const gameBoard = this.gameState.board;

      gameBoard[row][column] = gameBoard[this.gameState.selectedCell.row][this.gameState.selectedCell.column];
      gameBoard[this.gameState.selectedCell.row][this.gameState.selectedCell.column] = null;
  
      // Check if it is a capture move
      if (Math.abs(row - this.gameState.selectedCell.row) === 2) {
        const a = (this.gameState.selectedCell.row + row) / 2;
        const b = (this.gameState.selectedCell.column + column) / 2;
  
        gameBoard[a][b] = null;
      }
  
      const opponent = this.getOpponent(this.gameState.turn);
  
      this.gameState.turn = opponent;
      this.gameState.possibleMoves = [];
      this.gameState.selectedCell = null;
    }
  }

  isPieceMovable(row, column) {
    for (let i = 0; i < this.gameState.possibleMoves.length; i++) {
      if (
        this.gameState.possibleMoves[i].row === row &&
        this.gameState.possibleMoves[i].column === column
      )
        return true;
    }

    return false;
  }

  selectPieceToMove(row, column) {
    if (this.isCellSeletable(row, column)) {
      const possibleMoves = this.calculatePossibleMove(
        row,
        column,
        this.gameState.turn
      );

      if (possibleMoves.length > 0) {
        this.gameState.selectedCell = { row, column };
        this.gameState.possibleMoves = possibleMoves;
      }
    }
  }

  isCellSeletable(row, column) {
    return (
      this.gameState.board[row][column] &&
      this.gameState.board[row][column].player === this.gameState.turn
    );
  }

  isCellSelected(row, column) {
    return (
      this.gameState.selectedCell !== null &&
      this.gameState.selectedCell.row === row &&
      this.gameState.selectedCell.column === column
    );
  }

  isCellHighlighted(row, column) {
    for (let i = 0; i < this.gameState.possibleMoves.length; i++) {
      if (this.gameState.possibleMoves[i].row === row && this.gameState.possibleMoves[i].column === column)
        return true;
    }

    return false;
  }
}

export default GameLogic;

