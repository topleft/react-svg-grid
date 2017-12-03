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
      itemsPerRow: 4,
      verticalMargin: 3,
      horizontalMargin: 3,
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
      margin: '5% auto',
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'flex-start',
      maxWidth: '500px'
    }

    return (
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
    );
  }
}

export default App;
