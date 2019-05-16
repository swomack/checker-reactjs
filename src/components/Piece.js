import React from 'react';
import './Piece.css';

export class Piece extends React.Component {
    constructor(props) {
      super(props);
      console.log(props);
    }
  
    render() {
      return (<svg className='Piece'>
                <circle cx="25" cy= "25" r="20" stroke = {this.props.stroke} strokeWidth="3" fill = {this.props.color} />
              </svg>);
    }
  }
  