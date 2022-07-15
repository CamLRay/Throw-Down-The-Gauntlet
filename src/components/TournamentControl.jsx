import Koth from "./Koth";
import TournamentCreate from "./TournamentCreate";
import { useState } from "react";


const TournamentControl = () =>{
  const [visibleComponent, setVisibleComponent] = useState(null);

  const handleTournamentCreation = () =>{

  }
  
  if(visibleComponent == null){
    setVisibleComponent(<TournamentCreate onCreate={handleTournamentCreation}/>)
  }

  return(
    {visibleComponent}
  ) 
}

export default TournamentControl;