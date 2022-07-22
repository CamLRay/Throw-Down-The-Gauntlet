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

  const digitStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content'
  }


  // const handleTime = (time) =>{
  //   setSeconds(time*60)
  //   timeRef.current = time*60;
  // }

  const handleTime = (digit) => {
    switch(digit){
      case 'INCREMENT_SECONDS':
        return setSeconds(seconds => seconds+1);
      case 'DECREMENT_SECONDS':
        return setSeconds(seconds => seconds-1);
      case 'INCREMENT_TENSECONDS':
        return setSeconds(seconds => seconds+10);
      case 'DECREMENT_TENSECONDS':
        return setSeconds(seconds => seconds-10);
      case 'INCREMENT_MINUTES':
        return setSeconds(seconds => seconds+60);
      case 'DECREMENT_MINUTES':
        return setSeconds(seconds => seconds-60);
      case 'INCREMENT_TENMINUTES':
        return setSeconds(seconds => seconds+600);
      case 'DECREMENT_TENMINUTES':
        return setSeconds(seconds => seconds-600);
      default:
        return;
    }
  }

  // <><input type='number' placeholder='Enter minutes...' autoFocus onChange={(e)=>handleTime(e.target.value)} /><button onClick={()=>handleEditing(false)}>Set</button></> : <div onClick={()=>handleEditing(true)}>{(Math.floor(seconds/60)/100).toFixed(2).slice(2)}:{((seconds%60)/100).toFixed(2).slice(2)}</div>}
  
  return (
    <div className="app">
    <div style={clockStyle}>
      {editing ? <><button onClick={()=>handleTime("INCREMENT_TENMINUTES")}>&and;</button> <button onClick={()=>handleTime("INCREMENT_MINUTES")}>&and;</button> <button onClick={()=>handleTime("INCREMENT_TENSECONDS")}>&and;</button> <button onClick={()=>handleTime("INCREMENT_SECONDS")}>&and;</button></> : null}
      {editing ? 
      <div onClick={()=>handleEditing(false)}>
        {(Math.floor(seconds/60)/100).toFixed(2).slice(2,3)}{(Math.floor(seconds/60)/100).toFixed(2).slice(3)}:{((seconds%60)/100).toFixed(2).slice(2,3)}{((seconds%60)/100).toFixed(2).slice(3)}</div> : <div onClick={()=>handleEditing(true)}>{(Math.floor(seconds/60)/100).toFixed(2).slice(2)}:{((seconds%60)/100).toFixed(2).slice(2)}</div>} 
        {editing ? <><button onClick={()=>handleTime("DECREMENT_TENMINUTES")}>&or;</button> <button onClick={()=>handleTime("DECREMENT_MINUTES")}>&or;</button> <button onClick={()=>handleTime("DECREMENT_TENSECONDS")}>&or;</button> <button onClick={()=>handleTime("DECREMENT_SECONDS")}>&or;</button></> : null}
    </div>
    {editing ? null : <div className="row">
      <button onClick={toggle}>
        {isActive ? 'Pause' : 'Start'}
      </button>
      <button className="button" onClick={reset}>
        Reset
      </button>
    </div> }
    
  </div>
  )
}

export default Timer