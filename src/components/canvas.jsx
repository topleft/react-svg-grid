import React, { Component } from 'react';
import * as grid from '../grid';

export default class Canvas extends Component {
    constructor (props) {
        super(props)
    }

    componentDidMount() {
        this.paper = grid.createPaper(`#${this.props.id}`);
        this.createGrid();        
    }

    createGrid() {
        this.circles = grid.createSymetricalCirleGrid(this.paper, 5, 5, 4, 10, "#1485CC");
        grid.createShaddow(this.paper, this.circles);
    }

    render() {

        const x = this.props.x || -100;
        const y = this.props.y || -100;
        const width = this.props.width || 200;
        const height = this.props.height || 200;
        
        const viewBox = `${x} ${y} ${width} ${height}`

        const containerStyle = {
            width: '60%'
        }

        return (
            <div style={containerStyle}>
                <svg id={this.props.id} viewBox={viewBox}></svg>
            </div>
        );
    }
}