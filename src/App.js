import React from 'react';
import logo from './logo.svg';
import './App.css';
import './components/Board'
import { Board } from './components/Board';
import { GameControllers } from './components/GameControllers';
import { Player } from './components/Player' 

const Players = {
  First: 0,
  Second: 1
}

export class  App extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      turn: Players.First,
      selected: null,
      possibleMoves: [],
      gameOver: true,
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
        board[i][j] = this.getBoardData(Players.First);
      }
    }

    for (let i = 6; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        board[i][j] = this.getBoardData(Player.Second);
      }
    }

    return board;
  }

  getBoardData(player) {
    if (player === Players.First)
      return this.getNewBlackPiece();
    else
      return this.getNewRedPiece();
  }

  getNewBlackPiece() {
    return new Player(
      Players.First,
      'Black',
      'Red'
    );
  }

  getNewRedPiece() {
    return new Player(
      Players.Second,
      'Red',
      'Black'
    );
  }

  initializeState() {
    this.setState({
      turn: Players.First,
      selected: null,
      gameOver: false,
      possibleMoves: [],
      board: this.getDefaultBoard()
    });
  }
  
  render() {

    return (
      <div className="App">
        <GameControllers gameOver={this.state.gameOver} handleGameStart={() => this.handleGameStart()} />
        <Board onClick = {(i, j) => this.handleBoardClick(i, j)} 
                board = {this.state.board} 
                disabled = {this.state.gameOver} 
                selected = {this.state.selected}
                highlighted = {this.state.possibleMoves}
                />
      </div>
    );
  }

  handleBoardClick(i, j) {
  
    // Check if any item is selected
    if (this.state.selected !== null) {

      if (this.isCellMovable(i, j)) {

        let newBoard = [...this.state.board];

        newBoard[i][j] = this.getBoardData(this.state.turn);
        newBoard[this.state.selected.x][this.state.selected.y] = null;

        if (Math.abs(i - this.state.selected.x) === 2) {
          let a = (this.state.selected.x + i) / 2;
          let b = (this.state.selected.y + j) / 2;

          newBoard[a][b] = null;
        }

        let opponent = this.getOpponent(this.state.turn);

        this.setState({
          turn: opponent,
          possibleMoves: [],
          board:  newBoard,
          selected: null
        });

        let gameOver = this.checkGameOver(opponent);

        if (gameOver !== -1) {
          this.setState({
            gameOver: true
          })
        }
      }
    } else {
      // Select the clicked item is possible
      if (this.state.board[i][j] && this.state.board[i][j].player === this.state.turn) {

        let possibleMoves = this.calculatePossibleMove(i, j, this.state.turn);

        if (possibleMoves.length > 0) {
          this.setState({
            selected: {x: i, y: j},
            possibleMoves: possibleMoves
          });
        }
      }
    }
  }

  isCellMovable(x, y) {

    for (let i = 0; i < this.state.possibleMoves.length; i++) {
      if (this.state.possibleMoves[i].x === x && this.state.possibleMoves[i].y === y)
        return true;
    }

    return false;
  }

  checkGameOver(player) {
    let allPositions = this.getAllPositionOfPlayer(player);
  
    if (allPositions.length <= 0)
      return this.getOpponent(player);

    for (let i = 0; i < allPositions.length; i++) {
      let possibleMoves = this.calculatePossibleMove(allPositions[i].x, allPositions[i].y, player);

      if (possibleMoves.length > 0)
        return -1;
    }
    
    return this.getOpponent(player);
  }

  getAllPositionOfPlayer(player) {
    let allPositions = [];

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.state.board[i][j]  &&
          this.state.board[i][j].player === player)
          allPositions.push({x: i, y: j});
      }
    }

    return allPositions;
  }

  getOpponent(player) {
    return (player + 1) % 2;
  }

  isCellValid(i, j) {
    if (i >= 0 && i < 8 && j >= 0 && j < 8)
      return true;
    
    return false;
  } 

  checkMovePossible(i, j) {
    if (this.isCellValid(i, j) && this.state.board[i][j] === null)
      return true;
    
    return false;
  }

  checkIfOpponent(i, j, player) {
    if (this.isCellValid(i, j) &&
        this.state.board[i][j] &&
        this.state.board[i][j].player === this.getOpponent(player))
      return true;
    
    return false;
  }

  calculatePossibleMove(i, j, player) {

    let possibleMoves = [];

    if (player === 0) {
      if (this.checkMovePossible(i + 1, j - 1)) {
        possibleMoves.push({x: i + 1, y: j - 1});
      } else if (this.checkIfOpponent(i + 1, j - 1, player)) {
        if (this.checkMovePossible(i + 2, j - 2)) {
          possibleMoves.push({x: i + 2, y: j - 2});
        }
      }

      if (this.checkMovePossible(i + 1, j + 1)) {
        possibleMoves.push({x: i + 1, y: j + 1});
      } else if (this.checkIfOpponent(i + 1, j + 1, player)) {
        if (this.checkMovePossible(i + 2, j + 2)) {
          possibleMoves.push({x: i + 2, y: j + 2});
        }
      }
    } else {

      if (this.checkMovePossible(i - 1, j - 1)) {
        possibleMoves.push({x: i - 1, y: j - 1});
      } else if (this.checkIfOpponent(i - 1, j - 1, player)) {
        if (this.checkMovePossible(i - 2, j - 2)) {
          possibleMoves.push({x: i - 2, y: j - 2});
        }
      }

      if (this.checkMovePossible(i - 1, j + 1)) {
        possibleMoves.push({x: i - 1, y: j + 1});
      } else if (this.checkIfOpponent(i - 1, j + 1, player)) {
        if (this.checkMovePossible(i - 2, j + 2)) {
          possibleMoves.push({x: i - 2, y: j + 2});
        }
      }
    }

    return possibleMoves;
  }

  handleGameStart() {
    this.initializeState();
  }
  
}
