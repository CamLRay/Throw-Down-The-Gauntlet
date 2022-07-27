import './Timer.css'
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

  const handleTime = (digit) => {
    switch(digit){
      case 'INCREMENT_SECONDS':
        if(seconds < 5999){
          setSeconds(seconds => seconds+1)
          timeRef.current++;
        }
        break;
      case 'DECREMENT_SECONDS':
        if(seconds > 0){
        setSeconds(seconds => seconds-1);
        timeRef.current--;
        }
        break;
      case 'INCREMENT_TENSECONDS':
        if(seconds < 5989){
        setSeconds(seconds => seconds+10);
        timeRef.current += 10;
        }
        break;
      case 'DECREMENT_TENSECONDS':
        if(seconds > 9){
        setSeconds(seconds => seconds-10);
        timeRef.current -= 10;
        }
        break;
      case 'INCREMENT_MINUTES':
        if(seconds < 5939){
        setSeconds(seconds => seconds+60);
        timeRef.current += 60;
        }
        break;
      case 'DECREMENT_MINUTES':
        if(seconds > 59){
        setSeconds(seconds => seconds-60);
        timeRef.current -= 60;
        }
        break;
      case 'INCREMENT_TENMINUTES':
        if(seconds < 5400){
        setSeconds(seconds => seconds+600);
        timeRef.current += 600;
        }
        break;
      case 'DECREMENT_TENMINUTES':
        if(seconds > 599){
        setSeconds(seconds => seconds-600);
        timeRef.current -= 600;
        }
        break;
      default:
        return;
    }
  }

  const clockStyle = {
    display: 'inline-grid',
    gridTemplateColumns: 'auto auto auto auto auto',
    fontFamily: 'digital-7',
    src: "url('../assets/fonts/digital-7.ttf')",
    color: color,
    fontSize: '6rem',
    margin: '0px'
  }

  const digitStyle = {
    fontSize:'3rem'
    
  }

  // <><input type='number' placeholder='Enter minutes...' autoFocus onChange={(e)=>handleTime(e.target.value)} /><button onClick={()=>handleEditing(false)}>Set</button></> : <div onClick={()=>handleEditing(true)}>{(Math.floor(seconds/60)/100).toFixed(2).slice(2)}:{((seconds%60)/100).toFixed(2).slice(2)}</div>}
  
  return (
    <div>
    <div style={clockStyle}>
      {editing ? <>
        <div style={digitStyle} className="clock-button" onClick={()=>handleTime("INCREMENT_TENMINUTES")}>&and;</div>
        <div style={digitStyle} className="clock-button" onClick={()=>handleTime("INCREMENT_MINUTES")}>&and;</div>
        <div> </div>
        <div style={digitStyle} className="clock-button" onClick={()=>handleTime("INCREMENT_TENSECONDS")}>&and;</div>
        <div style={digitStyle} className="clock-button" onClick={()=>handleTime("INCREMENT_SECONDS")}>&and;</div>
        <div onClick={()=>handleEditing(false)}>{(Math.floor(seconds/60)/100).toFixed(2).slice(2,3)}</div>
        <div onClick={()=>handleEditing(false)}>{(Math.floor(seconds/60)/100).toFixed(2).slice(3)}</div>
        <div onClick={()=>handleEditing(false)}>:</div>
        <div onClick={()=>handleEditing(false)}>{((seconds%60)/100).toFixed(2).slice(2,3)}</div>
        <div onClick={()=>handleEditing(false)}>{((seconds%60)/100).toFixed(2).slice(3)}</div>
        <div style={digitStyle} className="clock-button" onClick={()=>handleTime("DECREMENT_TENMINUTES")}>&or;</div>
        <div style={digitStyle} className="clock-button" onClick={()=>handleTime("DECREMENT_MINUTES")}>&or;</div>
        <div> </div>
        <div style={digitStyle} className="clock-button" onClick={()=>handleTime("DECREMENT_TENSECONDS")}>&or;</div>
        <div style={digitStyle} className="clock-button" onClick={()=>handleTime("DECREMENT_SECONDS")}>&or;</div>
        </> : <div onClick={()=>handleEditing(true)}>{(Math.floor(seconds/60)/100).toFixed(2).slice(2)}:{((seconds%60)/100).toFixed(2).slice(2)}
      </div>} 

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