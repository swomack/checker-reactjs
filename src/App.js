import React from 'react';
import './App.css';
import './components/board/Board.css'
import Board from './components/board/Board';
import GameControllers from './components/gameControllers/GameControllers';


export class  App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      started: false,
      players: ["Player1", "Player2"],
    };
  }
 
  render() {
    return (
      <div className="App">
        <GameControllers  text={this.state.started ? "Stop" : "Start"} 
                          onClick={() => this.changeGameState()}
                          players = {this.state.players}
                           />
        {this.state.started && <Board onGameFinished={() => this.gameFinished()} />}
      </div>
    );
  }

  gameFinished() {
    this.setState({ started: false});
  }

  changeGameState() {
    this.setState((prevState) => {
      return { started: !prevState.started}
    });
  }
  
}
