import React from 'react'

export class Square extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let props = this.props;

        return (
            <div style = {props.style}  
                 onClick = {(e) =>  props.onClick(e, props.row, props.column)}>
                 {props.children}
            </div>
        );
        
    }
}