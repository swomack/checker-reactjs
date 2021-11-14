import React, {useState} from 'react';
import './GameApp.css';
import Board from '../board/Board';
import GameControllers from '../gameControllers/GameControllers';


function GameApp() {

  const [started, setStarted] = useState(false);
  const players = ["Player1", "Player2"];
 
  const gameFinished = () => {
    setStarted(false);
  }

  const changeGameState = () => {
    setStarted((prevState) => !prevState);
  }
 
  return (
    <div className="GameApp">
      <GameControllers  text={started ? "Stop" : "Start"} 
                        onClick={() => changeGameState()}
                        players={players}/>
      {started && <Board onGameFinished={() => gameFinished()} />}
    </div>
  );
}

export default GameApp;
