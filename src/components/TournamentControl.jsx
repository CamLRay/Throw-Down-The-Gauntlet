import Koth from "./Koth";
import TournamentCreate from "./TournamentCreate";
import { useEffect, useState } from "react";


const TournamentControl = () =>{
  const [visibleComponent, setVisibleComponent] = useState(null);
  const [tournamentDetails, setTournamentDetails] = useState({});

  const handleTournamentCreation = (details) =>{
    setTournamentDetails(details);
    console.log(details);
  }
  
  if(visibleComponent == null){
    setVisibleComponent(<TournamentCreate onCreate={handleTournamentCreation}/>)
  }
  
  useEffect(()=>{
    if(tournamentDetails.style === 'koth'){
      setVisibleComponent(<Koth />)
    }
  },[tournamentDetails])

  return(
    <>
      
      {visibleComponent}
    </>
  ) 
}

export default TournamentControl;