import React from 'react'


export class MessageBanner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div style={this.props.style}>
        <h2>{this.props.heading}</h2>
        <h5>{this.props.message}</h5>
      </div>
    );
  }
}