import './Board.css';
import React from 'react';
import {Piece} from './Piece'

export class Board extends React.Component {

  constructor(props) {
    super(props);
  }

  isCellSelected(i, j) {
    return this.props.selected !== null && this.props.selected.x === i && this.props.selected.y === j;
  }

  isCellHighlighted(x, y) {
    for (let i = 0; i < this.props.highlighted.length; i++) {
      if (this.props.highlighted[i].x === x && this.props.highlighted[i].y === y)
        return true;
    }

    return false;
  }

  render() {
    let tiles = [];

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        tiles.push(
          <div key={`Tile-${i}-${j}`} className={`Tile ${i % 2 == j % 2 ? 'RedTile' : 'WhiteTile'} 
          ${this.isCellSelected(i, j) ? 'Selected ' : '' } 
          ${this.isCellHighlighted(i, j) ? 'Highlighted' : '' }`} 
          onClick={(e) => { if (!this.props.gameOver) this.props.onBoardClick(i, j)} }>
            {
              this.props.board[i][j] ?  <Piece {...this.props.board[i][j] }/> : ''
            }
          </div>
        );
      }
    }

    return (
      <div>
        <div className={`Board ${this.props.disabled ? 'Disable' : ''}`}>
          {tiles}
        </div>
      </div>
    );
  }
}