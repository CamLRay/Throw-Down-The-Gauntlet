import React, { useState } from 'react'
import Koth from './Koth'
import { useOutletContext } from 'react-router-dom'
import { v4 } from 'uuid';


function BracketControl() {
  const [tournamentDetails] = useOutletContext();
  const [currentStage, setCurrentStage] = useState('groups')
  const [round, setRound] = useState("")
  
  if(tournamentDetails.style[currentStage] === 'koth' || tournamentDetails.style[currentStage] === 'King of the Hill'){
  return (
    <>
    <div className='text-center text-white'>
      {tournamentDetails.categories.map((category)=> {
        return(
          <button key={v4()} className="p-1" onClick={()=>setRound(category)}>{category}</button>
        )
      })}
    </div>
    <div className='text-center text-white'>
    {tournamentDetails.categories.map((category)=> {
        return(
        <div key={v4()}>
          {round === category ? <Koth /> : null}
        </div>
        )
      })}
      {round ? null : "No Category Selected"}
      </div>

    </>
  )
}
}
export default BracketControl