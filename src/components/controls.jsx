import React, { Component } from 'react';
import colors from '../colors.js'; 

export default class Controls extends Component {
    render() {

        const containerStyle = {
            margin: '20px',
            paddingTop: '20vh'
        }
        const inputStyle = {
            marginTop: '5px',
            width: '20%',
        }

        const labelStyle = {
            display: 'block', 
            fontSize: '12px',
            color: colors.backgroundBottom,
        }
            
        return (
            <div style={containerStyle}>
                <label 
                  for="itemsPerRow"
                  style={labelStyle}
                >
                  Items Per Row
                </label>
                <input 
                    style={inputStyle}
                    name="itemsPerRow"
                    type="number" >
                </input>
            </div>
        )
    }
}