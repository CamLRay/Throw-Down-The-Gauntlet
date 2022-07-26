import Koth from "./Koth";
import TournamentNav from "./TournamentNav";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase-config";


const TournamentControl = () =>{
  const [visibleComponent, setVisibleComponent] = useState(null);
  const [tournamentDetails, setTournamentDetails] = useState({});
  const params = useParams();
  const tourniesRef = doc(db, 'tournaments', params.tournyId)
  useEffect(()=>{
 const unsub = onSnapshot(tourniesRef, (doc) => {
  setTournamentDetails(doc.data())
 })
  return ()=> unsub();
 
  },[]);
  // const tournament = getDoc(tourniesRef )
  // .then( (promise) => {
  //   (setTournamentDetails(promise.data()))
  // })
  if(Object.keys(tournamentDetails).length){
  console.log(tournamentDetails)
 
  // const handleTournamentCreation = (details) =>{
  //   setTournamentDetails(details);
  //   console.log(details);
  // }

  if(tournamentDetails.style.groups === 'koth'){
    return(
    <Koth 
      />
    )
  } 
  else {
  return(
    <>
      <TournamentNav style={tournamentDetails}/>
      
    </>
  ) 
  }
}
}
export default TournamentControl;