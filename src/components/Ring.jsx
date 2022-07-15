import Player from "./Player";
import { useState } from "react";

const Ring = (props) =>{
  const [king, setKing] = useState({});
  
  const { players} = props;
  
  const handleStreak = (player) => {
    const tempStreak = king.streak;
    if(king.name !== player.name){
      setKing({name: player.name, streak: 1})
    } else {
      setKing({name: player.name, streak: tempStreak + 1})
      
    }
  };
  
    return(
      <>
      <h1>Ring #{props.ringNum}</h1>
      <h2>Current King: {king.name}</h2>
      <h2>Streak: {king.streak}</h2>
      {players.map((player)=>{
        return <Player handleWin={handleStreak} player={player} />
      })}
      </>
    )
  }
  
  export default Ring;