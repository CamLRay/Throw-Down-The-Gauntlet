import React from 'react'
import ScoreBoard from './ScoreBoard'
import { useOutletContext } from 'react-router-dom'

function Standings() {
  const [details] = useOutletContext()
  return (
    <div className='flex justify-center'>
      <table className='m-2 mx-10 w-2/3 text-center'>
        <thead>
          <tr>
            <th>#</th>
            <th>Name </th>
            <th>Persona</th>
            <th>Wins</th>
            <th>Top Streaks</th>
          </tr>
        </thead>
        <tbody>
          {details.players.sort((a, b)=>(a.totalCount < b.totalCount) ? 1 : ((b.totalCount < a.totalCount) ? -1 : 0)).map((player,i)=>{
            return(
              <tr key={player.id} className={`text-white ${i%2 ? "bg-slate-500" : "bg-slate-600"}`}>
                <td className='p-1'>{i+1}</td>
                <td className='p-1'>{player.name}</td> 
                <td className='p-1'>{player.persona}</td>
                <td className='p-1'>{player.totalCount}</td>
                <td className='p-1'>{player.history.map((streak)=>{return streak + " "})}</td>
              </tr>
            ) 
          })}
    </tbody>
      </table>
    </div>
  )
}

export default Standings