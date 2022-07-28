import React, { useState, useEffect, useRef } from 'react'
import Ring from '../Ring'
import ScoreBoard from '../ScoreBoard'
import { useParams } from 'react-router-dom'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { v4 } from 'uuid';

function Koth() {
const [counters, setCounters] = useState([])
const [rings, setRings] = useState([])
const [ringCount, setRingCount] = useState(1)
const [isPersona, setIsPersona] = useState(true);
const params = useParams();
const tournamentDoc = doc(db, 'tournaments', params.tournyId)



useEffect(()=>{
  const unsub = onSnapshot(tournamentDoc, (doc) => {
  setCounters(doc.data().players)
  })
  return ()=> unsub();

  },[]);

  useEffect(()=>{
    let tempRings = []
    for(let i=0; i < ringCount; i++){
      tempRings.push(i);
    }
    setRings(tempRings)

  },[ringCount])


const updatePlayer = async (player) => {
    const newField = {players: player}
    await updateDoc(tournamentDoc, newField);
}


const handleTotalCount = (counterToUpdate, lastCounter) =>{
  if(lastCounter){
    const tempCounter = counters.filter((counter)=> counter.id !== counterToUpdate.id).filter((counter)=> counter.id !== lastCounter.id);
    setCounters([...tempCounter, {...counterToUpdate}, {...lastCounter}])
    updatePlayer([...tempCounter, {...counterToUpdate}, {...lastCounter}]);
  }else {
    const tempCounter = counters.filter((counter)=> counter.id !== counterToUpdate.id);
    setCounters([...tempCounter, {...counterToUpdate}])
    updatePlayer([...tempCounter, {...counterToUpdate}]);
  }
  
}

const incrementRing = () => {
  setRingCount(prev=> prev +1)
  
}

const decrementRing = () => {
  if(ringCount > 1){
    setRingCount(prev=> prev - 1)
  }
}

if(counters.length < 1){
  return "No participants added"
} else {

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'
  }
  return (
    <>
      <div className="flex justify-center my-3">
        <button className='bg-neutral-500 p-1 rounded mt-2' onClick={()=>setIsPersona(!isPersona)}>{!isPersona ? "Display Persona" : "Display name"}</button>
        <div className='ml-5'>
          <h1>Ring Count</h1>
          <button onClick={()=>incrementRing()} className="bg-green-500 px-6">+</button>
          <button onClick={()=>decrementRing()} className="bg-red-500 px-7">-</button>
        </div>
      </div>
      <ScoreBoard counters={counters}/>
      <div style={gridStyle}>
      {rings.map((ring, index)=>{
        return <div key={index} className="m-2"><Ring number={index} persona={isPersona} counters={counters} onCounterClick={handleTotalCount}/></div>
      })}
      </div>
      
    </>
  )
}
}

export default Koth