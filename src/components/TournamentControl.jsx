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
      {name:'Britany', persona:'Satsuki', wins: 0},
      {name:'Zofia', persona: 'Misaki', wins: 0},
      {name:'Ayub', persona: 'Simone', wins: 0},
      {name:'Cory', persona: 'Fai', wins: 0},
      {name:'Cora', persona: 'Sion', wins: 0},
      {name:'Jed', persona: 'Dagon', wins: 0},
      {name:'Kason', persona: 'Devry', wins: 0},
      {name:'Marie', persona: 'Magpie', wins: 0},
      {name:'Syeda', persona: 'Stella', wins: 0},
      {name:'Simrah', persona: 'Ruki', wins: 0},
      {name:'Ella-May', persona: 'Siobhan', wins: 0},
      {name:'Renae', persona: 'Mayaganta', wins: 0},
      {name:'Adyan', persona:'Hammasgallagher', wins: 0},
      {name:'Shane', persona: 'Burnaug', wins: 0},
      {name:'Chaya', persona: 'Horselillie', wins: 0},
      {name:'Eliot', persona: 'Burhat', wins: 0},
      {name:'Delores', pesona: 'Gwydlillie', wins: 0},
      {name:'Eilidh', persona: 'Bunster', wins: 0},
      {name:'Tanvir', persona: 'Ellillie', wins: 0},
      {name:'Gerrard', persona: 'Bufirebreather', wins: 0},
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
      setVisibleComponent(<Koth players={players}/>)
    }
  },[tournamentDetails, players])

  return(
    <>
      <TournamentNav style={tournamentDetails}/>
      {visibleComponent}
    </>
  ) 
}

export default TournamentControl;