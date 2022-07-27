import { React, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from '../firebase-config';
import { useAuth } from '../context/AuthContext';
import { v4 } from 'uuid';
import { ChevronDownIcon } from '@heroicons/react/solid';

function Dashboard() {
  const [list, setList] = useState([]);
  const {user} = useAuth();
  
  useEffect(()=>{
    if(user.uid){
      const tourniesRef = collection(db, 'tournaments')
      const usersTournies = query(tourniesRef, where('toid', '==', user.uid ));
      const unsub = onSnapshot(usersTournies, (snapshot) => {
      
        let tournaments = []
        snapshot.docs.forEach((doc) => {
          tournaments.push({...doc.data(), id: doc.id})
        })
        setList(tournaments)
      });
      return ()=> unsub();
    }
  },[user])

  return (
    <>
    <div className='flex justify-center bg-slate-700 py-10'>
      <div className='w-2/3'>
        <h1 className='text-2xl mb-2 font-thin text-white'>{user.displayName}'s tournaments </h1>
        <Link to="/tournament/new"><button className='bg-amber-500 hover:bg-amber-600 text-white font-bold py-1 px-4 rounded w-full'>Create Tournament<ChevronDownIcon className='w-6 inline' /></button></Link>
      </div>
    </div>
    <div>
      <button className='m-1 hover:text-white'>All-{list.length}</button>
      <button className='m-1 hover:text-white'>Pending-0{}</button>
      <button className='m-1 hover:text-white'>in Progress-0{}</button>
      <button className='m-1 hover:text-white'>Complete-0{}</button>
    </div>
    <div className='flex flex-col m-4'>
      {list.length ? list.map((tournament)=>{
        return( 
        <Link key={v4()} to={`/tournament/${tournament.id}`} className="bg-neutral-600 text-white border-b border-slate-700 p-4 px-6 flex justify-between">
          <div>
            <h4 className='font-semibold'>{tournament.name}</h4>
            <p className='text-white/50'>{tournament.style.groups} - {tournament.style.elim}</p>
          </div>
          <p>{tournament.players.length}</p>
        </Link>
        )
      }): "Loading"}
    </div>
    </>


  )
}

export default Dashboard