import Player from "./Player";
import { useState } from "react";

const Ring = (props) =>{
  const [king, setKing] = useState({});
  
  const { players, onPlayerWin, onPlayerStreakEnd } = props;
  
  const handleStreak = (player) => {
    const tempStreak = king.streak;
    if(king.name !== player.name){
      setKing({name: player.name, streak: 1})
      onPlayerStreakEnd();
    } else {
      setKing({name: player.name, streak: tempStreak + 1})
    }
  };
  
    return(
      <>
      <h1>Ring #{props.ringNum}</h1>
      <h2>King: {king.name} {}</h2>
      <h2>Streak: {king.streak}</h2>
      {players.map((player)=>{
        return <Player key={player.id} handleWin={handleStreak} player={player} />
      })}
      </>
    )
  }
  
  export default Ring;