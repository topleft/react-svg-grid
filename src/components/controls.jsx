import React, { Component } from 'react';
import colors from '../colors'; 
import CustomAlert from './customAlert';

export default class Controls extends Component {
    
    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const key = e.target.name;
        // allow for emtpy string value
        const value = e.target.value === "" ? "" : parseInt(e.target.value) ;
        const validationResult = this.validator(key, value);
        if (validationResult.isValid) {
            const change = {};
            change[key] = value;
            this.funAlerts(key, value);
            this.props.handleChange(change);
        } else {
            this.props.updateAlert({alertType: 'error', alertMessage: validationResult.errorMessage});
        }
    }

    validator(input, value) {
        switch (input) {
            case "radius":
            case "itemsPerRow":
                // allow for empty string values
                if (!value && value !== 0) {
                    return { isValid: true }   
                }
                const isValid = parseInt(value) > 0;
                const errorMessage = isValid ? null : `Gotta be greater than 0`;
                return { isValid, errorMessage };
            default:
                return { isValid: true };
        } 
    }

    funAlerts(key, value) {
        if (value === -1) {
            this.props.updateAlert({alertType: 'info', alertMessage: 'Woah...negatory' });
        } else if (key === 'itemsPerRow') {
            if (value === 1) {
                this.props.updateAlert({alertType: 'success', alertMessage: 'One is the loneliest number' });

            }
        }
    }

    getInputs() {
        const inputs = [
            {
                value: this.props.inputValues.itemsPerRow,
                name: 'itemsPerRow',
                label: 'PER ROW',
                type: 'number',
                min: 1
            },
            {
                value: this.props.inputValues.horizontalMargin,
                name: 'horizontalMargin',
                label: 'X AXIS',
                type: 'number'
            },
            {
                value: this.props.inputValues.verticalMargin,
                name: 'verticalMargin',
                label: 'Y AXIS',
                type: 'number'
            },
            {
                value: this.props.inputValues.radius,
                name: 'radius',
                label: 'RADIUS',
                type: 'number',
                min: 1
            },
        ]
        
        const inputContainerStyle = {
            marginBottom: '15px'
        }

        const inputStyle = {
            margin: '10px auto',
            width: '25%',
            transform: 'rotate(-7deg)',
            textAlign: 'center',
            backgroundColor: 'rgba(255,255,255, 0.2)',
        }

        const labelStyle = {
            display: 'block', 
            fontSize: '12px',
            color: colors.backgroundBottom,
            transform: 'rotate(-7deg)',
            position: 'bottom'

        }

        return inputs.map((input, i) => {

            return (
                <div key={i} style={inputContainerStyle}>
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
                        min={input.min || ""}
                    >
                    </input>
                </div>
            )

        })

    }

    render() {
        
        const controlsContainerStyle = {
            textAlign: 'center',
            backgroundColor: colors.controls
        }

            
        return (
            <div className="controlsContainer" style={controlsContainerStyle}>
                {this.getInputs()}
            </div>
        )
    }
}