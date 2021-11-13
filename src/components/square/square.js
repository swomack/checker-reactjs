import React from 'react'

function Square(props) {
    return (
        <div style = {props.style}  
             onClick = {(e) =>  props.onClick(e, props.row, props.column)}>
             {props.children}
        </div>
    );
}

export default Square;