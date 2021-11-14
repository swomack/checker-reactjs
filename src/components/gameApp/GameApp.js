import React, {useState} from 'react';
import './GameApp.css';
import Board from '../board/Board';
import GameControllers from '../gameControllers/GameControllers';
import GameSteps from '../gameSteps/GameSteps';
import MessageBanner from '../messageBanner/MessageBanner';
import Timer from '../timer/Timer';

import GameState from "../../business/GameState";
import GameLogic from "../../business/GameLogic";

function GameApp() {

  const boardRowSize = 8;
  const boardColumnSize = 8;

  const [currentGameState, setCurrentGameState] = useState(new GameState(boardRowSize, boardColumnSize));
  const [history, setHistory] = useState([])
  const [winner, setWinner] = useState('');
  const [started, setStarted] = useState(false);
  const players = ["Player1", "Player2"];

  const gameLogic = new GameLogic(boardRowSize, boardColumnSize, currentGameState);

  const gameFinished = () => {
    setStarted(false);
    setWinner(players[currentGameState.turn])
  }


  const changeGameState = () => {

    if (!started) {
      setHistory([]);
      setCurrentGameState(new GameState(boardRowSize, boardColumnSize));
      setWinner('');
    }
    setStarted((prevState) => !prevState);
  }

 
  return (
    <div className="GameApp">
      <GameControllers  text={started ? "Stop" : "Start"} 
                        onClick={() => changeGameState()}
                        players={players}/>
      { started && <button onClick={() => gameFinished()}>Finish</button>}
      { winner && 
        <MessageBanner heading = 'Game Over!' message = {`${winner} Wins!!`} />
      }

      { started && <Timer /> }

      {started && <Board
        gameState={currentGameState}
        boardRowSize={boardRowSize}
        boardColumnSize={boardColumnSize}
        winner={winner}
        onCellClickHanlder={(row, column) => {

          const previousTurn = currentGameState.turn;

          gameLogic.trySelectCell(row, column);

          const newState = new GameState(boardRowSize, boardColumnSize, {...(gameLogic.gameState)});

          if (newState.turn !== previousTurn) {
            setHistory([...history, 
              new GameState(boardRowSize, boardColumnSize, {...newState, 
                board: newState.board.map((element) => element.slice())
              })]);
          }
          
          setCurrentGameState(newState);
          
          if (gameLogic.isGameOver(currentGameState.turn)) {
                gameFinished();
          }
          
        }}/>
      }
      {
         started && <GameSteps gameSteps={history} restoreHistory={(index) => {
          setCurrentGameState(new GameState(boardRowSize, boardColumnSize, {...(history[index])}));
          setHistory(history.slice(0, index));
          }} />
      }
    </div>
  );
}

export default GameApp;
