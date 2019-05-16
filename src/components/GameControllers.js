import React from 'react';
import './GameController.css';

export class GameControllers extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
    <div className = 'GameController'>
      <div className = 'EditContainer'>
        <div>
          Player1: <input value = {this.props.players[0]} onChange={(e) => this.changePlayerName(e, 0)}></input>
        </div>
        <div>
          Player2: <input value = {this.props.players[1]} onChange={(e) => this.changePlayerName(e, 1)}></input>
        </div>
      </div>
      <div className='StartButton'>
        <button onClick={(e) => this.props.onClick()}>
          {this.props.text}
        </button>
      </div>
    </div>);
  }
}