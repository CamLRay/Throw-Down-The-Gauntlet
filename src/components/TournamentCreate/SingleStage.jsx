import React from 'react'

function SingleStage(props) {
const {setStyle} = props

  return (
    <div className="flex justify-between p-2">
      <h1 className='w-1/4'>Format</h1>
      <select className='w-2/4 bg-gray-600' onChange={(e)=>setStyle({groups: e.target.value, elim: null})} required>
        <option value="King of the Hill">King of the Hill</option>
        <option value="Single Elim" disabled>Single Elimination <span className='italic'>- Coming Soon...</span></option>
        <option value="Double Elim" disabled>Double Elimination <span className='italic'>- Coming Soon...</span></option>
        <option value="Round Robin" disabled>Round Robin <span className='italic'>- Coming Soon...</span></option>
        <option value="Swiss" disabled>Swiss <span className='italic'>- Coming Soon...</span></option>
      </select>
    </div>
  )
}

export default SingleStage