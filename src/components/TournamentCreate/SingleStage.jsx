import React from 'react'
import { PropTypes } from 'prop-types';

function SingleStage(props) {
  const {handleSetStyle} = props


  return (
    <div className="flex justify-start p-2">
      <h1 className='mr-5'>Format</h1>
      <select className='bg-gray-600' onChange={(e)=>handleSetStyle({groups: e.target.value, elim: null})} required>
        <option></option>
        <option value="King of the Hill">King of the Hill</option>
        <option value="Single Elim" disabled>Single Elimination - Coming soon...</option>
        <option value="Double Elim" disabled>Double Elimination - Coming soon...</option>
        <option value="Round Robin" disabled>Round Robin - Coming soon...</option>
        <option value="Swiss" disabled>Swiss - Coming soon...</option>
      </select>
    </div>
  )
}

SingleStage.propTypes = {
  handleSetStyle: PropTypes.func
}
export default SingleStage