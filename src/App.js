import React, {useState} from 'react';
import './App.css';
import './components/board/Board.css'
import Board from './components/board/Board';
import GameControllers from './components/gameControllers/GameControllers';


function App() {

  const [started, setStarted] = useState(false);
  const players = ["Player1", "Player2"];
 
  const gameFinished = () => {
    setStarted(false);
  }

  const changeGameState = () => {
    setStarted((prevState) => !prevState);
  }
 
  return (
    <div className="App">
      <GameControllers  text={started ? "Stop" : "Start"} 
                        onClick={() => changeGameState()}
                        players={players}/>
      {started && <Board onGameFinished={() => gameFinished()} />}
    </div>
  );
}

export default App;
