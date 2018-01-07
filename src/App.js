import React, { Component } from 'react';
import './App.css';

import Canvas from './components/canvas';
import Controls from './components/controls';
import CustomAlert from './components/customAlert';
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
      pathColor: colors.paths,
      isAlertShown: false,
      alertMessage: null,
      alertType: null
    }

    this.updateGrid = this.updateGrid.bind(this);
    this.showAlert = this.showAlert.bind(this);

  }
  
  updateGrid(gridProperties) {
    this.setState(gridProperties)
  }

  showAlert(alertConfig) {
    this.setState({isAlertShown: true, ...alertConfig})
    setTimeout(() => this.setState({isAlertShown: false}), alertConfig.timeout || 3000)
  }
    
  render() {

    const containerStyle = {
      margin: 'auto',
      display: 'flex',
      flexFlow: 'row wrap',
      justifyContent: 'flex-start',
      maxWidth: '500px'
    }

    const titleContainerStyle = {
      width: '100%',
      color: colors.title,
      position: 'absolute',
      textShadow: `${colors.titleShadow} -4px 4px 4px, #000 -4px 3px 3px`,
      backgroundColor: 'rgba(260, 260, 264, 0.6)'
    }

    const inputValues = {
      itemsPerRow: this.state.itemsPerRow,
      verticalMargin: this.state.verticalMargin,
      horizontalMargin: this.state.horizontalMargin,
      radius: this.state.radius,
    }
    
    const alertConfig = {
      message: this.state.alertMessage,
      type: this.state.alertType
    }

    const gridProperties = {
      itemsPerRow: this.state.itemsPerRow,
      verticalMargin: this.state.verticalMargin,
      horizontalMargin: this.state.horizontalMargin,
      radius: this.state.radius,
      pathColor: colors.paths,
    }

    console.log(gridProperties)

    return (

      <div>
        <div className="titleContainer" style={titleContainerStyle}>{'FRONT END'}</div>
        <div className="App" style={containerStyle} >
          <Canvas 
            id='svg' 
            x='-50' 
            y='-60' 
            width='100'
            height='140' 
            gridProperties={gridProperties}
          >
          </Canvas>
          <Controls handleChange={this.updateGrid} inputValues={inputValues} updateAlert={this.showAlert}></Controls>
          <CustomAlert isShown={this.state.isAlertShown} config={alertConfig}></CustomAlert>
        </div>
      </div>
    );
  }
}

export default App;
