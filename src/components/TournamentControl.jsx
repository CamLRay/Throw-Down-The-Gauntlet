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
  const [players, setPlayers] = useState([]);

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