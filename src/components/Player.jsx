const Player = (props) =>{
  const {thisPlayer, handleWin} = props;
  return(
    <>
      <button onClick={()=>handleWin(player)}>{player.name}</button>
    </>
  )
}

export default Player;