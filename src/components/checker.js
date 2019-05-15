import './checker.css';
import React from 'react';


export class Checker extends React.Component {

  constructor() {
    super();

    this.state = {
      turn: 0,
      selected: null,
      possibleMoves: [],
      board: [[0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [-1, -1, -1, -1, -1, -1, -1, -1],
      [1, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1]]
    };
  }


  renderRedPiece() {
    return (<svg className='Piece'>
              <circle cx="25" cy= "25" r="20" stroke="black" strokeWidth="3" fill="red" />
            </svg>);
  }

  renderBlackPiece() {
    return (<svg className='Piece'>
              <circle cx="25" cy= "25" r="20" stroke="black" strokeWidth="3" fill="Black" />
            </svg>);
  }

  isCellValid(i, j) {
    if (i >= 0 && i < 8 && j >= 0 && j < 8)
      return true;
    
    return false;
  } 

  checkMovePossible(i, j) {
    if (this.isCellValid(i, j) && this.state.board[i][j] === -1)
      return true;
    
    return false;
  }

  checkOpponent(i, j) {
    if (this.isCellValid(i, j) && this.state.board[i][j] === (this.state.turn + 1) % 2)
      return true;
    
    return false;
  }

  calculatePossibleMove(i, j) {

    let possibleMoves = [];

    if (this.state.turn === 0) {
      if (this.checkMovePossible(i + 1, j - 1)) {
        possibleMoves.push({x: i + 1, y: j - 1});
      } else if (this.checkOpponent(i + 1, j - 1)) {
        if (this.checkMovePossible(i + 2, j - 2)) {
          possibleMoves.push({x: i + 2, y: j - 2});
        }
      }

      if (this.checkMovePossible(i + 1, j + 1)) {
        possibleMoves.push({x: i + 1, y: j + 1});
      } else if (this.checkOpponent(i + 1, j + 1)) {
        if (this.checkMovePossible(i + 2, j + 2)) {
          possibleMoves.push({x: i + 2, y: j + 2});
        }
      }
    } else {

      if (this.checkMovePossible(i - 1, j - 1)) {
        possibleMoves.push({x: i - 1, y: j - 1});
      } else if (this.checkOpponent(i - 1, j - 1)) {
        if (this.checkMovePossible(i - 2, j - 2)) {
          possibleMoves.push({x: i - 2, y: j - 2});
        }
      }

      if (this.checkMovePossible(i - 1, j + 1)) {
        possibleMoves.push({x: i - 1, y: j + 1});
      } else if (this.checkOpponent(i - 1, j + 1)) {
        if (this.checkMovePossible(i - 2, j + 2)) {
          possibleMoves.push({x: i - 2, y: j + 2});
        }
      }
    }

    return possibleMoves;
  }

  handleClick = (i, j) => {
    console.log(i + " " + j);

    // Check if any item is selected
    if (this.state.selected !== null) {

      if (this.isCellMovable(i, j)) {

        let newBoard = [...this.state.board];

        newBoard[i][j] = this.state.turn;
        newBoard[this.state.selected.x][this.state.selected.y] = -1;

        if (Math.abs(i - this.state.selected.x) === 2) {
          let a = (this.state.selected.x + i) / 2;
          let b = (this.state.selected.y + j) / 2;

          newBoard[a][b] = -1;
        }

        this.setState({
          turn: (this.state.turn + 1) % 2,
          possibleMoves: [],
          board:  newBoard,
          selected: null
        });
      }
    } else {
      // Select the clicked item is possible
      if (this.state.board[i][j] === this.state.turn) {

        let possibleMoves = this.calculatePossibleMove(i, j);

        if (possibleMoves.length > 0) {
          this.setState({
            selected: {x: i, y: j},
            possibleMoves: possibleMoves
          });
        }
      }
    }

  }


  isCellSelected(i, j) {
    return this.state.selected !== null && this.state.selected.x === i && this.state.selected.y === j;
  }

  isCellMovable(x, y) {

    for (let i = 0; i < this.state.possibleMoves.length; i++) {
      if (this.state.possibleMoves[i].x === x && this.state.possibleMoves[i].y === y)
        return true;
    }

    return false;
  }

  render() {

    let tiles = [];

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        tiles.push(
          <div key={`Tile-${i}-${j}`} className={`Tile ${i % 2 == j % 2 ? 'RedTile' : 'WhiteTile'} ${this.isCellSelected(i, j) ? 'Selected ' : '' } ${this.isCellMovable(i, j) ? 'Movable' : '' }`} onClick={(e) => this.handleClick(i, j)}>
            {
              (this.state.board[i][j] === 0 && this.renderBlackPiece()) || 
              (this.state.board[i][j] === 1 && this.renderRedPiece())
            }
          </div>
        );
      }
    }

    return (<div className='Board'> 
      {tiles}
    </div>);
  }
}