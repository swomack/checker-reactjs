import "./Status.css";
import React from "react";

function Status(props) {
  return (
    <div className="Status">
      <span>Turn: </span> <div style={props.style}></div>
    </div>
  );
}

export default Status;
