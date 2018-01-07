import React, { Component } from 'react';
import colors from '../colors'; 


export default class CustomAlert extends Component {
    constructor(props) {
        super(props);
    }
        
    render() {

        let style = {
            position: "absolute",
            fontSize: '2rem',
            top: "70vh",
            left: '20%',
            whiteSpace: 'wrap',
            padding: '10px 24px',
            animationDuration: '2s',
            animationName: 'slidein',
            transform: 'skewX(12deg)',
            textShadow: '1px 1px #fff',
            boxShadow: '4px 4px #fff',
        };
        
        switch(this.props.config.type) {
            case 'error':
                style.color = colors.alert.error.text
                style.backgroundColor = colors.alert.error.background
                break;
                case 'success':
                style.color = colors.alert.success.text
                style.backgroundColor = colors.alert.success.background
                break;
                case 'info':
                style.color = colors.alert.info.text
                style.backgroundColor = colors.alert.info.background
                break;
            default:
                break;
        }


        return(
            this.props.isShown 
            ?
            <div className={"alert"} style={style}>
                {this.props.config.message}
            </div>
            :
            null
        )
    }
}