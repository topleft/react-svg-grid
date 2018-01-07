import React, { Component } from 'react';
import colors from '../colors'; 


export default class CustomAlert extends Component {

    

    render() {

        const style = {
            position: "absolute",
            top: "10px",
            left: "20%"
        }

        return(
            <div style={style}>
                Alert!
            </div>
        )
    }
}