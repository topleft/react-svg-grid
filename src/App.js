import React, { Component } from 'react';
import './App.css';

import Canvas from './components/canvas';
import Controls from './components/controls';
import Layout from './components/layout';

import colors from './colors.js'

class App extends Component {
  constructor (props) {
    super(props);
    this.state = {
      itemsPerRow: 4,
      verticalMargin: 3,
      horizontalMargin: 3,
      radius: 5,
      pathColor: colors.initialPathColor
    }

    this.updateGrid = this.updateGrid.bind(this);

  }
  
  updateGrid(gridProperties) {
    this.setState(gridProperties)
  }
    

  render() {

    const containerStyle = {
      marginTop: '20vh',
      marginLeft: '10vh',
      height: '80vh',
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'flex-start',
    }

    return (
      <div className="App" style={containerStyle} >
        <Canvas 
          id='svg' 
          x='-100' 
          y='-100' 
          width='200'
          height='200' 
          gridProperties={this.state}
        >
        </Canvas>
        <Controls handleChange={this.updateGrid} inputValues={this.state}></Controls>
      </div>
    );
  }
}

export default App;
