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
          <span>Player1: </span><input className = 'Edit' value = {this.props.players[0]} readOnly></input>
        </div>
        <div>
        <span>Player2: </span> <input className = 'Edit' value = {this.props.players[1]} readOnly></input>
        </div>
      </div>
      <button className = 'StartButton' onClick={(e) => this.props.onClick()}>
          {this.props.text}
      </button>
    </div>);
  }
}