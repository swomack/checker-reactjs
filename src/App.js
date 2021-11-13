import React from 'react';
import './App.css';
import './components/board/Board.css'
import Board from './components/board/Board';
import GameControllers from './components/gameControllers/GameControllers';
import { Player } from './player/Player' 
import MessageBanner from './components/messageBanner/MessageBanner'
import { Status } from './components/status/Status'

const PlayerType = {
  First: 0,
  Second: 1
}


const GameState = {
  Stopped: 0,
  Running: 1,
  Over: 3
}

const TurnIndicatorStyle = {
  width: '50px',
  hight: '50px',
};

export class  App extends React.Component {
  constructor(props) {
    super(props);

    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      turn: PlayerType.First,
      selected: null,
      players: ['Player1', 'Player2'],
      gameState: GameState.Stopped,
      possibleMoves: [],
      board: this.getDefaultBoard()
    };
  }

  getDefaultBoard() {
    let board = [
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null, null]
    ]

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 8; j++) {
        board[i][j] = this.getBoardData(PlayerType.First);
      }
    }

    for (let i = 6; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
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
  
  render() {

    let statusStyle = {...TurnIndicatorStyle};
    if (this.state.turn === PlayerType.Second)
      statusStyle.backgroundColor = 'Red';
    else
      statusStyle.backgroundColor = 'Black';

    return (
      <div className="App">
        <GameControllers  text={this.getGameControllerButtonText()} 
                          onClick={() => this.onClickGameStart()}
                          players = {this.state.players}
                           />
        <Status style = {statusStyle}/>
        <Board onClick = {(row, column) => this.onClickCell(row, column)} 
                board = {this.state.board} 
                disabled = {this.isBoardDisabled()} 
                selected = {this.state.selected}
                highlighted = {this.state.possibleMoves}
        />
        {this.state.gameState === GameState.Over ? (<MessageBanner heading = 'Game Over!' message = {`${this.state.players[this.getOpponent(this.state.turn)]} Wins!!`} />) : ''}
      </div>
    );
  }

  isBoardDisabled() {
    return this.state.gameState === GameState.Stopped || this.state.gameState === GameState.Over;
  }

  getGameControllerButtonText() {
    if (this.state.gameState === GameState.Stopped || this.state.gameState === GameState.Over)
      return "Start";
    else
      return "Stop";
  }

  onClickCell(row, column) {

    if (this.isBoardDisabled())
      return;

    if (this.state.selected !== null) {

      if (this.state.selected.row === row && this.state.selected.column === column) {
        this.setState({
          selected: null,
          possibleMoves: [],
        });

        return;
      }

      this.tryToMoveSelectedPiece(row, column);
    } else {
      this.selectPieceToMove(row, column);
    }
      
  }

  tryToMoveSelectedPiece(row, column) {
    if (this.isPieceMovable(row, column)) {

      let newBoard = [...this.state.board];

      newBoard[row][column] = newBoard[this.state.selected.row][this.state.selected.column];
      newBoard[this.state.selected.row][this.state.selected.column] = null;

      // Check if it is a capture move
      if (Math.abs(row - this.state.selected.row) === 2) {
        let a = (this.state.selected.row + row) / 2;
        let b = (this.state.selected.column + column) / 2;

        newBoard[a][b] = null;
      }

      let opponent = this.getOpponent(this.state.turn);

      this.setState({
        turn: opponent,
        possibleMoves: [],
        board:  newBoard,
        selected: null
      });

      let gameOver = this.isGameOver(opponent);

      if (gameOver) {
        this.setState({
          gameState: GameState.Over
        });
      }
    }
  }

  selectPieceToMove(row, column) {
    if (this.isCellSeletable(row, column)) {
      let possibleMoves = this.calculatePossibleMove(row, column, this.state.turn);

      if (possibleMoves.length > 0) {
        this.setState({
          selected: {row, column},
          possibleMoves: possibleMoves
        });
      }
    }
  }

  isPieceMovable(row, column) {
    for (let i = 0; i < this.state.possibleMoves.length; i++) {
      if (this.state.possibleMoves[i].row === row && this.state.possibleMoves[i].column === column)
        return true;
    }

    return false;
  }

  isCellSeletable(row, column) {
    return this.state.board[row][column] && this.state.board[row][column].player === this.state.turn;
  }

  isGameOver(player) {
    let allPiecesPositions = this.getAllPiecesPosition(player);
  
    if (allPiecesPositions.length <= 0)
      return this.getOpponent(player);

    for (let i = 0; i < allPiecesPositions.length; i++) {
      let possibleMoves = this.calculatePossibleMove(allPiecesPositions[i].row, allPiecesPositions[i].column, player);

      if (possibleMoves.length > 0)
        return false;
    }
    
    return true;
  }

  getAllPiecesPosition(player) {
    let allPositions = [];

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.state.board[i][j]  &&
          this.state.board[i][j].player === player)
          allPositions.push({row: i, column: j});
      }
    }

    return allPositions;
  }

  getOpponent(player) {
    return (player + 1) % 2;
  }

  isCellValid(row, column) {
    if (row >= 0 && row < 8 && column >= 0 && column < 8)
      return true;
    
    return false;
  } 

  isMovePossible(row, column) {
    if (this.isCellValid(row, column) && this.state.board[row][column] === null)
      return true;
    
    return false;
  }

  isOpponentPiece(row, column, player) {
    if (this.isCellValid(row, column) &&
        this.state.board[row][column] &&
        this.state.board[row][column].player === this.getOpponent(player))
      return true;
    
    return false;
  }

  calculatePossibleMove(row, column, player) {

    let possibleMoves = [];
    let getMovableCells = this.getMovableCells(row, column, player);

    getMovableCells.forEach(({row: destRow, column: destColumn}) => {
      if (this.isMovePossible(destRow, destColumn)) {
        possibleMoves.push({row: destRow, column: destColumn});
      } else if (this.isOpponentPiece(destRow, destColumn, player)) {
        if (this.isMovePossible(destRow + (destRow - row), destColumn + (destColumn - column))) {
          possibleMoves.push({row: destRow + (destRow - row), column: destColumn + (destColumn - column)});
        }
      }
    });

    return possibleMoves;
  }

  getMovableCells(row, column, player) {
    let cells = [];
    if (player === PlayerType.First) {
      cells.push({row: row + 1, column: column - 1});
      cells.push({row: row + 1, column: column + 1});
    } else {
      cells.push({row: row - 1, column: column - 1});
      cells.push({row: row - 1, column: column + 1});
    }

    return cells;
  }

  onClickGameStart() {
    if (this.state.gameState === GameState.Stopped || this.state.gameState === GameState.Over) {
      let state = this.getInitialState();
      state.gameState = GameState.Running;
      this.setState(state);
    } else {
      let state = this.getInitialState();
      state.gameState = GameState.Stopped;
      this.setState(state);
    }
  }
  
}
