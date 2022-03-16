import React from 'react'

const Toolbar = ({ startHandler, endHandler, wallHandler, resetHandler, solveHandler }) => {
  return (
    <div className='conatiner pb-5'>
        <div className='row px-5'>
            <button className='col btn-primary' onClick={startHandler}>Add Start Node</button>
            <button className='col btn-primary' onClick={endHandler}>Add End Node</button>
            <button className='col btn-primary' onClick={wallHandler}>Add Walls</button>
            <button className='col btn-primary' onClick={resetHandler}>Reset Grid</button>
            <button className='col btn-primary' onClick={solveHandler}>Solve</button>
        </div>
    </div>
  )
}

export default Toolbar