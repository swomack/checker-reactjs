import React from 'react'
import './players.css'


export class Player extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='Players'>
        <div>
          <span>
            Player1:
          </span>
          <input onChange={(e) => this.changePlayerName(e)}></input>
        </div>
        <div>
          <span>
            Player2:
          </span>
          <input onChange={(e) => this.changePlayerName(e)}></input>
        </div>
      </div>
    );
  }

  changePlayerName(e) {
    console.log(e)
  }
}