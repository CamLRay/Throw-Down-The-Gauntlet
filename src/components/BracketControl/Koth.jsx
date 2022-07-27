import React from 'react'
import { useState } from 'react'
import Ring from '../Ring'
import ScoreBoard from '../ScoreBoard'
import { useOutletContext } from 'react-router-dom'

function Koth() {
const [tournamentDetails] = useOutletContext();
const [counters, setCounters] = useState(tournamentDetails.players)

const handleTotalCount = (counterToUpdate, lastCounter) =>{
  if(lastCounter){
    const tempCounter = counters.filter((counter)=> counter.id !== counterToUpdate.id).filter((counter)=> counter.id !== lastCounter.id);
    setCounters([...tempCounter, {...counterToUpdate}, {...lastCounter}])
  }else {
    const tempCounter = counters.filter((counter)=> counter.id !== counterToUpdate.id);
    setCounters([...tempCounter, {...counterToUpdate}])
  }
  
}


if(counters.length < 1){
  return "No participants added"
} else {

  return (
    <>
      <ScoreBoard counters={counters}/>
      <button>Add Ring</button>
      <button>Remove Ring</button>
      <Ring counters={counters} onCounterClick={handleTotalCount}/>
      
    </>
  )
}
}

export default Koth