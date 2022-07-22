import { getToggleButtonUtilityClass } from '@mui/material';
import { React, useState, useEffect, useRef } from 'react'

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [editing, setEditing] = useState(false);
  const [color, setColor] = useState('white');
  const timeRef = useRef(0)

  const toggle = () =>{
    setIsActive(!isActive);
  }

  const handleEditing = (bool) => {
    setEditing(bool);
    setIsActive(false);
  }

  const reset = () =>{
    setSeconds(timeRef.current);
    setIsActive(false);
  }

  useEffect(()=>{
    let interval = null;
    if(!editing && isActive && seconds > 0) {
      interval = setInterval(()=>{
        setSeconds(seconds => seconds-1);
      }, 1000);
    } else if (isActive && seconds < 1){
      clearInterval(interval);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  },[editing, isActive, seconds]);

  useEffect(()=>{
    if(parseInt(seconds) < 60){
      setColor('red');
    } else if (parseInt(seconds) < 300){
      setColor('yellow');
    } else if (parseInt(seconds) >= 300){
      setColor('white');
    }
  },[seconds])

  const clockStyle = {
    fontFamily: 'digital-7',
    src: "url('../assets/fonts/digital-7.ttf')",
    color: color,
    fontSize: '6rem'
  }


  const handleTime = (time) =>{
    setSeconds(time*60)
    timeRef.current = time*60;
  }

  
  
  return (
    <div className="app">
    <div style={clockStyle}>
      {editing ? <><input type='number' placeholder='Enter minutes...' autoFocus onChange={(e)=>handleTime(e.target.value)} /><button onClick={()=>handleEditing(false)}>Set</button></> : <div onClick={()=>handleEditing(true)}>{(Math.floor(seconds/60)/100).toFixed(2).slice(2)}:{((seconds%60)/100).toFixed(2).slice(2)}</div>} 
    </div>
    <div className="row">
      <button onClick={toggle}>
        {isActive ? 'Pause' : 'Start'}
      </button>
      <button className="button" onClick={reset}>
        Reset
      </button>
    </div>
  </div>
  )
}

export default Timer