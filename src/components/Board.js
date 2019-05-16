import './Board.css';
import React from 'react';
import {Piece} from './Piece';
import { Square } from './square'; 


const TileStyle = {
  width: '50px',
  paddingBottom: '50px',
  float: 'left',
  position: 'relative'
};

const WhiteTile = {
  background: 'white',
}

const GreyTile = {
  background: 'grey'
}

const SelectedTile = {
  boxShadow: 'inset 0px 0px 0px 10px #ff54ff'
}

const HighlightedTile = {
  boxShadow: 'inset 0px 0px 0px 25px #564132'
}


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

  getStyleFromRowColumn(row, column) {
    let style = {...TileStyle};

    if (row % 2 === column % 2)
      style = {...style, ...GreyTile};
    else
      style = {...style, ...WhiteTile};
      
    if (this.isCellSelected(row, column))
      style = {...style, ...SelectedTile};

    if (this.isCellHighlighted(row, column))
      style = {...style, ...HighlightedTile};

    return style;
  }

  render() {
    let tiles = [];

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        tiles.push(

          <Square key={`Tile-${i}-${j}`}
                  style = {this.getStyleFromRowColumn(i, j)}
                  onClick = {(e, row , column) => this.props.onClick(row, column)}
                  row = {i}
                  column = {j}>
                  {
                    this.props.board[i][j] ? <Piece {...this.props.board[i][j] }/> : ''
                  }
          </Square>
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