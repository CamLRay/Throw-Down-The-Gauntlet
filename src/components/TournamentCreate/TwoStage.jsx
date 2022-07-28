import React from 'react'
import { useState } from 'react'

function TwoStage() {
  const [isCustom, setIsCustom] = useState(false)

  const handleSelect = (e) => {
    
    if(parseInt(e) !== 1){
      setIsCustom(true);
    } else {
      setIsCustom(false);
      console.log("custom false")
    }
  }
  return (
    <>
    <div className="flex justify-start p-2">
      <h1 className="mr-5">Format</h1>
      <select className=' bg-gray-600' onChange={(e)=>handleSelect(e.target.value)}>
        <option value={0}></option>
        <option value={1} disabled>Warlord - Coming soon...</option>
        <option value={2}>Custom - Coming soon...</option>
      </select>
    </div>
      {isCustom ? <><div className="flex flex-col p-2">
      <h5 className="w-1/3">Group Stage</h5>
      <select className='w-2/4 bg-gray-600'>
        <option>King of the Hill</option>
        <option disabled>Swiss</option>
        <option disabled>Round Robin</option>
      </select>
      </div>
      <div className="flex flex-col p-2">
      <h5 className="w-1/3">Finals</h5>
      <select className='w-2/4 bg-gray-600' required>
        <option disabled>Single Elimination</option>
        <option disabled>Swiss</option>
        <option disabled>Round Robin</option>
      </select></div></> : null }
    </>
  )
}

export default TwoStage