import React from 'react'
import Node from './Node'

const Grid = ({ table }) => {
  return (
    <div className='pb-5'>
    <table className='w-100'>
        {table.map((row) => {
            return (
                <tr>
                {row.map((node) => {
                    return (
                        <Node />
                    );
                })}
                </tr>
            );
        })}
    
    </table>
    </div>
  )
}

export default Grid