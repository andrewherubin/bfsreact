import React from 'react'

const Toolbar = ({ startHandler, endHandler, wallHandler, resetHandler, solveHandler, mousedown, mouseup }) => {
  return (
    <div className='conatiner pb-5' onMouseDown={mousedown} onMouseUp={mouseup}>
        <div className='row px-5'>
            <button 
            className='col btn-primary'
            onClick={startHandler}
            title="Places a green start node on the grid"
            >Add Start Node</button>
            <button 
            className='col btn-primary'
            onClick={endHandler}
            title="Places a red end node on the grid"
            >Add End Node</button>
            <button 
            className='col btn-primary' 
            onClick={wallHandler}
            title="Drag accross grid to draw walls"
            >Add Walls</button>
            <button 
            className='col btn-primary' 
            onClick={resetHandler}
            title="Resets all wall nodes"
            >Reset Grid</button>
            <button 
            className='col btn-primary' 
            onClick={solveHandler}
            title="Connects the start node and end node"
            >Solve</button>
        </div>
    </div>
  )
}

export default Toolbar