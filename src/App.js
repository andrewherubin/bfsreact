import React, { Component } from 'react';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import Grid from './components/Grid';

export class App extends Component {
  constructor(){
    super();
    const table = [];
    for (let y=0; y<40; ++y) {
      const row = [];
      for (let x=0; x<80; ++x) {
        row.push({
          x: { x },
          y: { y }
        });
      }
      table.push(row);
    }
    this.state={
      table: table
    };
  }

  render() {
    return (
      <div>
        <Header />
        <Toolbar 
          startHandler={ this.startHandler }
          endHandler={ this.endHandler }
          wallHandler={ this.wallHandler }
          resetHandler={ this.resetHandler }
          solveHandler={ this.solveHandler }
        />
        <Grid  table={ this.state.table }/>
      </div>
    )
  }

  // handler for add start node button
  startHandler = () => {
    return null;
  }

  // handler for add end node button
  endHandler = () => {
    return null;
  }

  // handler for add walls button
  wallHandler = () => {
    return null;
  }

  // handler for reset grid button
  resetHandler = () => {
    return null;
  }

  // handler for solve button
  solveHandler = () => {
    return null;
  }
}

export default App