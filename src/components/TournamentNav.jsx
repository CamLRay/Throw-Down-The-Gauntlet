import { Link } from "react-router-dom";
import { UserGroupIcon } from '@heroicons/react/solid'
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";


const TournamentNav = (props) =>{
  const { details } = props;
  const location = useLocation();
  const param = useParams();
  const [path, setPath] = useState(null)
  

  useEffect(()=>{
    if(location) {
      let tempPath = location.pathname.slice(location.pathname.lastIndexOf('/'), location.pathname.length);
      setPath(tempPath)
    }
  },[location])
  console.log(path)
  console.log(param)
  return (
    <>
    <div className="w-screen bg-slate-500 pl-2">
      <div className='text-white'>
        <h3 className="text-3xl font-bold">{details.name}</h3>
        <div className="flex">
          <UserGroupIcon className="h-5 text-amber-500 mr-1" />
          <p>{details.players} Players</p>
        </div>
        <p>{details.style.groups}</p>
        <div>
          <p>Tournament Organizer</p>
          <p>{details.toname}</p>
        </div>
      </div>
      <nav className="text-white flex justify-center">
      <Link to='' className={path === `/${param.tournyId}` ? "p-1 bg-slate-500 underline underline-offset-4 decoration-amber-500 decoration-4" : "p-1 bg-slate-500"}>Bracket</Link>
        <Link to='standings' className={ path ==='/standings' ? "p-1 bg-slate-500 underline underline-offset-4 decoration-amber-500 decoration-4" : "p-1 bg-slate-500"} >Standings</Link>
        <Link to='players' className={  path === '/players' ? "p-1 bg-slate-500 underline underline-offset-4 decoration-amber-500 decoration-4" : "p-1 bg-slate-500"} >Players</Link>
      </nav>
    </div>
    </>
  );

}

export default TournamentNav;