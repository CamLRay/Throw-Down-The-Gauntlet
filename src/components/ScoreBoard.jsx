import { v4 } from "uuid";

const ScoreBoard = (props) =>{
  const {counters} = props;
  
  
  return(
    
    <>
    {counters.sort((a, b)=>(a.totalCount < b.totalCount) ? 1 : ((b.totalCount < a.totalCount) ? -1 : 0)).map((player,i)=>{
      
      return(
        <div key={v4()}>
          <p>{player.name}|wins:{player.totalCount} history:{player.history.map((streak)=>{return streak + " "})}</p>
        </div>
      ) 
      
    })}
    </>
    
    )



}

export default ScoreBoard;