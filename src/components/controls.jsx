import React, { Component } from 'react';
import colors from '../colors.js'; 

export default class Controls extends Component {
    
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }

    

    handleChange(e) {
        const key = e.target.name;
        const value = e.target.value;
        const change = {};
        change[key] = value;
        this.props.handleChange(change);
    }

    getInputs() {
        const inputs = [
            {
                value: this.props.inputValues.itemsPerRow,
                name: 'itemsPerRow',
                label: 'ITEMS PER ROW',
                type: 'number'
            },
            {
                value: this.props.inputValues.horizontalMargin,
                name: 'horizontalMargin',
                label: 'X AXIS SPACING',
                type: 'number'
            },
            {
                value: this.props.inputValues.verticalMargin,
                name: 'verticalMargin',
                label: 'Y AXIS SPACING',
                type: 'number'
            },
            {
                value: this.props.inputValues.radius,
                name: 'radius',
                label: 'RADIUS',
                type: 'number'
            },
        ]
        
        const containerStyle = {
            marginBottom: '15px'
        }

        const inputStyle = {
            margin: '10px auto',
            width: '20%',
        }

        const labelStyle = {
            display: 'block', 
            fontSize: '12px',
            color: colors.backgroundBottom,
            transform: 'rotate(-7deg)',
            left: '-2px'
        }

        return inputs.map((input, i) => {

            return (
                <div key={i} style={containerStyle}>
                    <label 
                    htmlFor="itemsPerRow"
                    style={labelStyle}
                    >
                        {input.label}
                    </label>
                    <input 
                        onChange={this.handleChange}
                        style={inputStyle}
                        value={input.value}
                        name={input.name}
                        type={input.type}
                    >
                    </input>
                </div>
            )

        })


    }

    render() {

        const containerStyle = {
            margin: '20px',
            paddingTop: '20vh',
            textAlign: 'center'
        }

            
        return (
            <div style={containerStyle}>
                {this.getInputs()}
            </div>
        )
    }
}