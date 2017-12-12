import React, { Component } from 'react';
import './App.css';

import Canvas from './components/canvas';
import Controls from './components/controls';
// import Layout from './components/layout';

import colors from './colors.js'

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      itemsPerRow: 9,
      verticalMargin: 4,
      horizontalMargin: 4,
      radius: 5,
      pathColor: colors.paths
    }

    this.updateGrid = this.updateGrid.bind(this);

  }
  
  updateGrid(gridProperties) {
    this.setState(gridProperties)
  }
    

  render() {

    const containerStyle = {
      margin: 'auto',
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'flex-start',
      maxWidth: '500px'
    }

    const titleContainer = {
      width: '100%',
      color: colors.title,
      position: 'absolute',
      textShadow: `${colors.titleShadow} -4px 4px 4px, #000 -4px 3px 3px`,
      backgroundColor: 'rgba(260, 260, 264, 0.6)'
    }

    return (
      <div>
        <div className="titleContainer" style={titleContainer}>{'FRONT END'}</div>
        <div className="App" style={containerStyle} >
          <Canvas 
            id='svg' 
            x='-50' 
            y='-60' 
            width='100'
            height='140' 
            gridProperties={this.state}
          >
          </Canvas>
          <Controls handleChange={this.updateGrid} inputValues={this.state}></Controls>
        </div>
      </div>
    );
  }
}

export default App;
