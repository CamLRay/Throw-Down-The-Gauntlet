import {React, useEffect, useState} from 'react'
import { v4 } from 'uuid';
import { db } from '../firebase-config';
import { useParams } from 'react-router-dom';
import { doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { PencilIcon, TrashIcon, XIcon  } from '@heroicons/react/solid';
import TournamentNav from './TournamentNav';


function AddPlayers() {
  const params = useParams();
  const tournamentDoc = doc(db, 'tournaments', params.tournyId)
  const [player, setPlayer] = useState('');
  const [persona, setPersona] = useState('');
  const [clearModal, setClearModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [editingPlayer, setEditingPlayer] = useState({})
  const [playerList, setPlayerList] = useState([]);
  const [bulkAddVisible, setBulkAddVisible] = useState(false)
  const [bulkInput, setBulkInput] = useState('')

  useEffect(()=>{
    const unsub = onSnapshot(tournamentDoc, (doc) => {
    setPlayerList(doc.data().players)
    })
    return ()=> unsub();
  
    },[]);

  const handleClear = async() => {
    setClearModal(!clearModal)
    const newField = {players: []}
    await updateDoc(tournamentDoc, newField);
  }

  const handleDelete = async(playerId) => {
    const filteredList = playerList.filter(player => player.id !== playerId) 
    const newField = {players: filteredList}
    await updateDoc(tournamentDoc, newField)
    
  }

  const handleEditModal = (playerId) => {
    setEditModal(!editModal);
    setEditingPlayer(playerId);
  }
  
  const handleEdit = async () => {
    playerList.splice(playerList.indexOf(editingPlayer), 1, {name:player, persona: persona, totalCount: 0, history: [], id: v4()});
    const newField = {players: [...playerList]}
    setEditModal(!editModal)
    await updateDoc(tournamentDoc, newField);
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newField = {players: [...playerList, {name:player, persona: persona, totalCount: 0, history: [], id: v4()}]}
    setPersona('')
    setPlayer('')
    await updateDoc(tournamentDoc, newField);
  }

  const handleBulkSubmit = async () => {
    
  const bulkList = bulkInput.split('\n').map((player)=>{
    return {name:player.replace("\t", " ").split(" ")[0], persona: player.replace("\t", " ").split(" ")[1], totalCount: 0, history:[], id:v4()}
    })
    const newField = {players:[...playerList].concat(bulkList)}
    setBulkInput('');
    await updateDoc(tournamentDoc, newField)
  }

  return (
    <>
    {clearModal ? 
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 border-red-700 border-4 text-white h-fit w-1/2 p-1 flex-col align-middle text-center">
        <p>Are you sure you want to clear the player list?</p>
        <div>
          <button className='bg-green-600 px-2 rounded m-1' onClick={()=>handleClear()}>Confirm</button>
          <button className='bg-red-600 px-2 rounded' onClick={()=>setClearModal(!clearModal)}>Cancel</button>
        </div>
      </div> 
    : null}
    {editModal ? 
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 border-red-700 border-4 text-white h-fit w-3/2 p-1 flex-col align-middle text-center">
        <p>Editing: {editingPlayer.name} - {editingPlayer.persona}</p>
        <div>
          <input type="text" placeholder='Player name' onChange={(e)=>setPlayer(e.target.value)} className="bg-gray-800 appearance-none border-2 border-gray-700 rounded p-1 mx-2 text-white leading-tight focus:outline-none focus:bg-gray-700 focus:border-yellow-700" required/>
          <input type="text" placeholder="Persona name" onChange={(e)=>setPersona(e.target.value)} className="bg-gray-800 appearance-none border-2 border-gray-700 rounded p-1 mx-2 text-white leading-tight focus:outline-none focus:bg-gray-700 focus:border-yellow-700" required/>
        </div>
        <div>
          <button onClick={()=>handleEdit()} className="bg-green-600 px-2 rounded m-1" >Update Player</button>
          <button onClick={()=>setEditModal(!editModal)} className='bg-red-600 px-2 rounded'>Cancel</button>
        </div>
      </div> 
    : null}
      <div className='bg-gray-600 p-2 m-10 rounded'>
      <form onSubmit={handleSubmit} className="flex justify-between">
        <div></div>
        {!bulkAddVisible ? <><div>
          <input type="text" placeholder='Player name' onChange={(e)=>setPlayer(e.target.value)} value={player} className="bg-gray-800 appearance-none border-2 border-gray-700 rounded p-1 mx-2 text-white leading-tight focus:outline-none focus:bg-gray-700 focus:border-yellow-700" required/>
          <input type="text" placeholder="Persona name" onChange={(e)=>setPersona(e.target.value)} value={persona} className="bg-gray-800 appearance-none border-2 border-gray-700 rounded p-1 mx-2 text-white leading-tight focus:outline-none focus:bg-gray-700 focus:border-yellow-700" required/>
          <button className='bg-amber-500 text-white p-1 m-1 rounded hover:bg-amber-700'>Add player</button> 
          
        </div>
        <button className="bg-amber-700 text-white p-1 m-1 rounded hover:bg-amber-800" type="button" onClick={()=>setBulkAddVisible(true)}>Bulk Add</button>
        </>
        : 
        <div className='w-2/3'>
          <label className="block mb-2 text-xl font-semibold text-amber-500 dark:text-gray-400">Add Players</label>
          <p><span className="text-white">One player per line</span> (Name Persona)</p>
          <textarea className="block p-2.5 w-2/3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={bulkInput} onChange={(e)=>setBulkInput(e.target.value)}></textarea>
          <button className="bg-amber-500 text-white p-1 m-1 rounded hover:bg-amber-800" type="button" onClick={()=>handleBulkSubmit()}>Submit Players</button>
          <button className="bg-amber-700 text-white p-1 m-1 rounded hover:bg-amber-800" type="button" onClick={()=>setBulkAddVisible(false)}>Single Add</button>
        </div>
        }
        <button type="button" className='bg-red-700 text-white p-1 m-1 rounded hover:bg-red-500 hidden md:block' onClick={()=>setClearModal(!clearModal)}>Clear list</button>
        <button type="button" className='bg-red-700 text-white p-1 m-1 h-fit rounded hover:bg-red-500 md:hidden' onClick={()=>setClearModal(!clearModal)}><XIcon className='w-5' /></button>
      </form>
      <ul>
        <li className="text-amber-600 p-1 my-1"><span className='bg-slate-800 px-2 '>#</span> Name - Persona</li>
        {playerList.length ? playerList.map((player, index)=>{
            return <li key={player.id} className="text-white bg-gray-700 p-1 my-1 border-2 border-amber-600 rounded flex justify-between"><div><span className='bg-slate-800 text-amber-600 px-2'>{index + 1}</span> {player.name} - {player.persona}</div><div className='flex'>
              <PencilIcon className='hover:text-amber-500 w-5 text-white/50' onClick={()=>handleEditModal(player)} draggable="false" />
              <TrashIcon className='hover:text-amber-500 w-5 text-white/50' onClick={()=>handleDelete(player.id)} draggable="false" /></div></li>
          }): <div>List Empty </div>}
      </ul>
    </div>
    </>
  )
}

export default AddPlayers