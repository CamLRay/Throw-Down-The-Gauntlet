import React from 'react'
import { useState } from 'react'
import { v4 } from 'uuid'
import Ring from './Ring'
import ScoreBoard from './ScoreBoard'

function Koth() {
const [counters, setCounters] = useState([
      {name:'Britany', persona:'Satsuki', totalCount: 0, history:[], id: v4()},
      {name:'Zofia', persona: 'Misaki', totalCount: 0, history:[], id: v4()},
      {name:'Ayub', persona: 'Simone', totalCount: 0, history:[], id: v4()},
      {name:'Cory', persona: 'Fai', totalCount: 0, history:[], id: v4()},
      {name:'Cora', persona: 'Sion', totalCount: 0, history:[], id: v4()},
      {name:'Jed', persona: 'Dagon', totalCount: 0, history:[], id: v4()},
    ])

const handleTotalCount = (counterToUpdate, lastCounter) =>{
  if(lastCounter){
    const tempCounter = counters.filter((counter)=> counter.id !== counterToUpdate.id).filter((counter)=> counter.id !== lastCounter.id);
    setCounters([...tempCounter, {...counterToUpdate}, {...lastCounter}])
    console.log(counters)
  }else {
    const tempCounter = counters.filter((counter)=> counter.id !== counterToUpdate.id);
    setCounters([...tempCounter, {...counterToUpdate}])
  }
  
}

  return (
    <>
      {/* {counters.sort((a, b)=>(a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)).map((counter)=>{
        return <div key={counter.id}>name: {counter.name} - total: {counter.totalCount} - history:[{counter.history.map((streak)=>{return streak + ', '})}]</div>})}  */}
      <ScoreBoard counters={counters}/>
      <Ring counters={counters} onCounterClick={handleTotalCount}/>
      <Ring counters={counters} onCounterClick={handleTotalCount}/>
    </>
  )
}

export default Koth