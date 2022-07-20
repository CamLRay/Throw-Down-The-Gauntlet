import {React, useState} from 'react'



function Ring(props) {
  const {counters, onCounterClick} = props;
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
    <div>{lastClicked.name}-{streak}</div>
      {counters.sort((a, b)=>(a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)).map((counter)=>{
        return <button key={counter.id} onClick={()=>handleClick(counter)}>{counter.name}</button>
      })}
    </>
  )
}

export default Ring