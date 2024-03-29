import { v4 } from "uuid";

const ScoreBoard = (props) =>{
  const {counters} = props;
  
  const sortCounters = () => {
    return counters.sort((a, b)=>(a.totalCount < b.totalCount) ? 1 : ((b.totalCount < a.totalCount) ? -1 : 0))
  }
  
  return(
    
    <>
    <div className="hidden sm:block">
      <div className="flex justify-center">
        <div className="bg-neutral-500 h-12 w-1/6 flex-col mt-4">
        {props.persona ? sortCounters()[1].persona + " " + sortCounters()[1].totalCount + ' wins' : sortCounters()[1].name + " " + sortCounters()[1].totalCount + ' wins' }
        <div className="bg-neutral-700 h-12 w-full">2nd</div>
        </div>
        <div className="bg-neutral-500 h-18 w-1/6">
        {props.persona ?  sortCounters()[0].persona + " " + sortCounters()[0].totalCount + ' wins': sortCounters()[0].name + " " + sortCounters()[0].totalCount + ' wins'}
        <div className="bg-neutral-700 h-16 w-full">1st</div>
        </div>
        <div className="bg-neutral-500 h-10 w-1/6 mt-6">
        {props.persona ? sortCounters()[2].persona + " " + sortCounters()[2].totalCount + ' wins' : sortCounters()[2].name + " " + sortCounters()[2].totalCount + ' wins'}
        <div className="bg-neutral-700 h-10 w-full">3rd</div>
        </div>
      </div>
    </div>
    <div className="sm:hidden">
      {sortCounters().map((player,i)=>{
      
        return( i < 3 ?
          <div key={v4()} className="">
            <p>#{i + 1} {player.name} {player.totalCount} wins</p>
          </div>
          : null
        )
      
      })}
    </div>
    </>
    
    )



}

export default ScoreBoard;