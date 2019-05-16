import './Status.css'
import React from 'react'

export class Status extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className='Status'>
        <span>Turn:  </span> <div style={this.props.style}></div>
      </div>
    );
  }
}