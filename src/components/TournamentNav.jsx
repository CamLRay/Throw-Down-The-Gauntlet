import { Link } from "react-router-dom";

const TournamentNav = (props) =>{
  const { details } = props;
  return (
    <>
    <div className="w-screen bg-slate-500">
      <div className='flex-col justify-start'>
        <h2>{details.name}</h2>
        <div>{details.players} Players</div>
        <div>{details.style.groups}</div>
        <div>
          <p>Tournament Organizer</p>
          <p>{details.toname}</p>
        </div>
      </div>
      <nav className="text-white">
        <Link to=''><button className="p-1 bg-slate-500">Bracket</button></Link>
        <Link to='standings'><button className="p-1 bg-slate-500">Standings</button></Link>
        <Link to='players'><button className="p-1 bg-slate-500">Players</button></Link>
      </nav>
    </div>
    </>
  );

}

export default TournamentNav;