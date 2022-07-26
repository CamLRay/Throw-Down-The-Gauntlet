import { Link } from "react-router-dom";
import { UserGroupIcon } from '@heroicons/react/solid'

const TournamentNav = (props) =>{
  const { details } = props;
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
        <Link to=''><button className="p-1 bg-slate-500">Bracket</button></Link>
        <Link to='standings'><button className="p-1 bg-slate-500">Standings</button></Link>
        <Link to='players'><button className="p-1 bg-slate-500">Players</button></Link>
      </nav>
    </div>
    </>
  );

}

export default TournamentNav;