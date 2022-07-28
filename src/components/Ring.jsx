import {React, useState, useReducer} from 'react'
import { v4 } from 'uuid';

function Ring(props) {
  const {number, counters, onCounterClick} = props;
  const [lastClicked, setlastClicked] = useState({});
  const [streak, setStreak] = useState(0);

  // const [state, dispatch] = useReducer({streak: 0, lastClicked: {}})

  const handleClick = (clickedCounter) =>{
    if(lastClicked.id !== clickedCounter.id){
      if(Object.keys(lastClicked).length > 0){
        onCounterClick({...clickedCounter, totalCount: clickedCounter.totalCount + 1},{...lastClicked, history:[...lastClicked.history, streak]})
        setlastClicked({...clickedCounter, totalCount: clickedCounter.totalCount + 1})
        
        setStreak(1);
      }else {
      onCounterClick({...clickedCounter, totalCount: clickedCounter.totalCount + 1})
      setlastClicked({...clickedCounter, totalCount: clickedCounter.totalCount + 1})
      setStreak(1);
    }
    }else{
      setlastClicked({...clickedCounter, totalCount: lastClicked.totalCount + 1})
      setStreak(prevStreak => prevStreak + 1)
      onCounterClick({...clickedCounter, totalCount: lastClicked.totalCount + 1})
    }
    
  }

  return (
    <>
    <div className='bg-neutral-600 p-3'>
      <h1 className='text-xl font-bold'>Ring {number + 1}</h1>
      <div>{lastClicked.name}{streak > 0 ? - streak : "King"}</div>
        {counters.sort((a, b)=>(a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)).map((counter)=>{
          return <button key={v4()} onClick={()=>handleClick(counter)} className="bg-amber-600 p-1 px-2 m-1 rounded">{props.persona ? counter.persona : counter.name}</button>
        })}

    </div>
    </>
  )
}

export default Ring