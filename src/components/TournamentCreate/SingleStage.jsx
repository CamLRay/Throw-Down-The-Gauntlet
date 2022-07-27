import React from 'react'

function SingleStage(props) {
const {setStyle} = props

  return (
    <div className="flex justify-between p-2">
      <h1 className='w-1/3'>Format</h1>
      <select className='w-2/3 bg-gray-600' onChange={(e)=>setStyle({groups: e.target.value, elim: null})} required>
        <option value="koth">King of the Hill</option>
        {/* <option>Single Elimination</option>
        <option>Double Elimination</option> */}
        <option>Round Robin</option>
        <option>Swiss</option>
      </select>
    </div>
  )
}

export default SingleStage