import Koth from "./Koth";
import TournamentCreate from "./TournamentCreate";
import TournamentNav from "./TournamentNav";
import { useEffect, useState } from "react";


const TournamentControl = () =>{
  const [visibleComponent, setVisibleComponent] = useState(null);
  const [tournamentDetails, setTournamentDetails] = useState({});
  const [players, setPlayers] = useState([]);

// useEffect for predatabase development purpose
  useEffect(()=>{
    setPlayers([
      {name:'Britany'},
      {name:'Zofia'},
      {name:'Ayub'},
      {name:'Cory'},
      {name:'Cora'},
      {name:'Jed'},
      {name:'Kason'},
      {name:'Britany'},
      {name:'Britany'},
      {name:'Britany'},
      {name:'Britany'},
      {name:'Britany'},
      {name:'Britany'},
      {name:'Britany'},
      {name:'Britany'},
      {name:'Britany'},
      {name:'Britany'},
      {name:'Britany'},
      {name:'Britany'},
      {name:'Britany'},
    ])
  },[])


  const handleTournamentCreation = (details) =>{
    setTournamentDetails(details);
    console.log(details);
  }
  
  if(visibleComponent == null){
    setVisibleComponent(<TournamentCreate onCreate={handleTournamentCreation}/>)
  } 

  useEffect(()=>{
    if(tournamentDetails.style === 'koth'){
      setVisibleComponent(<Koth  />)
    }
  },[tournamentDetails])

  return(
    <>
      <TournamentNav style={tournamentDetails} players={players}/>
      {visibleComponent}
    </>
  ) 
}

export default TournamentControl;