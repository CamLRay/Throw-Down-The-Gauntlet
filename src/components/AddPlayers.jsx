import {React, useState} from 'react'
import { v4 } from 'uuid';
import { db } from '../firebase-config';
import { useParams, useOutletContext } from 'react-router-dom';
import { doc } from 'firebase/firestore';
import { PencilIcon, TrashIcon  } from '@heroicons/react/solid';

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
    <div className='bg-gray-600 p-2 m-10 rounded'>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder='player name' onChange={(e)=>setPlayer(e.target.value)} className="p-1 mx-1" />
        <input type="text" placeholder=" persona name" onChange={(e)=>setPersona(e.target.value)} className="p-1 mx-1" />
        <button className='bg-amber-500 text-white p-1 m-1 rounded' >Add player</button>
      </form>
      <ul>
        <li><span className='bg-slate-700 px-2'>#</span> Name - Persona</li>
        {playerList.length ? playerList.map((player, index)=>{
            return <li key={v4()} className="text-white bg-gray-600 p-1 my-1 border border-amber-600 rounded flex justify-between"><div><span className='bg-slate-700 px-2'>{index + 1}</span> {player.name} - {player.persona}</div><div className='flex'><PencilIcon className='hover:text-amber-500 w-5' /> <TrashIcon className='hover:text-amber-500 w-5' /></div></li>
          }): "loading"}
      </ul>
    </div>
  )
}

export default AddPlayers