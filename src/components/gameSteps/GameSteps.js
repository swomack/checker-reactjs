import React from 'react'

function GameSteps(props) {

    const {gameSteps, restoreHistory} = props;

    const elements = gameSteps.map((state, index) => {
        return <li key={index} onClick={() => restoreHistory(index)}>Move: {index + 1}</li>
    });
    
    return (
        <div>
            <ul>
                {elements}
            </ul>
        </div>
    )
}

export default GameSteps
