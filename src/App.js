import React, { Component } from 'react';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import Grid from './components/Grid';

export class App extends Component {
  constructor(props){
    super(props);
    const table = [];
    for (let r=0; r<40; ++r) {
      const row = [];
      for (let c=0; c<80; ++c) {
        row.push({
          row: r,
          col: c,
          isBlank: true,
          isStart: false,
          isEnd: false,
          isWall: false,
          isPath: false,
          isVisited: false,
          isQueued: false,
          path: []
        });
      }
      table.push(row);
    }
    this.state={
      table: table,
      startMode: false,
      endMode: false,
      wallMode: false,
      start: table[0][0],
      end: table[1][0],
      mouseIsPressed: false,
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
          mousedown={this.mousedown} 
          mouseup={this.mouseup}
        />
        <Grid 
        table={ this.state.table }
        handleClick={ this.handleNodeClick }
        mousedown={this.mousedown} 
        mouseup={this.mouseup}
        handleEnter={ this.handleEnter }
        />
      </div>
    )
  }

  mousedown = () => {
    this.setState({
      mouseIsPressed: true
    });
  }

  mouseup = () => {
    this.setState({
      mouseIsPressed: false
    });
  }

  handleEnter = (row, col) => {
    if (!this.state.mouseIsPressed){
      return null;
    }
    if (!this.state.wallMode){
      return null;
    }
    let node = this.state.table[row][col];
    if (!node.isBlank){
      return null;
    }
    node.isWall=true;
    node.isBlank=false;
    this.forceUpdate();
  }

  handleNodeClick = (row, col) => {
    let node = this.state.table[row][col];
    if (!node.isBlank) {
      return null;
    }
    if (this.state.startMode){
      let current = this.state.start;
      current.isBlank = true;
      current.isStart = false;
      node.isStart = true;
      node.isBlank = false;
      this.setState({
        start: node
      });
    }
    else if (this.state.endMode){
      let current = this.state.end;
      current.isBlank = true;
      current.isEnd = false;
      node.isEnd = true;
      node.isBlank = false;
      this.setState({
        end: node
      });
    }
    else if (this.state.wallMode){
      node.isWall = true;
      node.isBlank = false;
      this.forceUpdate();
    }
  }

  // handler for add start node button
  startHandler = () => {
    this.setState({
      startMode: true,
      endMode: false,
      wallMode: false,
    });
  }

  // handler for add end node button
  endHandler = () => {
    this.setState({
      startMode: false,
      endMode: true,
      wallMode: false,
    });
  }

  // handler for add walls button
  wallHandler = () => {
    this.setState({
      startMode: false,
      endMode: false,
      wallMode: true,
    });
  }

  // handler for reset grid button
  resetHandler = () => {
    for (let r=0; r<40; ++r) {
      for (let c=0; c<80; ++c) {
        let current = this.state.table[r][c];
        if (!current.isStart && !current.isEnd) {
          current.isBlank = true;
          current.isWall = false;
        }
      }
    }
    this.setState({
      startMode: false,
      endMode: false,
      wallMode: false,
    });
  }

  // handler for solve button
  solveHandler = () => {
    let current = this.state.start;
    let queue = [];
    queue.push(current);
    let visited = [];
    visited.push(current);
    while (queue.length !== 0){
      current = queue.shift();
      if (current.isEnd){
        let pathx = current.path;
        while (pathx.length !== 0){
          let pathNode = pathx.shift();
          if (pathNode.isBlank){
            pathNode.isPath= true;
            pathNode.isBlank=false;
          }
          this.forceUpdate()
        }
      }
      if (current.row !== 0){
        let node = this.state.table[current.row-1][current.col];
        if (!node.isWall && !visited.includes(node)){
          queue.push(node);
          visited.push(node);
          for (let i=0; i<current.path.length; ++i){
            node.path.push(current.path[i]);
          }
          node.path.push(node);
        }
      }
      if (current.row !== 39){
        let node = this.state.table[current.row+1][current.col]
        if (!node.isWall && !visited.includes(node)){
          queue.push(node);
          visited.push(node);
          for (let i=0; i<current.path.length; ++i){
            node.path.push(current.path[i]);
          }
          node.path.push(node);
        }
      }
      if (current.col !== 0){
        let node = this.state.table[current.row][current.col-1];
        if (!node.isWall && !visited.includes(node)){
          queue.push(node);
          visited.push(node);
          for (let i=0; i<current.path.length; ++i){
            node.path.push(current.path[i]);
          }
          node.path.push(node);
        }
      }
      if (current.col !== 79){
        let node = this.state.table[current.row][current.col+1]
        if (!node.isWall && !visited.includes(node)){
          queue.push(node);
          visited.push(node);
          for (let i=0; i<current.path.length; ++i){
            node.path.push(current.path[i]);
          }
          node.path.push(node);
        }
      }
    }
    this.setState({
      startMode: false,
      endMode: false,
      wallMode: false,
    });
  }
}

export default App