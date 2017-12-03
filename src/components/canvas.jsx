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
        const gp = this.props.gridProperties
        this.paper.clear();
        this.circles = grid.createSymetricalCirleGrid(
            this.paper, 
            gp.itemsPerRow, 
            gp.horizontalMargin, 
            gp.verticalMargin, 
            gp.radius, 
            gp.pathColor
        );
        grid.createShaddow(this.paper, this.circles);
    }
    
    componentDidUpdate() {
        this.createGrid();
    }

    render() {

        const x = this.props.x || -100;
        const y = this.props.y || -60;
        const width = this.props.width || 200;
        const height = this.props.height || 200;
        
        const viewBox = `${x} ${y} ${width} ${height}`

        const containerStyle = {
            width: '70%'
        }

        return (
            <div style={containerStyle}>
                <svg 
                    id={this.props.id} 
                    viewBox={viewBox} 
                    style={{overflow: 'visible'}}
                >
                </svg>
            </div>
        );
    }
}