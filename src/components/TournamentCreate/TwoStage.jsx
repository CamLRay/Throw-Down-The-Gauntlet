import React from 'react'
import { useState } from 'react'

function TwoStage() {
  const [isCustom, setIsCustom] = useState(false)

  const handleSelect = (e) => {
    
    if(parseInt(e) === 1){
      setIsCustom(false);
    } else if(parseInt(e) === 2) {
      setIsCustom(true);
    }
  }
  return (
    <div>
      <select onChange={(e)=>handleSelect(e.target.value)}>
        <option value={1} >Warlord</option>
        <option value={2}>Custom</option>
      </select>
      {isCustom ? <>
      <h5>Group Stage</h5>
      <select>
        <option>King of the Hill</option>
        <option>Swiss</option>
        <option>Round Robin</option>
      </select>
      <h5>Finals</h5>
      <select>
        <option>Single Elimination</option>
        <option>Swiss</option>
        <option>Round Robin</option>
      </select></> : null }
  </div>
  )
}

export default TwoStage