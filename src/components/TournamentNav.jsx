import { Link } from "react-router-dom";
import { UserGroupIcon } from '@heroicons/react/solid'
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Timer from "./Timer/Timer";


const TournamentNav = (props) =>{
  const { details } = props;
  const location = useLocation();
  const param = useParams();
  const [path, setPath] = useState(null)
  const [timerVisible, setTimerVisible] = useState(true)
  

  useEffect(()=>{
    if(location) {
      let tempPath = location.pathname.slice(location.pathname.lastIndexOf('/'), location.pathname.length);
      setPath(tempPath)
    }
  },[location])
  
  return (
    <>
    <div className="w-screen bg-slate-700 p-2 pb-0">
      <div className="flex justify-between">
        <div className='text-white w-1/3'>
          <h3 className="text-3xl font-bold">{details.name}</h3>
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
        <div className="w-2/3 sm:w-1/3">{timerVisible ? <Timer time={details.length} /> : <button>Show timer</button>}</div>
        <div className="w-1/3 hidden sm:block" />
      </div>
      
      
      <nav className="text-white flex align-baseline justify-center">
      <Link to='' draggable="false" className={path === `/${param.tournyId}` ? "p-1 bg-slate-700 underline underline-offset-4 decoration-amber-500 decoration-4" : "p-1 bg-slate-700 hover:decoration-amber-500/50 hover:decoration-4 hover:underline hover:underline-offset-4"}>Bracket</Link>
        <Link to='standings' draggable="false" className={ path ==='/standings' ? "p-1 bg-slate-700 underline underline-offset-4 decoration-amber-500 decoration-4" : "p-1 bg-slate-700 hover:decoration-amber-500/50 hover:decoration-4 hover:underline hover:underline-offset-4"} >Standings</Link>
        <Link to='players' draggable="false" className={  path === '/players' ? "p-1 bg-slate-700 underline underline-offset-4 decoration-amber-500 decoration-4" : "p-1 bg-slate-700 hover:decoration-amber-500/50 hover:decoration-4 hover:underline hover:underline-offset-4"} >Players</Link>
      </nav>
    </div>
    </>
  );

}

export default TournamentNav;