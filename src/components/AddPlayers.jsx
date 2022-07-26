import {React, useState} from 'react'
import { v4 } from 'uuid';

function AddPlayers(props) {
  const [player, setPlayer] = useState('');
  const [playerList, setPlayerList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault()
    setPlayerList([...playerList, player])
    console.log("click")
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder='Add Player' onChange={(e)=>setPlayer(e.target.value)} />
      <button className='bg-amber-500 text-white p-1 m-1 rounded' >Add player</button>
    </form>
    <ul className='bg-slate-800'>
      {playerList.map((player)=>{
        return <li key={v4()}>{player}</li>
      })}
    </ul>
    </>
  )
}

export default AddPlayers