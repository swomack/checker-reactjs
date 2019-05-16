import React from 'react';
import { Player } from './players';
import './GameController.css';

export class GameControllers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {

    let gameStartButton;

    if (this.props.gameOver) {
      gameStartButton = (<div className='StartButton'><button onClick={(e) => this.props.handleGameStart()}><span>Start</span></button></div>);
    } else {
      gameStartButton = (<div className='StartButton'><button onClick={(e) => this.props.handleGameStart()}><span></span>Restart</button></div>);
    }

    return (
    <div className='GameController'>
      <Player />
      {gameStartButton}
    </div>);
    
  }
}