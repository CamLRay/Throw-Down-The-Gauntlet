import React from 'react'
import { useState } from 'react'
import { v4 } from 'uuid'
import Ring from './Ring'
import ScoreBoard from './ScoreBoard'
import Timer from './Timer/Timer'
import AddPlayers from './AddPlayers'

function Koth(props) {
const [counters, setCounters] = useState(props.counters)

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
  return <AddPlayers />
} else {

  return (
    <>
      <Timer />
      <ScoreBoard counters={counters}/>
      <button>Add Ring</button>
      <button>Remove Ring</button>
      <Ring counters={counters} onCounterClick={handleTotalCount}/>
      <Ring counters={counters} onCounterClick={handleTotalCount}/>
    </>
  )
}
}

export default Koth