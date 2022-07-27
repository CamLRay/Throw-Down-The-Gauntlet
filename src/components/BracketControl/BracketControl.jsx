import React, { useState } from 'react'
import Koth from './Koth'
import { useOutletContext } from 'react-router-dom'


function BracketControl() {
  const [tournamentDetails] = useOutletContext();
  const [currentStage, setCurrentStage] = useState('groups')
  
  if(tournamentDetails.style[currentStage] === 'koth' || tournamentDetails.style[currentStage] === 'King of the Hill'){
  return (
    <Koth />
  )
}
}
export default BracketControl