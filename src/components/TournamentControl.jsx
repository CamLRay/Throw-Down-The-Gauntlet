import Koth from "./Koth";
import TournamentCreate from "./TournamentCreate/TournamentCreate";
import TournamentNav from "./TournamentNav";
import { useState } from "react";
import { useParams } from "react-router-dom";


const TournamentControl = () =>{
  const [visibleComponent, setVisibleComponent] = useState(null);
  const [tournamentDetails, setTournamentDetails] = useState({style:'koth'});

  const params = useParams();


  const handleTournamentCreation = (details) =>{
    setTournamentDetails(details);
    console.log(details);
  }

  if(visibleComponent == null){
    setVisibleComponent(<TournamentCreate onCreate={handleTournamentCreation}/>)
  } 


  if(tournamentDetails.style === 'koth'){
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

export default TournamentControl;