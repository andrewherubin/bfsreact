import React, { Component } from 'react';
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import Grid from './components/Grid';

// App component
// Parent component to app

export class App extends Component {
  // constructor
  constructor(props){
    super(props);
    const table = [];
    // create a 80x40 grid of nodes
    for (let r=0; r<40; ++r) {
      const row = [];
      for (let c=0; c<80; ++c) {
        // relevant node data
        row.push({
          row: r,
          col: c,
          isBlank: true,
          isStart: false,
          isEnd: false,
          isWall: false,
          isPath: false,
          path: [] // solver will add the nodes that lead from start to this node
        });
      }
      table.push(row);
    }
    // set state
    this.state={
      table: table,
      startMode: false,
      endMode: false,
      wallMode: false,
      start: null,
      end: null,
      mouseIsPressed: false,
    };
  }

  // render app
  // [ header  ]
  // [ toolbar ]
  // [  grid   ]
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

  // keep track of mouse press state
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

  // allows for drawing of walls by click and drag
  handleEnter = (row, col) => {
    // do nothing cases
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
    // if cases are passed draw wall
    node.isWall=true;
    node.isBlank=false;
    this.forceUpdate();
  }

  // when clicking a node
  handleNodeClick = (row, col) => {
    let node = this.state.table[row][col];
    // allows for drawing on blank nodes only
    if (!node.isBlank) {
      return null;
    }
    // place start node and redefine start
    if (this.state.startMode){
      let current = this.state.start;
      if (current !== null){
        current.isBlank = true;
        current.isStart = false;
      }
      node.isStart = true;
      node.isBlank = false;
      this.setState({
        start: node
      });
    }
    // place end node and redefine end
    else if (this.state.endMode){
      let current = this.state.end;
      if (current !== null) {
      current.isBlank = true;
      current.isEnd = false;
      }
      node.isEnd = true;
      node.isBlank = false;
      this.setState({
        end: node
      });
    }
    // place wall with click
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
    // loop through nodes
    for (let r=0; r<40; ++r) {
      for (let c=0; c<80; ++c) {
        let current = this.state.table[r][c];
        // reset all paths
        current.path = [];
        // reset state of walls and paths
        if (!current.isStart && !current.isEnd) {
          current.isBlank = true;
          current.isWall = false;
          current.isPath = false;
        }
      }
    }
    this.setState({
      startMode: false,
      endMode: false,
      wallMode: false,
    });
  }

  // reset path used in solve function
  resetPath = () => {
    for (let r=0; r<40; ++r) {
      for (let c=0; c<80; ++c) {
        let current = this.state.table[r][c];
        current.path = [];
        if(current.isPath){
          current.isBlank=true;
          current.isPath=false;
        }
      }
    }
  }

  // draws path element
  drawPath = (path) => {
    if (path.isBlank){
      path.isPath= true;
      path.isBlank=false;
    }
    this.forceUpdate();
  }

  // handler for solve button
  solveHandler = () => {
    if (this.state.start === null || this.state.end === null){
      return null;
    }
    this.resetPath();
    this.bfsSolve();
    this.setState({
      startMode: false,
      endMode: false,
      wallMode: false,
    });
  }

  bfsSolve = () =>{
    // start at start node
    let current = this.state.start;
    // array of nodes to check for end
    let queue = [];
    // add start to queue
    queue.push(current);
    // array of nodes that are not end
    let visited = [];
    visited.push(current);
    // while there are still nodes to look at
    while (queue.length !== 0){
      // look at next node in queue
      current = queue.shift();
      // if end is found
      if (current.isEnd){
        let pathx = current.path;
        while (pathx.length !== 0){
          let pathNode = pathx.shift();
          this.drawPath(pathNode);
        }
        return null; // exit
      }
      /* 
       * Look at neighboring nodes if not out of bounds
       * Look up
       * Look down
       * Look left
       * Look right
       * If node has not been visited and is not a wall, add to queue
       * Update path to node
      */ 
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
      this.forceUpdate();
    }
    alert("No path available");
  }
}

export default App;