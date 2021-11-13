import React from 'react'

function MessageBanner(props) {
  return (
    <div style={props.style}>
      <h2>{props.heading}</h2>
      <h5>{props.message}</h5>
    </div>
  );
}

export default MessageBanner;
