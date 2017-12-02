import React, { Component } from 'react';
import './App.css';

import Canvas from './components/canvas';
import Controls from './components/controls';
import Layout from './components/layout';

class App extends Component {
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
        <Canvas id='svg' x='-100' y='-100' width='200' height='200' ></Canvas>
        <Controls></Controls>
      </div>
    );
  }
}

export default App;
