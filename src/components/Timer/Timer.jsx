import { React, useState, useEffect, useRef } from 'react'
import { ChevronDownIcon, ChevronUpIcon, PlayIcon, PauseIcon, RefreshIcon  } from '@heroicons/react/solid';


function Timer(props) {
  const time = props.time * 60;
  const [seconds, setSeconds] = useState(time);
  const [isActive, setIsActive] = useState(false);
  const [editing, setEditing] = useState(false);
  const [color, setColor] = useState('white');
  const timeRef = useRef(time)

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
      setColor('text-red-600');
    } else if (parseInt(seconds) < 300){
      setColor('text-orange-500');
    } else if (parseInt(seconds) >= 300){
      setColor('text-amber-400');
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
  
  return (
    <div className="font-['digital-7']">
    
      {editing ? <div className='flex justify-center'>
        <div className={`text-8xl inline-grid grid-cols-5 ${color}`}>
        <div className="text-7xl hover:text-amber-800" onClick={()=>handleTime("INCREMENT_TENMINUTES")}><ChevronUpIcon /></div>
        <div className="text-7xl hover:text-amber-800" onClick={()=>handleTime("INCREMENT_MINUTES")}><ChevronUpIcon /></div>
        <div></div>
        <div className="text-7xl hover:text-amber-800" onClick={()=>handleTime("INCREMENT_TENSECONDS")}><ChevronUpIcon /></div>
        <div className="text-7xl hover:text-amber-800" onClick={()=>handleTime("INCREMENT_SECONDS")}><ChevronUpIcon /></div>
        <div onClick={()=>handleEditing(false)}>{(Math.floor(seconds/60)/100).toFixed(2).slice(2,3)}</div>
        <div onClick={()=>handleEditing(false)}>{(Math.floor(seconds/60)/100).toFixed(2).slice(3)}</div>
        <div onClick={()=>handleEditing(false)}>:</div>
        <div onClick={()=>handleEditing(false)}>{((seconds%60)/100).toFixed(2).slice(2,3)}</div>
        <div onClick={()=>handleEditing(false)}>{((seconds%60)/100).toFixed(2).slice(3)}</div>
        <div className="text-7xl hover:text-amber-800" onClick={()=>handleTime("DECREMENT_TENMINUTES")}><ChevronDownIcon /></div>
        <div className="text-7xl hover:text-amber-800" onClick={()=>handleTime("DECREMENT_MINUTES")}><ChevronDownIcon /></div>
        <div></div>
        <div className="text-7xl hover:text-amber-800" onClick={()=>handleTime("DECREMENT_TENSECONDS")}><ChevronDownIcon /></div>
        <div className="text-7xl hover:text-amber-800" onClick={()=>handleTime("DECREMENT_SECONDS")}><ChevronDownIcon /></div>
        </div></div> 
        : <div onClick={()=>handleEditing(true)} className={`flex justify-center text-8xl ${color}`}>
          {(Math.floor(seconds/60)/100).toFixed(2).slice(2)}:{((seconds%60)/100).toFixed(2).slice(2)}
          </div>
      } 
    
    <div className="mt-0">
    {editing ? null : 
      <div className='flex justify-center'>
        {isActive ? <PauseIcon className='text-amber-500 hover:text-green-500 h-12' onClick={toggle} /> : <PlayIcon className="text-green-500 hover:text-amber-500 h-12" onClick={toggle}/>} 
        <RefreshIcon className='text-red-700 hover:text-red-900 h-12' onClick={reset}/>
      </div>
    }
    </div> 
    
  </div>
  )
}

export default Timer