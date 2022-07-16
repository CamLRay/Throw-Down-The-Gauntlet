import { useEffect, useState } from "react";
import Ring from "./Ring";
import { v4 } from "uuid";

const Koth = (props) =>{
  const [ringCount, setRingCount] = useState(null);
  const [ringList, setRingList] = useState([]);
  const { players, onPlayerWin, onPlayerStreakEnd } = props;

  const handleRingCount = (count) => {
    let ringArray=[];
    for(let i=1; i<=count; i++){
      ringArray.push(i);
    }
    setRingList(ringArray)
  };

  useEffect(()=>{
    handleRingCount(ringCount)
  },[ringCount])

  return (
    <>
      <p>Number of Rings</p>
      <input type='number' max='10' placeholder="How many rings?" onChange={(e)=> setRingCount(e.target.value)}/>
      {ringList.map((ring)=>{
        return <Ring key={v4()} players={players} ringNum={ring} onPlayerWin={onPlayerWin} onPlayerStreakEnd={onPlayerStreakEnd}/>
      })}
      
    </>
  );
}

export default Koth;