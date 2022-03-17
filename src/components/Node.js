import React from 'react'

const nodeStyle = {
    height: '1vw'
};

const Node = ({ element, handleClick, mousedown, mouseup, handleEnter }) => {

  let eleStyle;
  if (element.isBlank){
    eleStyle = 'bg-light border';
  }
  else if (element.isStart) {
    eleStyle = 'bg-success border'
  }
  else if (element.isEnd) {
    eleStyle = 'bg-danger border'
  }
  else if (element.isWall) {
    eleStyle = 'bg-dark border-dark'
  }
  else if (element.isPath) {
    eleStyle = 'bg-primary border-primary'
  }
  else if (element.isVisited) {
    eleStyle = 'bg-secondary border'
  }
  else if (element.isQueued) {
    eleStyle = 'bg-warning border'
  }

  return (
    <td
    className={ eleStyle }
    style={ nodeStyle }
    onClick={() => handleClick(element.row, element.col)}
    onMouseDown={ mousedown }
    onMouseEnter={() => handleEnter(element.row, element.col)}
    onMouseUp={ mouseup }
    draggable={false}
    >
    </td>
  )
}

export default Node