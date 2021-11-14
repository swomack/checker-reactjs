import React, {useState} from 'react';
import './GameApp.css';
import Board from '../board/Board';
import GameControllers from '../gameControllers/GameControllers';
import GameState from "../../business/GameState";
import GameLogic from "../../business/GameLogic";


function GameApp() {

  const boardRowSize = 8;
  const boardColumnSize = 8;

  const [gameState, setGameState] = useState(new GameState(boardRowSize, boardColumnSize))
  const [started, setStarted] = useState(false);
  const players = ["Player1", "Player2"];
  const gameLogic = new GameLogic(boardRowSize, boardColumnSize, gameState);
 
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
      {started && <Board
        gameState={gameState}
        gameLogic={gameLogic}
        boardRowSize={boardRowSize}
        boardColumnSize={boardColumnSize}
        updateGameState={(updatedGameState) => setGameState({...updatedGameState})}
        onGameFinished={() => gameFinished()} />
      }
    </div>
  );
}

export default GameApp;
