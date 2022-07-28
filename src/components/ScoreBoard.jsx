import { v4 } from "uuid";

const ScoreBoard = (props) =>{
  const {counters} = props;
  
  
  return(
    
    <>
    {counters.sort((a, b)=>(a.totalCount < b.totalCount) ? 1 : ((b.totalCount < a.totalCount) ? -1 : 0)).map((player,i)=>{
      
      return( i < 3 ?
        <div key={v4()} className="">
          <p>#{i + 1} {player.name} -{player.totalCount} wins </p>
        </div>
        : null
      ) 
      
    })}
    </>
    
    )



}

export default ScoreBoard;