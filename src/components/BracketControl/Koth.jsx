import React, { useState, useEffect } from 'react'
import Ring from '../Ring'
import ScoreBoard from '../ScoreBoard'
import { useOutletContext, useParams } from 'react-router-dom'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';

function Koth() {
const [tournamentDetails] = useOutletContext();
const [counters, setCounters] = useState([])
const params = useParams();
const tournamentDoc = doc(db, 'tournaments', params.tournyId)


useEffect(()=>{
  const unsub = onSnapshot(tournamentDoc, (doc) => {
  setCounters(doc.data().players)
  })
  return ()=> unsub();

  },[]);


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