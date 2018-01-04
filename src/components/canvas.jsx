import React, { Component } from 'react';
import * as grid from '../grid';

export default class Canvas extends Component {

    componentDidMount() {
        this.paper = grid.createPaper(`#${this.props.id}`);
        this.set = grid.createSet();
        this.createGrid();        
    }

    createGrid() {
        const gp = this.props.gridProperties
        this.paper.clear();
        
        const symetricalGrid = new grid.SymetricalCircleGrid(
            this.paper, 
            this.set, 
            gp.itemsPerRow, 
            gp.horizontalMargin, 
            gp.verticalMargin, 
            gp.radius, 
            gp.pathColor,
            0.5
        )
        symetricalGrid.createGrid()
        symetricalGrid.createShadow()
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

        return (
            <div className="canvasContainer">
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