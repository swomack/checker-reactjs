import React, {useState} from 'react';
import './GameApp.css';
import Board from '../board/Board';
import GameControllers from '../gameControllers/GameControllers';
import GameSteps from '../gameSteps/GameSteps';
import MessageBanner from '../messageBanner/MessageBanner';
import Timer from '../timer/Timer';

import getInitialGameState from "../../business/GameState";
import GameLogic from "../../business/GameLogic";

function GameApp() {

  const boardRowSize = 8;
  const boardColumnSize = 8;

  const [currentGameState, setCurrentGameState] = useState(getInitialGameState(boardRowSize, boardColumnSize));
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
      setCurrentGameState(getInitialGameState(boardRowSize, boardColumnSize));
      setWinner('');
    }
    setStarted((prevState) => !prevState);
  }

 
  return (
    <div className="GameApp">
      <GameControllers  text={started ? "Stop the current game" : "Start a new game"} 
                        onClick={() => changeGameState()}
                        players={players}/>

      { started && <button onClick={() => gameFinished()}>Finish</button>}
      { winner && 
        <MessageBanner heading = 'Game Over!' message = {`${winner} Wins!!`} />
      }

      { started && <Timer /> }

      {started && <Board
        gameState={currentGameState}
        isCellSelected={(row, column) => gameLogic.isCellSelected(row, column)}
        isCellHighlighted={(row, column) => gameLogic.isCellHighlighted(row, column)}
        winner={winner}
        onCellClickHanlder={(row, column) => {

          const previousTurn = currentGameState.turn;

          gameLogic.trySelectCell(row, column);

          const newState = {...gameLogic.gameState};

          if (newState.turn !== previousTurn) {
            setHistory([...history, {...newState, 
                board: newState.board.map((element) => element.slice())
              }]);
          }
          
          setCurrentGameState(newState);
          
          if (gameLogic.isGameOver(currentGameState.turn)) {
                gameFinished();
          }
          
        }}/>
      }
      {
         started && <GameSteps gameSteps={history} restoreHistory={(index) => {
          setCurrentGameState({...history[index]});
          setHistory(history.slice(0, index));
          }} />
      }
    </div>
  );
}

export default GameApp;
