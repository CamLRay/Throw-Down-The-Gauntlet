import { selectUnstyledClasses } from '@mui/base'
import React from 'react'

function SingleStage(props) {
const {setStyle} = props

  return (
    <div>
      <select onChange={(e)=> setStyle({groups: e.target.value, elim: null})} required>
        <option value="koth">King of the Hill</option>
        {/* <option>Single Elimination</option>
        <option>Double Elimination</option> */}
        {/* <option>Round Robin</option>
        <option>Swiss</option> */}
      </select>
    </div>
  )
}

export default SingleStage