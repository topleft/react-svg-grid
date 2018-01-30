import React, { Component } from 'react';
import * as grid from '../grid';

export default class Canvas extends Component {

    componentDidMount() {
        this.paper = grid.createPaper(`#${this.props.id}`);
        this.set = grid.createSet();
        this.createGrid();
        this.symmetricalGrid = this.createGrid();
    }

    createGrid() {
        const gp = this.props.gridProperties
        this.paper.clear();
        const symmetricalGrid = new grid.SymmetricalCircleGrid(
            this.paper, 
            this.set, 
            gp.itemsPerRow, 
            gp.horizontalMargin, 
            gp.verticalMargin, 
            gp.radius, 
            gp.pathColor,
            0.5
        )
        symmetricalGrid.createGrid()
        // symmetricalGrid.createShadow()
        return symmetricalGrid;
    }
    
    componentDidUpdate() {
        // because the state is tied to the input value
        // and we want to allow for "" in the input
        // we catch undefined values here
        this.symmetricalGrid.circlesPerRow = this.props.gridProperties.itemsPerRow;
        const gp = this.props.gridProperties;        
        const areAllValuesDefined = Object.values(gp).every((val) => !!val || val === 0);
        if (!areAllValuesDefined) return;
        this.symmetricalGrid.adjustCirclesPerRow();
        // this.createGrid();
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