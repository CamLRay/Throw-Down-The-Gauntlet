import Koth from "./BracketControl/Koth";
import TournamentNav from "./TournamentNav";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase-config";
import { v4 } from "uuid";
import { Outlet } from "react-router-dom";


const TournamentControl = () =>{
  const [tournamentDetails, setTournamentDetails] = useState({});
  const [players, setPlayers] = useState([
    // {name:'Britany', persona:'Satsuki', totalCount: 0, history:[], id: v4()},
    // {name:'Zofia', persona: 'Misaki', totalCount: 0, history:[], id: v4()},
    // {name:'Ayub', persona: 'Simone', totalCount: 0, history:[], id: v4()},
    // {name:'Cory', persona: 'Fai', totalCount: 0, history:[], id: v4()},
    // {name:'Cora', persona: 'Sion', totalCount: 0, history:[], id: v4()},
    // {name:'Jed', persona: 'Dagon', totalCount: 0, history:[], id: v4()},
  ]);

  const params = useParams();
  const tourniesRef = doc(db, 'tournaments', params.tournyId)

  useEffect(()=>{
  const unsub = onSnapshot(tourniesRef, (doc) => {
  setTournamentDetails(doc.data())
  })
  return ()=> unsub();

  },[]);

  if(Object.keys(tournamentDetails).length){

    return(
      <>
      <TournamentNav details={tournamentDetails}/>
      <Outlet context={[tournamentDetails]}/>
      
      </>
    )
  } 
  else {
  return(  
    <div>
      Loading
    </div>
  ) 
  }
}

export default TournamentControl;