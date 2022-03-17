import React from 'react'
import Node from './Node'

const Grid = ({ table, handleClick, handleEnter, mouseup, mousedown }) => {
  return (
    <div className='pb-5' onMouseDown={ mousedown } onMouseUp={ mouseup }>
    <table className='w-100'>
        <tbody>
        {table.map((row) => {
            return (
                <tr draggable={false} onMouseDown={ mousedown } onMouseUp={ mouseup } >
                {row.map((node) => {
                    return (
                        <Node
                        element={ node }
                        handleClick={ handleClick }
                        handleEnter={ handleEnter }
                        mouseup={ mouseup }
                        mousedown={ mousedown }
                        />
                    );
                })}
                </tr>
            );
        })}
        </tbody>
    </table>
    </div>
  )
}

export default Grid