import {React, useState} from 'react'
import { v4 } from 'uuid';
import { db } from '../firebase-config';
import { useParams, useOutletContext } from 'react-router-dom';
import { doc } from 'firebase/firestore';

function AddPlayers() {
  const params = useParams();
  const [tournamentDetails] = useOutletContext();
  const [player, setPlayer] = useState('');
  const [persona, setPersona] = useState('');
  const [playerList, setPlayerList] = useState(tournamentDetails.players);

  const tournament = doc(db, "tournaments", params.tournyId);



  const handleSubmit = (e) => {
    e.preventDefault()
    setPlayerList([...playerList, {name:player, persona: persona, totalCount: 0, history: []}])
    console.log("click")
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder='player name' onChange={(e)=>setPlayer(e.target.value)} />
      <input type="text" placeholder=" persona name" onChange={(e)=>setPersona(e.target.vaue)} />
      <button className='bg-amber-500 text-white p-1 m-1 rounded' >Add player</button>
    </form>
    <ul className='bg-slate-800'>
      {playerList.length ? playerList.map((player)=>{
        return <li key={v4()}>{player.name}</li>
      }): "loading"}
    </ul>
    </>
  )
}

export default AddPlayers