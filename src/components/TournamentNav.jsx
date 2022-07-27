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
        <div className='text-white'>
          <h3 className="text-3xl font-bold">{details.name}</h3>
          <div className="flex">
            <UserGroupIcon className="h-5 text-amber-500 mr-1" />
            <p>{details.players.length} Players</p>
          </div>
          <p>{details.style.groups}</p>
          <div>
            <p>Tournament Organizer</p>
            <p>{details.toname}</p>
          </div>
        </div>
        <div className="text-center">{timerVisible ? <Timer time={details.length} /> : <button>Show timer</button>}</div>
        <div className="w-40"></div>
      </div>
      
      
      <nav className="text-white flex align-baseline justify-center">
      <Link to='' className={path === `/${param.tournyId}` ? "p-1 bg-slate-700 underline underline-offset-4 decoration-amber-500 decoration-4" : "p-1 bg-slate-700 hover:decoration-amber-500/50 hover:decoration-4 hover:underline hover:underline-offset-4"}>Bracket</Link>
        <Link to='standings' className={ path ==='/standings' ? "p-1 bg-slate-700 underline underline-offset-4 decoration-amber-500 decoration-4" : "p-1 bg-slate-700 hover:decoration-amber-500/50 hover:decoration-4 hover:underline hover:underline-offset-4"} >Standings</Link>
        <Link to='players' className={  path === '/players' ? "p-1 bg-slate-700 underline underline-offset-4 decoration-amber-500 decoration-4" : "p-1 bg-slate-700 hover:decoration-amber-500/50 hover:decoration-4 hover:underline hover:underline-offset-4"} >Players</Link>
      </nav>
    </div>
    </>
  );

}

export default TournamentNav;