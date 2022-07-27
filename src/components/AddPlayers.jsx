import {React, useEffect, useState} from 'react'
import { v4 } from 'uuid';
import { doc, setDoc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from '../firebase-config';
import { useParams } from 'react-router-dom';
import { CatchingPokemonSharp } from '@mui/icons-material';

function AddPlayers(props) {
  const params = useParams();
  const [player, setPlayer] = useState('');
  const [playerList, setPlayerList] = useState([]);
  const tournament = doc(db, "tournaments", params.tournyId);

  useEffect(()=>{
    
    const unsub = onSnapshot(tournament, (snapshot) => {
      setPlayerList([snapshot.data().players])
      console.log(playerList)
    })
    return ()=> unsub();
  },[params])

  const handleSubmit = (e) => {
    e.preventDefault()
    setPlayerList([...playerList, player])
    console.log("click")
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder='player name' onChange={(e)=>setPlayer(e.target.value)} />
      <input type="text" placeholder=" persona name" onChange={(e)=>setPersona(e.target.vaue)}
      <button className='bg-amber-500 text-white p-1 m-1 rounded' >Add player</button>
    </form>
    <ul className='bg-slate-800'>
      {playerList.map((player)=>{
        return <li key={v4()}>{player.persona}</li>
      })}
    </ul>
    </>
  )
}

export default AddPlayers