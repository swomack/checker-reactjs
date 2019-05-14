import './checker.css';
import React from 'react';


export class Checker extends React.Component {

  constructor() {
    super()
  }

  render() {

    let tiles = [];

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        tiles.push(
          <div className={`Tile ${i % 2 == j % 2 ? 'RedTile' : 'WhiteTile'}`}>

          </div>
        );
      }
    }

    return (<div className='Board'> 
      {tiles}
    </div>);
  }
}