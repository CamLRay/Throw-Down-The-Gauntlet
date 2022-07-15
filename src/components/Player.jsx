const Player = (props) =>{
  const {player, handleWin} = props;
  return(
    <>
      <button onClick={()=>handleWin(player)}>{player.name}</button>
    </>
  )
}

export default Player;