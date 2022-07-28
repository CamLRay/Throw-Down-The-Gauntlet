import { Link } from "react-router-dom";
import { UserGroupIcon } from '@heroicons/react/solid'
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Timer from "./Timer/Timer";
import { db } from "../firebase-config";
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';



const TournamentNav = (props) =>{
  const { details } = props;
  const location = useLocation();
  const params = useParams();
  const [path, setPath] = useState(null)
  // const [timerVisible, setTimerVisible] = useState(true)
  const [isStarted, setIsStarted] = useState(false)
  const [status, setStatus] = useState(null)
  const tournamentDoc = doc(db, 'tournaments', params.tournyId)
  

  useEffect(()=>{
    if(location) {
      let tempPath = location.pathname.slice(location.pathname.lastIndexOf('/'), location.pathname.length);
      setPath(tempPath)
    }
  },[location])

  useEffect(()=>{
  if(details.status === 'pending'){
    setStatus(<button className="bg-green-700 text-white w-1/2 h-1/2 rounded" onClick={()=>handleStart()}>Start</button>)
    console.log('pending')
  } else if (details.status === 'inProgress') {
    setStatus(<button className="bg-red-700 text-white w-1/2 h-1/2 rounded" onClick={()=>handleEnd()}>end</button>)
  } else if(details.status === 'complete') {
    setStatus(null)
  }
},[details])

  const handleStart = async() => {
    console.log("started")
    const newField = {status: 'inProgress'}
    await updateDoc(tournamentDoc, newField);
  }

  const handleEnd = async() => {
    const newField = {status: 'complete'}
    await updateDoc(tournamentDoc, newField);
  }
  
  return (
    <>
    <div className="w-screen bg-slate-700 p-2 pb-0">
      <div className="flex justify-between">
        <div className='text-white w-1/3'>
          <h3 className=" sm:text-sm md:text-3xl font-bold">{details.name}</h3>
          <div className="flex">
            <UserGroupIcon className="h-5 text-amber-500 mr-1" />
            <p>{details.players.length} Players</p>
          </div>
          <p>{details.style.groups}{details.style.elim ? ` - ${details.style.elim}` : null}</p>
          <div>
            <p>Tournament Organizer</p>
            <p className="text-3xl font-bold text-amber-600">{details.toname}</p>
          </div>
        </div>
        <div className="w-2/3 sm:w-1/3">
          {/* {timerVisible ?  */}
          <Timer time={details.length} /> 
          {/* : <button>Show timer</button>} */}
          </div>
        <section className="w-1/3 hidden sm:block text-center" >
          {status}
        </section>
        <section className="w-1/3 md:hidden text-center" >
        {/* { details.status === "inProgress" ? <button className="bg-red-700 text-white w-1/2 h-1/2 rounded" onClick={()=>handleEnd()}>end</button>
        :
          <button className="bg-green-700 text-white w-1/2 h-1/2 rounded" onClick={()=>handleStart()}>Start</button>
        } */}
        {status}
        </section>
      </div>
      
      
      <nav className="text-white flex align-baseline justify-center">
        <Link to='' draggable="false" className={path === `/${params.tournyId}` ? "p-1 mx-3 bg-slate-700 underline underline-offset-4 decoration-amber-500 decoration-4" : "p-1 mx-3 bg-slate-700 hover:decoration-amber-500/50 hover:decoration-4 hover:underline hover:underline-offset-4"}>Bracket</Link>
        <Link to='players' draggable="false" className={  path === '/players' ? "p-1 mx-3 bg-slate-700 underline underline-offset-4 decoration-amber-500 decoration-4" : "p-1 mx-3 bg-slate-700 hover:decoration-amber-500/50 hover:decoration-4 hover:underline hover:underline-offset-4"} >Players</Link>
        <Link to='standings' draggable="false" className={ path ==='/standings' ? "p-1 mx-3 bg-slate-700 underline underline-offset-4 decoration-amber-500 decoration-4" : "p-1 mx-3 bg-slate-700 hover:decoration-amber-500/50 hover:decoration-4 hover:underline hover:underline-offset-4"} >Standings</Link>
      </nav>
    </div>
    </>
  );

}

export default TournamentNav;